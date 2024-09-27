<template>
    <base-layout title="Detail Laundry">
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Detail Laundry</span>
                <div class="space-x-1">
                    <a :href="route('admin.laundry.edit', {id : data.id})" class="ep-button ep-button--primary">
                        <i class="si si-note me-1"></i>
                        Ubah
                    </a>
                    <el-button type="danger" @click="hapus(data.id)">
                        <i class="si si-trash me-1"></i>
                        Hapus
                    </el-button>
                </div>
            </div>
            <div class="block rounded-2">
                <div class="block-content">
                    <el-row :gutter="20" justify="space-between" class="mb-4">
                        <el-col :lg="12">
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Tanggal</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ format_date(data.tgl) }}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :md="12">
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Kelompok</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.kelompok.nama }} ({{ data.kelompok.usia }})</div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                <div class="block-content p-0">     
                    <el-table :data="data.detail" class="w-100" v-loading="isLoading" header-cell-class-name="bg-body text-dark">
                        <el-table-column label="Anak">
                            <template #default="scope">
                                <div>{{ scope.row.anak.nama }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="Berat" width="220">
                            <template #default="scope">
                                <div>{{ scope.row.berat }} gram</div>
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
                this.$inertia.delete(this.route('admin.laundry.delete', {id : id}), {
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