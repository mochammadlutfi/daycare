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
                                        format="DD-MM-YYYY" value-format="YYYY-MM-DD" class="w-100"/>
                                    <span class="fs-xs">Tanggal Bisa Diketik atau dipilih (DD-MM-YYYY)</span>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Jam" :error="errors.tgl">
                                    <el-time-picker v-model="form.jam" placeholder="Jam"
                                        format="HH:mm" value-format="HH:mm:ss" class="w-100"/>
                                    <span class="fs-xs">Jam Bisa Diketik atau dipilih (HH:MM)</span>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Kelompok" :error="errors.kelompok_id">
                                    <select-kelompok v-model="form.kelompok_id" anjem/>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Anak" :error="errors.anak_id">
                                    <select-anak v-model="form.anak_id" :disabled="(form.kelompok_id) ? false : true" anjem hasParent :kelompok_id="form.kelompok_id" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item class="mb-4" label="Foto Bukti" label-width="180px">
                            <el-upload action="#" v-model:file-list="images" :limit="1"
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
import SelectAnak from '@/Components/SelectAnak.vue';
import dayjs from 'dayjs';
export default {
    components :{
        SelectKelompok,
        SelectAnak
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
            title : "Tambah Antar Jemput",
            disableKota : false,
            form : {
                tgl: new dayjs().format(),
                jam : new dayjs().format(),
                kelompok_id : null,
                anak_id : null,
                keterangan : null,
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
            this.title = 'Ubah Antar Jemput';
            this.form.id = this.value.id;
            this.form.kelompok_id = this.value.kelompok_id;
            this.form.anak_id = this.value.anak_id;
            this.form.tgl = this.value.tgl;
            this.form.jam = this.value.jam;

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
            let url = this.editMode === true ? this.route('admin.antarjemput.update', {id : this.value.id}) : this.route('admin.antarjemput.store');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
                onSuccess: () => {

                },
            });
        },
        removeImage(uploadFile, uploadFiles){
            this.imagesDeleted.push(uploadFile);
        }
    }
}
</script>