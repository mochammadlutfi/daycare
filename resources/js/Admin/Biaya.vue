<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Biaya</span>
                <div class="space-x-1">
                </div>
            </div>
            <div class="block rounded-2" v-loading="loading">
                <el-form  @submit.prevent="onSubmit" label-position="top">
                <div class="block-content p-4">
                    <el-row :gutter="30">
                        <el-col :md="12">
                            <el-form-item label="Pembangunan" :error="errors.pembangunan">
                                <el-input
                                    v-model="form.pembangunan"
                                    placeholder="Masukan Biaya Pembangunan"
                                    :formatter="(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                    :parser="(value) => value.replace(/^Rp\s+|(\,)/gi, '')"
                                />
                            </el-form-item>
                            <el-form-item label="SPP Bulanan" :error="errors.spp">
                                <el-input
                                    v-model="form.spp"
                                    placeholder="Masukan Biaya SPP Bulanan"
                                    :formatter="(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                    :parser="(value) => value.replace(/^Rp\s+|(\,)/gi, '')"
                                />
                            </el-form-item>
                            <el-form-item label="Layanan Antar Jemput / Km" :error="errors.antar_jemput">
                                <el-input
                                    v-model="form.antar_jemput"
                                    placeholder="Masukan Biaya Layanan Antar Jemput"
                                    :formatter="(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                    :parser="(value) => value.replace(/^Rp\s+|(\,)/gi, '')"
                                />
                            </el-form-item>
                        </el-col>    
                        <el-col :md="12">
                            <el-form-item label="Pendaftaran" :error="errors.pendaftaran">
                                <el-input
                                    v-model="form.pendaftaran"
                                    placeholder="Masukan Biaya Pendaftaran"
                                    :formatter="(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                    :parser="(value) => value.replace(/^Rp\s+|(\,)/gi, '')"
                                />
                            </el-form-item>
                            <el-form-item label="Denda Keterlambatan" :error="errors.denda">
                                <el-input
                                    v-model="form.denda"
                                    placeholder="Masukan Biaya Denda Keterlambatan"
                                    :formatter="(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                    :parser="(value) => value.replace(/^Rp\s+|(\,)/gi, '')"
                                />
                            </el-form-item>
                            <el-form-item label="Layanan Laundry / Kg" :error="errors.laundry">
                                <el-input
                                    v-model="form.laundry"
                                    placeholder="Masukan Biaya Layanan Laundry"
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
                </el-form>
            </div>
        </div>
    </base-layout>
</template>

<script>
export default {
    props :{
        value : {
            type : Object,
        },
        errors : {
            type : Object,
        }
    },
    data(){
        return {
            step : 1,
            form : {
                pembangunan : null,
                pendaftaran : null,
                spp : null,
                denda : null,
                laundry : null,
                antar_jemput : null,
            },
            loading : false,
        }
    },
    created(){
        this.setValue();
    },
    methods : {
        setValue(){
            this.form.pembangunan = this.value.pembangunan;
            this.form.pendaftaran = this.value.pendaftaran;
            this.form.spp = this.value.spp;
            this.form.denda = this.value.denda;
            this.form.laundry = this.value.laundry;
            this.form.antar_jemput = this.value.antar_jemput;
        },  
        onSubmit() {
            this.loading = true;
            let form = this.$inertia.form(this.form);
            let url = this.route('admin.biaya.store');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
                onSuccess: () => {
                ElMessage({
                    type: 'success',
                    message: 'Data Berhasil Disimpan!',
                });
                },
            });
        }
    }
}
</script>