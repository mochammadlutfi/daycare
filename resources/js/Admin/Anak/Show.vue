<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <div class="d-block">
                    <span class="me-md-3">Detail Anak</span>
                    <span class="badge bg-success" v-if="data.status == 'Aktif'">
                        Aktif
                    </span>
                    <span class="badge bg-warning" v-if="data.status == 'Tidak Aktif'">
                        Tidak Aktif
                    </span>
                </div>
                <div class="space-x-1">
                    <template v-if="data.status == 'Pending'">
                        <el-button @click="openModal('terima')" type="primary">
                            <i class="fa fa-check me-2"></i>
                            Non Aktifkan
                        </el-button>
                        <el-button @click="openModal('tolak')" type="danger">
                            <i class="fa fa-close me-2"></i>
                            Tolak
                        </el-button>
                    </template>
                    <a class="ep-button ep-button--primary" :href="route('admin.anak.edit', {id : data.id})">
                        <i class="si si-note me-1"></i>
                        Ubah
                    </a>
                    <a class="ep-button ep-button--primary" target="_blank" :href="route('admin.anak.spp', {id : data.id})">
                        Kartu SPP
                    </a>
                </div>
            </div>
            <div class="">
            <el-tabs v-model="activeTab" class="block rounded-2" stretch>
                <el-tab-pane label="Informasi Anak" name="anak">
                    <div class="block-content pt-2 pb-4 px-4 fs-sm">
                        <el-row :gutter="20">
                            <el-col :md="6">
                                <upload-image v-model="data.image" width="100%" :height="230" class="mb-4" @onChange="uploadImage"/>
                                <el-button type="primary" class="w-100" @click.prevent="openKartu">
                                    Kartu Siswa
                                </el-button>
                            </el-col>
                            <el-col :md="18">
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="8">Nama Lengkap</el-col>
                                    <el-col :md="14">
                                        : <span class="fw-semibold">{{ data.nama }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="8">Nama Panggilan</el-col>
                                    <el-col :md="14">
                                        : <span class="fw-semibold">{{ data.username }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="8">Jenis Kelamin</el-col>
                                    <el-col :md="14">
                                        : <span class="fw-semibold">{{ (data.jk == 'L' ? 'Laki-Laki' : 'Perempuan') }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="8">Tempat / Tanggal Lahir</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.tmp_lahir }} / {{ data.tgl_lahir }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="8">Anak Ke</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.anak_ke }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="8">Jarak Rumah</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.jarak }} Km</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="8">Alamat</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.alamat }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="8">Sosialisasi dengan lingkungan</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.sosialisasi_dengan_lingkungan ?? '-' }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="8">Sakit yang pernah diderita</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.sakit_yang_pernah_diderita ?? '-' }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="8">Makanan yang disukai</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.makanan_yang_disukai  ?? '-'}}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="8">Makanan yang tidak disukai</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.makanan_yang_tidak_disukai ?? '-' }}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="8">Memiliki Alergi</el-col>
                                    <el-col :md="14">
                                        :  <span class="fw-semibold">{{ data.alergi  ?? '-'}}</span>
                                    </el-col>
                                </el-row>
                                <el-row class="mb-2" :gutter="10">
                                    <el-col :md="8">Scan Akta Kelahiran</el-col>
                                    <el-col :md="14">
                                        :  
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Informasi Orang Tua/Wali" name="ortu">
                    <div class="block-content fs-sm">
                        <detail-ortu v-model="data.user.detail"/>
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
            
            <el-dialog v-model="modalKartu" title="Kartu Siswa" width="400px">
                <img :src="kartu" class="img-fluid"/>
            </el-dialog>
        </div>
    </base-layout>
</template>

<script>
import UploadImage from '@/Components/UploadImage.vue';
import { Link } from '@inertiajs/vue3';
import { data } from 'autoprefixer';
import dayjs from 'dayjs';
import DetailOrtu from '@/Components/DetailOrtu.vue';
export default {
    components : {
        UploadImage,
        DetailOrtu,
        Link
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
            isLoading : false,
            showModal : false,
            modalTitle : 'Terima Pendaftaran',
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
            },
            // formImage : useForm({
            //     image : this.data.image,
            // }),
            modalKartu : false,
            kartu : null,
        }
    },
    async mounted() {
        await this.fetchData();
    },
    methods :{
        async openKartu(){
            const response = await axios.get(this.route("admin.anak.kartu", { id : this.data.id}), {
                responseType: 'blob'
            });
            if(response.status == 200){
                this.kartu =  URL.createObjectURL(response.data);
            }
            this.modalKartu = true;
        },
        closeModal(){
            this.modalTitle = 'Terima Pendaftaran';
            this.form.status = null;
            this.form.kelompok_id = null;
            this.form.alasan = null;
            this.showModal = false;
        },
        uploadImage(val)
        {
            let type = '';
            if(val){
                type = 'upload'
            }else{
                type = 'delete';
            }
            const form = this.$inertia.form({
                image : val,
                type : type,
            });
            form.post(this.route('admin.anak.foto', {id : this.data.id}), {
                preserveScroll: true,
                onFinish:() => {

                },
                onSuccess: () => {
                    ElMessage({
                        type: 'success',
                        message: 'Data Berhasil Disimpan!',
                    });
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