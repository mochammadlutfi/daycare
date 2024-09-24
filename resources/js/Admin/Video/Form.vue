<template>
    <base-layout>
        <div class="content">
            <el-form label-position="top" label-width="30%" @submit.prevent="submit">
                <div class="content-heading d-flex justify-content-between align-items-center">
                    <span>{{ title }}</span>
                    <div class="space-x-1">
                        <el-button native-type="submit" type="primary" :loading="loading">
                            Simpan
                        </el-button>
                    </div>
                </div>
                <div class="block block-rounded">
                    <div class="block-content p-4">
                        <el-row :gutter="30">
                            <el-col :span="16">
                                <el-form-item class="mb-4" label="Judul Video" :error="errors.name">
                                    <el-input v-model="form.title" placeholder="Masukan Judul Video"/>
                                </el-form-item>
                                <el-form-item class="mb-4" label="Deskripsi" :error="errors.description">
                                    <el-input v-model="form.description" :rows="6" type="textarea" placeholder="Masukan Deskripsi"/>
                                </el-form-item>
                                <el-form-item class="mb-4" label="Youtube URL" :error="errors.youtube" @change="getThumb">
                                    <el-input v-model="form.youtube" placeholder="Masukan URL Youtube"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item class="mb-4" label="Foto">
                                    <img :src="form.preview" class="img-fluid"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-form>
        </div>
    </base-layout>
</template>

<script>
export default {
    components: {
    },
    props : {
        data : Object,
        errors : Object,
        editMode : Boolean,
    },
    data() {
        return {
            title : 'Tambah Video Baru',
            loading : false,
            form : {
                id : null,
                title : null,
                slug : null,
                description : null,
                youtube : null,
                image : null,
                youtube_id : null,
                preview : "/images/poster.png",
            }
        }
    },
    created(){
        if(this.editMode){
            this.setValue();
        }
    },
    methods : {
        submit() {
            this.loading = true;
            let form = this.$inertia.form(this.form);
            let url = this.editMode === true ? this.route('admin.video.update', {id : this.data.id}) : this.route('admin.video.store');
            form.post(url, {
                preserveScroll: true,
                onSuccess: () => {
                    ElMessage({
                        type: 'success',
                        message: 'Data Berhasil Disimpan!',
                    });
                },
                onFinish:() => {
                    this.loading = false;
                },
            });
        },
        setValue(){
            this.title = 'Ubah Video';

            this.form.id = this.data.id;
            this.form.title = this.data.title;
            this.form.description = this.data.description;
            this.form.youtube = this.data.youtube;
            this.form.preview = this.data.image;
        },
        getThumb(e){
            console.log(e);
            var val = e.target.value;
            if(val != ""){
                var results = val.match('[\\?&]v=([^&#]*)');
                var video   = (results === null) ? val : results[1];
                this.form.youtube_id = video;
                this.form.preview = 'http://img.youtube.com/vi/' + video + '/0.jpg';
            }
        }
    }
}
</script>