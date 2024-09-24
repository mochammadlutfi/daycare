<template>
    <base-layout>
        <Head>
            <title>Home</title>
            <meta name="description" content="Kang Ebod, Makhfudz Solaeman">
        </Head>
        <div class="bg-body-extra-light">
            <div class="content content-full">
                <img src="/images/daycare-baiturrahmah.jpeg" class="img-fluid"/>
            </div>
        </div>
        <div class="content content-full" id="program">
            <div class="py-5">
                <div class="position-relative">
                    <h2 class="fw-bold mb-2 text-center">
                        Program & Kegiatan
                        <span class="text-primary">Daycare</span>
                    </h2>
                </div>
            </div>
            <el-row :gutter="20">
                <el-col :md="8" v-for="(d, i) in program" :key="i" class="program_item">
                    <div class="block block-rounded">
                        <div class="block-content">
                            <div class="text-center">
                                <img :src="d.icon" class="mb-2"/>
                                <h4 class="fw-bold fs-5 mb-2">
                                    {{ d.title}}
                                </h4>
                            </div>
                            <p>{{  d.content }}</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="content content-full" id="harga">
            <div class="py-5">
                <div class="position-relative">
                    <h2 class="fw-bold mb-2 text-center">
                        Harga
                        <span class="text-primary">Daycare</span>
                    </h2>
                </div>
            </div>
            <el-row :gutter="20">
                <el-col :md="12">
                    <div class="block block-rounded">
                        <div class="block-content block-content-full">
                            <div class="border-3 border-bottom d-flex justify-content-between pb-2">
                                <div class="space-x">
                                    <div class="fs-4 fw-bold">Pembangunan</div>
                                    <div class="fs-xs">Dibayar Sekali</div>
                                </div>
                                <div class="my-auto">
                                    <div class="fs-3 fw-bold text-primary">
                                        {{ currency(biaya.pembangunan) }}
                                    </div>
                                </div>
                            </div>
                            <div class="border-3 border-bottom d-flex justify-content-between pb-2">
                                <div class="space-x">
                                    <div class="fs-4 fw-bold">Pendaftaran</div>
                                    <div class="fs-xs">Dibayar Sekali</div>
                                </div>
                                <div class="my-auto">
                                    <div class="fs-3 fw-bold text-primary">
                                        {{ currency(biaya.pendaftaran) }}
                                    </div>
                                </div>
                            </div>
                            <div class="border-3 border-bottom d-flex justify-content-between pb-2">
                                <div class="space-x">
                                    <div class="fs-4 fw-bold">SPP</div>
                                    <div class="fs-xs">SPP Bulanan untuk umur (0-3) & (3-6)</div>
                                </div>
                                <div class="my-auto">
                                    <div class="fs-3 fw-bold text-primary">
                                        {{ currency(biaya.spp) }}
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="space-x">
                                    <div class="fs-3 fw-bold">TOTAL</div>
                                </div>
                                <div class="my-auto">
                                    <div class="fs-3 fw-bold text-primary">
                                        {{ currency(biaya.spp+biaya.pembangunan+biaya.pendaftaran) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- <video-slide/> -->
         <div class="bg-white">
            <div class="content content-full">
                <div class="py-5">
                    <div class="position-relative">
                        <h2 class="fw-bold mb-2 text-center">
                            Temukan
                            <span class="text-primary">Kami</span>
                        </h2>
                    </div>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31686.824535058073!2d107.639729!3d-6.908167!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7c0cd32e517%3A0x553a1ee4af48c915!2sDaycare%20Baiturrahmah%20Cicadas!5e0!3m2!1sen!2sus!4v1726906007899!5m2!1sen!2sus"
                    width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
         </div>
    </base-layout>
</template>

<style scoped>
.program_item {
  display: flex;
  flex-direction: column;
}
.program_item .block {
  flex: 1;
}

.program_item img{
    width:64px;
    text-align: center;
}

</style>

<script>
import { Head } from '@inertiajs/vue3'
import VideoSlide from './Video/VideoSlide.vue';
import Biaya from '@/Admin/Biaya.vue';
export default {
    components: {
        Head,
        VideoSlide,
    },
    props : {
        data : {
            type : Object,
        },
        program : {
            type : Object,
        },
        biaya : {
            type : Object,
        }
    },
}
</script>