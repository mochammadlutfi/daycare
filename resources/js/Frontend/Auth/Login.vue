<template>
    <el-config-provider namespace="ep" :locale="locale">
        <div id="page-container" class="main-content-boxed">
            <div id="page-container" class="main-content-boxed">

                <!-- Main Container -->
                <main id="main-container">
                    <!-- Page Content -->
                    <div class="bg-image" style="background-image: url('/images/auth/1.jpg');">
                        <div class="row mx-0 bg-black-50">
                            <div class="hero-static col-md-6 col-xl-8 d-none d-md-flex align-items-md-end">
                                <div class="p-4">
                                    <p class="fs-3 fw-semibold text-white">
                                        DayCare Baiturrahman
                                    </p>
                                </div>
                            </div>
                            <div class="hero-static col-md-6 col-xl-4 d-flex align-items-md-center bg-body-extra-light">
                                <div class="content content-full">
                                    <!-- Header -->
                                    <div class="px-4 py-2 mb-4 text-center text-md-start">
                                        <a href="/" class="text-center">
                                            <img src="/images/logo/logo.png" style="width:40%"/>
                                        </a>
                                        <h2 class="h3 fw-bold mt-4 mb-2">Masuk</h2>
                                        <p>Belum Punya Akun ?<a :href="route('register')" class="text-fw-bold"> Daftar Sekarang</a></p>
                                    </div>
                                    <!-- END Header -->

                                    <!-- Sign In Form -->
                                    
                                    <el-form
                                        label-position="top"
                                        label-width="100%"
                                        @submit.prevent="submit"
                                    >
                                    <el-form-item label="Email" :error="errors.email">
                                        <el-input v-model="form.email" type="text" placeholder="Masukan Email"/>
                                    </el-form-item>
                                    <el-form-item label="Password" :error="errors.password">
                                        <el-input
                                            v-model="form.password"
                                            type="password"
                                            placeholder="Masukan password"
                                            show-password
                                        />
                                    </el-form-item>
                                    <el-button native-type="submit" type="primary" class="w-100" :loading="loading">
                                        Masuk
                                    </el-button>
                                </el-form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END Page Content -->
                </main>
                <!-- END Main Container -->
            </div>
        </div>
    </el-config-provider>
</template>

<script>
import id from 'element-plus/dist/locale/id.mjs';
export default {
    components: {
        ElConfigProvider,
    },
    setup() {
        return {
            zIndex: 3000,
            size: 'small',
            locale : id,
        }
    },
    props: {
        canResetPassword: Boolean,
        status: String,
        errors: Object,
    },
    data() {
        return {
            form: this.$inertia.form({
                'nama': '',
                'email': '',
                'password': '',
                'password_confirmation': '',
                'remember': false
            }),
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            },
            loading : false,
        }
    },

    methods: {
        submit() {
            this.loading = true;
            this.form.post(this.route('login'), {
                onFinish: () => {
                    this.form.reset('password');
                    this.loading = false;
                },
            })
        }
    }
 }

</script>
