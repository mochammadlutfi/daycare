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
                            <el-col :md="8">
                                <el-form-item label="Tanggal" :error="errors.tgl">
                                    <el-date-picker v-model="form.tgl" type="date" placeholder="Tanggal"
                                        format="DD-MM-YYYY" value-format="YYYY-MM-DD" class="w-100"/>
                                    <span class="fs-xs">Tanggal Bisa Diketik atau dipilih (DD-MM-YYYY)</span>
                                </el-form-item>
                            </el-col>
                            <el-col :md="8">
                                <el-form-item label="Kelompok" :error="errors.kelompok_id">
                                    <select-kelompok v-model="form.kelompok_id"/>
                                </el-form-item>
                            </el-col>
                            <el-col :md="8">
                                <el-form-item label="Anak" :error="errors.anak_id">
                                    <select-anak v-model="form.anak_id" :disabled="(form.kelompok_id) ? false : true" hasParent :kelompok_id="form.kelompok_id" />
                                </el-form-item>
                            </el-col>
                            <el-col :md="8">
                                <el-form-item label="Tinggi Badan" :error="errors.tinggi">
                                    <el-input v-model="form.tinggi">
                                        <template #append>
                                            <span>CM</span>
                                        </template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :md="8">
                                <el-form-item label="Berat Badan" :error="errors.berat">
                                    <el-input v-model="form.berat">
                                        <template #append>
                                            <span>Kg</span>
                                        </template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="Perkembangan Nilai Agama dan Moral" :error="errors.perkembangan_nilai_agama_dan_moral">
                            <el-input type="textarea" rows="4" v-model="form.perkembangan_nilai_agama_dan_moral" placeholder="Masukan Penilaian Perkembangan Nilai Agama dan Moral"/>
                        </el-form-item>

                        <el-form-item label="Perkembangan Sosial dan Emosional" :error="errors.perkembangan_sosial_emosional">
                            <el-input type="textarea" rows="4" v-model="form.perkembangan_sosial_emosional" placeholder="Masukan Penilaian Perkembangan Sosial dan Emosional"/>
                        </el-form-item>

                        <el-form-item label="Perkembangan Fisik dan Motorik" :error="errors.perkembangan_fisik_motorik">
                            <el-input type="textarea" rows="4" v-model="form.perkembangan_fisik_motorik" placeholder="Masukan Fisik dan Motorik"/>
                        </el-form-item>

                        <el-form-item label="Perkembangan Kognitif" :error="errors.perkembangan_kognitif">
                            <el-input type="textarea" rows="4" v-model="form.perkembangan_kognitif" placeholder="Masukan Penilaian Perkembangan Kognitif"/>
                        </el-form-item>

                        <el-form-item label="Perkembangan Bahasa" :error="errors.perkembangan_bahasa">
                            <el-input type="textarea" rows="4" v-model="form.perkembangan_bahasa" placeholder="Masukan Perkembangan Bahasa"/>
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
            title : "Tambah Raport Baru",
            disableKota : false,
            form : {
                tgl: new dayjs().format(),
                kelompok_id : null,
                anak_id : null,
                tinggi : null,
                berat : null,
                perkembangan_nilai_agama_dan_moral : null,
                perkembangan_sosial_emosional : null,
                perkembangan_fisik_motorik : null,
                perkembangan_kognitif : null,
                perkembangan_bahasa : null,
            },
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
            this.title = 'Ubah Raport';
            this.form.kelompok_id = this.value.kelompok_id;
            this.form.anak_id = this.value.anak_id;
            this.form.tinggi = this.value.tinggi;
            this.form.berat = this.value.berat;
            this.form.perkembangan_nilai_agama_dan_moral = this.value.perkembangan_nilai_agama_dan_moral;
            this.form.perkembangan_sosial_emosional = this.value.perkembangan_sosial_emosional;
            this.form.perkembangan_fisik_motorik = this.value.perkembangan_fisik_motorik;
            this.form.perkembangan_kognitif = this.value.perkembangan_kognitif;
            this.form.perkembangan_bahasa = this.value.perkembangan_bahasa;
        },
        submit() {
            this.loading = true;
            let formData = Object.assign(this.form, {
                    lines : this.lines
                }
            );
            let form = this.$inertia.form(formData);
            let url = this.editMode === true ? this.route('admin.raport.update', {id : this.value.id}) : this.route('admin.raport.store');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
                onSuccess: () => {

                },
            });
        }
    }
}
</script>