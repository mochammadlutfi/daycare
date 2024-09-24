<template>
    <user-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <div>
                    Detail Anak
                    <span class="badge bg-success" v-if="data.status == 'Aktif'">
                        Aktif
                    </span>
                    <span class="badge bg-warning" v-if="data.status == 'Pending'">
                        Menunggu Konfirmasi
                    </span>
                </div>
                <div class="space-x-1">

                </div>
            </div>
            <div class="block rounded-2">
                <div class="block-content">
                    <el-row class="mb-2" :gutter="10">
                        <el-col :md="8">Nama Lengkap</el-col>
                        <el-col :md="16">
                            : <span class="fw-semibold">{{ data.nama }}</span>
                        </el-col>
                    </el-row>
                    <el-row class="mb-2" :gutter="10">
                        <el-col :md="8">Nama Panggilan</el-col>
                        <el-col :md="16">
                            : <span class="fw-semibold">{{ data.username }}</span>
                        </el-col>
                    </el-row>
                    <el-row class="mb-2" :gutter="10">
                        <el-col :md="8">Jenis Kelamin</el-col>
                        <el-col :md="16">
                            : <span class="fw-semibold">{{ (data.jk == 'L' ? 'Laki-Laki' : 'Perempuan') }}</span>
                        </el-col>
                    </el-row>
                    <el-row class="mb-2" :gutter="10">
                        <el-col :md="8">Tempat / Tanggal Lahir</el-col>
                        <el-col :md="16">
                            :  <span class="fw-semibold">{{ data.tmp_lahir }} / {{ data.tgl_lahir }}</span>
                        </el-col>
                    </el-row>
                    <el-row class="mb-2" :gutter="10">
                        <el-col :md="8">Anak Ke</el-col>
                        <el-col :md="16">
                            :  <span class="fw-semibold">{{ data.anak_ke }}</span>
                        </el-col>
                    </el-row>
                    <el-row class="mb-2" :gutter="10">
                        <el-col :md="8">Jarak Rumah</el-col>
                        <el-col :md="16">
                            :  <span class="fw-semibold">{{ data.jarak }} Km</span>
                        </el-col>
                    </el-row>
                    <el-row class="mb-2" :gutter="10">
                        <el-col :md="8">Alamat</el-col>
                        <el-col :md="16">
                            :  <span class="fw-semibold">{{ data.alamat }}</span>
                        </el-col>
                    </el-row>
                    
                    <el-row class="mb-2" :gutter="10">
                        <el-col :md="8">Sosialisasi dengan lingkungan</el-col>
                        <el-col :md="16">
                            :  <span class="fw-semibold">{{ data.sosialisasi_dengan_lingkungan_anak }}</span>
                        </el-col>
                    </el-row>
                    <el-row class="mb-2" :gutter="10">
                        <el-col :md="8">Sakit yang pernah diderita</el-col>
                        <el-col :md="16">
                            :  <span class="fw-semibold">{{ data.sakit_yang_pernah_diderita_anak }}</span>
                        </el-col>
                    </el-row>
                    <el-row class="mb-2" :gutter="10">
                        <el-col :md="8">Makanan yang disukai</el-col>
                        <el-col :md="16">
                            :  <span class="fw-semibold">{{ data.makanan_yang_disukai_anak }}</span>
                        </el-col>
                    </el-row>
                    <el-row class="mb-2" :gutter="10">
                        <el-col :md="8">Makanan yang tidak disukai</el-col>
                        <el-col :md="16">
                            :  <span class="fw-semibold">{{ data.makanan_yang_tidak_disukai_anak }}</span>
                        </el-col>
                    </el-row>
                    <el-row class="mb-2" :gutter="10">
                        <el-col :md="8">Memiliki Alergi</el-col>
                        <el-col :md="16">
                            :  <span class="fw-semibold">{{ data.memiliki_alergi_anak }}</span>
                        </el-col>
                    </el-row>
                    <el-row class="mb-2" :gutter="10">
                        <el-col :md="8">Scan Akte Kelahiran</el-col>
                        <el-col :md="16">
                            :  
                            <a :href="`/uploads/${data.scan_akte}`" class="ep-button ep-button--primary" target="_blank" v-if="data.scan_akte">
                                Lihat Akte Kelahiran
                            </a>
                            <template v-else>
                                -
                            </template>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </user-layout>
</template>

<script>
export default {
    props :{
        data : {
            type : Object
        }
    }
}
</script>