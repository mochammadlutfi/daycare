<template>
    <header id="page-header">
        <!-- Header Content -->
        <div class="content-header">
            <!-- Left Section -->
            <div class="space-x-2 d-flex align-items-center">
                <!-- Logo -->
                <a :href="route('home')">
                    <img src="/images/logo/logo.png" height="70"/>
                </a>
                <!-- END Logo -->
            </div>
            <!-- END Left Section -->

            <!-- Right Section -->
            <div class="space-x-1 d-flex">
                <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
                <ul class="nav-main nav-main-horizontal nav-main-hover d-none d-lg-block my-md-auto">
                    <!-- <li class="nav-main-item">
                        <a class="nav-main-link" :href="route('profil.index')">
                            <i class="nav-main-link-icon fa fa-user d-none d-xl-inline-block"></i>
                            <span class="nav-main-link-name">Tentang</span>
                        </a>
                    </li>
                    <li class="nav-main-item">
                        <a class="nav-main-link" :href="route('video.index')">
                            <i class="nav-main-link-icon fa fa-video d-none d-xl-inline-block"></i>
                            <span class="nav-main-link-name">Harga</span>
                        </a>
                    </li>
                    <li class="nav-main-item">
                        <a class="nav-main-link" :href="route('aspirasi.index')">
                            <i class="nav-main-link-icon fa fa-boxes-packing d-none d-xl-inline-block"></i>
                            <span class="nav-main-link-name">Program</span>
                        </a>
                    </li> -->
                </ul>
                <a class="ep-button ep-button--primary my-md-auto d-none d-lg-block" :href="route('login')">
                    <i class="fa fa-pencil opacity-50 me-1"></i> 
                    Masuk
                </a>
                <a class="ep-button ep-button--primary my-md-auto d-none d-lg-block" :href="route('login')">
                    <i class="fa fa-pencil opacity-50 me-1"></i> 
                    Daftar
                </a>
            </div>
            <!-- END Right Section -->
        </div>
        <!-- END Header Content -->
    </header>
</template>

<style>
.base-menu-horizontal {
    border-bottom: none !important;
}

.base-menu-horizontal li {
    max-height: 30px;
}

.ep-menu--horizontal > .ep-menu-item.is-active {
    border : none !important;
}
.ep-menu--horizontal > .ep-sub-menu.is-active .ep-sub-menu__title {
    border : none !important;
}
</style>
<script>
import { Link } from '@inertiajs/vue3';
export default {
    name : "BaseHeader",
    components : {
        Link
    },
    methods:{
        doLogout(){
            alert('sa')
        }
    }
}
</script>
