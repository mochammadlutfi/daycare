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
                            <el-col :md="8">
                                <el-form-item label="Tanggal" :error="errors.tgl">
                                    <el-date-picker v-model="form.tgl" type="date" placeholder="Tanggal"
                                        format="DD-MM-YYYY" value-format="YYYY-MM-DD" class="w-100"/>
                                    <span class="fs-xs">Tanggal Bisa Diketik atau dipilih (DD-MM-YYYY)</span>
                                </el-form-item>
                            </el-col>
                            <el-col :md="8">
                                <el-form-item label="Kelompok" :error="errors.kelompok_id">
                                    <select-kelompok v-model="form.kelompok_id"/>
                                </el-form-item>
                            </el-col>
                            <el-col :md="8">
                                <el-form-item label="Anak" :error="errors.anak_id">
                                    <select-anak v-model="form.anak_id" :disabled="(form.kelompok_id) ? false : true" hasParent :kelompok_id="form.kelompok_id" />
                                </el-form-item>
                            </el-col>
                            <el-col :md="8">
                                <el-form-item label="Tinggi Badan" :error="errors.tinggi">
                                    <el-input v-model="form.tinggi">
                                        <template #append>
                                            <span>CM</span>
                                        </template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :md="8">
                                <el-form-item label="Berat Badan" :error="errors.berat">
                                    <el-input v-model="form.berat">
                                        <template #append>
                                            <span>Kg</span>
                                        </template>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item :error="errors.perkembangan_nilai_agama_dan_moral">
                            <template #label>
                                <div class="d-flex justify-content-between">
                                    <label class="ep-form-item__label my-auto">Perkembangan Nilai Agama dan Moral</label>
                                    <el-button @click.prevent="openModal('Perkembangan Nilai Agama dan Moral')">Riwayat nilai harian</el-button>
                                </div>
                            </template>
                            <el-input type="textarea" rows="4" v-model="form.perkembangan_nilai_agama_dan_moral" placeholder="Masukan Penilaian Perkembangan Nilai Agama dan Moral"/>
                        </el-form-item>

                        <el-form-item label="Perkembangan Sosial dan Emosional" :error="errors.perkembangan_sosial_emosional">
                            <template #label>
                                <div class="d-flex justify-content-between">
                                    <label class="ep-form-item__label my-auto">Perkembangan Sosial dan Emosional</label>
                                    <el-button @click.prevent="openModal('Perkembangan Sosial dan Emosional')">Riwayat nilai harian</el-button>
                                </div>
                            </template>
                            <el-input type="textarea" rows="4" v-model="form.perkembangan_sosial_emosional" placeholder="Masukan Penilaian Perkembangan Sosial dan Emosional"/>
                        </el-form-item>

                        <el-form-item label="Perkembangan Fisik dan Motorik" :error="errors.perkembangan_fisik_motorik">
                            <template #label>
                                <div class="d-flex justify-content-between">
                                    <label class="ep-form-item__label my-auto">Perkembangan Fisik dan Motorik</label>
                                    <el-button @click.prevent="openModal('Perkembangan Fisik dan Motorik')">Riwayat nilai harian</el-button>
                                </div>
                            </template>
                            <el-input type="textarea" rows="4" v-model="form.perkembangan_fisik_motorik" placeholder="Masukan Fisik dan Motorik"/>
                        </el-form-item>

                        <el-form-item label="Perkembangan Kognitif" :error="errors.perkembangan_kognitif">
                            <template #label>
                                <div class="d-flex justify-content-between">
                                    <label class="ep-form-item__label my-auto">Perkembangan Kognitif</label>
                                    <el-button @click.prevent="openModal('Perkembangan Kognitif')">Riwayat nilai harian</el-button>
                                </div>
                            </template>
                            <el-input type="textarea" rows="4" v-model="form.perkembangan_kognitif" placeholder="Masukan Penilaian Perkembangan Kognitif"/>
                        </el-form-item>

                        <el-form-item label="Perkembangan Bahasa" :error="errors.perkembangan_bahasa">
                            <template #label>
                                <div class="d-flex justify-content-between">
                                    <label class="ep-form-item__label my-auto">Perkembangan Bahasa</label>
                                    <el-button @click.prevent="openModal('Perkembangan Bahasa')">Riwayat nilai harian</el-button>
                                </div>
                            </template>
                            <el-input type="textarea" rows="4" v-model="form.perkembangan_bahasa" placeholder="Masukan Perkembangan Bahasa"/>
                        </el-form-item>
                        <el-button native-type="submit" type="primary" :loading="loading">
                            <i class="fa fa-check me-2"></i>
                            Simpan
                        </el-button>
                    </div>
                </div>
            </el-form>
        </div>
        <el-dialog v-model="modalShow" :title="modalTitle" width="80%" :before-close="modalClose" v-loading="modalLoading">
            <el-table :data="modalData" class="w-100">
                <el-table-column type="index" width="50" />
                <el-table-column prop="tgl" label="Tanggal"/>
                <el-table-column prop="kegiatan" label="Kegiatan"/>
                <el-table-column prop="jenis" label="Jenis"/>
                <el-table-column prop="nilai" label="Penilaian"/>
                <el-table-column prop="keterangan" label="Keterangan"/>
                <el-table-column label="Grafik">
                    <template #default="scope">
                        <el-button size="sm" type="primary" @click="openChart(scope.row.kegiatan_id)">
                            Detail
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog v-model="chartShow" :title="chartTitle" width="60%" v-loading="chartLoading">
            <Line :data="chartData" :options="chartOptions"/>
        </el-dialog>
    </base-layout>
</template>
<script>
import SelectKelompok from '@/Components/SelectKelompok.vue';
import SelectAnak from '@/Components/SelectAnak.vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)
export default {
    components :{
        SelectKelompok,
        SelectAnak,
        Line
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
            title : "Tambah Raport Baru",
            disableKota : false,
            form : {
                tgl: new dayjs().format(),
                kelompok_id : null,
                anak_id : null,
                tinggi : null,
                berat : null,
                perkembangan_nilai_agama_dan_moral : null,
                perkembangan_sosial_emosional : null,
                perkembangan_fisik_motorik : null,
                perkembangan_kognitif : null,
                perkembangan_bahasa : null,
            },
            loading : false,
            modalLoading : false,
            modalShow : false,
            modalTitle : 'Detail Nilai',
            chartLoading : false,
            chartShow : false,
            chartTitle : 'Grafik Perkembangan',
            chartLabels : [],
            chartValues : [],
        }
    },
    computed : {
        chartData() {
            return {
                labels: this.chartLabels,
                datasets: [
                    {
                        data: this.chartValues,
                        fill: true,
                        lineTension: 0.8,
                        backgroundColor: 'rgba(240,184,110,0.4)',
                        borderColor: 'rgba(240,184,110, 1)',
                        borderWidth: 2,
                    }
                ],
            }
        },
        chartOptions(){
            return {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                    y: {
                        stepSize: 1,
                        precision: 0,
                        ticks: {
                            callback: function(value, index, values) {
                                const nilaiMapping = { 1: 'Belum Berkembang', 2: 'Mulai Berkembang', 3: 'Berkembang Sesuai Harapan', 4: 'Berkembang Sangat Baik' };
                                return nilaiMapping[value] || '';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: function(d) {
                                return d.label;
                            },
                            label: function(d) {
                                const nilaiMapping = { 1: 'Belum Berkembang', 2: 'Mulai Berkembang', 3: 'Berkembang Sesuai Harapan', 4: 'Berkembang Sangat Baik' };
                                return nilaiMapping[d.raw];
                            }
                        },
                        backgroundColor: "#FAFAFA",
                        borderColor: "#f0b86e",
                        borderWidth: 1,
                        titleColor: "#212529",
                        displayColors: false,
                        bodyColor: "#212529",
                        bodyFont : {
                            weight : 'bold'
                        }
                    },
                    legend: {
                        display: false
                    }
                }
            }
        }
    },
    created(){
        if(this.editMode){
            this.setValue();
        }
    },
    methods : {
        setValue(){
            this.title = 'Ubah Raport';
            this.form.kelompok_id = this.value.kelompok_id;
            this.form.anak_id = this.value.anak_id;
            this.form.tinggi = this.value.tinggi;
            this.form.berat = this.value.berat;
            this.form.perkembangan_nilai_agama_dan_moral = this.value.perkembangan_nilai_agama_dan_moral;
            this.form.perkembangan_sosial_emosional = this.value.perkembangan_sosial_emosional;
            this.form.perkembangan_fisik_motorik = this.value.perkembangan_fisik_motorik;
            this.form.perkembangan_kognitif = this.value.perkembangan_kognitif;
            this.form.perkembangan_bahasa = this.value.perkembangan_bahasa;
        },
        submit() {
            this.loading = true;
            let formData = Object.assign(this.form, {
                    lines : this.lines
                }
            );
            let form = this.$inertia.form(formData);
            let url = this.editMode === true ? this.route('admin.raport.update', {id : this.value.id}) : this.route('admin.raport.store');
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loading = false;
                },
                onSuccess: () => {

                },
            });
        },
        async openModal(indikator){
            this.modalTitle = 'Penilaian Harian '+ indikator;

            if(this.form.anak_id){
                await this.fetchNilai(indikator);
            }else{
                alert('Data Anak Belum Dipilih')
            }
        },

        async fetchNilai(indikator)
        {
            try {
                this.modalLoading = true;
                this.lines = [];
                const response = await axios.get(this.route("admin.nilai.detail"),{
                    params: {
                        indikator : indikator,
                        anak_id : this.form.anak_id
                    }
                });
                if(response.status == 200){
                    this.modalData = response.data;
                    this.modalShow = true;
                }
                this.modalLoading = false;
            } catch (error) {
                console.error(error);
            }
        },

        async openChart(kegiatan_id){
            try {
                this.chartShow = true;
                this.chartLoading = true;
                this.lines = [];
                const response = await axios.get(this.route("admin.nilai.chart"),{
                    params: {
                        kegiatan : kegiatan_id,
                        anak_id : this.form.anak_id
                    }
                });
                if(response.status == 200){
                    this.chartLabels = response.data.map(item => item.tgl);
                    this.chartValues = response.data.map(item => item.nilai);

                    this.chartLoading = true;
                }
                this.modalLoading = false;
            } catch (error) {
                console.error(error);
            }
        },
        closeChart(){

        }
    }
}
</script>