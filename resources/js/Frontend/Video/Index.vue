<template>
    <base-layout>
        <Head>
            <title>Video</title>
            <meta name="description" content="Kang Ebod, Makhfudz Solaeman">
        </Head>
        <div class="content">
            <div class="block block-rounded block-transparent bg-image bg-image-center"
                style="background-image: url('/images/default.webp');">
                <div class="block-content bg-primary-dark-op">
                    <div class="py-5 text-center">
                        <h1 class="h2 fw-bold text-white mb-2">Video</h1>
                        <h2 class="h5 fw-medium text-white-75">Liputan Media & Video Lebih Kenal Dengan Makhfudz Solaiman (Kang Ebod)</h2>
                    </div>
                </div>
            </div>


            <el-row :gutter="20" class="infinite-list-wrapper" style="overflow: auto" v-infinite-scroll="load">
                <el-col :span="8" v-for="d in data" :key="d.id" class="mb-3">
                    <div class="block block-rounded d-flex flex-column h-100 mb-0">
                        <div class="block-content p-3">
                            <img :src="'uploads'+ d.image" class="img-fluid rounded-3"/>
                        </div>
                        <div class="block-content p-3 pt-0">
                            <h2 class="mb-1 fs-5">
                                <a class="text-primary" :href="route('video.show', {'slug' : d.slug })">
                                    {{ d.title }}
                                </a>
                            </h2>
                        </div>
                    </div>
                </el-col>

            </el-row>
        </div>
    </base-layout>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';
import { Head } from '@inertiajs/vue3'
export default {
    components : {
        Head
    },
    data(){
        return {
            removeAlert : false,
            data : [],
            isLoading : true,
            page : 1,
            pageSize : 0,
            searchKey : 'name',
            searchKeyword : '',
            limit : 15,
            total : 0,
        } 
    },
    async mounted(){
        const isServer = typeof window === 'undefined'
        if(!isServer){
            await this.fetchData();
        }
    },
    methods :{
        async fetchData(page) {
            var page = (page == undefined) ? 1 : page;
            try {
                this.isLoading = true;
                const response = await axios.get(this.route("video.data"),{
                    params: {
                        page: page,
                        limit : this.limit,
                        search : this.searchKeyword,
                        searchKey : this.searchKey,
                    }
                });
                if(response.status == 200){
                    this.data = response.data.data;
                    this.page = response.data.current_page;
                    this.total = response.data.total;
                    this.pageSize = response.data.per_page;
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
        load(v){
            console.log(v);
        }
    }
}
</script>