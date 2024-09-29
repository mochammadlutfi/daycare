<template>
    <user-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Laundry</span>
                <div class="space-x-1">

                </div>
            </div>
            
            <div class="block rounded" v-loading="isLoading">
                <div class="block-content py-3" :class="{'border-bottom border-3' : !mq.smPlus}">
                    <el-row justify="space-between" :gutter="10">
                        <el-col :md="4" :xs="6" :sm="4">
                            <el-select v-model="params.limit" placeholder="Pilih" class="w-100" @change="fetchData(1)">
                                <el-option label="25" value="25"/>
                                <el-option label="50" value="50"/>
                                <el-option label="100" value="100"/>
                            </el-select>
                        </el-col>
                        <el-col :md="7" :xs="18"  :sm="20">
                            <el-input
                                v-model="params.q"
                                @input="doSearch"
                                clearable
                                >
                                <template #prefix>
                                    <span>
                                        <i class="fa fa-search"></i></span>
                                </template>
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
                <div class="block-content p-0" v-if="mq.smPlus">
                    <el-table :data="data" class="w-100" header-cell-class-name="bg-body text-dark">
                        <el-table-column prop="tgl" label="Tanggal" width="200" header-align="center">
                            <template #default="scope">
                                <div>{{ format_date(scope.row.laundry.tgl) }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="anak.nama" label="Anak"/>
                        <el-table-column label="Kelompok" width="220" header-align="center">
                            <template #default="scope">
                                <div>{{ scope.row.laundry.kelompok.nama }} ({{  scope.row.laundry.kelompok.usia }})</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="Pengasuh" width="220" header-align="center">
                            <template #default="scope">
                                <div>{{ scope.row.laundry.admin.nama }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="Berat" width="220" header-align="center">
                            <template #default="scope">
                                <div>{{ scope.row.berat }} gram</div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block-content p-0" v-else>
                    <template v-if="data.length">
                        <div class="border-bottom border-3 p-3 text-dark"  v-for="d in data" :key="d.id">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="fs-5 fw-semibold">Tanggal</div>
                                <div class="fs-5">{{ format_date(d.laundry.tgl) }}</div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="fs-5 fw-semibold">Pengasuh</div>
                                <div class="fs-5">{{ d.laundry.admin.nama }}</div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="fs-5 fw-semibold">Anak</div>
                                <div class="fs-5">{{ d.anak.nama }}</div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="fs-5 fw-semibold">Berat</div>
                                <div class="fs-5">{{ d.berat }} gram</div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="border-bottom border-3 p-3 text-dark">
                            <div class="text-center">
                                Tidak ada data
                            </div>
                        </div>
                    </template>
                </div>
                <div class="block-content py-2">
                    <el-row justify="space-between">
                        <el-col :lg="12" class="d-flex">
                            <p class="my-auto text-xs">Menampilkan {{ from }} sampai {{ to }} dari {{ total }}</p>
                        </el-col>
                        <el-col :lg="12" class="text-end">
                            <el-pagination class="float-end" background layout="prev, pager, next" :page-size="pageSize" :total="total" :current-page="page" @current-change="fetchData"/>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </user-layout>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import { router } from '@inertiajs/vue3';
export default {
    components: {

    },
    inject : ["mq"],
    data(){
        return {
            kota_id : null,
            selected : [],
            data : [],
            isLoading : true,
            page : 1,
            pageSize : 0,
            limit : 5,
            total : 0,
            from : 0,
            to : 0,
            params : {
                page : 1,
                limit : 25,
                q : ""
            }
        } 
    },
    async created() {
        await this.fetchData();
    },
    methods :{
        async setFilter(){
            this.daerahSelect = false;
            await this.fetchData();
        },
        doSearch : _.debounce(function(){
            this.isLoading = true;
            this.fetchData();
        }, 1000),
        async fetchData(page) {
            var page = (page == undefined) ? 1 : page;
            try {
                this.isLoading = true;
                const response = await axios.get(this.route("user.laundry.data"),{
                    params: {
                        page : page,
                        limit : this.params.limit,
                        q : this.params.q,
                    }
                });
                if(response.status == 200){
                    this.data = response.data.data;
                    this.params.page = response.data.current_page;
                    this.total = response.data.total;
                    this.pageSize = response.data.per_page;
                    this.from = response.data.from;
                    this.to = response.data.to;
                }
                this.isLoading = false;
            } catch (error) {
                console.error(error);
            }
        },
        onClickRow(row, column, event){
            router.visit(this.route('admin.pegawai.show', {id : row.id}), { method: 'get' })
        },
        selectAll(e){
            if(e.target.checked){
                this.dataList.data.forEach((v, i) => {
                    this.selected.push(v.id)
                });
            }else{ 
                this.selected = [];
            }
        },
        format_date(value){
            if (value) {
                return moment(String(value)).format('DD MMM YYYY')
            }
        },
    }
}
</script>