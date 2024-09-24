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
                                <el-form-item label="Nama Paket" :error="errors.nama">
                                    <el-input v-model="form.nama"/>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Usia" :error="errors.usia">
                                    <el-select v-model="form.usia" placeholder="Pilih" class="w-100">
                                        <el-option label="3 Bulan - 2,5 Tahun" value="3 Bulan - 2,5 Tahun"/>
                                        <el-option label="2,5 Tahun - 6 Tahun" value="3 Tahun- 6 Tahun"/>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Biaya Pembangunan" :error="errors.tgl">
                                <el-input
                                    v-model="form.pembangunan"
                                    :formatter="(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                    :parser="(value) => value.replace(/^Rp\s+|(\,)/gi, '')"
                                />
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Biaya Pendaftaran" :error="errors.tgl">
                                <el-input
                                    v-model="form.pendaftaran"
                                    :formatter="(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                    :parser="(value) => value.replace(/^Rp\s+|(\,)/gi, '')"
                                />
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Biaya SPP Bulanan" :error="errors.tgl">
                                <el-input
                                    v-model="form.spp"
                                    :formatter="(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                    :parser="(value) => value.replace(/^Rp\s+|(\,)/gi, '')"
                                />
                                </el-form-item>
                            </el-col>
                        </el-row>
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
            title : "Tambah Paket Baru",
            disableKota : false,
            form : {
                nama: null,
                usia : null,
                pembangunan : null,
                pendaftaran : null,
                spp : null,
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
            this.title = 'Ubah Paket';
            this.form.nama = this.value.nama;
            this.form.usia = this.value.usia;
            this.form.pembangunan = this.value.pembangunan;
            this.form.pendaftaran = this.value.pendaftaran;
            this.form.spp = this.value.spp;
        },
        submit() {
            this.loading = true;
            let form = this.$inertia.form(this.form);
            let url = this.editMode === true ? this.route('admin.paket.update', {id : this.value.id}) : this.route('admin.paket.store');
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