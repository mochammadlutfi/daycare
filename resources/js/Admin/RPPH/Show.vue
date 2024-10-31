<template>
    <base-layout title="Detail Penilaian">
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Detail RPPH</span>
                <div class="space-x-1">
                    <a :href="route('admin.rpph.pdf', {id : data.id})" class="ep-button ep-button--primary">
                        <i class="fa fa-download me-1"></i>
                        Download RPPH
                    </a>
                    <a :href="route('admin.rpph.asesmen.pdf', {rpph : data.id})" class="ep-button ep-button--primary" v-if="data.asesmen.length">
                        <i class="fa fa-download me-1"></i>
                        Download Asesmen
                    </a>
                    <a :href="route('admin.rpph.edit', {id : data.id})" class="ep-button ep-button--primary">
                        <i class="si si-note me-1"></i>
                        Ubah
                    </a>
                    <el-button type="danger" @click.prevent="hapus(data.id)">
                        <i class="si si-trash me-1"></i>
                        Hapus
                    </el-button>
                    <el-button type="primary" plain @click.prevent="addModalAsesmen()">
                        <i class="fa fa-plus me-1"></i>
                        Tambah Asesmen
                    </el-button>
                </div>
            </div>
            <div class="block rounded-2">
                <el-tabs v-model="activeTab" class="block rounded-2" stretch>
                    <el-tab-pane label="RPPH" name="RPPH">
                        <div class="block-content p-4">
                            <el-row :gutter="20" justify="space-between" class="mb-4">
                                <el-col :lg="12">
                                    <el-row class="mb-2" :gutter="10">
                                        <el-col :lg="8">Topik/Subtopik</el-col>
                                        <el-col :lg="16">
                                            <div class="fw-semibold">{{ data.topik }}/{{  data.subtopik }}</div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="mb-2" :gutter="10">
                                        <el-col :lg="8">Fase</el-col>
                                        <el-col :lg="16">
                                            <div class="fw-semibold">{{ data.fase }}</div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="mb-2" :gutter="10">
                                        <el-col :lg="8">Kelompok</el-col>
                                        <el-col :lg="16">
                                            <div class="fw-semibold">{{ data.kelompok.nama }} ({{ data.kelompok.usia }})</div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :lg="12">
                                    <el-row class="mb-2" :gutter="10">
                                        <el-col :lg="8">Tanggal</el-col>
                                        <el-col :lg="16">
                                            <div class="fw-semibold">{{ format_date(data.tgl_mulai) }} - {{ format_date(data.tgl_selesai) }}</div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="mb-2" :gutter="10">
                                        <el-col :lg="8">Durasi</el-col>
                                        <el-col :lg="16">
                                            <div class="fw-semibold">{{  getHari() }}</div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="mb-2" :gutter="10">
                                        <el-col :lg="8">Waktu</el-col>
                                        <el-col :lg="16">
                                            <div class="fw-semibold">{{ format_jam(data.jam_mulai) }} - {{ format_jam(data.jam_selesai) }}</div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            
                            <el-table :data="data.detail" border class="mb-4">
                                <el-table-column type="index" width="50" />
                                <el-table-column label="Klasifikasi" prop="klasifikasi"/>
                                <el-table-column label="Tujuan Pembelajaran" prop="tujuan"/>
                                <el-table-column label="Perilaku yang teramati/IKTP" prop="iktp"/>
                            </el-table>
                            <h3 class="h5 mb-2">Asesmen Awal</h3>
                            <el-table :data="data.asesmen_awal" border class="mb-4">
                                <el-table-column type="index" width="50" />
                                <el-table-column label="Kegiatan" prop="kegiatan"/>
                                <el-table-column label="Hasil Pengamatan" prop="keterangan"/>
                                    <el-table-column align="right" width="200">
                                        <template #header>
                                            <el-button
                                            size="small"
                                            type="primary"
                                            class="w-100"
                                            @click="addModalAwal()"
                                            >
                                            <i class="fa fa-plus me-1"></i>
                                            Tambah
                                            </el-button>
                                        </template>
                                        <template #default="scope">
                                            <el-button
                                            size="small"
                                            type="info"
                                            @click="editAwal(scope.row)"
                                            >
                                            <i class="si si-note me-1"></i>
                                            Ubah
                                            </el-button>
                                            <el-button
                                            size="small"
                                            type="danger"
                                            @click="hapusAwal(scope.row.id)"
                                            >
                                            <i class="fa fa-close me-1"></i>
                                            Hapus
                                            </el-button>
                                        </template>
                                    </el-table-column>
                            </el-table>

                            <h3 class="h5 mb-2">Rencana Kegiatan</h3>
                            <ol>
                                <li v-for="(k, i) in data.kegiatan" :key="i">
                                    {{ k }}
                                </li>
                            </ol>
                            <h3 class="h5 mb-2">Asesmen Sumatif</h3>
                            <el-table :data="data.asesmen_sumatif" border class="mb-4">
                                <el-table-column type="index" width="50" />
                                <el-table-column label="Perilaku yang teramati/IKTP" prop="line.iktp"/>
                                <el-table-column label="Muncul/Tidak Muncul">
                                    <template #default="scope">
                                        {{ scope.row.status ?? '-' }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="Hasil Pengamatan">
                                    <template #default="scope">
                                        {{ scope.row.keterangan ?? '-' }}
                                    </template>
                                </el-table-column>
                                    <el-table-column align="right" label="Aksi" width="200">
                                        <template #default="scope">
                                            <el-button
                                            size="small"
                                            type="info"
                                            @click="editSumatif(scope.row)"
                                            >
                                            <i class="si si-note me-1"></i>
                                            Ubah
                                            </el-button>
                                        </template>
                                    </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Asesmen" name="asesmen">
                        <div class="p-4 border-bottom border-2" v-for="(d,i) in data.asesmen" :key="i">
                            <div class="d-flex">
                                <h3 class="fs-lg fw-bold">{{ i+1 }}. {{ d.anak.nama }}</h3>
                                <div class="d-block ms-4">
                                    <el-button type="primary" @click.prevent="editAsesmen(d)">
                                        <i class="si si-note me-1"></i>
                                        Ubah
                                    </el-button>
                                    <el-button type="danger" @click.prevent="hapusAsesmen(d.id)">
                                        <i class="si si-trash me-1"></i>
                                        Hapus
                                    </el-button>
                                </div>
                            </div>
                            <el-table :data="d.nilai" border class="mb-4">
                                <el-table-column type="index" width="50" />
                                <el-table-column label="IKTP" prop="line.iktp"/>
                                <el-table-column label="Hasil Pengamatan" prop="keterangan"/>
                            </el-table>
                            <div class="demo-image__preview">
                                <div class="">Foto Kegiatan</div>
                                <el-row :gutter="20">
                                    <el-col :md="4" v-for="(f, i) in d.foto" :key="i" >
                                        <el-image :src="f.path" 
                                        :preview-src-list="d.foto.map(obj => obj.path)"/>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <el-dialog v-model="modalAwal" :title="titleModalAwal" width="40%" v>
            <el-form :model="formAwal" @submit.prevent="submitAwal" label-position="top" v-loading="loadingAwal">
                <el-form-item label="Kegiatan" :error="errors.kegiatan">
                    <el-input v-model="formAwal.kegiatan" type="textarea" :rows="4" />
                </el-form-item>
                <el-form-item label="Hasil Pengamatan" :error="errors.keterangan">
                    <el-input v-model="formAwal.keterangan" type="textarea" :rows="4" />
                </el-form-item>
                <div class="d-block">
                    <div class="d-flex justify-content-end">
                        <el-button @click.prevent="modalAwal = false">
                            <i class="fa fa-close me-2"></i>
                            Batal
                        </el-button>
                        <el-button type="primary" native-type="submit">
                            <i class="fa fa-check me-2"></i>
                            Simpan
                        </el-button>
                    </div>
                </div>
            </el-form>
        </el-dialog>
        <el-dialog v-model="modalSumatif" title="Ubah Asesmen Sumatif" width="40%" v>
            <el-form :model="formSumatif" @submit.prevent="submitSumatif" label-position="top" v-loading="loadingSumatif">
                <el-form-item :error="errors.kegiatan">
                    <el-radio-group v-model="formSumatif.status">
                        <el-radio value="Muncul">Muncul</el-radio>
                        <el-radio value="Tidak Muncul">Tidak Muncul</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="Hasil Pengamatan" :error="errors.keterangan">
                    <el-input v-model="formSumatif.keterangan" type="textarea" :rows="4" />
                </el-form-item>
                <div class="d-block">
                    <div class="d-flex justify-content-end">
                        <el-button @click.prevent="modalSumatif = false">
                            <i class="fa fa-close me-2"></i>
                            Batal
                        </el-button>
                        <el-button type="primary" native-type="submit">
                            <i class="fa fa-check me-2"></i>
                            Simpan
                        </el-button>
                    </div>
                </div>
            </el-form>
        </el-dialog>
        <el-dialog v-model="modalAsesmen" :title="titleModalAwal" width="40%" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="formAsesmen" @submit.prevent="submitAsesmen" label-position="top" v-loading="loadingAsesmen">
                    <el-form-item label="Anak" :error="errors.anak_id">
                        <select-anak v-model="formAsesmen.anak_id" class="w-100" hasParent :kelompok_id="data.kelompok_id" />
                    </el-form-item>
                    <el-form-item :label="d.iktp" :error="errors.keterangan" v-for="(d, i) in formAsesmen.lines" :key="i">
                        <el-input v-model="d.keterangan" type="textarea" :rows="4" placeholder="Masukan Anekdot"/>
                    </el-form-item>

                    <el-form-item label="Foto Dokumentasi" label-width="180px">
                        <el-upload action="#" v-model:file-list="formAsesmen.images" 
                        :on-remove="removeImage" list-type="picture-card" :auto-upload="false">
                            <i class="fa fa-plus"></i>
                                <template #tip>
                                <div class="el-upload__tip">
                                    file jpg/png kurang dari 1MB
                                </div>
                            </template>
                        </el-upload>
                    </el-form-item>
                <div class="d-block">
                    <div class="d-flex justify-content-end">
                        <el-button @click.prevent="modalAsesmen = false">
                            <i class="fa fa-close me-2"></i>
                            Batal
                        </el-button>
                        <el-button type="primary" native-type="submit">
                            <i class="fa fa-check me-2"></i>
                            Simpan
                        </el-button>
                    </div>
                </div>
            </el-form>
        </el-dialog>
    </base-layout>
</template>
<script>
import { useForm } from '@inertiajs/vue3';
import SelectAnak from '@/Components/SelectAnak.vue';
import dayjs from 'dayjs';
export default {
    components : {
        SelectAnak
    },
    data(){
        return {
            activeTab : 'RPPH',
            isLoading : false,
            modalAwal : false,
            loadingAwal : false,
            formAwal : {
                id : null,
                kegiatan : null,
                keterangan : null
            },
            titleModalAwal : 'Tambah Asesmen Awal',
            modalSumatif : false,
            loadingSumatif : false,
            formSumatif : {
                id : null,
                status : null,
                keterangan : null
            },
            modalAsesmen : false,
            loadingAsesmen : false,
            titleModalAsesmen : 'Tambah Asesmen Anak',
            formAsesmen : {
                id : null,
                anak_id : null,
                lines : [],
                images : [],
                imagesDeleted : [],
            },
        }
    },
    props : {
        data : Object,
        errors: Object,
    },
    methods : {
        addModalAwal(){
            this.modalAwal = true;
            this.titleModalAwal = 'Tambah Asesmen Awal';
            this.formAwal.id = null;
            this.formAwal.kegiatan = null;
            this.formAwal.keterangan = null;
        },
        editAwal(v){
            this.modalAwal = true;
            this.titleModalAwal = 'Ubah Asesmen Awal';
            this.formAwal.id = v.id;
            this.formAwal.kegiatan = v.kegiatan;
            this.formAwal.keterangan = v.keterangan;
        },
        hapusAwal(id){
            ElMessageBox.alert('Data yang dihapus tidak bisa dikembalikan!', 'Peringatan', {
                showCancelButton: true,
                confirmButtonText: 'Ya!',
                cancelButtonText: 'Tidak!',
                type: 'warning',
            })
            .then(() => {
                this.$inertia.delete(
                    this.route('admin.rpph.awal.delete', {rpph : this.data.id, id : id}) 
                    , {
                    preserveScroll: true,
                    onSuccess: () => {
                        ElMessage({
                            type: 'success',
                            message: 'Data Berhasil Dihapus!',
                        });
                    },
                });
            });
        },
        submitAwal() {
            this.loadingAwal = true;
            let form = this.$inertia.form(this.formAwal);
            let url = this.formAwal.id ? 
            this.route('admin.rpph.awal.update', {rpph : this.data.id, id : this.formAwal.id}) 
            : this.route('admin.rpph.awal.store', {rpph : this.data.id});
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loadingAwal = false;
                },
                onSuccess: () => {
                    ElMessage({
                        type: 'success',
                        message: 'Data Berhasil Disimpan!',
                    });
                    this.modalAwal = false;
                },
            });
        },
        editSumatif(v){
            this.modalSumatif = true;
            this.formSumatif.id = v.id;
            this.formSumatif.status = v.status;
            this.formSumatif.keterangan = v.keterangan;
        },
        submitSumatif() {
            this.loadingSumatif = true;
            let form = this.$inertia.form(this.formSumatif);
            let url = this.route('admin.rpph.sumatif.update', {
                rpph : this.data.id, 
                id : this.formSumatif.id
            });
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loadingSumatif = false;
                },
                onSuccess: () => {
                    ElMessage({
                        type: 'success',
                        message: 'Data Berhasil Disimpan!',
                    });
                    this.modalSumatif = false;
                },
            });
        },
        addModalAsesmen(){
            this.modalAsesmen = true;
            this.titleModalAsesmen = 'Tambah Asesmen Anak';
            this.formAsesmen.id = null;
            this.formAsesmen.anak_id = null;
            this.formAsesmen.lines = [];
            this.formAsesmen.images = [];
            this.formAsesmen.imagesDeleted = [];
            // this.f
            if(this.data.detail.length){
                this.data.detail.forEach((d, i) => {
                    this.formAsesmen.lines.push({
                        id : null,
                        asesmen_id : null,
                        rpph_line_id : d.id,
                        iktp: d.iktp,
                        keterangan : null,
                    });
                });
            }
        },
        editAsesmen(v){
            this.modalAsesmen = true;
            this.titleModalAsesmen = 'Ubah Asesmen Anak';
            this.formAsesmen.id = v.id;
            this.formAsesmen.anak_id = v.anak_id;
            this.formAsesmen.lines = [];
            this.formAsesmen.images = [];
            this.formAsesmen.imagesDeleted = [];
            if(v.nilai.length){
                v.nilai.forEach((d, i) => {
                    this.formAsesmen.lines.push({
                        id : d.id,
                        asesmen_id : d.asesmen_id,
                        rpph_line_id : d.rpph_line_id,
                        iktp: d.line.iktp,
                        keterangan : d.keterangan,
                    });
                });
            }
            if(v.foto.length){
                v.foto.forEach(f => {
                    this.formAsesmen.images.push({
                        name : f.nama,
                        url : f.path
                    })
                });
            }
        },
        hapusAsesmen(id){
            ElMessageBox.alert('Data yang dihapus tidak bisa dikembalikan!', 'Peringatan', {
                showCancelButton: true,
                confirmButtonText: 'Ya!',
                cancelButtonText: 'Tidak!',
                type: 'warning',
            })
            .then(() => {
                this.$inertia.delete(
                    this.route('admin.rpph.asesmen.delete', {rpph : this.data.id, id : id}) 
                    , {
                    preserveScroll: true,
                    onSuccess: () => {
                        ElMessage({
                            type: 'success',
                            message: 'Data Berhasil Dihapus!',
                        });
                    },
                });
            });
        },
        submitAsesmen() {
            this.loadingAsesmen = true;
            let form = this.$inertia.form(this.formAsesmen);
            let url = this.formAsesmen.id ? 
            this.route('admin.rpph.asesmen.update', {rpph : this.data.id, id : this.formAsesmen.id}) 
            : this.route('admin.rpph.asesmen.store', {rpph : this.data.id});
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loadingAsesmen = false;
                },
                onSuccess: () => {
                    ElMessage({
                        type: 'success',
                        message: 'Data Berhasil Disimpan!',
                    });
                    this.modalAsesmen = false;
                },
            });
        },
        removeImage(uploadFile, uploadFiles){
            this.formAsesmen.imagesDeleted.push(uploadFile);
        },
        percentage(number, total){
            var percent = (parseInt(number)/total)* 100
            return Math.round(percent);
        },
        format_date(value) {
            if (value) {
                dayjs().locale('id');
                return dayjs(String(value)).format('DD MMMM YYYY')
            }
        },
        format_jam(value) {
            if (value) {
                dayjs().locale('id');
                return dayjs(String(this.data.tgl_mulai +' '+ value)).format('HH:mm')
            }
        },
        getHari(){
            // Parse the dates
            const date1 = dayjs(this.data.tgl_mulai);
            const date2 = dayjs(this.data.tgl_selesai);

            // Calculate the difference in days
            return date2.diff(date1, 'day') + ' Hari ';
        },
        hapus(id){
            ElMessageBox.alert('Data yang dihapus tidak bisa dikembalikan!', 'Peringatan', {
                showCancelButton: true,
                confirmButtonText: 'Ya!',
                cancelButtonText: 'Tidak!',
                type: 'warning',
            })
            .then(() => {
                this.$inertia.delete(this.route('admin.rpph.delete', {id : id}), {
                    preserveScroll: true,
                    onSuccess: () => {
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