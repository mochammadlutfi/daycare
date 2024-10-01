<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Jenis Kegiatan</span>
                <div class="space-x-1">
                    <el-button @click="showForm = true" type="primary">
                        Tambah
                    </el-button>
                </div>
            </div>
            
            <div class="block block-rounded">
                <div class="block-content py-3">
                    <el-row justify="space-between">
                        <el-col :span="12">
                            <el-select v-model="limit" placeholder="Pilih" style="width: 115px" @change="fetchData(1)">
                                <el-option label="25" value="25"/>
                                <el-option label="50" value="50"/>
                                <el-option label="100" value="100"/>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-input
                                v-model="searchKeyword"
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
                    <el-table :data="data" class="w-100" header-cell-class-name="bg-body text-dark" v-loading="isLoading" @sort-change="sortChange">
                        <el-table-column type="index" width="50" />
                        <el-table-column prop="nama" label="Nama" sortable/>
                        <el-table-column prop="kegiatan_count" label="Jumlah Kegiatan" sortable/>
                        <el-table-column label="Aksi" align="center" width="180">
                            <template #default="scope">
                                <el-dropdown popper-class="dropdown-action" trigger="click">
                                    <el-button type="primary">
                                    Aksi <i class="fa fa-angle-down ms-1"></i>
                                    </el-button>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item class="d-flex align-items-center justify-content-between space-x-1" @click.prevent="edit(scope.row)">
                                                Ubah
                                                <i class="si fa-fw si-note"></i>
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
                    <el-row justify="space-between">
                        <el-col :lg="12" class="d-flex">
                            <p class="my-auto fs-sm">Menampilkan {{ from }} sampai {{ to }} dari {{ total }}</p>
                        </el-col>
                        <el-col :lg="12" class="text-end">
                            <el-pagination class="float-end" background layout="prev, pager, next"  :page-size="pageSize" :total="total" :current-page="page" @current-change="fetchData"/>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <el-dialog v-model="showForm" :title="formTitle" width="40%" :before-close="onCloseForm" v-loading="loadingForm">
            <el-form :model="form" label-position="top">
                <el-form-item label="Nama" :error="errors.nama">
                    <el-input v-model="form.nama" autocomplete="off" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="onCloseForm">
                        <i class="fa fa-close me-2"></i>
                        Batal
                    </el-button>
                    <el-button type="primary" @click="submit">
                        <i class="fa fa-check me-2"></i>
                        Simpan
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </base-layout>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import SelectJenisKegiatan from '@/Components/SelectJenisKegiatan.vue';
export default {
    components: {
        SelectJenisKegiatan
    },
    props :{
        errors : {
            type : Object,
        }
    },
    data(){
        return {
            selected : [],
            data : [],
            isLoading : true,
            page : 1,
            pageSize : 0,
            searchKey : 'nama',
            searchKeyword : '',
            limit : 25,
            total : 0,
            showForm : false,
            from : 0,
            to : 0,
            sort : 'nama',
            sortDir : 'ASC',
            formTitle: "Tambah JenisKegiatan",
            form : {
                id : null,
                nama : null,
            },
            editMode : false,
            loadingForm : false,
        } 
    },
    async created() {
        await this.fetchData();
    },
    methods :{
        sortChange(data){
            this.sort = data.prop;
            this.sortDir = (data.order == 'ascending') ? 'ASC' : 'DESC';
            this.fetchData();
        },
        doSearch : _.debounce(function(){
            this.isLoading = true;
            this.fetchData();
        }, 1000),
        async fetchData(page) {
            var page = (page == undefined) ? 1 : page;
            try {
                this.isLoading = true;
                const response = await axios.get(this.route("admin.jenis_kegiatan.data"),{
                    params: {
                        page: page,
                        limit : this.limit,
                        sort : this.sort,
                        sortDir : this.sortDir,
                        search : this.searchKeyword,
                        searchKey : this.searchKey,
                    }
                });
                if(response.status == 200){
                    this.data = response.data.data;
                    this.page = response.data.current_page;
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
        onCloseForm(){
            this.title = 'Tambah Jenis Kegiatan';
            this.editMode = false;
            this.form.id = null;
            this.form.nama = null;
            this.showForm = false;
        },
        submit() {
            this.loadingForm = true;
            let form = this.$inertia.form(this.form);
            let url = this.editMode == true ? this.route('admin.jenis_kegiatan.update', {id : this.form.id}) : this.route('admin.jenis_kegiatan.store');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loadingForm = false;
                    this.fetchData();
                },
                onSuccess: () => {
                    ElMessage({
                        type: 'success',
                        message: 'Data Berhasil Disimpan!',
                    });
                    this.onCloseForm();
                },
            });
        },
        edit(data){
            this.formTitle = 'Ubah Jenis Kegiatan';
            this.form.id = data.id;
            this.form.nama = data.nama;
            this.editMode = true;
            this.showForm = true;
        },
        hapus(id){
            ElMessageBox.alert('Data yang dihapus tidak bisa dikembalikan!', 'Peringatan', {
                showCancelButton: true,
                confirmButtonText: 'Ya!',
                cancelButtonText: 'Tidak!',
                type: 'warning',
            })
            .then(() => {
                this.$inertia.delete(this.route('admin.jenis_kegiatandelete', {id : id}), {
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