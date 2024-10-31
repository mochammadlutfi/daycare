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
                                <el-form-item label="Topik" :error="errors.topik">
                                    <el-input v-model="form.topik"/>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Subtopik" :error="errors.subtopik">
                                    <el-input v-model="form.subtopik"/>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Fase" :error="errors.fase">
                                    <el-input v-model="form.fase"/>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Kelompok" :error="errors.kelompok_id">
                                    <select-kelompok v-model="form.kelompok_id"/>
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Tanggal Periode" :error="errors.tgl">
                                    <el-date-picker v-model="form.tgl" 
                                    type="daterange"
                                    range-separator="sampai" 
                                    placeholder="Tanggal"
                                    format="DD MMMM YYYY" 
                                    value-format="YYYY-MM-DD" 
                                    start-placeholder="Tanggal mulai"
                                    end-placeholder="Tanggal selesai"
                                    style="width: 100%" />
                                </el-form-item>
                            </el-col>
                            <el-col :md="12">
                                <el-form-item label="Waktu" :error="errors.waktu">
                                    <el-time-picker
                                    class="w-100"
                                    v-model="form.waktu"
                                    is-range
                                    range-separator="Sampai"
                                    start-placeholder="Jam mulai"
                                    end-placeholder="Jam selesai"
                                    format="HH:mm" 
                                    value-format="HH:mm:ss" 
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-table :data="lines" border class="mb-4">
                            <el-table-column type="index" width="50" />
                            <el-table-column label="Klasifikasi">
                                <template #default="scope">
                                    <el-select v-model="scope.row.klasifikasi">
                                        <el-option value="Nilai Agama dan Budi Pekerti">Nilai Agama dan Budi Pekerti</el-option>
                                        <el-option value="Jati Diri">Jati Diri</el-option>
                                        <el-option value="Dasar-Dasar Literasi, Matematika, Sains,  Teknologi, Rekayasa dan Seni">Dasar-Dasar Literasi, Matematika, Sains,  Teknologi, Rekayasa dan Seni</el-option>

                                    </el-select>
                                </template>
                            </el-table-column>

                            <el-table-column label="Tujuan Pembelajaran">
                                <template #default="scope">
                                    <el-input type="textarea" :rows="4" v-model="scope.row.tujuan"/>
                                </template>
                            </el-table-column>

                            <el-table-column label="Perilaku yang teramati/IKTP">
                                <template #default="scope">
                                    <el-input type="textarea" :rows="4"  v-model="scope.row.iktp"/>
                                </template>
                            </el-table-column>

                            <el-table-column align="right" width="100">
                                <template #header>
                                    <el-button
                                    size="small"
                                    type="primary"
                                    @click="addTarget()"
                                    >
                                    <i class="fa fa-plus me-1"></i>
                                    Tambah
                                    </el-button>
                                </template>
                                <template #default="scope">
                                    <el-button
                                    size="small"
                                    type="danger"
                                    @click="removeTarget(scope.$index, scope.row)"
                                    >
                                    <i class="fa fa-close me-1"></i>
                                    Hapus
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <h3 class="h5 mb-2">Rencana Kegiatan</h3>
                        <el-table :data="kegiatan" border class="mb-4">
                            <el-table-column type="index" width="50" />
                            <el-table-column label="Kegiatan">
                                <template #default="scope">
                                    <el-input v-model="kegiatan[scope.$index]"/>
                                </template>
                            </el-table-column>
                            <el-table-column align="right" width="100">
                                <template #header>
                                    <el-button
                                    size="small"
                                    type="primary"
                                    @click="addKegiatan()"
                                    >
                                    <i class="fa fa-plus me-1"></i>
                                    Tambah
                                    </el-button>
                                </template>
                                <template #default="scope">
                                    <el-button
                                    size="small"
                                    type="danger"
                                    @click="removeKegiatan(scope.$index)"
                                    >
                                    <i class="fa fa-close me-1"></i>
                                    Hapus
                                    </el-button>
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
    </base-layout>
</template>
<script>
import SelectKelompok from '@/Components/SelectKelompok.vue';
import SelectJenisKegiatan from '@/Components/SelectJenisKegiatan.vue';
import SelectKegiatan from '@/Components/SelectKegiatan.vue';
import dayjs from 'dayjs';
export default {
    components :{
        SelectKelompok,
        SelectJenisKegiatan,
        SelectKegiatan
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
            title : "Tambah RPPH Baru",
            disableKota : false,
            form : {
                topik : null,
                subtopik : null,
                fase : null,
                tgl: null,
                waktu : [
                    new dayjs().hour(8).minute(0),
                    new dayjs().hour(11).minute(0),
                ],
                kelompok_id : null,
            },
            kegiatan : [],
            lines : [],
            linesDeleted : [],
            loading : false,
        }
    },
    created(){
        if(this.editMode){
            this.setValue();
        }
    },
    methods : {
        setValue(){
            this.form.id = this.value.id;
            this.form.topik = this.value.topik;
            this.form.subtopik = this.value.subtopik;
            this.form.kelompok_id = this.value.kelompok_id;
            this.form.fase = this.value.fase;
            this.form.tgl = [
                new dayjs(this.value.tgl_mulai),
                new dayjs(this.value.tgl_selesai),
            ];
            this.form.waktu = [
                new dayjs(this.value.tgl_mulai + ' ' + this.value.jam_mulai),
                new dayjs(this.value.tgl_mulai + ' ' + this.value.jam_selesai),
            ];

            if(this.value.detail.length > 0){
                this.value.detail.forEach((d, i) => {
                    this.lines.push({
                        id : d.id,
                        tujuan : d.tujuan,
                        iktp : d.iktp,
                        klasifikasi : d.klasifikasi,
                    });
                });
            }
            if(this.value.kegiatan.length > 0){
                this.value.kegiatan.forEach((d, i) => {
                    this.kegiatan.push(d);
                });
            }
        },  
        addTarget(){
            this.lines.push({
                id : null,
                klasifikasi : null,
                tujuan : null,
                iktp : null
            });
        },
        removeTarget(index, data){
            if(data.id){
                this.linesDeleted.push(data.id);
            }
            this.lines.splice(index, 1);
        },
        addKegiatan(){
            this.kegiatan.push('');
        },
        removeKegiatan(index){
            this.kegiatan.splice(index, 1);
        },
        submit() {
            this.loading = true;
            let formData = Object.assign(this.form, {
                    lines : this.lines,
                    kegiatan : this.kegiatan,
                    linesDeleted : this.linesDeleted,
                }
            );
            let form = this.$inertia.form(formData);
            let url = this.editMode === true ? this.route('admin.rpph.update', {id : this.value.id}) : this.route('admin.rpph.store');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
                onSuccess: () => {
                    return this.$swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: `RPPH Ditambahkan!`,
                        showCancelButton: true,
                        confirmButtonText: 'Tambah Lainnya',
                        cancelButtonText: 'Kembali',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$inertia.visit(this.route("user.pendukung.create"));
                        }
                    });
                },
            });
        }
    }
}
</script>