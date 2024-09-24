<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                Galeri Video
                <div class="space-x-1">
                    <a :href="route('admin.video.create')" class="ep-button ep-button--primary">
                        <i class="si si-plus me-1"></i>
                        Tambah Video
                    </a>
                </div>
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

                <div class="block-content p-0" @row-click="onClick">
                    <el-table :data="data" class="table-click" style="width: 100%" v-loading="isLoading" border>
                        <el-table-column type="index" width="50" />
                        <el-table-column label="Foto" width="160">
                            <template #default="scope">
                                <img :src="'/uploads'+scope.row.image" class="rounded-2" width="120"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="title" label="Judul" sortable/>
                        <el-table-column label="Aksi" align="center" width="180">
                            <template #default="scope">
                                <el-dropdown popper-class="dropdown-action" trigger="click">
                                    <el-button type="primary">
                                    Aksi <i class="fa fa-angle-down ms-1"></i>
                                    </el-button>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item class="d-flex align-items-center justify-content-between space-x-1">
                                                <a :href="route('admin.video.edit', {id : scope.row.id})">
                                                    Ubah
                                                    <i class="si fa-fw si-note"></i>
                                                </a>
                                            </el-dropdown-item>
                                            <el-dropdown-item class="d-flex align-items-center justify-content-between space-x-1" @click.prevent="hapus(scope.row.id)">
                                                Hapus
                                                <i class="si fa-fw si-trash"></i>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
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
                const response = await axios.get(this.route("admin.video.data"),{
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
