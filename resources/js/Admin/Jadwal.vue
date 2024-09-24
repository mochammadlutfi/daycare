<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Jadwal Kelompok {{ kelompok.nama }}</span>
                <div class="space-x-1">
                    <el-button @click="showForm = true" type="primary">
                        <i class="fa fa-plus me-1"></i>
                        Tambah
                    </el-button>
                </div>
            </div>
            <div class="block block-rounded" v-loading="isLoading">
                <div class="block-content" v-for="(h, i) in hari" :key="i">
                    <div class="fs-4 fw-bold">{{ h }}</div>
                    <el-table :data="data[h]" style="width: 100%" border>
                        <el-table-column type="index" width="50" />
                        <el-table-column prop="jenis.nama" label="Jenis Kegiatan" width="160"/>
                        <el-table-column prop="kegiatan.nama" label="Kegiatan"/>
                        <el-table-column prop="kegiatan.tipe" label="Tipe"/>
                        <el-table-column prop="jam_mulai" label="Jam Mulai"/>
                        <el-table-column prop="jam_selesai" label="Jam Selesai"/>
                        <el-table-column label="Aksi" align="center" width="180">
                            <template #default="scope">
                                <el-dropdown popper-class="dropdown-action" trigger="click">
                                    <el-button type="primary">
                                    Aksi <i class="fa fa-angle-down ms-1"></i>
                                    </el-button>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item class="d-flex align-items-center justify-content-between space-x-1" @click.prevent="edit(scope.row)">
                                                Ubah
                                                <i class="si fa-fw si-note"></i>
                                            </el-dropdown-item>
                                            <el-dropdown-item class="d-flex align-items-center justify-content-between space-x-1" @click.prevent="hapus(scope.row.id, scope.row.kelompok_id)">
                                                Hapus
                                                <i class="si fa-fw si-trash"></i>
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <el-dialog v-model="showForm" :title="formTitle" width="30%" :before-close="onCloseForm" v-loading="loadingForm">
            <el-form :model="form" label-position="top">
                <el-form-item label="Jenis Kegiatan"  :error="errors.jenis_id">
                    <select-jenis-kegiatan v-model="form.jenis_id"/>
                </el-form-item>
                <el-form-item label="Kegiatan" :error="errors.kegiatan_id">
                    <select-kegiatan v-model="form.kegiatan_id" :disabled="(form.jenis_id) ? false : true" hasParent :jenis="form.jenis_id" />
                </el-form-item>
                <el-form-item label="Hari"  :error="errors.usia">
                    <el-select v-model="form.hari" placeholder="Pilih" class="w-100">
                        <el-option v-for="(h, i) in hari" :key="i" :label="h" :value="h"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="Jam" :error="errors.jam_mulai">
                    <el-time-picker
                        class="w-100"
                        format="HH:mm"
                        value-format="HH:mm:ss"
                        v-model="form.jam_mulai"
                        :disabled-hours="disabledJamMulai"
                    />
                </el-form-item>
                <el-form-item label="Jam" :error="errors.jam_selesai">
                    <el-time-picker
                        class="w-100"
                        format="HH:mm"
                        value-format="HH:mm:ss"
                        v-model="form.jam_selesai"
                        :disabled-hours="disabledJamMulai"
                    />
                </el-form-item>
                <div class="text-end">
                    <el-button @click="onCloseForm">
                        <i class="fa fa-close me-2"></i>
                        Batal
                    </el-button>
                    <el-button type="primary" @click="submit">
                        <i class="fa fa-check me-2"></i>
                        Simpan
                    </el-button>
                </div>
            </el-form>
        </el-dialog>
    </base-layout>
</template>

<script>
import SelectJenisKegiatan from '@/Components/SelectJenisKegiatan.vue';
import SelectKegiatan from '@/Components/SelectKegiatan.vue';
export default {
    components : {
        SelectJenisKegiatan,
        SelectKegiatan
    },
    props :{
        hari : {
            type : Array,
        },
        kelompok : {
            type : Object,
        },
        errors : {
            type : Object,
        }
    },
    computed :{
    },
    data(){
        return {
            isLoading : false,
            formTitle: "Tambah Jadwal",
            showForm : false,
            loadingForm : false,
            editMode : false,
            form : {
                id : null,
                kelompok_id : this.kelompok.id,
                hari : null,
                jenis_id : null,
                kegiatan_id : null,
                jam_mulai : null,
            },
            data : [],
        }
    },
    async mounted() {
        await this.fetchData();
    },
    methods :{
        makeRange(start, end){
            var result = [];
            for (let i = start; i <= end; i++) {
                result.push(i)
            }
            return result
        },
        disabledJamMulai(){
            return this.makeRange(0, 6).concat(this.makeRange(17, 23));
        },
        sortChange(data){
            this.sort = data.prop;
            this.sortDir = (data.order == 'ascending') ? 'ASC' : 'DESC';
            this.fetchData();
        },
        doSearch : _.debounce(function(){
            this.isLoading = true;
            this.fetchData();
        }, 1000),
        async fetchData(page) {
            var page = (page == undefined) ? 1 : page;
            try {
                this.isLoading = true;
                const response = await axios.get(this.route("admin.kelompok.jadwal.data", {kelompok : this.kelompok.id}),{
                    params: {

                    }
                });
                if(response.status == 200){
                    this.data = response.data;
                }
                this.isLoading = false;
            } catch (error) {
                console.error(error);
            }
        },
        format_date(value){
            if (value) {
                return moment(String(value)).format('DD MMMM YYYY')
            }
        },
        onCloseForm(){
            this.title = 'Tambah Jadwal';
            this.editMode = false;
            this.form.id = null;
            this.form.kelompok_id = null;
            this.form.jenis_id = null;
            this.form.kegiatan_id = null;
            this.form.hari = null;
            this.form.jam_mulai = null;
            this.form.jam_selesai = null;
            this.showForm = false;
        },
        submit() {
            this.loadingForm = true;
            let form = this.$inertia.form(this.form);
            let url = this.editMode == true ? this.route('admin.kelompok.jadwal.update', {kelompok :this.kelompok.id, id : this.form.id}) : this.route('admin.kelompok.jadwal.store', { kelompok :this.kelompok.id});
            form.post(url, {
                preserveScroll: true,
                onFinish:() => {
                    this.loadingForm = false;
                    this.fetchData();
                },
                onSuccess: () => {
                    ElMessage({
                        type: 'success',
                        message: 'Data Berhasil Disimpan!',
                    });
                    this.onCloseForm();
                },
            });
        },
        edit(data){
            this.formTitle = 'Ubah Jadwal';
            this.form.id = data.id;
            this.form.kelompok_id = data.kelompok_id;
            this.form.jenis_id = data.jenis_id;
            this.form.kegiatan_id = data.kegiatan_id;
            this.form.hari = data.hari;
            this.form.jam_mulai = data.jam_mulai;
            this.form.jam_selesai = data.jam_selesai;
            this.editMode = true;
            this.showForm = true;
        },
        hapus(id, kelompok){
            ElMessageBox.alert('Data yang dihapus tidak bisa dikembalikan!', 'Peringatan', {
                showCancelButton: true,
                confirmButtonText: 'Ya!',
                cancelButtonText: 'Tidak!',
                type: 'warning',
            })
            .then(() => {
                this.$inertia.delete(this.route('admin.kelompok.jadwal.delete', {kelompok : kelompok, id : id}), {
                    preserveScroll: true,
                    onSuccess: () => {
                        this.fetchData();
                        ElMessage({
                            type: 'success',
                            message: 'Data Berhasil Dihapus!',
                        });
                    },
                });
            });
        },
    }
}
</script>