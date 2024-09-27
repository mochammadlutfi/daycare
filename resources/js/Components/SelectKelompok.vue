<template>
    <el-select v-model="value" value-key="id" 
    class="w-100"
    filterable 
    clearable 
    remote
    @change="selectChange"
    autocomplete="off"
    :disabled="disabled"
    :loading="isLoading"
    :name="name"
    placeholder="Pilih">
        <el-option
            v-for="item in dataList"
            :key="item.id"
            :label="item.nama + ` (${item.usia}) | ${item.anak_count} Anak` "
            :value="item.id"
        />
    </el-select>
</template>

<script>
export default {
    name : 'SelectKelompok',
    data() {
        return {
            dataList : [],
            value : this.modelValue,
            isLoading : false,
        }
    },
    watch : {
        modelValue(v){
            this.value = v;
        }
    },
    props : {
        modelValue : {
            type :  [Number, String]
        },
        disabled : {
            type : Boolean,
            default : false,
        },
        laundry : {
            type : Boolean,
            default : false,
        },
        usia : {
            type : Number,
            default : null,
        },
        anjem : {
            type : Boolean,
            default : false,
        },
        name: {
            type : String,
            default : ''
        }
    },
    async mounted() {
        await this.fetchData();
    },
    methods :{
        async fetchData() {
            try {
                this.isLoading = true;
                const response = await axios.get(this.route("admin.kelompok.data"),{
                    params: {
                        usia : this.usia,
                        laundry : this.laundry,
                        anjem : this.anjem
                    }
                });
                if(response.status == 200){
                    this.dataList = [];
                    this.dataList = response.data;
                }
                this.isLoading = false;
            } catch (error) {
                console.error(error);
            }
        },
        selectChange(v){
            this.$emit('update:modelValue', v);
        },
    }
}
</script>