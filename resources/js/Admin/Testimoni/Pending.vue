<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                Testimoni Dukungan
            </div>

            <div class="block block-rounded">
                <div class="block-content py-3">
                    <el-row>
                        <el-col :span="10">
                            <el-input
                                v-model="searchKeyword"
                                placeholder="Masukan kata kunci"
                                class="input-with-select"
                                >
                                <template #prepend>
                                    <el-select v-model="searchKey" placeholder="Pilih" style="width: 115px">
                                        <el-option label="Nama" value="name" />
                                    </el-select>
                                </template>
                                <template #append>
                                    <el-button>
                                        <Icon icon="simple-line-icons:magnifier"/>
                                    </el-button>
                                </template>
                            </el-input>
                        </el-col>
                    </el-row>
                </div>

                <div class="block-content p-0">
                    <el-table :data="data" class="table-click" style="width: 100%" v-loading="isLoading" @row-click="onClickRow">
                        <el-table-column type="index" width="50" />
                        <el-table-column prop="nama" label="Nama Lengkap" sortable/>
                        <el-table-column prop="pekerjaan" label="Pekerjaan" sortable/>
                        <el-table-column prop="phone" label="No HP" sortable/>
                        <el-table-column prop="email" label="Email" sortable/>
                        <el-table-column label="Status">
                            <template #default="scope">
                                <el-tag v-if="scope.row.status=='pending'" type="warning">Pending</el-tag>
                                <el-tag v-else-if="scope.row.status=='approve'" type="primary">Terima</el-tag>
                                <el-tag v-else type="danger">Tolak</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block-content py-2">
                    <div class="row justify-content-end">
                        <div class="col-md-6 text-end">
                            <el-pagination class="float-end" background layout="prev, pager, next" :page-size="pageSize" :total="total" :current-page="page" @current-change="fetchData"/>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </base-layout>
</template>

<script>
import { router } from '@inertiajs/vue3';
import moment from 'moment';
import _ from 'lodash';
export default {
    components: {
        
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
    async created() {
        await this.fetchData();
    },
    methods :{
        async fetchData(page) {
            var page = (page == undefined) ? 1 : page;
            try {
                this.isLoading = true;
                const response = await axios.get(this.route("admin.testimoni.data"),{
                    params: {
                        page: page,
                        limit : this.limit,
                        search : this.searchKeyword,
                        searchKey : this.searchKey,
                        pending : 1,
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
        onClickRow(row, column, event){
            router.visit(this.route('admin.testimoni.show', {id : row.id}), { method: 'get' })
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
        hapus(id){
            ElMessageBox.alert('Data yang dihapus tidak bisa dikembalikan!', 'Peringatan', {
                showCancelButton: true,
                confirmButtonText: 'Ya!',
                cancelButtonText: 'Tidak!',
                type: 'warning',
            })
            .then(() => {
                this.$inertia.delete(this.route('admin.video.delete', {id : id}), {
                    preserveScroll: true,
                    onSuccess: () => {
                        this.fetchData();
                        ElMessage({
                            type: 'success',
                            message: 'Data Berhasil Dihapus!',
                        });
                    },
                });
            });
        },
    }
}
</script>
