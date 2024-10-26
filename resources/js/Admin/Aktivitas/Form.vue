<template>
    <base-layout>
        <div class="content">
            <el-form label-position="top" label-width="100%" @submit.prevent="submit">
                <div class="content-heading d-flex justify-content-between align-items-center">
                    <span>{{ title }}</span>
                </div>
                
                <div class="block rounded">
                    <div class="block-content p-4" v-loading="loading">
                        <el-row :gutter="40">
                            <el-col :md="12">
                                <el-form-item label="Tanggal" :error="errors.tgl">
                                    <el-date-picker v-model="form.tgl" type="date" placeholder="Tanggal"
                                        format="DD MMMM YYYY" value-format="YYYY-MM-DD" style="width: 100%" />
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Kelompok" :error="errors.kelompok_id">
                                    <select-kelompok v-model="form.kelompok_id"/>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Jenis Kegiatan" :error="errors.jenis_id" @change="form.kegiatan_id = null">
                                    <select-jenis-kegiatan v-model="form.jenis_id"/>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Kegiatan" :error="errors.kegiatan_id">
                                    <select-kegiatan v-model="form.kegiatan_id" :disabled="(form.jenis_id) ? false : true" hasParent :jenis="form.jenis_id" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="Keterangan">
                            <el-input v-model="form.keterangan" type="textarea" :rows="4"/>
                        </el-form-item>

                        <el-form-item class="mb-4" label="Foto Dokumentasi" label-width="180px">
                            <el-upload action="#" v-model:file-list="images" 
                            :on-remove="removeImage" list-type="picture-card" :auto-upload="false">
                                <i class="fa fa-plus"></i>
                                    <template #tip>
                                    <div class="el-upload__tip">
                                        file jpg/png kurang dari 1MB
                                    </div>
                                </template>
                            </el-upload>
                        </el-form-item>

                        <el-button native-type="submit" type="primary" :loading="loading">
                            <i class="fa fa-check me-2"></i>
                            Simpan
                        </el-button>
                    </div>
                </div>
            </el-form>
        </div>
    </base-layout>
</template>
<script>
import SelectKelompok from '@/Components/SelectKelompok.vue';
import SelectJenisKegiatan from '@/Components/SelectJenisKegiatan.vue';
import SelectKegiatan from '@/Components/SelectKegiatan.vue';
import moment from 'moment';
export default {
    components :{
        SelectKelompok,
        SelectJenisKegiatan,
        SelectKegiatan
    },
    props :{
        value : {
            type : Object,
        },
        editMode : {
            type : Boolean,
            default : false,
        },
        errors : {
            type : Object,
        }
    }, 
    data(){
        return {
            title : "Tambah Aktivitas Baru",
            disableKota : false,
            form : {
                tgl: moment().format('YYYY-MM-DD'),
                kelompok_id : null,
                jenis_id : null,
                kegiatan_id : null,
                keterangan : null
            },
            images : [],
            imagesDeleted : [],
            loading : false,
        }
    },
    created(){
        if(this.editMode){
            this.setValue();
        }
    },
    methods : {
        setValue(){
            this.form.id = this.value.id;
            this.form.kelompok_id = this.value.kelompok_id;
            this.form.jenis_id = this.value.jenis_id;
            this.form.kegiatan_id = this.value.kegiatan_id;
            this.form.keterangan = this.value.keterangan;

            if(this.value.foto.length){
                this.value.foto.forEach(v => {
                    this.images.push({
                        name : v.nama,
                        url : v.path
                    })
                });
            }
        },
        submit() {
            this.loading = true;
            let formData = Object.assign(this.form, {
                    images : this.images,
                    imagesDeleted : this.imagesDeleted
                }
            );
            let form = this.$inertia.form(formData);
            let url = this.editMode === true ? this.route('admin.aktivitas.update', {id : this.value.id}) : this.route('admin.aktivitas.store');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
                onSuccess: () => {
                    return this.$swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: `Pendukung Baru Berhasil Ditambahkan!`,
                        showCancelButton: true,
                        confirmButtonText: 'Tambah Lainnya',
                        cancelButtonText: 'Kembali',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$inertia.visit(this.route("user.pendukung.create"));
                        }
                    });
                },
            });
        },
        removeImage(uploadFile, uploadFiles){
            this.imagesDeleted.push(uploadFile);
        }
    }
}
</script>