<template>
    <base-layout title="Detail Aktivitas">
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Detail Aktivitas</span>
                <div class="space-x-1">
                    <a :href="route('admin.aktivitas.create')" class="ep-button ep-button--primary">
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
                    
                    <div class="demo-image__preview">
                        <div class="">Foto Kegiatan</div>
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
export default {
    components : {
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
        hapus(id){
            ElMessageBox.alert('Data yang dihapus tidak bisa dikembalikan!', 'Peringatan', {
                showCancelButton: true,
                confirmButtonText: 'Ya!',
                cancelButtonText: 'Tidak!',
                type: 'warning',
            })
            .then(() => {
                this.$inertia.delete(this.route('admin.aktivitas.delete', {id : id}), {
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