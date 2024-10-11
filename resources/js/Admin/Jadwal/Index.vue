<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Jawdal Kegiatan</span>
                <div class="space-x-1">
                    <el-button @click="openModal" type="primary">
                        <i class="fa fa-plus me-1"></i>
                        Tambah
                    </el-button>
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
                        <el-table :data="data" class="w-100" header-cell-class-name="bg-body text-dark">
                            <el-table-column label="Kelompok" width="220" header-align="center">
                                <template #default="scope">
                                    <div>{{ scope.row.kelompok.nama }} ({{  scope.row.kelompok.usia }})</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="admin.nama" label="Guru"/>
                            <el-table-column prop="tgl" label="Periode" width="200" header-align="center">
                                <template #default="scope">
                                    <div>{{ format_date(scope.row.tgl_mulai) }} - {{ format_date(scope.row.tgl_selesai) }}</div>
                                </template>
                            </el-table-column>
                            <el-table-column label="Aksi" align="center" width="180">
                                <template #default="scope">
                                    <a :href="route('admin.jadwal.detail', { id :scope.row.id })" class="ep-button ep-button--primary">
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
        <el-dialog v-model="showForm" :title="formTitle" width="30%" :before-close="onCloseForm" v-loading="loadingForm">
            <el-form :model="form" label-position="top">
                <el-form-item label="Kelompok" :error="errors.kelompok_id">
                    <select-kelompok v-model="form.kelompok_id"/>
                </el-form-item>
                <el-form-item label="Periode"  :error="errors.periode">
                    <el-date-picker
                        v-model="form.periode"
                        class="w-100"
                        type="daterange"
                        range-separator="-"
                        format="DD MMMM YYYY"
                        start-placeholder="Tanggal Mulai"
                        end-placeholder="Tanggal Selesai"
                    />
                </el-form-item>
                <div class="text-end">
                    <el-button @click="onCloseForm">
                        <i class="fa fa-close me-2"></i>
                        Batal
                    </el-button>
                    <el-button type="primary" @click="submit">
                        <i class="fa fa-check me-2"></i>
                        Simpan
                    </el-button>
                </div>
            </el-form>
        </el-dialog>
    </base-layout>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import SelectKelompok from '@/Components/SelectKelompok.vue';
export default {
    components: {
        SelectKelompok
    },
    props : {
        errors : {
            type : Object,
        }
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
            },
            showForm : false,
            loadingForm : false,
            editMode : false,
            form : {
                id : null,
                kelompok_id : null,
                minggu : null,
            },
            formTitle : 'Tambah Jadwal Kegiatan',
        } 
    },
    async created() {
        await this.fetchData();
    },
    methods :{
        submit() {
            this.loadingForm = true;
            let form = this.$inertia.form(this.form);
            let url = this.editMode == true ? this.route('admin.jadwal.update', {id : this.form.id}) : this.route('admin.jadwal.store');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loadingForm = false;
                },
                onSuccess: () => {
                    ElMessage({
                        type: 'success',
                        message: 'Data Berhasil Disimpan!',
                    });
                    this.showForm = false;
                    this.onCloseForm();
                },
            });
        },
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
                const response = await axios.get(this.route("admin.jadwal.data"),{
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
        openModal()
        {
            this.showForm = true;
        },
        onCloseForm(){
            this.showForm = false;
            this.form.id = null;
            this.form.kelompok_id = null;
            this.form.periode = null;
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