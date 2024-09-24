<template>
    <el-select v-model="value" value-key="id" 
    class="w-100"
    filterable 
    clearable 
    remote
    @change="selectChange"
    autocomplete="off"
    :loading="isLoading"
    :disabled="disabled"
    placeholder="Pilih Kegiatan">
        <el-option
            v-for="item in dataList"
            :key="item.id"
            :label="item.nama"
            :value="item.id"
        />
    </el-select>
</template>

<script>
export default {
    name : 'SelectKegiatan',
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
        },
        hasParent(v){

        },
        jenis(value){
            if(value){
                this.fetchData();
            }
        }
    },
    props : {
        modelValue : {
            type :  [Number, String]
        },
        jenis : {
            type : [Number, String],
            default : null
        },
        hasParent : {
            type : Boolean,
            default : false,
        },
        disabled: {
            type : Boolean,
            default : false,
        }
    },
    async mounted() {
        if(this.hasParent == false){
            await this.fetchData();
        }else{
            if(this.jenis){
                await this.fetchData();
            }
        }
    },
    methods :{
        async fetchData() {
            try {
                this.dataList = [];
                this.isLoading = true;
                const response = await axios.get(this.route("admin.kegiatan.data"),{
                    params: {
                        jenis_id : this.jenis
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