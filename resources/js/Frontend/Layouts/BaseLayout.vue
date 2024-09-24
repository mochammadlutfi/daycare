<template>
    <el-config-provider namespace="ep" :locale="locale">
        <div id="page-container" :class="classContainer">
            
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
                            <li class="nav-main-item">
                                <a class="nav-main-link" href="#program">
                                    <span class="nav-main-link-name">Program</span>
                                </a>
                            </li>
                            <li class="nav-main-item">
                                <a class="nav-main-link" href="#harga">
                                    <span class="nav-main-link-name">Harga</span>
                                </a>
                            </li>
                            <li class="nav-main-item">
                                <a class="nav-main-link" href="#lokasi">
                                    <span class="nav-main-link-name">Lokasi Kami</span>
                                </a>
                            </li>
                        </ul>
                        <template v-if="$page.props.user">
                        <a class="ep-button ep-button--primary my-md-auto d-none d-lg-block"
                            :href="route('user.dashboard')">
                            Portal Orang Tua
                        </a>
                        </template>
                        <template v-else>
                        <a class="ep-button ep-button--primary my-md-auto d-none d-lg-block"
                            :href="route('login')">
                            Masuk 
                        </a>
                        <a class="ep-button ep-button--primary my-md-auto d-none d-lg-block"
                            :href="route('register')">
                            Daftar 
                        </a>
                        </template>

                        <button type="button" class="btn btn-sm btn-alt-secondary d-lg-none" @click.prevent="sidebar = true">
                            <i class="fa fa-fw fa-bars"></i>
                        </button>
                    </div>
                    <!-- END Right Section -->
                </div>
                <!-- END Header Content -->
            </header>

            <nav id="sidebar">
                <!-- Sidebar Content -->
                <div class="sidebar-content">
                    <!-- Side Header -->
                    <div class="content-header justify-content-lg-center">
                        <!-- Logo -->
                        <div>
                            <a :href="route('home')">
                                <img src="/images/logo/logo.png" height="70"/>
                            </a>
                        </div>
                        <!-- END Logo -->

                        <!-- Options -->
                        <div>
                            <!-- Close Sidebar, Visible only on mobile screens -->
                            <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
                            <button type="button" class="btn btn-sm btn-alt-danger d-lg-none" @click="sidebar = false">
                                <i class="fa fa-fw fa-times"></i>
                            </button>
                            <!-- END Close Sidebar -->
                        </div>
                        <!-- END Options -->
                    </div>
                    <!-- END Side Header -->

                    <!-- Sidebar Scrolling -->
                    <div class="js-sidebar-scroll" data-simplebar="init">
                        <div class="simplebar-wrapper" style="margin: 0px;">
                            <div class="simplebar-height-auto-observer-wrapper">
                                <div class="simplebar-height-auto-observer"></div>
                            </div>
                            <div class="simplebar-mask">
                                <div class="simplebar-offset" style="right: 0px; bottom: 0px;">
                                    <div class="simplebar-content-wrapper" tabindex="0" role="region"
                                        aria-label="scrollable content" style="height: 100%; overflow: hidden;">
                                        <div class="simplebar-content" style="padding: 0px;">
                                            <!-- Side Main Navigation -->
                                            <div class="content-side content-side-full">
                                                <!-- <ul class="nav-main">
                                                    <li class="nav-main-item">
                                                        <a class="nav-main-link"  :href="route('profil')">
                                                            <i class="nav-main-link-icon fa fa-user"></i>
                                                            <span class="nav-main-link-name">Profil</span>
                                                        </a>
                                                    </li>
                                                    <li class="nav-main-item">
                                                        <a class="nav-main-link" :href="route('video.index')">
                                                            <i class="nav-main-link-icon fa fa-video"></i>
                                                            <span class="nav-main-link-name">Video</span>
                                                        </a>
                                                    </li>
                                                    <li class="nav-main-item">
                                                        <a class="nav-main-link" :href="route('video.index')">
                                                            <i class="nav-main-link-icon fa fa-boxes-packing"></i>
                                                            <span class="nav-main-link-name">Aspirasi</span>
                                                        </a>
                                                    </li>
                                                    <li class="nav-main-item">
                                                        <a class="nav-main-link" :href="route('video.index')">
                                                            <i class="nav-main-link-icon fa fa-thumbs-up"></i>
                                                            <span class="nav-main-link-name">Testimoni</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <a class="ep-button ep-button--primary w-100"
                                                    :href="route('dukungan.create')">
                                                    <i class="fa fa-pencil opacity-50 me-1"></i> 
                                                    Tulis Dukunganmu 
                                                </a> -->
                                            </div>
                                            <!-- END Side Main Navigation -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="simplebar-placeholder" style="width: 390px; height: 706px;"></div>
                        </div>
                        <div class="simplebar-track simplebar-horizontal" style="visibility: hidden;">
                            <div class="simplebar-scrollbar" style="width: 0px; display: none;"></div>
                        </div>
                        <div class="simplebar-track simplebar-vertical" style="visibility: hidden;">
                            <div class="simplebar-scrollbar"
                                style="height: 0px; display: none; transform: translate3d(0px, 0px, 0px);"></div>
                        </div>
                    </div>
                    <!-- END Sidebar Scrolling -->
                </div>
                <!-- Sidebar Content -->
            </nav>

            <!-- Main Container -->
            <div id="main-container">
                <slot />
            </div>
            <!-- END Main Container -->
        </div>
    </el-config-provider>
</template>
  
<script>
    //   import { ElConfigProvider } from 'element-plus';
    import id from 'element-plus/dist/locale/id.mjs'
    export default {
        name: 'BaseLayout',
        components: {
            ElConfigProvider
        },
        data(){
            return {
                sidebar : false,
                limitPosition: 500,
                scrolled: false,
                lastPosition: 0,
            }
        },
        computed : {  
            classContainer() {
                return {
                    'side-scroll': true,
                    'main-content-boxed': true,
                    'side-trans-enabled': true,
                    'page-header-fixed': this.scrolled,
                    'sidebar-o': this.sidebar,
                }
            },
        },
        beforeMount() {
            window.addEventListener("scroll", this.handleScroll);
        },
        methods : {
            
            handleScroll() {
            if (100 < window.scrollY) {
                this.scrolled = true;
                // move up!
            }

            if (100 > window.scrollY) {
                this.scrolled = false;
                // move down
            }

            this.lastPosition = window.scrollY;
            },
        },
        setup() {
            return {zIndex: 3000, size: 'small', locale: id}
        }
    }
</script>