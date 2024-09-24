<template>
    <base-layout>
        <div class="content">
            <el-form label-position="top" label-width="100%" @submit.prevent="submit">
                <div class="content-heading d-flex justify-content-between align-items-center">
                    <span>{{ title }}</span>
                    <div class="space-x-1">
                        <el-button native-type="submit" type="primary" :loading="loading">
                            Simpan
                        </el-button>
                    </div>
                </div>
                
                <div class="block block-rounded">
                    <div class="block-content p-4">
                        <div class="border-bottom border-2 mb-4">
                            <h3 class="h5 mb-2">1. Informasi Pribadi</h3>
                        </div>
                    </div>
                </div>
            </el-form>
        </div>
    </base-layout>
</template>
<script>
export default {
    components :{
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
            title : "Tambah Saksi Baru",
            disableKota : false,
            form : {
                level_id : null,
                image : null,
                ktp : null,
                nik: null,
                nama: null,
                jk: 'Laki-Laki',
                tmpLahir: null,
                tglLahir: null,
                alamat: null,
                rt: null,
                rw: null,
                tps : null,
                kota_id: null,
                kecamatan_id: null,
                kelurahan_id: null,
                username : null,
                password : null,
                user_id : null,
            },
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
            this.form.nama_ayah = this.value.nama_ayah;
            this.form.tmp_lahir_ayah = this.value.tmp_lahir_ayah;
            this.form.tgl_lahir_ayah = this.value.tgl_lahir_ayah;
            this.form.telp_ayah = this.value.telp_ayah;
            this.form.alamat_ayah = this.value.alamat_ayah;
            this.form.pekerjaan_ayah = this.value.pekerjaan_ayah;
            this.form.penghasilan_ayah = this.value.penghasilan_ayah;
            this.form.alamat_kantor_ayah = this.value.alamat_kantor_ayah;
            this.form.agama_ayah = this.value.agama_ayah;
            this.form.pendidikan_ayah = this.value.pendidikan_ayah;

            this.form.nama_ibu = this.value.nama_ibu;
            this.form.tmp_lahir_ibu = this.value.tmp_lahir_ibu;
            this.form.tgl_lahir_ibu = this.value.tgl_lahir_ibu;
            this.form.telp_ibu = this.value.telp_ibu;
            this.form.alamat_ibu = this.value.alamat_ibu;
            this.form.pekerjaan_ibu = this.value.pekerjaan_ibu;
            this.form.penghasilan_ibu = this.value.penghasilan_ibu;
            this.form.alamat_kantor_ibu = this.value.alamat_kantor_ibu;
            this.form.agama_ibu = this.value.agama_ibu;
            this.form.pendidikan_ibu = this.value.pendidikan_ibu;
            // if(level)
        },  
        submit() {
            this.loading = true;
            let form = this.$inertia.form(this.form);
            let url = this.editMode === true ? this.route('admin.saksi.update', {id : this.value.id}) : this.route('admin.saksi.store');
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