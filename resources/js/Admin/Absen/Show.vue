<template>
    <base-layout title="Detail Penilaian">
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Detail Absen</span>
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
                        </el-col>
                        <el-col :lg="12">
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Kelompok</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.kelompok.nama }} ({{ data.kelompok.usia }})</div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-table :data="data.detail" style="width: 100%" border>
                        <el-table-column type="index" width="50" />
                        <el-table-column label="Nama Anak">
                            <template  #default="scope">
                                {{  scope.row.anak.nama }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="Status"/>
                        <el-table-column label="Jam Masuk">
                            <template  #default="scope">
                                {{  (scope.row.check_in) ? scope.row.check_in : '-' }}
                            </template>
                        </el-table-column>
                        <el-table-column label="Jam Pulang">
                            <template  #default="scope">
                                {{  scope.row.check_out ?? '-' }}
                            </template>
                        </el-table-column>
                    </el-table>
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