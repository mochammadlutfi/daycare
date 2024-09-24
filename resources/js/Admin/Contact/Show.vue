<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>List Kontak {{ group.name }}</span>
                <div class="space-x-1">
                    <el-button @click="showForm = true" type="primary">
                        <i class="si si-plus me-1"></i>
                        Tambah Kontak
                    </el-button>
                    <el-button @click="showImport = true" type="primary">
                        <i class="fa fa-upload me-1"></i>
                        Import Kontak
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
                                placeholder="Masukan kata kunci"
                                class="input-with-select"
                                clearable
                                >
                                <template #append>
                                    <el-button @click="fetchData(1)">
                                        <i class="fa fa-search"></i>
                                    </el-button>
                                </template>
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
                <div class="block-content p-0">
                    <el-table :data="data" class="table-click" style="width: 100%" v-loading="isLoading" @sort-change="sortChange">
                        <el-table-column type="index" :index="indexMethod" width="100" />
                        <el-table-column prop="name" label="Nama" sortable/>
                        <el-table-column prop="phone" label="No Handphone" sortable/>
                        <el-table-column label="Dibuat">
                            <template #default="scope">
                                {{ format_date(scope.row.created_at) }}
                            </template>
                        </el-table-column>
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
                    <div class="row justify-content-end">
                        <div class="col-md-6 text-end">
                            <el-pagination class="float-end" background layout="prev, pager, next"  :page-size="pageSize" :total="total" :current-page="page" @current-change="fetchData"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog v-model="showForm" :title="formTitle" width="30%" class="rounded-2" :before-close="onCloseForm">
            <el-form :model="form" label-position="top">
                <el-form-item label="Nama Kontak">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="No Handphone">
                    <el-input v-model="form.phone" autocomplete="off" />
                </el-form-item>
                <div class="text-end">
                    <el-button @click="onCloseForm">
                        <i class="si si-close me-1"></i>
                        Batal
                    </el-button>
                    <el-button native-type="submit" type="primary" @click="submit">
                        <i class="si si-check me-1"></i>
                        Simpan
                    </el-button>
                </div>
            </el-form>
        </el-dialog>
        
        <el-dialog v-model="showImport" title="Import Kontak" width="30%" class="rounded-2" :before-close="onCloseImport" :close-on-click-modal="false">
            <el-form label-position="top" v-loading="loadingImport">
                <el-form-item label="File" :error="errors.file">
                    <input type="file" class="file-input" @change="selectFiles"  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                </el-form-item>
                <div class="text-end">
                    <el-button class="ml-3" @click="showImport = false">
                        <i class="si si-close me-1"></i>
                        Batal
                    </el-button>
                    <el-button class="ml-3" type="primary" @click="doImport">
                        <i class="si si-check me-1"></i>
                        Upload
                    </el-button>
                </div>
            </el-form>
        </el-dialog>
    </base-layout>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
    props: {
        group : Object,
        errors : Object,
    },
    data(){
        return {
            selected : [],
            data : [],
            isLoading : true,
            page : 1,
            pageSize : 0,
            searchKey : 'name',
            searchKeyword : '',
            limit : 25,
            total : 0,
            showForm : false,
            sort : 'name',
            sortDir : 'ASC',
            formTitle: "Tambah Kontak " + this.group.name,
            form : {
                id : null,
                name : null,
                phone : null,
                group_id : this.group.id,
            },
            editMode : false,
            loadingForm : false,
            showImport : false,
            importFile : null,
            loadingImport : false,
        } 
    },
    async created() {
        await this.fetchData();
    },
    methods :{
        indexMethod(index){
            const x = this.page == 1 ? 1 : (this.limit * (this.page - 1)) + 1;
            return x + index;
        },
        sortChange(data){
            this.sort = data.prop;
            this.sortDir = (data.order == 'ascending') ? 'ASC' : 'DESC';
            this.fetchData();
        },
        async fetchData(page) {
            var page = (page == undefined) ? 1 : page;
            try {
                this.isLoading = true;
                const response = await axios.get(this.route("admin.contact.data"),{
                    params: {
                        page: page,
                        limit : this.limit,
                        sort : this.sort,
                        sortDir : this.sortDir,
                        search : this.searchKeyword,
                        searchKey : this.searchKey,
                        group_id : this.group.id
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
        format_date(value){
            if (value) {
                return moment(String(value)).format('DD MMMM YYYY')
            }
        },
        onCloseForm(){
            this.title = "Tambah Kontak " + this.group.name;
            this.editMode = false;
            this.form.id = null;
            this.form.name = null;
            this.form.phone = null;
            this.showForm = false;
        },
        submit() {
            this.loadingForm = true;
            let form = this.$inertia.form(this.form);
            let url = this.editMode == true ? this.route('admin.contact.update', {id : this.form.id}) : this.route('admin.contact.store');
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
            this.formTitle = 'Ubah Kontak '+ this.group.name;
            this.form.id = data.id;
            this.form.name = data.name;
            this.form.phone = data.phone;
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
                this.$inertia.delete(this.route('admin.contact.delete', {id : id}), {
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
        
        doImport(){
            this.loadingImport = true;
            let form = this.$inertia.form({
                file : this.importFile,
                group_id : this.group.id,
            });
            let url = this.route('admin.contact.import');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loadingImport = false;
                    this.fetchData();
                    this.onCloseImport;
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
        onCloseImport(){
            this.showImport = false;
            this.importFile = null;
        },
        selectFiles(e){
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.importFile = e.target.files[0];
        },
    }
}
</script>