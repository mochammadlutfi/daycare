<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <div class="d-block">
                    <span>Ubah Data Anak</span>
                </div>
            </div>
            <div class="block rounded-2">
                <el-form label-position="top" label-width="100%" @submit.prevent="submit" v-loading="loading">
                    <div class="block-content p-4">
                        <el-row :gutter="20">
                            <el-col :lg="12">
                                <el-form-item label="Nama Lengkap" :error="errors.nama">
                                    <el-input v-model="form.nama" />
                                </el-form-item>
                                <el-form-item label="Nama Panggilan" :error="errors.username">
                                    <el-input v-model="form.username" />
                                </el-form-item>
                                <el-form-item label="Jenis Kelamin" :error="errors.jk">
                                    <el-radio-group v-model="form.jk">
                                        <el-radio label="Laki-Laki" value="Laki-Laki" />
                                        <el-radio label="Perempuan" value="Perempuan"/>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="Anak Ke" :error="errors.anak_ke">
                                    <el-input v-model="form.anak_ke"/>
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="12">
                                        <el-form-item label="Tempat Lahir" :error="errors.tmp_lahir">
                                            <el-input v-model="form.tmp_lahir" placeholder="Tempat Lahir" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="12">
                                        <el-form-item label="Tanggal Lahir" :error="errors.tgl_lahir">
                                            <el-date-picker v-model="form.tgl_lahir" type="date" placeholder="Tanggal Lahir"
                                                format="DD-MM-YYYY" value-format="YYYY-MM-DD" style="width: 100%" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="Jarak Rumah Ke Daycare" :error="errors.jarak">
                                    <el-input v-model="form.jarak" type="number">
                                        <template #append>
                                            <span class="text-dark">Km</span>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="Alamat" :error="errors.alamat">
                                    <el-input v-model="form.alamat" type="textarea" />
                                </el-form-item>
                            </el-col>
                            <el-col :lg="12">
                                <el-form-item label="Sosialisasi dengan lingkungan" :error="errors.sosialisasi_dengan_lingkungan">
                                    <el-input v-model="form.sosialisasi_dengan_lingkungan" type="textarea" placeholder="contoh: pemalu, pendiam, aktif, baik, tidak baik"/>
                                </el-form-item>
                                <el-form-item label="Sakit yang pernah diderita" :error="errors.sakit_yang_pernah_diderita">
                                    <el-input v-model="form.sakit_yang_pernah_diderita" type="textarea"/>
                                </el-form-item>
                                <el-form-item label="Makanan yang disukai" :error="errors.makanan_yang_disukai">
                                    <el-input v-model="form.makanan_yang_disukai" type="textarea"/>
                                </el-form-item>
                                <el-form-item label="Makanan yang tidak disukai" :error="errors.makanan_yang_tidak_disukai">
                                    <el-input v-model="form.makanan_yang_tidak_disukai" type="textarea"/>
                                </el-form-item>
                                <el-form-item label="Memiliki Alergi" :error="errors.alergi">
                                    <el-input v-model="form.alergi" type="textarea"/>
                                </el-form-item>
                                <el-form-item label="Scan Akta Kelahiran" :error="errors.scan_akte">
                                    <single-file-upload inputClass="w-100" v-model="form.scan_akte"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="d-flex justify-content-end">
                            <el-button native-type="submit" type="primary">
                                <i class="fa fa-check me-2"></i>
                                Simpan
                            </el-button>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </base-layout>
</template>

<script>
import SingleFileUpload from '@/Components/SingleFileUpload.vue';
export default {
    components : {
        SingleFileUpload
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
            form : {
                nama : null,
                jk : 'Laki-Laki',
                tmp_lahir : null,
                tgl_lahir : null,
                alamat : null,
                anak_ke : null,
                jarak : null,
                sosialisasi_dengan_lingkungan : null,
                sakit_yang_pernah_diderita : null,
                makanan_yang_disukai : null,
                makanan_yang_tidak_disukai : null,
                memiliki_alergi : null,
                scan_akte : null,
                isAntarJemput : false,
                isLaundry: false,
            },
            loading : false,
        }
    },
    created(){
        if(this.editMode){
            this.setValue();
        }
    },
    watch: {
        errors(val){
            console.log(val);
        }
    },
    methods : {
        setValue(){
            this.form.nama = this.value.nama;
            this.form.username = this.value.username;
            this.form.jk = this.value.jk;
            this.form.tmp_lahir = this.value.tmp_lahir;
            this.form.tgl_lahir = this.value.tgl_lahir;
            this.form.alamat = this.value.alamat;
            this.form.anak_ke = this.value.anak_ke;
            this.form.sosialisasi_dengan_lingkungan = this.value.sosialisasi_dengan_lingkungan;
            this.form.sakit_yang_pernah_diderita = this.value.sakit_yang_pernah_diderita;
            this.form.makanan_yang_disukai = this.value.makanan_yang_disukai;
            this.form.memiliki_alergi = this.value.memiliki_alergi;

            this.form.scan_akte = this.value.scan_akte;
            this.form.isAntarJemput = this.value.isAntarJemput;
            this.form.isLaundry = this.value.isLaundry;
        },  
        submit() {
            this.loading = true;
            let form = this.$inertia.form(this.form);
            let url = this.route('admin.anak.update', {
                id : this.value.id
            });
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
                onSuccess: () => {
                    
                }
            });
        }
    }
}
</script>