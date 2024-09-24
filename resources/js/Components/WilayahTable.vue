<template>
    <div class="block block-rounded">
        <div class="block-content p-0">
            <el-table :data="data" class="table-click rounded-3" style="width: 100%" v-loading="isLoading">
                <el-table-column prop="nama_daerah" :label="labelName" header-align="center"/>
                <el-table-column prop="l" label="Laki-Laki" header-align="center"/>
                <el-table-column prop="p" label="Perempuan" header-align="center"/>
                <el-table-column prop="rekrutan" label="Total" header-align="center"/>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name : "WilayahTable",
    props :{
        relawan : {
            type : Number
        }
    },
    data(){
        return {
            level : this.$page.props.caleg.wilayah_type,
            selected : [],
            data : [],
            isLoading : true,
            page : 1,
            pageSize : 0,
            searchKey : 'name',
            searchKeyword : '',
            limit : 5,
            total : 0,
        } 
    },
    computed : {
        labelName(){
            if(this.level == 'kota'){
                return 'Kota/Kabupaten'
            }else if(this.level == 'kecamatan'){
                return 'Kecamatan'
            }else{
                return 'Desa/Kelurahan'
            }
        }
    },
    async created() {
        await this.fetchData();
    },
    methods :{
        async fetchData(page) {
            var page = (page == undefined) ? 1 : page;
            try {
                this.isLoading = true;
                const response = await axios.get(self.route("user.dukungan.wilayah"),{
                    params: {
                        limit : this.limit,
                        search : this.searchKeyword,
                        searchKey : this.searchKey,
                        level : this.level,
                        relawan: this.relawan
                    }
                });
                if(response.status == 200){
                    this.data = response.data.dataList;
                    this.page = response.data.current_page;
                    this.total = response.data.total;
                    this.pageSize = response.data.per_page;
                }
                this.isLoading = false;
            } catch (error) {
                console.error(error);
            }
        },
        onClickRow(row, column, event){
            router.visit(this.route('user.dukungan.show', {id : row.id}), { method: 'get' })
        },
        selectAll(e){
            if(e.target.checked){
                this.dataList.data.forEach((v, i) => {
                    this.selected.push(v.id)
                });
            }else{ 
                this.selected = [];
            }
        },
        format_date(value){
            if (value) {
                return moment(String(value)).format('DD MMM YYYY')
            }
        },
    }
}
</script>