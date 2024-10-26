<template>
    <el-config-provider namespace="ep" :locale="locale">
        <Head>
            <title>{{ title }}</title>
        </Head>

        <el-container id="page-container" :class="classContainer">
            
            <div id="sidebar">
                <div class="sidebar-content">
                    <!-- Side Header -->
                    <div class="d-flex justify-content-center p-3">
                        <!-- Logo -->
                        <div class="text-center">
                            <a :href="route('user.dashboard')" class="mx-auto">
                                <img src="/images/logo/logo.png" class="w-50"/>
                            </a>
                        </div>
                        <!-- END Logo -->
                         <div>
                            <!-- Close Sidebar, Visible only on mobile screens -->
                            <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
                            <button type="button" class="btn btn-sm btn-alt-danger d-lg-none" @click.prevent="sidebarMobile = !sidebarMobile">
                            <i class="fa fa-fw fa-times"></i>
                            </button>
                            <!-- END Close Sidebar -->
                        </div>
                    </div>
                    <!-- END Side Header -->

                    <!-- Sidebar Scrolling -->

                    <!-- <div class="js-sidebar-scroll"> -->
                        <!-- Side Navigation -->
                        <simplebar data-simplebar-auto-hide="false" class="js-sidebar-scroll">
                            <div class="content-side content-side-full pb-5">
                                <base-navigation :nodes="$page.props.menu"></base-navigation>
                            </div>
                        </simplebar>
                        <!-- END Side Navigation -->
                    <!-- </div> -->
                    <!-- END Sidebar Scrolling -->
                </div>
            </div>
            
            <header id="page-header">
                <!-- Header Content -->
                <div class="content-header">
                    <!-- Left Section -->
                    <div class="space-x-1">
                        <!-- Toggle Sidebar -->
                        <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
                        <button type="button" class="btn btn-sm btn-alt-secondary d-none d-md-block" @click.prevent="sidebar = !sidebar">
                            <i class="fa fa-fw fa-bars"></i>
                        </button>
                        <button type="button" class="btn btn-sm btn-alt-secondary d-block d-md-none" @click.prevent="sidebarMobile = !sidebarMobile">
                            <i class="fa fa-fw fa-bars"></i>
                        </button>
                        <!-- END Toggle Sidebar -->
                    </div>
                    <!-- END Left Section -->

                    <!-- Right Section -->
                    <div class="space-x-1">
                        <!-- User Dropdown -->
                        <el-dropdown trigger="click" popper-class="dropdown-user">
                            <button type="button" class="btn btn-sm btn-alt-secondary" id="page-header-user-dropdown"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-user d-sm-none"></i>
                                <span class="ms-2">{{ $page.props.user.nama }}</span>
                                <i class="fa fa-angle-down opacity-50 ms-1"></i>
                            </button>
                            <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <a class="dropdown-item d-flex align-items-center justify-content-between space-x-1" 
                                    :href="route('user.profile')">
                                        <span class="fs-sm fw-500">Profil Akun</span>
                                        <i class="fa fa-fw fa-user opacity-25"></i>
                                    </a>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <a class="dropdown-item d-flex align-items-center justify-content-between space-x-1" 
                                    :href="route('user.orangtua.index')">
                                        <span class="fs-sm fw-500">Profil Orang Tua</span>
                                        <i class="fa fa-fw fa-lock opacity-25"></i>
                                    </a>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <a class="dropdown-item d-flex align-items-center justify-content-between space-x-1" 
                                    :href="route('user.password')">
                                        <span class="fs-sm fw-500">Password</span>
                                        <i class="fa fa-fw fa-lock opacity-25"></i>
                                    </a>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <Link :href="route('logout')" method="post" as="button" type="button" class="btn-logout dropdown-item d-flex align-items-center justify-content-between space-x-1">
                                        <span class="fs-sm fw-500">Keluar</span>
                                        <i class="fa fa-fw fa-sign-out-alt opacity-25"></i>
                                    </Link>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <!-- END User Dropdown -->
                    </div>
                    <!-- END Right Section -->
                </div>
                <!-- END Header Content -->
            </header>


            <div id="main-container">
                <slot />
            </div>

        </el-container>
    </el-config-provider>
</template>
  
<script>
    import { Link, Head } from '@inertiajs/vue3';
    import id from 'element-plus/dist/locale/id.mjs'
    import BaseNavigation from './BaseNavigation.vue';
    import simplebar from 'simplebar-vue';
    export default {
        name : 'AuthenticatedLayout',
        components: {
            simplebar,
            ElConfigProvider,
            Link,
            BaseNavigation,
            Head
        },
        data (){
            return {
                sidebar : true,
                sidebarMobile : false,
            }
        },
        computed : {  
            classContainer() {
                return {
                    'side-scroll': true,
                    'main-content-boxed': true,
                    'side-trans-enabled': true,
                    'page-header-fixed': true,
                    'enable-page-overlay' : true,
                    'sidebar-o': this.sidebar,
                    'sidebar-o-xs': this.sidebarMobile,
                }
            },
        },
        props : {
            title : {
                type : String,
                default : '',
            }
        },
        mounted(){
            if(route().current('register.detail') || route().current('verification.notice')){
                this.sidebar = false;
            }
            // this.sidebarMobile = false;
        },
        setup() {
            return {
                zIndex: 3000,
                size: 'small',
                locale : id,
            }
        },
    }
  </script>