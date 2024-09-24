<template>
    <base-layout>
        <Head>
            <title>{{ data.title }}</title>
            <meta name="description" content="Kang Ebod, Makhfudz Solaeman">
        </Head>
        <div class="content">
            <div class="block block-rounded">
                <div class="block-content p-0">
                    <YoutubeVue3 ref="youtube" :videoid="data.youtube_id" width="100%" :height="600" :loop="1" :autoplay="1"/>
                </div>
                <div class="block-content p-3">
                    <h2 class="h4 fw-bold mb-2">{{ data.title }}</h2>
                    <div class="story" v-html="data.description"></div>
                </div>
            </div>
        </div>
    </base-layout>
</template>
<script>
import { YoutubeVue3 } from 'youtube-vue3'
import { Head } from '@inertiajs/vue3';
export default {
    components : {
        Head,
        YoutubeVue3
    },
    props : {
        data : Object
    },
    methods : {
        onEnded() {
        console.log("## OnEnded")
        },
        onPaused() {
        console.log("## OnPaused")
        },
        onPlayed() {
        console.log("## OnPlayed")
        },
    }
}
</script>