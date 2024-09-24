<template>
    <base-layout title="Detail Relawan">
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Detail Saksi</span>
                <div class="space-x-1">
                    <a :href="route('admin.saksi.edit', {id : data.id})" class="ep-button">
                        <i class="si si-note me-1"></i>
                        Ubah Saksi
                    </a>
                    <el-button type="danger" @click.prevent="hapus(data.id)">
                        <i class="si si-trash me-1"></i>
                        Hapus Saksi
                    </el-button>
                </div>
            </div>
            <div class="block block-rounded block-bordered">
                <div class="block-content p-3">
                    <div class="border-bottom border-2 mb-4">
                        <h3 class="h5 mb-2">1. Informasi Personal</h3>
                    </div>
                    <el-row :gutter="32">
                        <el-col :span="7">
                            <div class="mb-3">
                                <p class="mb-0">Foto</p>
                                <div class="text-center">
                                    <img :src="getImage" class="w-50">
                                </div>
                            </div>
                            <div class="mb-3">
                                <p class="mb-0">KTP</p>
                                <div class="text-center">
                                    <img :src="getKTP" class="w-100">
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="17">
                            <el-descriptions :column="1" border>
                                <el-descriptions-item label="NIK">{{ data.nik }}</el-descriptions-item>
                                <el-descriptions-item label="Nama Lengkap">{{ data.nama }}</el-descriptions-item>
                                <el-descriptions-item label="Jenis Kelamin">{{ (data.jk == 'L') ? 'Laki-Laki' : 'Perempuan' }}</el-descriptions-item>
                                <el-descriptions-item label="Tempat / Tanggal Lahir">{{ data.tmp_lahir }} / {{  format_date(data.tgl_lahir) }}</el-descriptions-item>
                                <el-descriptions-item label="No Handphone">{{ data.phone }}</el-descriptions-item>
                                <el-descriptions-item label="Email">{{ data.email }}</el-descriptions-item>
                                <el-descriptions-item label="Alamat Lengkap">
                                    {{ data.alamat }}
                                </el-descriptions-item>
                                <el-descriptions-item label="TPS">{{ data.tps }}</el-descriptions-item>
                                <el-descriptions-item label="RT / RW">{{ data.rt }}/{{ data.rw }}</el-descriptions-item>
                                <el-descriptions-item label="Kelurahan">{{ data.kelurahan.nama }}</el-descriptions-item>
                                <el-descriptions-item label="Kecamatan">{{ data.kecamatan.nama }}</el-descriptions-item>
                                <el-descriptions-item label="Kota">{{ data.kota.nama }}</el-descriptions-item>
                                <!-- <el-descriptions-item label="Caleg">{{ data.user.name }}</el-descriptions-item> -->
                            </el-descriptions>
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
                this.$inertia.delete(this.route('admin.saksi.delete', {id : id}), {
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