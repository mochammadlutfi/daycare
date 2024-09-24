<template>
    <base-layout>
        <div class="content">
            <el-row :gutter="20">
                <el-col :md="8" v-for="(d, i) in data" :key="i">
                    <a class="block block-rounded block-link-shadow text-end" href="javascript:void(0)">
                        <div
                            class="block-content block-content-full d-sm-flex justify-content-between align-items-center">
                            <div class="item item-circle bg-black-10 my-auto" v-html="d.icon">
                            </div>
                            <div>
                                <div class="fs-3 fw-semibold">{{ d.value }}</div>
                                <div class="fs-sm fw-semibold text-uppercase text-muted">{{ d.name }}</div>
                            </div>
                        </div>
                    </a>
                </el-col>
            </el-row>
        </div>
    </base-layout>
</template>
<script>
export default {
    props : {
        data : Object,
    }
}
</script>