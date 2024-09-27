<template>
    <base-layout>
        <div class="content">
            <div class="content-heading d-flex justify-content-between align-items-center">
                <span>Anak</span>
                <div class="space-x-1">
                    <el-button type="primary" @click.prevent="exportModal = true">
                        <i class="fa fa-print me-1"></i>
                        Export
                    </el-button>
                </div>
            </div>
            <div class="block rounded bordered" v-loading="isLoading" >
                <div class="block-content py-3">
                    <el-row justify="space-between">
                        <el-col :span="12">
                            <el-select v-model="limit" placeholder="Pilih" style="width: 110px" @change="fetchData(1)">
                                <el-option label="25" value="25"/>
                                <el-option label="50" value="50"/>
                                <el-option label="100" value="100"/>
                            </el-select>
                        </el-col>
                        <el-col :span="7">
                            <el-input
                                v-model="searchKeyword"
                                clearable
                                >
                                <template #prefix>
                                    <span>
                                        <i class="fa fa-search"></i></span>
                                </template>
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
                <div class="block-content p-0">
                    <el-table :data="data" class="w-100" @sort-change="sortChange" header-cell-class-name="bg-body text-dark">
                        <el-table-column type="index" width="50" />
                        <el-table-column prop="nama" label="Nama" sortable/>
                        <el-table-column prop="jk" label="Jenis Kelamin" sortable/>
                        <el-table-column label="Kelompok">
                            <template #default="scope">
                                {{ scope.row.kelompok.nama }} ({{ scope.row.kelompok.usia }})
                            </template>
                        </el-table-column>
                        <el-table-column prop="user.detail.nama_ayah" label="Nama Ayah" sortable/>
                        <el-table-column prop="user.detail.nama_ibu" label="Nama Ibu" sortable/>
                        <el-table-column label="Aksi" align="center" width="180">
                            <template #default="scope">
                                <a :href="route('admin.anak.show', {id : scope.row.id})" class="ep-button ep-button--primary">
                                    <i class="si si-eye me-2"></i>
                                    Detail
                                </a>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block-content py-2">
                    <el-row justify="space-between">
                        <el-col :lg="12" class="d-flex">
                            <p class="my-auto text-xs">Menampilkan {{ from }} sampai {{ to }} dari {{ total }}</p>
                        </el-col>
                        <el-col :lg="12" class="text-end">
                            <el-pagination class="float-end" background layout="prev, pager, next" :page-size="pageSize" :total="total" :current-page="page" @current-change="fetchData"/>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <el-dialog v-model="exportModal" title="Export" width="500">
            <el-form label-width="30%" @submit.prevent="getReport" target="_blank" label-position="top">
                <el-form-item class="mb-4" label="Kelompok">
                    <select-kelompok name="kelompok" v-model="form.kelompok"/>
                </el-form-item>
                <el-form-item class="mb-4" label="Paket">
                    <select-paket name="paket" v-model="form.paket"/>
                </el-form-item>

                <div class="d-flex">
                    <div class="float-end">
                        <el-button @click="exportModal = false">Batal</el-button>
                        <el-button type="primary" native-type="submit">
                            Download
                        </el-button>
                    </div>
                </div>
            </el-form>
        </el-dialog>
    </base-layout>
</template>

<script setup>
import SelectKelompok from '@/Components/SelectKelompok.vue';
import SelectPaket from '@/Components/SelectPaket.vue';

import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
import moment from 'moment';

const data = ref([]);
const isLoading = ref(true);
const searchKeyword = ref('');
const limit = 25;
const total = ref(0);
const from = ref(0);
const to = ref(0);
const page = ref(1);
const pageSize = ref(0);
const exportModal = ref(false);

const form = reactive({
    kelompok : null,
    paket : null,
});

const fetchData = async (pg) => {
  try {
    isLoading.value = true;
    const response = await axios.get('/admin/anak/data', {
      params: {
        page: pg || 1,
        limit,
        search: searchKeyword.value,
      },
    });
    if (response.status === 200) {
      data.value = response.data.data;
      page.value = response.data.current_page;
      total.value = response.data.total;
      pageSize.value = response.data.per_page;
      from.value = response.data.from;
      from.to = response.data.to;
    }
  } catch (error) {
    console.error(error);
  }finally{
    isLoading.value = false;
  }
};

const format_date = (value) => {
  if (value) {
    return moment(String(value)).format('DD MMM YYYY');
  }
};

const sortChange = (v) => {
    fetchData();
}

const hapus = (id) => {
  ElMessageBox.alert('Data yang dihapus tidak bisa dikembalikan!', 'Peringatan', {
    showCancelButton: true,
    confirmButtonText: 'Ya!',
    cancelButtonText: 'Tidak!',
    type: 'warning',
  }).then(() => {
    router.delete(`/admin/pelanggan/${id}/delete`, {
      preserveScroll: true,
      onSuccess: () => {
        fetchData();
        ElMessage({
          type: 'success',
          message: 'Data Berhasil Dihapus!',
        });
      },
    });
  });
};

const getReport = () => {
    window.open(route('admin.anak.report', form), '_blank');
}

onMounted(() => {
  fetchData();
});
</script>