<template>
    <user-layout title="Profil Akun">
        <el-row justify="center">
            <el-col :md="12">
                <div class="content">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h3 class="fs-4 fw-bold mb-0">Ubah Profil</h3>
                        <div class="space-x-1">
                        </div>
                    </div>
                    <div class="block rounded" v-loading="isLoading">
                        <div class="block-content p-4">
                            <el-form label-position="top" label-width="100%" @submit.prevent="submit">
                                <el-form-item label="Nama Lengkap" :error="errors.nama">
                                    <el-input v-model="form.nama" type="text" placeholder="Masukan Nama Lengkap"/>
                                </el-form-item>
                                <el-form-item label="Email" :error="errors.email">
                                    <el-input v-model="form.email" type="text" placeholder="Masukan Email"/>
                                </el-form-item>
                                <el-button native-type="submit" type="primary" class="w-100">
                                    Simpan
                                </el-button>
                            </el-form>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </user-layout>
</template>
<script>
export default {
    props : {
        data : Object,
        errors: Object
    },
    data (){
        return {
            isLoading : false,
            form : {
                nama : this.data.nama,
                email : this.data.email
            }
        }
    },
    methods : {
        submit() {
            this.isLoading = true;
            let form = this.$inertia.form(this.form);
            form.post(this.route('user.profile'), {
                preserveScroll: true,
                onSuccess: () => {
                    ElMessage({
                        type: 'success',
                        message: 'Profil berhasil diperbaharui!',
                    });
                },
                onFinish:() => {
                    this.isLoading = false;
                },
            });
        }
    }
}
</script>