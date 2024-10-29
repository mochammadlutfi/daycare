<template>
    <user-layout title="Pendaftaran">
        <div class="content">
            <div class="block block-rounded">
                <div class="block-content block-content-full">
                    <div class="py-3 text-center">
                        <h2 class="fw-bold mb-2">
                            Detail Pendaftaran
                        </h2>
                        <h3 class="fs-base fw-medium text-muted mb-0">
                            Lengkapi Formulir Pendaftaran
                        </h3>
                    </div>
                </div>
            </div>
            <div class="block rounded-2">
                <div class="block-content px-4">
                    <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <i class="fa fa-fw fa-exclamation-triangle me-2"></i>
                    <p class="mb-0">
                        {{ value.alasan }}
                    </p>
                  </div>
                </div>
                <div class="block-content">
                    <el-steps class="w-100" :active="step" finish-status="success" align-center>
                        <el-step title="Data Orang Tua" />
                        <el-step title="Data Anak" />
                    </el-steps>
                </div>
                
                <el-form label-position="top" :model="form" ref="form" :rules="rules">
                    <div class="block-content" v-if="step == 1">
                        <div class="border-bottom border-2 mb-4">
                            <h3 class="h5 mb-2">1. Informasi Orang Tua / Wali</h3>
                        </div>
                        <el-row :gutter="20">
                            <el-col :lg="12">
                                <el-form-item label="Nama Ayah" :error="errors.nama_ayah" prop="nama_ayah">
                                    <el-input v-model="form.nama_ayah" />
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="10">
                                        <el-form-item label="Tempat Lahir Ayah" :error="errors.tmp_lahir_ayah" prop="tmp_lahir_ayah">
                                            <el-input v-model="form.tmp_lahir_ayah" placeholder="Tempat Lahir" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="14">
                                        <el-form-item label="Tanggal Lahir Ayah" :error="errors.tgl_lahir_ayah" prop="tgl_lahir_ayah">
                                            <el-date-picker v-model="form.tgl_lahir_ayah" type="date" placeholder="Tanggal Lahir Ayah"
                                                format="DD-MM-YYYY" value-format="YYYY-MM-DD" class="w-100"/>
                                            <span class="fs-xs">Tanggal Bisa Diketik atau dipilih (DD-MM-YYYY)</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="No Handphone Ayah" :error="errors.telp_ayah" prop="telp_ayah">
                                    <el-input v-model="form.telp_ayah" placeholder="No Handphone (contoh : 082212)" />
                                </el-form-item>
                                <el-form-item label="Alamat Domisili Ayah" :error="errors.alamat_ayah" prop="alamat_ayah">
                                    <el-input v-model="form.alamat_ayah" type="textarea" />
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="12">
                                        <el-form-item label="Pekerjaan Ayah" :error="errors.pekerjaan_ayah" prop="pekerjaan_ayah">
                                            <el-input v-model="form.pekerjaan_ayah" placeholder="Pekerjaan" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="12">
                                        <el-form-item label="Penghasilan Ayah" :error="errors.penghasilan_ayah" prop="penghasilan_ayah">
                                            <el-select v-model="form.penghasilan_ayah" placeholder="Pilih" class="w-100">
                                                <el-option label="Tidak Berpenghasilan" value="Tidak Berpenghasilan"/>
                                                <el-option label="> Rp 2.000.000" value="> Rp 2.000.000"/>
                                                <el-option label="Rp 2.000.000 - Rp 3.000.000" value="Rp 2.000.000 - Rp 3.000.000"/>
                                                <el-option label="Rp 3.000.000 - Rp 4.000.000" value="Rp 3.000.000 - Rp 4.000.000"/>
                                                <el-option label="Rp 4.000.000 - Rp 5.000.000" value="Rp 4.000.000 - Rp 5.000.000"/>
                                                <el-option label="Rp 5.000.000 - Rp 6.000.000" value="Rp 5.000.000 - Rp 6.000.000"/>
                                                <el-option label="Rp 6.000.000 - Rp 7.000.000" value="Rp 6.000.000 - Rp 7.000.000"/>
                                                <el-option label="< Rp 7.000.000" value="< Rp 7.000.000"/>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="Alamat Pekerjaan Ayah" :error="errors.alamat_kantor_ayah" prop="alamat_kantor_ayah">
                                    <el-input v-model="form.alamat_kantor_ayah" type="textarea" />
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="12">
                                        <el-form-item label="Agama Ayah" :error="errors.agama_ayah" prop="agama_ayah">
                                            <el-select v-model="form.agama_ayah" placeholder="Pilih" class="w-100">
                                                <el-option label="Islam" value="Islam"/>
                                                <el-option label="Katolik" value="Katolik"/>
                                                <el-option label="Protestan" value="Protestan"/>
                                                <el-option label="Hindu" value="Hindu"/>
                                                <el-option label="Budha" value="Budha"/>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="12">
                                        <el-form-item label="Pendidikan Terakhir Ayah" :error="errors.pendidikan_ayah" prop="pendidikan_ayah">
                                            <el-select v-model="form.pendidikan_ayah" placeholder="Pilih" class="w-100">
                                                <el-option label="SMP Sederajat" value="SMP Sederajat"/>
                                                <el-option label="SMA/SMK" value="SMA/SMK"/>
                                                <el-option label="D3" value="D3"/>
                                                <el-option label="S1" value="S1"/>
                                                <el-option label="S2" value="S2"/>
                                                <el-option label="S3" value="S3"/>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :lg="12">
                                <el-form-item label="Nama Ibu" :error="errors.nama_ibu" prop="nama_ibu">
                                    <el-input v-model="form.nama_ibu" />
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="10">
                                        <el-form-item label="Tempat Lahir Ibu" :error="errors.tmp_lahir_ibu" prop="tmp_lahir_ibu">
                                            <el-input v-model="form.tmp_lahir_ibu" placeholder="Tempat Lahir" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="14">
                                        <el-form-item label="Tanggal Lahir Ibu" :error="errors.tgl_lahir_ibu" prop="tgl_lahir_ibu">
                                            <el-date-picker v-model="form.tgl_lahir_ibu" type="date" placeholder="Tanggal Lahir Ibu"
                                                format="DD-MM-YYYY" value-format="YYYY-MM-DD" class="w-100"/>
                                            <span class="fs-xs">Tanggal Bisa Diketik atau dipilih (DD-MM-YYYY)</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="No Handphone Ibu" :error="errors.telp_ibu" prop="telp_ibu">
                                    <el-input v-model="form.telp_ibu" placeholder="No Handphone (contoh : 082212)" />
                                </el-form-item>
                                <el-form-item label="Alamat Domisili Ibu" :error="errors.alamat_ibu" prop="alamat_ibu">
                                    <el-input v-model="form.alamat_ibu" type="textarea" />
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="12">
                                        <el-form-item label="Pekerjaan Ibu" :error="errors.pekerjaan_ibu" prop="pekerjaan_ibu">
                                            <el-input v-model="form.pekerjaan_ibu" placeholder="Pekerjaan" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="12">
                                        <el-form-item label="Penghasilan Ibu" :error="errors.penghasilan_ibu" prop="penghasilan_ibu">
                                            <el-select v-model="form.penghasilan_ibu" placeholder="Pilih" class="w-100">
                                                <el-option label="Tidak Berpenghasilan" value="Tidak Berpenghasilan"/>
                                                <el-option label="> Rp 2.000.000" value="> Rp 2.000.000"/>
                                                <el-option label="Rp 2.000.000 - Rp 3.000.000" value="Rp 2.000.000 - Rp 3.000.000"/>
                                                <el-option label="Rp 3.000.000 - Rp 4.000.000" value="Rp 3.000.000 - Rp 4.000.000"/>
                                                <el-option label="Rp 4.000.000 - Rp 5.000.000" value="Rp 4.000.000 - Rp 5.000.000"/>
                                                <el-option label="Rp 5.000.000 - Rp 6.000.000" value="Rp 5.000.000 - Rp 6.000.000"/>
                                                <el-option label="Rp 6.000.000 - Rp 7.000.000" value="Rp 6.000.000 - Rp 7.000.000"/>
                                                <el-option label="< Rp 7.000.000" value="< Rp 7.000.000"/>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="Alamat Pekerjaan Ibu" :error="errors.alamat_kantor_ibu">
                                    <el-input v-model="form.alamat_kantor_ibu" type="textarea" />
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="12">
                                        <el-form-item label="Agama Ibu" :error="errors.agama_ibu" prop="agama_ibu">
                                            <el-select v-model="form.agama_ibu" placeholder="Pilih" class="w-100">
                                                <el-option label="Islam" value="Islam"/>
                                                <el-option label="Katolik" value="Katolik"/>
                                                <el-option label="Protestan" value="Protestan"/>
                                                <el-option label="Hindu" value="Hindu"/>
                                                <el-option label="Budha" value="Budha"/>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="12">
                                        <el-form-item label="Pendidikan Terakhir Ibu" :error="errors.pendidikan_ibu" prop="pendidikan_ibu">
                                            <el-select v-model="form.pendidikan_ibu" placeholder="Pilih" class="w-100">
                                                <el-option label="SMP Sederajat" value="SMP Sederajat"/>
                                                <el-option label="SMA/SMK" value="SMA/SMK"/>
                                                <el-option label="D3" value="D3"/>
                                                <el-option label="S1" value="S1"/>
                                                <el-option label="S2" value="S2"/>
                                                <el-option label="S3" value="S3"/>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <div class="border-bottom border-2 mb-4">
                            <h3 class="h5 mb-2">2. Dokumen Kelengkapan Orang Tua / Wali</h3>
                        </div>
                        <el-row :gutter="10">
                            <el-col :md="8">
                                <el-form-item label="Scan KTP Ayah" :error="errors.ktp_ayah" prop="ktp_ayah">
                                    <single-file-upload inputClass="w-100" id="ktp_ayah" v-model="form.ktp_ayah"/>
                                </el-form-item>
                            </el-col>
                            <el-col :md="8">
                        <el-form-item label="Scan KTP Ibu" :error="errors.ktp_ibu" prop="ktp_ibu">
                            <single-file-upload inputClass="w-100" id="ktp_ibu" v-model="form.ktp_ibu"/>
                        </el-form-item>
                            </el-col>
                            <el-col :md="8">
                        <el-form-item label="Scan Kartu Keluarga" :error="errors.kk" prop="kk">
                            <single-file-upload inputClass="w-100" id="kk" v-model="form.kk"/>
                        </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="block-content" v-else-if="step == 2">
                        <el-row :gutter="20">
                            <el-col :lg="12">
                                <el-form-item label="Nama Lengkap" :error="errors.nama_anak" prop="nama_anak">
                                    <el-input v-model="form.nama_anak" />
                                </el-form-item>
                                <el-form-item label="Nama Panggilan" :error="errors.username" prop="username">
                                    <el-input v-model="form.username" />
                                </el-form-item>
                                <el-form-item label="Jenis Kelamin" :error="errors.jk_anak" prop="jk_anak">
                                    <el-radio-group v-model="form.jk_anak">
                                        <el-radio label="Laki-Laki" value="Laki-Laki" />
                                        <el-radio label="Perempuan" value="Perempuan"/>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="Anak Ke" :error="errors.anak_ke" prop="anak_ke">
                                    <el-input v-model="form.anak_ke"/>
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="12">
                                        <el-form-item label="Tempat Lahir" :error="errors.tmp_lahir_anak" prop="tmp_lahir_anak">
                                            <el-input v-model="form.tmp_lahir_anak" placeholder="Tempat Lahir" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="12">
                                        <el-form-item label="Tanggal Lahir" :error="errors.tgl_lahir_anak" prop="tgl_lahir_anak">
                                            <el-date-picker v-model="form.tgl_lahir_anak" type="date" placeholder="Tanggal Lahir"
                                                format="DD-MM-YYYY" value-format="YYYY-MM-DD" style="width: 100%" />
                                        </el-form-item>
                                        <span class="fs-xs">Tanggal Bisa Diketik atau dipilih (DD-MM-YYYY)</span>
                                    </el-col>
                                </el-row>
                                <el-form-item label="Jarak Rumah Ke Daycare" :error="errors.jarak" prop="jarak">
                                    <el-input v-model="form.jarak" type="number">
                                        <template #append>
                                            <span class="text-dark">Km</span>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="Alamat" :error="errors.alamat_anak" prop="alamat_anak">
                                    <el-input v-model="form.alamat_anak" type="textarea" />
                                </el-form-item>
                            </el-col>
                            <el-col :lg="12">
                                <el-form-item label="Sosialisasi dengan lingkungan" :error="errors.sosialisasi_dengan_lingkungan_anak" prop="sosialisasi_dengan_lingkungan_anak">
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
                                <el-form-item label="Scan Akta Kelahiran" :error="errors.scan_akte_anak" prop="scan_akte_anak">
                                    <single-file-upload inputClass="w-100" v-model="form.scan_akte_anak"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="block-content p-4">
                        <div class="d-flex justify-content-end">
                            <el-button native-type="button" type="primary" @click.prevent="step--" v-if="step > 1">
                                <i class="fa fa-chevron-left me-2"></i>
                                Kembali
                            </el-button>
                            <el-button native-type="submit" type="primary" @click.prevent="updateStep()" v-if="step < 2">
                                <i class="fa fa-chevron-right me-2"></i>
                                Selanjutnya
                            </el-button>
                            <el-button native-type="submit" type="primary" @click.prevent="submit()" v-if="step == 2">
                                <i class="fa fa-check me-2"></i>
                                Simpan
                            </el-button>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
    </user-layout>
</template>

<script>
import SingleFileUpload from '@/Components/SingleFileUpload.vue';
import dayjs from 'dayjs';
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
        biaya : {
            type : Object,
        },
        paket : {
            type : Array,
        },
        errors : {
            type : Object,
        },
    },
    data(){
        return {
            form : {
                nama_ayah : null,
                tmp_lahir_ayah : null,
                tgl_lahir_ayah : null,
                alamat_ayah : null,
                telp_ayah : null,
                pekerjaan_ayah : null,
                penghasilan_ayah : null,
                alamat_kantor_ayah : null,
                pendidikan_ayah : null,
                agama_ayah : null,
                ktp_ayah : null,
                nama_ibu : null,
                tmp_lahir_ibu : null,
                tgl_lahir_ibu : null,
                alamat_ibu : null,
                telp_ibu : null,
                pekerjaan_ibu : null,
                penghasilan_ibu : null,
                alamat_kantor_ibu : null,
                pendidikan_ibu : null,
                agama_ibu : null,
                ktp_ibu : null,
                kk : null,
                nama_anak : null,
                username: null,
                jk_anak : 'Laki-Laki',
                tmp_lahir_anak : null,
                tgl_lahir_anak : null,
                alamat_anak : null,
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
            step : 1,
            loading : false,
            selectPaket : null,
            errors_anak : {},
        }
    },
    created(){
        if(this.editMode){
            this.setValue();
        }
    },
    computed :{
        rules(){
            if(this.step == 1){
                return {
                    nama_ayah: [
                        { required: true, message: 'Nama Ayah tidak boleh kosong', trigger: 'blur' }
                    ],
                    tmp_lahir_ayah: [
                        { required: true, message: 'Tempat Lahir Ayah tidak boleh kosong', trigger: 'blur' }
                    ],
                    tgl_lahir_ayah: [
                        { required: true, message: 'Tanggal Lahir Ayah tidak boleh kosong', trigger: 'blur' }
                    ],
                    alamat_ayah: [
                        { required: true, message: 'Alamat Ayah tidak boleh kosong', trigger: 'blur' }
                    ],
                    telp_ayah: [
                        { required: true, message: 'Telepon Ayah tidak boleh kosong', trigger: 'blur' },
                        { pattern: /^[0-9]+$/, message: 'Telepon Ayah must be a valid number', trigger: 'blur' }
                    ],
                    pekerjaan_ayah: [
                        { required: true, message: 'Pekerjaan Ayah tidak boleh kosong', trigger: 'blur' }
                    ],
                    penghasilan_ayah: [
                        { required: true, message: 'Penghasilan Ayah tidak boleh kosong', trigger: 'blur' }
                    ],
                    alamat_kantor_ayah: [
                        { required: true, message: 'Alamat Kantor Ayah tidak boleh kosong', trigger: 'blur' }
                    ],
                    pendidikan_ayah: [
                        { required: true, message: 'Pendidikan Ayah tidak boleh kosong', trigger: 'blur' }
                    ],
                    agama_ayah: [
                        { required: true, message: 'Agama Ayah tidak boleh kosong', trigger: 'blur' }
                    ],
                    ktp_ayah: [
                        { required: true, message: 'KTP Ayah tidak boleh kosong', trigger: 'blur' }
                    ],
                    nama_ibu: [
                        { required: true, message: 'Nama Ibu tidak boleh kosong', trigger: 'blur' }
                    ],
                    tmp_lahir_ibu: [
                        { required: true, message: 'Tempat Lahir Ibu tidak boleh kosong', trigger: 'blur' }
                    ],
                    tgl_lahir_ibu: [
                        { required: true, message: 'Tanggal Lahir Ibu tidak boleh kosong', trigger: 'blur' }
                    ],
                    alamat_ibu: [
                        { required: true, message: 'Alamat Ibu tidak boleh kosong', trigger: 'blur' }
                    ],
                    telp_ibu: [
                        { required: true, message: 'Telepon Ibu tidak boleh kosong', trigger: 'blur' },
                        { pattern: /^[0-9]+$/, message: 'Telepon Ibu must be a valid number', trigger: 'blur' }
                    ],
                    pekerjaan_ibu: [
                        { required: true, message: 'Pekerjaan Ibu tidak boleh kosong', trigger: 'blur' }
                    ],
                    penghasilan_ibu: [
                        { required: true, message: 'Penghasilan Ibu tidak boleh kosong', trigger: 'blur' }
                    ],
                    alamat_kantor_ibu: [
                        { required: true, message: 'Alamat Kantor Ibu tidak boleh kosong', trigger: 'blur' }
                    ],
                    pendidikan_ibu: [
                        { required: true, message: 'Pendidikan Ibu tidak boleh kosong', trigger: 'blur' }
                    ],
                    agama_ibu: [
                        { required: true, message: 'Agama Ibu tidak boleh kosong', trigger: 'blur' }
                    ],
                    ktp_ibu: [
                        { required: true, message: 'KTP Ibu tidak boleh kosong', trigger: 'blur' }
                    ],
                }
            }else if(this.step == 2){
                return {
                    nama_anak: [{ required: true, message: 'Nama lengkap anak tidak boleh kosong', trigger: 'blur' }],
                    username: [{ required: true, message: 'Nama panggilan anak tidak boleh kosong', trigger: 'blur' }],
                    jk_anak: [{ required: true, message: 'Jenis Kelamin anak tidak boleh kosong', trigger: 'blur' }],
                    tmp_lahir_anak: [{ required: true, message: 'Tempat lahir anak tidak boleh kosong', trigger: 'blur' }],
                    tgl_lahir_anak: [{ required: true, message: 'Tanggal Lahir anak tidak boleh kosong', trigger: 'blur' }],
                    alamat_anak: [{ required: true, message: 'Alamat anak tidak boleh kosong', trigger: 'blur' }],
                    anak_ke: [{ required: true, message: 'Anak Ke tidak boleh kosong', trigger: 'blur' }],
                    jarak: [{ required: true, message: 'Jarak tidak boleh kosong', trigger: 'blur' }],
                    sosialisasi_dengan_lingkungan_anak: [{ required: true, message: 'Sosialisasi dengan lingkungan tidak boleh kosong', trigger: 'blur' }],
                    scan_akte_anak: [{ required: true, message: 'Scan Akte tidak boleh kosong', trigger: 'blur' }],
                }
            }
        }
    },
    methods : {
        setValue(){
            this.form.nama_ayah = this.value.user.detail.nama_ayah;
            this.form.tmp_lahir_ayah = this.value.user.detail.tmp_lahir_ayah;
            this.form.tgl_lahir_ayah = this.value.user.detail.tgl_lahir_ayah;
            this.form.telp_ayah = this.value.user.detail.telp_ayah;
            this.form.alamat_ayah = this.value.user.detail.alamat_ayah;
            this.form.pekerjaan_ayah = this.value.user.detail.pekerjaan_ayah;
            this.form.penghasilan_ayah = this.value.user.detail.penghasilan_ayah;
            this.form.alamat_kantor_ayah = this.value.user.detail.alamat_kantor_ayah;
            this.form.agama_ayah = this.value.user.detail.agama_ayah;
            this.form.pendidikan_ayah = this.value.user.detail.pendidikan_ayah;

            this.form.nama_ibu = this.value.user.detail.nama_ibu;
            this.form.tmp_lahir_ibu = this.value.user.detail.tmp_lahir_ibu;
            this.form.tgl_lahir_ibu = this.value.user.detail.tgl_lahir_ibu;
            this.form.telp_ibu = this.value.user.detail.telp_ibu;
            this.form.alamat_ibu = this.value.user.detail.alamat_ibu;
            this.form.pekerjaan_ibu = this.value.user.detail.pekerjaan_ibu;
            this.form.penghasilan_ibu = this.value.user.detail.penghasilan_ibu;
            this.form.alamat_kantor_ibu = this.value.user.detail.alamat_kantor_ibu;
            this.form.agama_ibu = this.value.user.detail.agama_ibu;
            this.form.pendidikan_ibu = this.value.user.detail.pendidikan_ibu;

            
            this.form.ktp_ayah = '/uploads/'+this.value.user.detail.scan_ktp_ayah;
            this.form.ktp_ibu = '/uploads/'+this.value.user.detail.scan_ktp_ibu;
            this.form.kk = '/uploads/'+this.value.user.detail.scan_kk;

            this.form.nama_anak = this.value.nama;
            this.form.username = this.value.username;
            this.form.jk_anak = this.value.jk;
            this.form.tmp_lahir_anak = this.value.tmp_lahir;
            this.form.tgl_lahir_anak = this.value.tgl_lahir;
            this.form.alamat_anak = this.value.alamat;
            this.form.anak_ke = this.value.anak_ke;
            this.form.jarak = this.value.jarak;
            this.form.sosialisasi_dengan_lingkungan_anak = this.value.sosialisasi_dengan_lingkungan;
            // this.form.scan_akte_anak = this.value.pendidikan_ibu;
            this.form.scan_akte_anak = '/uploads/'+this.value.user.detail.scan_kk;
        },  
        submit() {
            this.loading = true;
            let form = this.$inertia.form(this.form);
            let url = this.route('register.revisi', {id : this.value.id});
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
            });
        },
        submitAnak() {
            this.loading = true;
            let form = this.$inertia.form(this.formAnak);
            let url = this.route('register.anak');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
                onSuccess: () => {
                    
                },
                onError : (v) => {
                    this.step = 2;
                    this.errors_anak = v;
                }
            });
        },
        setPaket(){
            const birthDate = new dayjs(this.formAnak.tgl_lahir);
            const specificDate = new dayjs();
            const ageInMonths = specificDate.diff(birthDate, 'month');

            if(ageInMonths <= 30){
                this.formAnak.paket_id = 1;
                this.selectPaket = this.paket[0];
            }else{
                this.formAnak.paket_id = 2;
                this.selectPaket = this.paket[1];
            }

            this.step = 3;

        },
        changePaket(data){
            console.log(data);
            this.selectPaket = data;
        },
        updateStep(){
            if(this.step == 1){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.step++;
                    } else {
                        ElMessage({
                            message: 'Oops! Periksa kembali form',
                            type: 'error',
                        });
                    }
                })
            }else if(this.step == 2){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.step++;
                    } else {
                        ElMessage({
                            message: 'Oops! Periksa kembali form',
                            type: 'error',
                        });
                    }
                })
            }else{
                this.submit();
            }
        },
    }
}
</script>