<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>List Group Kontak</span>
                <div class="space-x-1">
                    <el-button @click="showForm = true" type="primary">
                        Tambah Group Kontak
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
                        <el-table-column type="index" width="50" />
                        <el-table-column prop="name" label="Nama" sortable/>
                        <el-table-column prop="contacts_count" label="Jumlah Kontak" sortable/>
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
                                            <el-dropdown-item>
                                                <a :href="route('admin.contact.show', {id : scope.row.id})" class="d-flex align-items-center justify-content-between w-100">
                                                    Detail
                                                    <i class="si fa-fw si-eye"></i>
                                                </a>
                                            </el-dropdown-item>
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
        <el-dialog v-model="showForm" :title="formTitle" width="30%" :before-close="onCloseForm">
            <el-form :model="form" label-position="top">
                <el-form-item label="Nama Group">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="onCloseForm">Batal</el-button>
                    <el-button type="primary" @click="submit">
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
export default {
    components: {
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
            formTitle: "Tambah Group Kontak",
            form : {
                id : null,
                name : null,
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
        async fetchData(page) {
            var page = (page == undefined) ? 1 : page;
            try {
                this.isLoading = true;
                const response = await axios.get(this.route("admin.contact.group.data"),{
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
            this.title = 'Tambah Group kontak';
            this.editMode = false;
            this.form.id = null;
            this.form.name = null;
            this.showForm = false;
        },
        submit() {
            this.loadingForm = true;
            let form = this.$inertia.form(this.form);
            let url = this.editMode == true ? this.route('admin.contact.group.update', {id : this.form.id}) : this.route('admin.contact.group.store');
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
            this.formTitle = 'Ubah Group Kontak';
            this.form.id = data.id;
            this.form.name = data.name;
            this.form.brand_id = data.brand_id;
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
                this.$inertia.delete(this.route('admin.contact.group.delete', {id : id}), {
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