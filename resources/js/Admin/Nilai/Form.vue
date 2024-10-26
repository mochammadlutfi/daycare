<template>
    <base-layout>
        <div class="content">
            <el-form label-position="top" label-width="100%" @submit.prevent="submit">
                <div class="content-heading d-flex justify-content-between align-items-center">
                    <span>{{ title }}</span>
                </div>
                
                <div class="block rounded">
                    <div class="block-content p-4" v-loading="loading">
                        <el-row :gutter="40">
                            <el-col :md="12">
                                <el-form-item label="Tanggal" :error="errors.tgl">
                                    <el-date-picker v-model="form.tgl" type="date" placeholder="Tanggal"
                                        format="DD MMMM YYYY" value-format="YYYY-MM-DD" style="width: 100%" />
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Kelompok" :error="errors.kelompok_id">
                                    <select-kelompok v-model="form.kelompok_id" @change="fetchAnak"/>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Jenis Kegiatan" :error="errors.jenis_id" @change="form.kegiatan_id = null">
                                    <select-jenis-kegiatan v-model="form.jenis_id"/>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Kegiatan" :error="errors.kegiatan_id">
                                    <select-kegiatan v-model="form.kegiatan_id" :disabled="(form.jenis_id) ? false : true" hasParent :jenis="form.jenis_id" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-table :data="lines" border class="mb-4" id="variant">
                            <el-table-column label="Nama Anak">
                                <template #default="scope">
                                    {{ scope.row.anak_nama }}
                                </template>
                            </el-table-column>
                            <el-table-column label="Nilai" width="250px">
                                <template #default="scope">
                                    <el-select v-model="scope.row.nilai" placeholder="Pilih" class="w-100">
                                        <el-option label="Belum Berkembang" value="BB"/>
                                        <el-option label="Mulai Berkembang" value="MB"/>
                                        <el-option label="Berkembang Sesuai Harapan" value="BSH"/>
                                        <el-option label="Berkembang Sangat Baik" value="BSB"/>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="Keterangan">
                                <template #default="scope">
                                    <el-input v-model="scope.row.keterangan"/>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-button native-type="submit" type="primary" :loading="loading">
                            <i class="fa fa-check me-2"></i>
                            Simpan
                        </el-button>
                    </div>
                </div>
            </el-form>
        </div>
    </base-layout>
</template>
<script>
import SelectKelompok from '@/Components/SelectKelompok.vue';
import SelectJenisKegiatan from '@/Components/SelectJenisKegiatan.vue';
import SelectKegiatan from '@/Components/SelectKegiatan.vue';
import dayjs from 'dayjs';
export default {
    components :{
        SelectKelompok,
        SelectJenisKegiatan,
        SelectKegiatan
    },
    props :{
        value : {
            type : Object,
        },
        editMode : {
            type : Boolean,
            default : false,
        },
        errors : {
            type : Object,
        }
    },
    data(){
        return {
            title : "Tambah Penilaian Baru",
            disableKota : false,
            form : {
                tgl: new dayjs(),
                kelompok_id : null,
                jenis_id : null,
                kegiatan_id : null,
            },
            lines : [],
            loading : false,
        }
    },
    created(){
        if(this.editMode){
            this.setValue();
        }
    },
    methods : {
        setValue(){

        },  
        async fetchAnak(){
            try {
                this.isLoading = true;
                this.lines = [];
                const response = await axios.get(this.route("admin.anak.data"),{
                    params: {
                        kelompok_id : this.form.kelompok_id
                    }
                });
                if(response.status == 200){
                    response.data.forEach((d, i) => {
                        this.lines.push({
                            id : null,
                            anak_id : d.id,
                            user_id : d.user_id,
                            anak_nama : d.nama,
                            nilai : null,
                            keterangan : null,
                        });
                    });
                }
                this.isLoading = false;
            } catch (error) {
                console.error(error);
            }
        },
        submit() {
            this.loading = true;
            let formData = Object.assign(this.form, {
                    lines : this.lines
                }
            );
            let form = this.$inertia.form(formData);
            let url = this.editMode === true ? this.route('admin.nilai.update', {id : this.value.id}) : this.route('admin.nilai.store');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
                onSuccess: () => {
                    return this.$swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: `Pendukung Baru Berhasil Ditambahkan!`,
                        showCancelButton: true,
                        confirmButtonText: 'Tambah Lainnya',
                        cancelButtonText: 'Kembali',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$inertia.visit(this.route("user.pendukung.create"));
                        }
                    });
                },
            });
        }
    }
}
</script>