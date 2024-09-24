<template>
    <user-layout>
        <div class="content">
            <div class="block block-rounded">
                <div class="block-content block-content-full">
                    <div class="py-3 text-center">
                        <h2 class="fw-bold mb-2">
                            Data Anak
                        </h2>
                        <h3 class="fs-base fw-medium text-muted mb-0">
                            Lengkapi Data Anak
                        </h3>
                    </div>
                </div>
            </div>
            <div class="block rounded-2">
                <el-form label-position="top" label-width="100%" @submit.prevent="submit">
                    <div class="block-content" v-if="step == 1">
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
                                <el-form-item label="Sosialisasi dengan lingkungan" :error="errors.sosialisasi_dengan_lingkungan_anak">
                                    <el-input v-model="form.sosialisasi_dengan_lingkungan_anak" type="textarea" placeholder="contoh: pemalu, pendiam, aktif, baik, tidak baik"/>
                                </el-form-item>
                                <el-form-item label="Sakit yang pernah diderita" :error="errors.sakit_yang_pernah_diderita_anak">
                                    <el-input v-model="form.sakit_yang_pernah_diderita_anak" type="textarea"/>
                                </el-form-item>
                                <el-form-item label="Makanan yang disukai" :error="errors.makanan_yang_disukai_anak">
                                    <el-input v-model="form.makanan_yang_disukai_anak" type="textarea"/>
                                </el-form-item>
                                <el-form-item label="Makanan yang tidak disukai" :error="errors.makanan_yang_tidak_disukai_anak">
                                    <el-input v-model="form.makanan_yang_tidak_disukai_anak" type="textarea"/>
                                </el-form-item>
                                <el-form-item label="Memiliki Alergi" :error="errors.memiliki_alergi_anak">
                                    <el-input v-model="form.memiliki_alergi_anak" type="textarea"/>
                                </el-form-item>
                                <el-form-item label="Scan Akta Kelahiran" :error="errors.scan_akte_anak">
                                    <single-file-upload inputClass="w-100" v-model="form.scan_akte_anak"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="border-bottom border-2 mb-4">
                            <h3 class="h5 mb-2">Layanan Tambahan</h3>
                        </div>
                        <div class="form-check form-block mb-4">
                            <input class="form-check-input" type="checkbox" v-model="form.isLaundry" id="isLaundry" name="isLaundry">
                            <label class="form-check-label" for="isLaundry">
                                <span class="d-flex align-items-center">
                                <span class="ms-2">
                                    <span class="fw-bold">Layanan Laundry</span>
                                    <span class="d-block fs-sm text-muted">Dihitung dalam satuan kilo gram</span>
                                    <span class="d-block fs-sm text-muted">{{ currency(biaya.laundry) }} x Berat Cucian</span>
                                </span>
                                </span>
                            </label>
                        </div>
                        <div class="form-check form-block">
                            <input class="form-check-input" type="checkbox" v-model="form.isAntarJemput" id="isAntarJemput" name="isAntarJemput">
                            <label class="form-check-label" for="isAntarJemput">
                                <span class="d-flex align-items-center">
                                <span class="ms-2">
                                    <span class="fw-bold">Layanan Antar Jemput</span>
                                    <span class="d-block fs-sm text-muted">Dihitung dalam satuan kilometer dari jarak alamat Daycare ke lokasi Penjemputan Anak</span>
                                    <span class="d-block fs-sm text-muted">{{ currency(biaya.antar_jemput) }} x {{ form.jarak  ?? 0}} km (Jarak Lokasi) x 20 hari</span>
                                </span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div class="block-content" v-else>
                        <div class="table-responsive push">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th class="text-center" style="width: 60px;"></th>
                                        <th>Nama</th>
                                        <th class="text-end" style="width: 120px;">Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center">1</td>
                                        <td>
                                            <p class="fw-semibold mb-1">Pembangunan</p>
                                            <div class="text-muted">Dibayar 1x ketika pendaftaran</div>
                                        </td>
                                        <td class="text-end">{{ currency(biaya.pembangunan)}} </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">2</td>
                                        <td>
                                            <p class="fw-semibold mb-1">Pendaftaran</p>
                                            <div class="text-muted">Dibayar 1x ketika pendaftaran</div>
                                        </td>
                                        <td class="text-end">{{ currency(biaya.pendaftaran) }}</td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">3</td>
                                        <td>
                                            <p class="fw-semibold mb-1">SPP</p>
                                            <div class="text-muted">Perbulan</div>
                                        </td>
                                        <td class="text-end">{{ currency(biaya.spp) }}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="2">
                                            <p class="fw-semibold mb-1">Total</p>
                                        </td>
                                        <td class="text-end">{{ currency(biaya.pembangunan + biaya.pendaftaran + biaya.spp) }}</td>
                                    </tr>    
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div class="block-content p-4">
                        <div class="d-flex justify-content-end">
                            <el-button native-type="button" type="primary" @click.prevent="step = 2" v-if="step == 1">
                                <i class="fa fa-chevron-right me-2"></i>
                                Selanjutnya
                            </el-button>
                            <template v-else>
                                <el-button native-type="button" type="primary" @click.prevent="step = 1">
                                    <i class="fa fa-chevron-left me-2"></i>
                                    Kembali
                                </el-button>
                                <el-button native-type="submit" type="primary" :loading="loading">
                                    <i class="fa fa-check me-2"></i>
                                    Bayar
                                </el-button>
                            </template>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </user-layout>
</template>

<script>
import SingleFileUpload from '@/Components/SingleFileUpload.vue';
export default {
    components : {
        SingleFileUpload
    },
    props :{
        biaya : {
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
            step : 1,
            form : {
                nama : null,
                jk : 'Laki-Laki',
                tmp_lahir : null,
                tgl_lahir : null,
                alamat : null,
                anak_ke : null,
                jarak : null,
                sosialisasi_dengan_lingkungan_anak : null,
                sakit_yang_pernah_diderita_anak : null,
                makanan_yang_disukai_anak : null,
                makanan_yang_tidak_disukai_anak : null,
                memiliki_alergi_anak : null,
                scan_akte_anak : null,
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
            this.form.nama_ayah = this.value.nama_ayah;
            this.form.tmp_lahir_ayah = this.value.tmp_lahir_ayah;
            this.form.tgl_lahir_ayah = this.value.tgl_lahir_ayah;
            this.form.telp_ayah = this.value.telp_ayah;
            this.form.alamat_ayah = this.value.alamat_ayah;
            this.form.pekerjaan_ayah = this.value.pekerjaan_ayah;
            this.form.penghasilan_ayah = this.value.penghasilan_ayah;
            this.form.alamat_kantor_ayah = this.value.alamat_kantor_ayah;
            this.form.agama_ayah = this.value.agama_ayah;
            this.form.pendidikan_ayah = this.value.pendidikan_ayah;

            this.form.nama_ibu = this.value.nama_ibu;
            this.form.tmp_lahir_ibu = this.value.tmp_lahir_ibu;
            this.form.tgl_lahir_ibu = this.value.tgl_lahir_ibu;
            this.form.telp_ibu = this.value.telp_ibu;
            this.form.alamat_ibu = this.value.alamat_ibu;
            this.form.pekerjaan_ibu = this.value.pekerjaan_ibu;
            this.form.penghasilan_ibu = this.value.penghasilan_ibu;
            this.form.alamat_kantor_ibu = this.value.alamat_kantor_ibu;
            this.form.agama_ibu = this.value.agama_ibu;
            this.form.pendidikan_ibu = this.value.pendidikan_ibu;
            // if(level)
        },  
        submit() {
            this.loading = true;
            let form = this.$inertia.form(this.form);
            let url = this.route('user.anak.store');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
                onSuccess: () => {
                    
                },
                onError : (val) => {
                    // alert(val);
                    this.step = 1;
                }
            });
        }
    }
}
</script>