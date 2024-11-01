<template>
    <base-layout title="Detail Penilaian">
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Detail Raport</span>
                <div class="space-x-1">
                    <a :href="route('admin.raport.pdf', {id : data.id})" target="_blank" class="ep-button ep-button--primary">
                        <i class="fa fa-download me-1"></i>
                        Download PDF
                    </a>
                    <a :href="route('admin.raport.edit', {id : data.id})" class="ep-button ep-button--primary">
                        <i class="si si-note me-1"></i>
                        Ubah
                    </a>
                    <el-button type="danger" @click.prevent="hapus(data.id)">
                        <i class="si si-trash me-1"></i>
                        Hapus
                    </el-button>
                </div>
            </div>
            <div class="block rounded-2">
                <div class="block-content p-4">
                    <el-row :gutter="20" justify="space-between" class="mb-4">
                        <el-col :lg="12">
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Tanggal</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ format_date(data.tgl_mulai) }} - {{ format_date(data.tgl_selesai) }}</div>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Kelompok</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.kelompok.nama }} ({{ data.kelompok.usia }})</div>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Anak</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.anak.nama }}</div>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Tinggi Badan</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.tinggi }} CM</div>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Berat Badan</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.berat }} Kg</div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :lg="12">
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Hadir</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.hadir }}</div>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Izin</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.izin }}</div>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Sakit</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.sakit }}</div>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Tanpa Keterangan</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.alpa }}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <div class="table-responsive push">
                        <table class="table table-bordered">
                            <tbody>
                                <tr class="">
                                    <td class="fw-bold">Perkembangan Nilai Agama dan Moral</td>
                                </tr>
                                <tr>
                                    <td>{{ data.perkembangan_nilai_agama_dan_moral}}</td>
                                </tr>
                                <tr class="">
                                    <td class="fw-bold">Perkembangan Sosial dan Emosional</td>
                                </tr>
                                <tr>
                                    <td>{{ data.perkembangan_sosial_emosional}}</td>
                                </tr>
                                <tr class="">
                                    <td class="fw-bold">Perkembangan Fisik dan Motorik</td>
                                </tr>
                                <tr>
                                    <td>{{ data.perkembangan_fisik_motorik}}</td>
                                </tr>
                                <tr class="">
                                    <td class="fw-bold">Perkembangan Kognitif</td>
                                </tr>
                                <tr>
                                    <td>{{ data.perkembangan_kognitif}}</td>
                                </tr>
                                <tr class="">
                                    <td class="fw-bold">Perkembangan Bahasa</td>
                                </tr>
                                <tr>
                                    <td>{{ data.perkembangan_bahasa}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
    methods : {
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
                this.$inertia.delete(this.route('admin.raport.delete', {id : id}), {
                    preserveScroll: true,
                    onSuccess: () => {
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