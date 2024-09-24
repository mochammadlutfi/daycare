<template>
    <base-layout>
        <div class="content">
            <el-form label-position="top" label-width="100%" @submit.prevent="submit">
                <div class="content-heading d-flex justify-content-between align-items-center">
                    <span>{{ title }}</span>
                </div>
                
                <div class="block rounded">
                    <div class="block-content p-4" v-loading="loading">
                        <el-row :gutter="40">
                            <el-col :md="12">
                                <el-form-item label="Tanggal" :error="errors.tgl">
                                    <el-date-picker v-model="form.tgl" type="date" placeholder="Tanggal"
                                        format="DD MMMM YYYY" value-format="YYYY-MM-DD" style="width: 100%" />
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Kelompok" :error="errors.kelompok_id">
                                    <select-kelompok v-model="form.kelompok_id" @change="fetchAnak"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="mb-3">
                            <el-button type="primary" @click="openQR">
                                Scan QR
                            </el-button>
                        </div>
                        <el-table :data="lines" border class="mb-4" id="variant">
                            <el-table-column label="Nama Anak">
                                <template #default="scope">
                                    {{ scope.row.anak_nama }}
                                </template>
                            </el-table-column>
                            <el-table-column label="Status">
                                <template #default="scope">
                                    <el-select v-model="scope.row.status" placeholder="Pilih" class="w-100" @change="updateStatus(scope.$index, scope.row.status)">
                                        <el-option label="Hadir" value="Hadir"/>
                                        <el-option label="Izin" value="Izin"/>
                                        <el-option label="Sakit" value="Sakit"/>
                                        <el-option label="Alpa" value="Tanpa Keterangan"/>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="Jam Masuk">
                                <template #default="scope">
                                    <el-time-picker v-model="scope.row.check_in"  format="HH:mm" value-format="HH:mm:ss" :disabled="(scope.row.status != 'Hadir' ? true : false)" />
                                </template>
                            </el-table-column>
                            <el-table-column label="Jam Pulang">
                                <template #default="scope">
                                    <el-time-picker v-model="scope.row.check_out"  format="HH:mm" value-format="HH:mm:ss" :disabled="(scope.row.status != 'Hadir' ? true : false)"  />
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-button native-type="submit" type="primary" :loading="loading">
                            <i class="fa fa-check me-2"></i>
                            Simpan
                        </el-button>
                    </div>
                </div>
            </el-form>
        </div>
        <el-dialog v-model="showScanner" title="Absen QR" width="40%">
            <qrcode-stream
                @detect="onDetect"
                >
            </qrcode-stream>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="onCloseForm">
                        <i class="fa fa-close me-2"></i>
                        Batal
                    </el-button>
                    <el-button type="primary">
                        <i class="fa fa-check me-2"></i>
                        Simpan
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </base-layout>
</template>
<script>
import SelectKelompok from '@/Components/SelectKelompok.vue';
import { QrcodeStream } from 'vue-qrcode-reader';
import dayjs from 'dayjs';
export default {
    components :{
        SelectKelompok,
        QrcodeStream,
    },
    props :{
        value : {
            type : Object,
        },
        editMode : {
            type : Boolean,
            default : false,
        },
        errors : {
            type : Object,
        }
    },
    data(){
        return {
            title : "Tambah Absen Baru",
            disableKota : false,
            form : {
                tgl: dayjs().format(),
                kelompok_id : null,
                jenis_id : null,
                kegiatan_id : null,
            },
            lines : [],
            cameraPermission : 'prompt',
            loading : false,
            showScanner : false
        }
    },
    created(){
        if(this.editMode){
            this.setValue();
        }
    },
    methods : {
        updateStatus(index, status)
        {
            console.log(index);
            if(status == 'Hadir'){
                this.lines[index].check_in = new dayjs('07:00:00', 'HH:mm:ss').format('HH:mm:ss');
                this.lines[index].check_out = new dayjs('16:30:00', 'HH:mm:ss').format('HH:mm:ss');
            }else{
                this.lines[index].check_in = '';
                this.lines[index].check_out = '';
            }
        },
        setValue(){
            this.title = 'Ubah Absen';
            this.form.tgl = this.value.tgl;
            this.form.kelompok_id = this.value.kelompok_id;
        },  
        async fetchAnak(){
            try {
                this.isLoading = true;
                this.lines = [];
                const response = await axios.get(this.route("admin.absen.anak"),{
                    params: {
                        kelompok_id : this.form.kelompok_id,
                        tgl : this.form.tgl,
                    }
                });
                if(response.status == 200){
                    response.data.forEach((d, i) => {
                        this.lines.push({
                            id : null,
                            anak_id : d.anak_id,
                            user_id : d.user_id,
                            anak_nama : d.anak_nama,
                            status : d.status,
                            check_in : new dayjs(d.check_in, 'HH:mm:ss').format('HH:mm:ss'),
                            check_out : new dayjs(d.check_out, 'HH:mm:ss').format('HH:mm:ss'),
                        });
                    });
                }
                this.isLoading = false;
            } catch (error) {
                console.error(error);
            }
        },
        submit() {
            this.loading = true;
            let formData = Object.assign(this.form, {
                    lines : this.lines
                }
            );
            let form = this.$inertia.form(formData);
            let url = this.editMode === true ? this.route('admin.absen.update', {id : this.value.id}) : this.route('admin.absen.store');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
                onSuccess: () => {

                },
            });
        },
        openQR(){
            // this.checkCameraPermission();
            this.showScanner = true;
        },
        async onDetect(detectedCodes) {
            const result = JSON.stringify(detectedCodes.map((code) => code.rawValue))
            console.log(result);
            // this.paused = true
            await this.timeout(500)
            // this.paused = false
        },
        timeout(ms) {
            return new Promise((resolve) => {
                window.setTimeout(resolve, ms)
            })
        },
        checkCameraPermission() {
        navigator.permissions.query({ name: 'camera' })
            .then((permissionStatus) => {
                this.cameraPermission = permissionStatus.state;
                permissionStatus.onchange = () => {
                    this.cameraPermission = permissionStatus.state;
                };
            })
            .catch((error) => {
                console.error("Error checking camera permission:", error);
            });
        },

    }
}
</script>