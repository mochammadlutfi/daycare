<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                Detail Testimoni
            </div>
            <div class="block block-rounded">
                <div class="block-content p-3">
                    <el-descriptions :column="2">
                        <el-descriptions-item label="Nama Lengkap">{{ data.nama }}</el-descriptions-item>
                        <el-descriptions-item label="Pekerjaan">{{ data.pekerjaan }}</el-descriptions-item>
                        <el-descriptions-item label="No Handphone">{{ data.phone }}</el-descriptions-item>
                        <el-descriptions-item label="Email">{{ data.email }}</el-descriptions-item>
                        <el-descriptions-item label="Tanggal">
                            {{ format_date(data.created_at) }}
                        </el-descriptions-item>
                        <el-descriptions-item label="Status">
                            <el-tag v-if="data.status=='pending'" type="warning">Pending</el-tag>
                            <el-tag v-else-if="data.status=='approve'" type="primary">Terima</el-tag>
                            <el-tag v-else type="danger">Tolak</el-tag>
                        </el-descriptions-item>
                    </el-descriptions>
                    <p>
                        {{ data.deskripsi }}
                    </p>
                </div>
            </div>
        </div>
    </base-layout>
</template>

<script>
import moment from 'moment';
export default {
    setup() {
        
    },
    props : {
        data : Object
    },
    methods :{
        format_date(value){
            if (value) {
                return moment(String(value)).format('DD MMMM YYYY')
            }
        },
    }
}
</script>