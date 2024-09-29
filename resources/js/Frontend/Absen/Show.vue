<template>
    <user-layout title="Absen Anak">
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Detail Absen {{ anak.nama }}</span>
                <div class="space-x-1">

                </div>
            </div>
            
            <div class="block rounded">
                <div class="block-content p-0 p-md-4">
                    <el-calendar>
                        <template #date-cell="{ data }">
                            <div :class="data.isSelected ? 'is-selected' : ''">
                                {{ data.day.split('-').slice(2).join('-') }}
                                <br>
                                {{ cek_tgl(data.day) }}
                            </div>
                        </template>
                    </el-calendar>
                </div>
            </div>
        </div>
    </user-layout>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import { router } from '@inertiajs/vue3';
export default {
    components: {

    },
    props : {
        anak : Object,
        data : Object,
    },
    data(){
        return {
            kota_id : null,
            selected : [],
            dataLines : [
                '2024-09-18'
            ],
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
        cek_tgl(tgl){
            if(tgl in this.data){
                return this.data[tgl].status;
            }
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