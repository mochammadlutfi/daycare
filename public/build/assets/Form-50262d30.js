import{_ as m,m as _,o as d,e as p,w as t,f as a,p as n,t as c,L as f,j as b,$ as v}from"./id-1c1e2a8a.js";import{a as k}from"./index-dfa584b8.js";import"./_initCloneObject-9c7c6a23.js";const y={components:{},props:{value:{type:Object},editMode:{type:Boolean,default:!1},errors:{type:Object}},data(){return{title:"Tambah Saksi Baru",disableKota:!1,form:{level_id:null,image:null,ktp:null,nik:null,nama:null,jk:"Laki-Laki",tmpLahir:null,tglLahir:null,alamat:null,rt:null,rw:null,tps:null,kota_id:null,kecamatan_id:null,kelurahan_id:null,username:null,password:null,user_id:null},loading:!1}},created(){this.editMode&&this.setValue()},methods:{setValue(){this.form.nama_ayah=this.value.nama_ayah,this.form.tmp_lahir_ayah=this.value.tmp_lahir_ayah,this.form.tgl_lahir_ayah=this.value.tgl_lahir_ayah,this.form.telp_ayah=this.value.telp_ayah,this.form.alamat_ayah=this.value.alamat_ayah,this.form.pekerjaan_ayah=this.value.pekerjaan_ayah,this.form.penghasilan_ayah=this.value.penghasilan_ayah,this.form.alamat_kantor_ayah=this.value.alamat_kantor_ayah,this.form.agama_ayah=this.value.agama_ayah,this.form.pendidikan_ayah=this.value.pendidikan_ayah,this.form.nama_ibu=this.value.nama_ibu,this.form.tmp_lahir_ibu=this.value.tmp_lahir_ibu,this.form.tgl_lahir_ibu=this.value.tgl_lahir_ibu,this.form.telp_ibu=this.value.telp_ibu,this.form.alamat_ibu=this.value.alamat_ibu,this.form.pekerjaan_ibu=this.value.pekerjaan_ibu,this.form.penghasilan_ibu=this.value.penghasilan_ibu,this.form.alamat_kantor_ibu=this.value.alamat_kantor_ibu,this.form.agama_ibu=this.value.agama_ibu,this.form.pendidikan_ibu=this.value.pendidikan_ibu},submit(){this.loading=!0;let i=this.$inertia.form(this.form),e=this.editMode===!0?this.route("admin.saksi.update",{id:this.value.id}):this.route("admin.saksi.store");i.post(e,{preserveScroll:!0,onFinish:()=>{this.loading=!1},onSuccess:()=>this.$swal.fire({icon:"success",title:"Berhasil",text:"Pendukung Baru Berhasil Ditambahkan!",showCancelButton:!0,confirmButtonText:"Tambah Lainnya",cancelButtonText:"Kembali"}).then(s=>{s.isConfirmed&&this.$inertia.visit(this.route("user.pendukung.create"))})})}}},g={class:"content"},B={class:"content-heading d-flex justify-content-between align-items-center"},x={class:"space-x-1"},j=a("div",{class:"block block-rounded"},[a("div",{class:"block-content p-4"},[a("div",{class:"border-bottom border-2 mb-4"},[a("h3",{class:"h5 mb-2"},"1. Informasi Pribadi")])])],-1);function w(i,e,s,S,l,o){const r=v,h=k,u=_("base-layout");return d(),p(u,null,{default:t(()=>[a("div",g,[n(h,{"label-position":"top","label-width":"100%",onSubmit:b(o.submit,["prevent"])},{default:t(()=>[a("div",B,[a("span",null,c(l.title),1),a("div",x,[n(r,{"native-type":"submit",type:"primary",loading:l.loading},{default:t(()=>[f(" Simpan ")]),_:1},8,["loading"])])]),j]),_:1},8,["onSubmit"])])]),_:1})}const $=m(y,[["render",w]]);export{$ as default};
