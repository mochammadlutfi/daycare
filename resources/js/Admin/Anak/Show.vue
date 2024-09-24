<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Detail Anak</span>
                <div class="space-x-1">
                    <template v-if="data.status == 'Pending'">
                        <el-button @click="openModal('terima')" type="primary">
                            <i class="fa fa-check me-2"></i>
                            Terima
                        </el-button>
                        <el-button @click="openModal('tolak')" type="danger">
                            <i class="fa fa-close me-2"></i>
                            Tolak
                        </el-button>
                    </template>
                </div>
            </div>
            <div class="">
            <el-tabs v-model="activeTab" class="block rounded-2" @tab-click="updateTab" stretch>
                <el-tab-pane label="Informasi Anak" name="anak">
                    <div class="block-content">
                        <el-row :gutter="20">
                            <el-col :md="12">
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="10">Nama Lengkap</el-col>
                                    <el-col :md="14">
                                        : <span class="fw-semibold">{{ data.nama }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="10">Nama Panggilan</el-col>
                                    <el-col :md="14">
                                        : <span class="fw-semibold">{{ data.username }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="10">Jenis Kelamin</el-col>
                                    <el-col :md="14">
                                        : <span class="fw-semibold">{{ (data.jk == 'L' ? 'Laki-Laki' : 'Perempuan') }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="10">Tempat / Tanggal Lahir</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.tmp_lahir }} / {{ data.tgl_lahir }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="10">Anak Ke</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.anak_ke }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="10">Jarak Rumah</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.jarak }} Km</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="10">Alamat</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.alamat }}</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :md="12">
                                
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="10">Sosialisasi dengan lingkungan</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.sosialisasi_dengan_lingkungan_anak }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="10">Sakit yang pernah diderita</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.sakit_yang_pernah_diderita_anak }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="10">Makanan yang disukai</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.makanan_yang_disukai_anak }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="10">Makanan yang tidak disukai</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.makanan_yang_tidak_disukai_anak }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="10">Memiliki Alergi</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.memiliki_alergi_anak }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="10">Scan Akta Kelahiran</el-col>
                                    <el-col :md="14">
                                        :  
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Informasi Orang Tua/Wali" name="ortu">
                    <div class="block-content">
                    <el-row :gutter="20">
                        <el-col :md="12">
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Nama Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.nama_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Tempat / Tanggal Lahir Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.tmp_lahir_ayah }} /
                                        {{ data.user.detail.tgl_lahir_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">No HP Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.telp_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Pendidkan Terakhir Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.pendidikan_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Agama Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.agama_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Alamat Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.alamat_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Pekerjaan Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.pekerjaan_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Penghasilan Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.penghasilan_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Alamat Kantor Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.alamat_kantor_ayah }}</span>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :md="12">
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Nama Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.nama_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Tempat / Tanggal Lahir Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.tmp_lahir_ibu }} /
                                        {{ data.user.detail.tgl_lahir_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">No HP Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.telp_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Pendidkan Terakhir Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.pendidikan_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Agama Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.agama_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Alamat Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.alamat_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Pekerjaan Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.pekerjaan_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Penghasilan Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.penghasilan_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Alamat Kantor Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.user.detail.alamat_kantor_ibu }}</span>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Informasi Pembayaran" name="invoice">
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
                            <el-table :data="invoice" class="w-100" v-loading="isLoading" header-cell-class-name="bg-body text-dark">
                                <el-table-column prop="nomor" label="Nomor" width="220" header-align="center"/>
                                <el-table-column prop="user.nama" label="Pengguna"/>
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
                                        <a :href="route('admin.invoice.show', { id :scope.row.id})" class="ep-button ep-button--primary">
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
                </el-tab-pane>
            </el-tabs>
            </div>
            
        </div>
        <el-dialog v-model="showModal" :title="modalTitle" width="40%">
            <el-form :model="form" label-position="top">
                <template v-if="form.status == 'terima'">
                    <el-form-item label="Kelompok" :error="errors.kelompok_id">
                        <select-kelompok v-model="form.kelompok_id"/>
                    </el-form-item>
                </template>
                <template v-else>
                    <el-form-item label="Alasan" :error="errors.alasan">
                        <el-input type="textarea" v-model="form.alasan"/>
                    </el-form-item>
                </template>
                <div class="text-end">
                    <el-button @click="closeModal">
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
import SelectKelompok from '@/Components/SelectKelompok.vue';
import dayjs from 'dayjs';
export default {
    components : {
        SelectKelompok
    },
    props :{
        data : {
            type : Object
        },
        errors : {
            type : Object,
        }
    },
    data(){
        return {
            showModal : false,
            modalTitle : 'Terima Pendaftaran',
            loadingForm : false,
            form : {
                kelompok_id : null,
                status : null,
                alasan : null,
            },
            activeTab : 'anak',
            invoice : [],
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
    async mounted() {
        await this.fetchData();
    },
    methods :{
        openModal(status){
            this.form.status = status;
            this.showModal = true;
            this.modalTitle = (status == 'terima') ? 'Terima Pendaftaran' : 'Tolak Pendaftaran';
        },
        closeModal(){
            this.modalTitle = 'Terima Pendaftaran';
            this.form.status = null;
            this.form.kelompok_id = null;
            this.form.alasan = null;
            this.showModal = false;
        },
        updateTab(tab, event){
            console.log(tab, event)
        },
        submit() {
            this.loadingForm = true;
            let form = this.$inertia.form(this.form);
            form.post(this.route('admin.register.update', {id : this.data.id}), {
                preserveScroll: true,
                onFinish:() => {
                    this.loadingForm = false;
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
        doSearch : _.debounce(function(){
            this.isLoading = true;
            this.fetchData();
        }, 1000),
        async fetchData(page) {
            var page = (page == undefined) ? 1 : page;
            try {
                this.isLoading = true;
                const response = await axios.get(this.route("admin.invoice.data"),{
                    params: {
                        page : page,
                        limit : this.params.limit,
                        q : this.params.q,
                        anak : this.data.id
                    }
                });
                if(response.status == 200){
                    this.invoice = response.data.data;
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
        format_date(value){
            if (value) {
                return dayjs(String(value)).format('DD MMM YYYY')
            }
        },
    }
}
</script>