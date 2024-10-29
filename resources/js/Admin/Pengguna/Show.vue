<template>
    <base-layout title="Detail Relawan">
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Detail Pengguna</span>
                <div class="space-x-1">
                    <el-button type="danger" @click.prevent="hapus(data.id)">
                        <i class="si si-trash me-1"></i>
                        Hapus
                    </el-button>
                </div>
            </div>
            <div class="block block-rounded block-bordered">
                <div class="block-content p-3">
                    <div class="border-bottom border-2 mb-4">
                        <h3 class="h5 mb-2">1. Informasi Akun</h3>
                    </div>
                    <el-row :gutter="20">
                        <el-col :md="12">
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Nama Akun</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.nama }}</span>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :md="12">
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Email Akun</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.email }}</span>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <h3 class="h5 mb-2">2. Informasi Detail</h3>
                    <el-row :gutter="20">
                        <el-col :md="12">
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Nama Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.nama_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Tempat / Tanggal Lahir Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.tmp_lahir_ayah }} /
                                        {{ data.detail.tgl_lahir_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">No HP Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.telp_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Pendidkan Terakhir Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.pendidikan_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Agama Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.agama_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Alamat Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.alamat_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Pekerjaan Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.pekerjaan_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Penghasilan Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.penghasilan_ayah }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Alamat Kantor Ayah</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.alamat_kantor_ayah }}</span>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :md="12">
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Nama Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.nama_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Tempat / Tanggal Lahir Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.tmp_lahir_ibu }} /
                                        {{ data.detail.tgl_lahir_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">No HP Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.telp_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Pendidkan Terakhir Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.pendidikan_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Agama Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.agama_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Alamat Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.alamat_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Pekerjaan Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.pekerjaan_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Penghasilan Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.penghasilan_ibu }}</span>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :md="10">Alamat Kantor Ibu</el-col>
                                <el-col :md="14">
                                    : <span class="fw-semibold">{{ data.detail.alamat_kantor_ibu }}</span>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </base-layout>
</template>
<script>
import moment from 'moment';
export default {
    components : {
    },
    data(){
        return {
            active : 0,
            isLoading : false,
            listRekrutan: [],
        }
    },
    props : {
        data : Object,
    },
    computed : {
        getImage(){
            if(this.data.image){
                return this.data.image;
            }
            return "/media/placeholder/avatar.jpg";
        },
        getKTP(){
            if(this.data.ktp){
                return this.data.ktp;
            }
            return "/media/placeholder/ktp.jpg";
        }
    },
    methods : {
        setMenu(index){
            this.active = index;
        },
        zeroPad(num) {
            return num.toString().padStart(3, "0");
        },
        percentage(number, total){
            var percent = (parseInt(number)/total)* 100
            return Math.round(percent);
        },
        format_date(value) {
            if (value) {
                moment().locale('id');
                return moment(String(value)).format('DD MMMM YYYY')
            }
        },
        hapus(id){
            ElMessageBox.alert('Data yang dihapus tidak bisa dikembalikan!', 'Peringatan', {
                showCancelButton: true,
                confirmButtonText: 'Ya!',
                cancelButtonText: 'Tidak!',
                type: 'warning',
            })
            .then(() => {
                this.$inertia.delete(this.route('admin.pengguna.delete', {id : id}), {
                    preserveScroll: true,
                    onSuccess: () => {
                        this.fetchData();
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