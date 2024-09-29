<template>
    <user-layout title="Invoice">
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Invoice</span>
                <div class="space-x-1">

                </div>
            </div>
            
            <div class="block rounded"  v-loading="isLoading" >
                <div class="block-content py-3" v-if="mq.smPlus">
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
                    <div class="block-content p-0" v-if="mq.smPlus">
                        <el-table :data="data" class="w-100" header-cell-class-name="bg-body text-dark">
                            <el-table-column prop="nomor" label="Nomor" width="220" header-align="center"/>
                            <el-table-column prop="anak.nama" label="Anak"/>
                            <el-table-column label="Tanggal Tempo" align="center">
                                <template #default="scope">
                                    {{ format_date(scope.row.tgl_tempo) }}
                                </template>
                            </el-table-column>
                            <el-table-column label="Status" align="center">
                                <template #default="scope">
                                    <span class="badge bg-primary" v-if="scope.row.status == 'paid'">
                                        Lunas
                                    </span>
                                    <span class="badge bg-danger" v-else>
                                        Belum Bayar
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Total" align="center">
                                <template #default="scope">
                                    {{  currency(scope.row.total) }}
                                </template>
                            </el-table-column>
                            <el-table-column label="Aksi" align="center" width="180">
                                <template #default="scope">
                                    <a :href="route('user.invoice.show', { id :scope.row.id})" class="ep-button ep-button--primary">
                                        <i class="fa fa-eye me-1"></i>
                                        Detail
                                    </a>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="block-content p-0" v-else>
                        <a :href="route('user.invoice.show', { id: d.id})" v-for="d in data" :key="d.id">
                            <div class="border-bottom border-3 p-3 text-dark">
                                <div class="d-flex justify-content-between">
                                    <div class="fs-5 fw-bold">{{ d.nomor }}</div>
                                    <div class="text-end">
                                        <span class="badge bg-primary" v-if="d.status == 'paid'">
                                            Lunas
                                        </span>
                                        <span class="badge bg-danger" v-else>
                                            Belum Bayar
                                        </span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <div class="fs-5">{{ d.anak.nama }}</div>
                                        <div class="fs-5">{{ format_date(d.tgl_tempo) }}</div>
                                    </div>
                                    <div class="fw-bold fs-4 text-primary">{{ currency(d.total) }}</div>
                                </div>
                            </div>
                        </a>
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
import axios from 'axios';
import moment from 'moment';
import { router } from '@inertiajs/vue3';
export default {
    components: {

    },
	inject: ["mq"],
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
                const response = await axios.get(this.route("user.invoice.data"),{
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