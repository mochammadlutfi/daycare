<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Absen</span>
                <div class="space-x-1">
                    <a :href="route('admin.absen.create')" class="ep-button ep-button--primary">
                        <i class="fa fa-plus me-1"></i>
                        Tambah
                    </a>
                    <a :href="route('admin.absen.scanner')" class="ep-button ep-button--primary">
                        <i class="fa fa-plus me-1"></i>
                        Scanner
                    </a>
                </div>
            </div>
            
            <div class="block rounded">
                    <div class="block-content py-3">
                    <el-row justify="space-between">
                        <el-col :span="12">
                            <el-select v-model="params.limit" placeholder="Pilih" style="width: 115px" @change="fetchData(1)">
                                <el-option label="25" value="25"/>
                                <el-option label="50" value="50"/>
                                <el-option label="100" value="100"/>
                            </el-select>
                        </el-col>
                        <el-col :span="7">
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
                    <div class="block-content p-0">
                        <el-table :data="data" class="w-100" v-loading="isLoading" header-cell-class-name="bg-body text-dark">
                            <el-table-column prop="tgl" label="Tanggal" width="220" header-align="center">
                                <template #default="scope">
                                    <div>{{ format_date(scope.row.tgl) }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="Kelompok" width="220" header-align="center">
                                <template #default="scope">
                                    <div>{{ scope.row.kelompok.nama }} ({{ scope.row.kelompok.usia }})</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="hadir" label="Hadir" header-align="center" align="center"/>
                            <el-table-column prop="izin" label="Izin" header-align="center" align="center"/>
                            <el-table-column prop="sakit" label="Sakit" header-align="center" align="center"/>
                            <el-table-column prop="alpa" label="Alpa" header-align="center" align="center"/>
                            <el-table-column label="Aksi" align="center" width="180">
                                <template #default="scope">
                                    <a :href="route('admin.absen.show', { id :scope.row.id})" class="ep-button ep-button--primary">
                                        <i class="fa fa-eye me-1"></i>
                                        Detail
                                    </a>
                                </template>
                            </el-table-column>
                        </el-table>
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
    </base-layout>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import { router } from '@inertiajs/vue3';
export default {
    components: {

    },
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
                const response = await axios.get(this.route("admin.absen.data"),{
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
                return dayjs(String(value)).format('DD MMMM YYYY')
            }
        },
    }
}
</script>