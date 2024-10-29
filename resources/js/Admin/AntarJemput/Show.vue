<template>
    <base-layout title="Detail Antar Jemput">
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Detail Antar Jemput</span>
                <div class="space-x-1">
                    <Link :href="route('admin.antarjemput.edit', {id : data.id})" class="ep-button ep-button--primary">
                        <i class="si si-note me-1"></i>
                        Ubah
                    </Link>
                    <el-button type="danger" @click="hapus(data.id)">
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
                                    <div class="fw-semibold">{{ format_date(data.tgl) }} {{ format_jam(data.jam) }}</div>
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
                                <el-col :lg="8">Nama Anak</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.anak.nama }}</div>
                                </el-col>
                            </el-row>
                            <el-row class="mb-2" :gutter="10">
                                <el-col :lg="8">Keterangan</el-col>
                                <el-col :lg="16">
                                    <div class="fw-semibold">{{ data.keterangan ?? '-' }}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    
                    <div class="demo-image__preview">
                        <div class="">Bukti Antar Jemput</div>
                        <el-row :gutter="20">
                            <el-col :md="4" v-for="(d, i) in data.foto" :key="i" >
                                <el-image :src="d.path" lazy 
                                :preview-src-list="fotoList"
                                :initial-index="i"/>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </base-layout>
</template>
<script>
import moment from 'moment';
import { Link } from '@inertiajs/vue3';
export default {
    components : {
        Link
    },
    data(){
        return {
            active : 0,
            isLoading : false,
            listRekrutan: [],
            fotoList : [],
        }
    },
    props : {
        data : Object,
    },
    mounted(){
        if(this.data.foto.length){
            this.data.foto.forEach(d => {
                this.fotoList.push(d.path);
            });
        }
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
        format_jam(value){
            if (value) {
                return moment(String(value), "hh:mm:ss").format('hh:mm')
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
                this.$inertia.delete(this.route('admin.antarjemput.delete', {id : id}), {
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