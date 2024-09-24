<template>
    <user-layout title="Detail Relawan">
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Detail Invoice</span>
                <div class="space-x-1">
                    <a :href="route('user.invoice.pdf', {id : data.id})" class="ep-button ep-button--primary" target="_blank">
                        Download Invoice
                    </a>
                </div>
            </div>
            <div class="block rounded-2">
                <div class="block-content p-4">
                    <el-row :gutter="20" justify="space-between">
                        <el-col :lg="12">
                            <h2 class="fw-bold fs-5 mb-2">Informasi Dasar</h2>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Nomor</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.nomor }}</div>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Tanggal</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ format_date(data.tgl) }}</div>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Tanggal Tempo</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ format_date(data.tgl_tempo) }}</div>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Status</el-col>
                                <el-col :lg="16">
                                    <span class="badge bg-primary" v-if="data.status == 'paid'">
                                        Lunas
                                    </span>
                                    <span class="badge bg-primary" v-else>
                                        Belum Bayar
                                    </span>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :lg="12">
                            <h2 class="fw-bold fs-5 mb-2">Informasi Pengguna</h2>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Nama</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.user.nama }}</div>
                                </el-col>
                            </el-row> 
                            <!-- <el-row class="mb-2" :gutter="10" v-if="data.shipping">
                                <el-col :lg="8">Alamat</el-col>
                                <el-col :lg="16">
                                    <b>{{ data.shipping.reciever }}</b><br>
                                    {{ data.shipping.phone }}<br>
                                    {{ data.shipping.address }}<br>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Kurir</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.shipping_service }} ({{ data.shipping_etd }})</div>
                                </el-col>
                            </el-row>  -->
                        </el-col>
                    </el-row>
                    <div class="table-responsive push">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th class="text-center" style="width: 60px;"></th>
                                    <th>Keterangan</th>
                                    <th class="text-end" style="width: 120px;">Jumlah</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr  v-for="(d, i) in data.detail" :key="i">
                                    <td class="text-center">{{ i+1 }}</td>
                                    <td>
                                        <p class="fw-semibold mb-1">{{ d.tipe }}</p>
                                        <div class="text-muted">

                                        </div>
                                    </td>
                                    <td class="text-end">{{ currency(d.harga) }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="table-warning">
                                    <td colspan="2" class="fw-bold text-uppercase text-end">Total</td>
                                    <td class="fw-bold text-end">{{ currency(data.total)}}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </user-layout>
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