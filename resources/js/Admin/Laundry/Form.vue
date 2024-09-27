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
                                    <select-kelompok v-model="form.kelompok_id" @change="fetchAnak" laundry/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-table :data="lines" border class="mb-4" id="variant">
                            <el-table-column label="Nama Anak">
                                <template #default="scope">
                                    {{ scope.row.anak_nama }}
                                </template>
                            </el-table-column>
                            <el-table-column label="Berat">
                                <template #default="scope">
                                    <el-input v-model="scope.row.berat">
                                        <template #suffix>
                                            <span>Gram</span>
                                        </template>    
                                    </el-input>
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
export default {
    components :{
        SelectKelompok,
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
            title : "Tambah Transaksi Laundry",
            disableKota : false,
            form : {
                tgl: null,
                kelompok_id : null,
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
            this.title = 'Ubah Transaksi Laundry';
            this.form.id = this.value.id;
            this.form.kelompok_id = this.value.kelompok_id;
            this.form.anak_id = this.value.anak_id;
            this.form.tgl = this.value.tgl;
            this.form.jam = this.value.jam;

            if(this.value.detail.length){
                this.value.detail.forEach(v => {
                    this.lines.push({
                        id : v.id,
                        anak_id : v.anak_id,
                        user_id : v.user_id,
                        anak_nama : v.anak.nama,
                        berat : v.berat,
                    })
                });
            }
        },  
        async fetchAnak(){
            try {
                this.isLoading = true;
                this.lines = [];
                const response = await axios.get(this.route("admin.anak.data"),{
                    params: {
                        kelompok_id : this.form.kelompok_id,
                        laundry : true,
                    }
                });
                if(response.status == 200){
                    response.data.forEach((d, i) => {
                        this.lines.push({
                            id : null,
                            anak_id : d.id,
                            user_id : d.user_id,
                            anak_nama : d.nama,
                            berat : null,
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
            let url = this.editMode === true ? this.route('admin.laundry.update', {id : this.value.id}) : this.route('admin.laundry.store');
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