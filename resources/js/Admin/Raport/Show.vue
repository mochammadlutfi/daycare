<template>
    <base-layout title="Detail Penilaian">
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Detail Penilaian</span>
                <div class="space-x-1">

                </div>
            </div>
            <div class="block rounded-2">
                <div class="block-content p-4">
                    <el-row :gutter="20" justify="space-between">
                        <el-col :lg="12">
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Tanggal</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ format_date(data.tgl) }}</div>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Kelompok</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.kelompok.nama }} ({{ data.kelompok.usia }})</div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :lg="12">
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Jenis Kegiatan</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.jenis.nama }}</div>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Kegiatan</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.kegiatan.nama }}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <div class="table-responsive push">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th class="text-center" style="width: 60px;"></th>
                                    <th>Anak</th>
                                    <th class="text-end" style="width: 120px;">Penilaian</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr  v-for="(d, i) in data.detail" :key="i">
                                    <td class="text-center">{{ i+1 }}</td>
                                    <td>
                                        <p class="fw-semibold mb-1">{{ d.anak.nama }}</p>
                                        <div class="text-muted">

                                        </div>
                                    </td>
                                    <td class="text-end">
                                        <span class="badge bg-danger" v-if="d.nilai == 'BB'">
                                            Belum Berkembang
                                        </span>
                                        <span class="badge bg-warning" v-else-if="d.nilai == 'MB'">
                                            Mulai Berkembang
                                        </span>
                                        <span class="badge bg-info" v-else-if="d.nilai == 'BSH'">
                                            Berkembang Sesuai Harapan
                                        </span>
                                        <span class="badge bg-success" v-else-if="d.nilai == 'BSB'">
                                            Berkembang Sangat Baik
                                        </span>
                                    </td>
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