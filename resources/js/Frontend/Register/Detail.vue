<template>
    <user-layout>
        <div class="content">
            <div class="block block-rounded">
                <div class="block-content block-content-full">
                    <div class="py-3 text-center">
                        <h2 class="fw-bold mb-2">
                            Detail Pendaftaran
                        </h2>
                        <h3 class="fs-base fw-medium text-muted mb-0">
                            Lengkapi Data Orangtua
                        </h3>
                    </div>
                </div>
            </div>
            <div class="block rounded-2">
                <div class="block-content" v-if="step == 1">
                    <el-form label-position="top" label-width="100%" @submit.prevent="submit">
                        <div class="border-bottom border-2 mb-4">
                            <h3 class="h5 mb-2">1. Informasi Orang Tua / Wali</h3>
                        </div>
                        <el-row :gutter="20">
                            <el-col :lg="12">
                                <el-form-item label="Nama Ayah" :error="errors.nama_ayah">
                                    <el-input v-model="form.nama_ayah" />
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="12">
                                        <el-form-item label="Tempat Lahir Ayah" :error="errors.tmp_lahir_ayah">
                                            <el-input v-model="form.tmp_lahir_ayah" placeholder="Tempat Lahir" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="12">
                                        <el-form-item label="Tanggal Lahir Ayah" :error="errors.tgl_lahir_ayah">
                                            <el-date-picker v-model="form.tgl_lahir_ayah" type="date" placeholder="Tanggal Lahir"
                                                format="DD-MM-YYYY" value-format="YYYY-MM-DD" style="width: 100%" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="No Handphone Ayah" :error="errors.telp_ayah">
                                    <el-input v-model="form.telp_ayah" placeholder="No Handphone (contoh : 082212)" />
                                </el-form-item>
                                <el-form-item label="Alamat Domisili Ayah" :error="errors.alamat_ayah">
                                    <el-input v-model="form.alamat_ayah" type="textarea" />
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="12">
                                        <el-form-item label="Pekerjaan Ayah" :error="errors.pekerjaan_ayah">
                                            <el-input v-model="form.pekerjaan_ayah" placeholder="Pekerjaan" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="12">
                                        <el-form-item label="Penghasilan Ayah" :error="errors.penghasilan_ayah">
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
                                <el-form-item label="Alamat Pekerjaan Ayah" :error="errors.alamat_kantor_ayah">
                                    <el-input v-model="form.alamat_kantor_ayah" type="textarea" />
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="12">
                                        <el-form-item label="Agama Ayah" :error="errors.agama_ayah">
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
                                        <el-form-item label="Pendidikan Terakhir Ayah" :error="errors.pendidikan_ayah">
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
                                <el-form-item label="Nama Ibu" :error="errors.nama_ibu">
                                    <el-input v-model="form.nama_ibu" />
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="12">
                                        <el-form-item label="Tempat Lahir Ibu" :error="errors.tmp_lahir_ibu">
                                            <el-input v-model="form.tmp_lahir_ibu" placeholder="Tempat Lahir" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="12">
                                        <el-form-item label="Tanggal Lahir Ibu" :error="errors.tgl_lahir_ibu">
                                            <el-date-picker v-model="form.tgl_lahir_ibu" type="date" placeholder="Tanggal Lahir"
                                                format="DD-MM-YYYY" value-format="YYYY-MM-DD" style="width: 100%" />
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="No Handphone Ibu" :error="errors.telp_ibu">
                                    <el-input v-model="form.telp_ibu" placeholder="No Handphone (contoh : 082212)" />
                                </el-form-item>
                                <el-form-item label="Alamat Domisili Ibu" :error="errors.alamat_ibu">
                                    <el-input v-model="form.alamat_ibu" type="textarea" />
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="12">
                                        <el-form-item label="Pekerjaan Ibu" :error="errors.pekerjaan_ibu">
                                            <el-input v-model="form.pekerjaan_ibu" placeholder="Pekerjaan" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="12">
                                        <el-form-item label="Penghasilan Ibu" :error="errors.penghasilan_ibu">
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
                                        <el-form-item label="Agama Ibu" :error="errors.agama_ibu">
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
                                        <el-form-item label="Pendidikan Terakhir Ibu" :error="errors.pendidikan_ibu">
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
                    <el-row>
                        <el-col :md="8">
                            <el-form-item label="Scan KTP Ayah" :error="errors.ktp_ayah">
                                <single-file-upload inputClass="w-100" v-model="form.ktp_ayah"/>
                            </el-form-item>
                        </el-col>
                        <el-col :md="8">
                    <el-form-item label="Scan KTP Ayah" :error="errors.ktp_ibu">
                        <single-file-upload inputClass="w-100" v-model="form.ktp_ibu"/>
                    </el-form-item>
                        </el-col>
                        <el-col :md="8">
                    <el-form-item label="Scan Kartu Keluarga" :error="errors.kk">
                        <single-file-upload inputClass="w-100" v-model="form.kk"/>
                    </el-form-item>
                        </el-col>
                    </el-row>
                    </el-form>
                </div>
                <el-form label-position="top" label-width="100%" @submit.prevent="submitAnak" v-else-if="step == 2">
                    <div class="block-content" >
                        <el-row :gutter="20">
                            <el-col :lg="12">
                                <el-form-item label="Nama Lengkap" :error="errors_anak.nama">
                                    <el-input v-model="formAnak.nama" />
                                </el-form-item>
                                <el-form-item label="Nama Panggilan" :error="errors_anak.username">
                                    <el-input v-model="formAnak.username" />
                                </el-form-item>
                                <el-form-item label="Jenis Kelamin" :error="errors_anak.jk">
                                    <el-radio-group v-model="formAnak.jk">
                                        <el-radio label="Laki-Laki" value="Laki-Laki" />
                                        <el-radio label="Perempuan" value="Perempuan"/>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="Anak Ke" :error="errors_anak.anak_ke">
                                    <el-input v-model="formAnak.anak_ke"/>
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col :md="12">
                                        <el-form-item label="Tempat Lahir" :error="errors_anak.tmp_lahir">
                                            <el-input v-model="formAnak.tmp_lahir" placeholder="Tempat Lahir" />
                                        </el-form-item>
                                    </el-col>
                                    <el-col :md="12">
                                        <el-form-item label="Tanggal Lahir" :error="errors_anak.tgl_lahir">
                                            <el-date-picker v-model="formAnak.tgl_lahir" type="date" placeholder="Tanggal Lahir"
                                                format="DD-MM-YYYY" value-format="YYYY-MM-DD" style="width: 100%" />
                                        </el-form-item>
                                        <span class="fs-xs">Tanggal Bisa Diketik atau dipilih (DD-MM-YYYY)</span>
                                    </el-col>
                                </el-row>
                                <el-form-item label="Jarak Rumah Ke Daycare" :error="errors_anak.jarak">
                                    <el-input v-model="formAnak.jarak" type="number">
                                        <template #append>
                                            <span class="text-dark">Km</span>
                                        </template>
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="Alamat" :error="errors_anak.alamat">
                                    <el-input v-model="formAnak.alamat" type="textarea" />
                                </el-form-item>
                            </el-col>
                            <el-col :lg="12">
                                <el-form-item label="Sosialisasi dengan lingkungan" :error="errors_anak.sosialisasi_dengan_lingkungan_anak">
                                    <el-input v-model="formAnak.sosialisasi_dengan_lingkungan_anak" type="textarea" placeholder="contoh: pemalu, pendiam, aktif, baik, tidak baik"/>
                                </el-form-item>
                                <el-form-item label="Sakit yang pernah diderita" :error="errors_anak.sakit_yang_pernah_diderita_anak">
                                    <el-input v-model="formAnak.sakit_yang_pernah_diderita_anak" type="textarea"/>
                                </el-form-item>
                                <el-form-item label="Makanan yang disukai" :error="errors_anak.makanan_yang_disukai_anak">
                                    <el-input v-model="formAnak.makanan_yang_disukai_anak" type="textarea"/>
                                </el-form-item>
                                <el-form-item label="Makanan yang tidak disukai" :error="errors_anak.makanan_yang_tidak_disukai_anak">
                                    <el-input v-model="formAnak.makanan_yang_tidak_disukai_anak" type="textarea"/>
                                </el-form-item>
                                <el-form-item label="Memiliki Alergi" :error="errors_anak.memiliki_alergi_anak">
                                    <el-input v-model="formAnak.memiliki_alergi_anak" type="textarea"/>
                                </el-form-item>
                                <el-form-item label="Scan Akta Kelahiran" :error="errors_anak.scan_akte_anak">
                                    <single-file-upload inputClass="w-100" v-model="formAnak.scan_akte_anak"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
                <div class="block-content" v-else-if="step == 3">
                    <el-row :gutter="20" justify="center">
                        <el-col :md="8" v-for="d in paket" :key="d.id">
                            <div class="form-check form-block">
                                <input type="radio" class="form-check-input" :value="d.id" name="paket" :id="`paket-${d.id}`" @change="changePaket(d)" v-model="formAnak.paket_id">
                                <label class="form-check-label p-0" :for="`paket-${d.id}`">
                                    <div class="block">
                                        <div class="block-content bg-body-light border-bottom border-3">
                                            <h3 class="block-title fw-semibold">
                                                {{ d.nama }}
                                            </h3>
                                            <p>{{ d.usia }}</p>
                                        </div>
                                        <div class="block-content px-3 pt-3">
                                            <div class="border-3 border-bottom d-flex justify-content-between pb-2">
                                                <div class="space-x">
                                                    <div class="fw-bold">Pembangunan</div>
                                                    <div class="fs-xs">Dibayar Sekali</div>
                                                </div>
                                                <div class="my-auto">
                                                    <div class="fw-bold text-primary">
                                                        {{ currency(d.pembangunan) }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="border-3 border-bottom d-flex justify-content-between pb-2">
                                                <div class="space-x">
                                                    <div class="fw-bold">Pendaftaran</div>
                                                    <div class="fs-xs">Dibayar Sekali</div>
                                                </div>
                                                <div class="my-auto">
                                                    <div class="fw-bold text-primary">
                                                        {{ currency(d.pendaftaran) }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="border-3 border-bottom d-flex justify-content-between pb-2">
                                                <div class="space-x">
                                                    <div class="fw-bold">SPP</div>
                                                    <div class="fs-xs">Dibayar Setiap Bulannya</div>
                                                </div>
                                                <div class="my-auto">
                                                    <div class="fw-bold text-primary">
                                                        {{ currency(d.spp) }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <div class="space-x">
                                                    <div class="fw-bold">Total</div>
                                                </div>
                                                <div class="my-auto">
                                                    <div class="fw-bold text-primary">
                                                        {{ currency(d.spp+d.pembangunan+d.pendaftaran) }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="border-bottom border-2 mb-4">
                        <h3 class="h5 mb-2">Layanan Tambahan</h3>
                    </div>
                    <div class="form-check form-block mb-4">
                        <input class="form-check-input" type="checkbox" v-model="formAnak.isLaundry" id="isLaundry" name="isLaundry">
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
                        <input class="form-check-input" type="checkbox" v-model="formAnak.isAntarJemput" id="isAntarJemput" name="isAntarJemput">
                        <label class="form-check-label" for="isAntarJemput">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="ms-2">
                                    <span class="fw-bold">Layanan Antar Jemput</span>
                                    <span class="d-block fs-sm text-muted">Dihitung dalam satuan kilometer dari jarak alamat Daycare ke lokasi Penjemputan Anak</span>
                                    <span class="d-block fs-sm text-muted">{{ currency(biaya.antar_jemput) }} x {{ form.jarak  ?? 0}} km (Jarak Lokasi) x 20 hari</span>
                                </div>
                                <div class="fs-3 fw-bold">
                                    {{ currency(biaya.antar_jemput * formAnak.jarak * 20) }}
                                </div>
                            </div>
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
                                    <td class="text-end">{{ currency(selectPaket.pembangunan)}} </td>
                                </tr>
                                <tr>
                                    <td class="text-center">2</td>
                                    <td>
                                        <p class="fw-semibold mb-1">Pendaftaran</p>
                                        <div class="text-muted">Dibayar 1x ketika pendaftaran</div>
                                    </td>
                                    <td class="text-end">{{ currency(selectPaket.pendaftaran) }}</td>
                                </tr>
                                <tr>
                                    <td class="text-center">3</td>
                                    <td>
                                        <p class="fw-semibold mb-1">SPP</p>
                                        <div class="text-muted">Perbulan</div>
                                    </td>
                                    <td class="text-end">{{ currency(selectPaket.spp) }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2">
                                        <p class="fw-semibold mb-1">Total</p>
                                    </td>
                                    <td class="text-end">{{ currency(selectPaket.pembangunan + selectPaket.pendaftaran + selectPaket.spp) }}</td>
                                </tr>    
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class="block-content p-4">
                    <div class="d-flex justify-content-end">
                        <el-button native-type="button" type="primary" @click.prevent="step = step-1" v-if="step > 1">
                            <i class="fa fa-chevron-left me-2"></i>
                            Kembali
                        </el-button>
                        <el-button native-type="submit" type="primary" @click.prevent="submit()" v-if="step == 1">
                            <i class="fa fa-chevron-right me-2"></i>
                            Selanjutnya
                        </el-button>
                        <el-button native-type="button" type="primary" @click.prevent="setPaket()" v-if="step == 2">
                            <i class="fa fa-chevron-right me-2"></i>
                            Selanjutnya
                        </el-button>
                        <el-button native-type="button" type="primary" @click.prevent="step = 4" v-if="step == 3">
                            <i class="fa fa-chevron-right me-2"></i>
                            Selanjutnya
                        </el-button>
                        <el-button native-type="submit" type="primary" @click.prevent="submitAnak()" v-if="step == 4">
                            <i class="fa fa-check me-2"></i>
                            Bayar
                        </el-button>
                    </div>
                </div>
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
            },
            formAnak : {
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
                paket_id : null,
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

            
            this.form.ktp_ayah = this.value.scan_ktp_ayah;
            this.form.ktp_ibu = this.value.scan_ktp_ibu;
            this.form.kk = this.value.scan_kk;
            // if(level)
        },  
        submit() {
            this.loading = true;
            let form = this.$inertia.form(this.form);
            let url = this.route('register.detail');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
                onSuccess: () => {
                    this.step = 2;
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
        }
    }
}
</script>