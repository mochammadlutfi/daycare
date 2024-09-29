import{_ as L,m as Y,o as h,e as y,w as o,f as n,p as e,t as B,a6 as E,j as b,F as S,W as U,L as P,g as j,a0 as D}from"./id-97c9e5f5.js";import{E as T}from"./index-ae963a16.js";import{E as x,a as K}from"./index-4f1c3644.js";import{E as A,a as N}from"./index-d1b32819.js";import{E as C,a as F}from"./index-1567bcf2.js";import{E as I}from"./index-add84256.js";import{E as G,a as H}from"./index-bcb34dd7.js";import{v as O}from"./directive-7739a56c.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./_initCloneObject-9298e566.js";import"./panel-time-pick-fb908530.js";import"./utils-d081b9ca.js";import"./index-91a35dc4.js";import"./localeData-5bb316e4.js";import"./index-4a89f490.js";import"./scroll-1fa1a40e.js";import"./_baseIteratee-2fd9a4cf.js";const R={components:{},props:{value:{type:Object},editMode:{type:Boolean,default:!1},errors:{type:Object}},data(){return{title:"Tambah Pegawai Baru",disableKota:!1,form:{nama:null,jk:"Laki-Laki",tmpLahir:null,tglLahir:null,alamat:null,agama:null,pendidikan_terakhir:null,tglMasuk:null,tglMulai:null,username:null,level:"Admin",password:null,password_confirmation:null},loading:!1}},created(){this.editMode&&this.setValue()},methods:{setValue(){this.form.nik=this.value.nik,this.form.nama=this.value.nama,this.form.jk=this.value.jk=="P"?"Perempuan":"Laki-Laki",this.form.tmpLahir=this.value.tmp_lahir,this.form.tglLahir=this.value.tgl_lahir,this.form.alamat=this.value.alamat,this.form.rt=this.value.rt,this.form.rw=this.value.rw,this.form.tps=this.value.tps,this.form.kota_id=this.value.kota_id,this.form.kecamatan_id=this.value.kecamatan_id,this.form.kelurahan_id=this.value.kelurahan_id,this.form.phone=this.value.phone,this.form.email=this.value.email,this.form.ktp=this.value.ktp,this.form.image=this.value.image,this.form.tps=this.value.tps,this.form.user_id=this.value.user_id},submit(){this.loading=!0;let _=this.$inertia.form(this.form),a=this.editMode===!0?this.route("admin.pegawai.update",{id:this.value.id}):this.route("admin.pegawai.store");_.post(a,{preserveScroll:!0,onFinish:()=>{this.loading=!1},onSuccess:()=>this.$swal.fire({icon:"success",title:"Berhasil",text:"Pendukung Baru Berhasil Ditambahkan!",showCancelButton:!0,confirmButtonText:"Tambah Lainnya",cancelButtonText:"Kembali"}).then(t=>{t.isConfirmed&&this.$inertia.visit(this.route("user.pendukung.create"))})})}}},J={class:"content"},W={class:"content-heading d-flex justify-content-between align-items-center"},q={class:"block rounded"},z={class:"block-content p-4"},Q=n("div",{class:"border-bottom border-2 mb-4"},[n("h3",{class:"h5 mb-2"},"1. Informasi Pribadi")],-1),X=n("div",{class:"border-bottom border-2 mb-4"},[n("h3",{class:"h5 mb-2"},"2. Informasi Akun")],-1),Z=n("i",{class:"fa fa-check me-2"},null,-1);function $(_,a,t,ee,l,v){const m=T,i=x,k=A,g=N,u=C,d=I,f=F,s=G,p=H,V=D,c=K,w=Y("base-layout"),M=O;return h(),y(w,null,{default:o(()=>[n("div",J,[e(c,{"label-position":"top","label-width":"100%",onSubmit:j(v.submit,["prevent"])},{default:o(()=>[n("div",W,[n("span",null,B(l.title),1)]),n("div",q,[E((h(),b("div",z,[Q,e(f,{gutter:40},{default:o(()=>[e(u,{span:12},{default:o(()=>[e(i,{label:"Nama Lengkap",error:t.errors.nama},{default:o(()=>[e(m,{modelValue:l.form.nama,"onUpdate:modelValue":a[0]||(a[0]=r=>l.form.nama=r)},null,8,["modelValue"])]),_:1},8,["error"]),e(i,{label:"Jenis Kelamin",error:t.errors.jk},{default:o(()=>[e(g,{modelValue:l.form.jk,"onUpdate:modelValue":a[1]||(a[1]=r=>l.form.jk=r)},{default:o(()=>[e(k,{label:"Laki-Laki",value:"L"}),e(k,{label:"Perempuan",value:"P"})]),_:1},8,["modelValue"])]),_:1},8,["error"]),e(f,{gutter:20},{default:o(()=>[e(u,{span:12},{default:o(()=>[e(i,{label:"Tempat Lahir",error:t.errors.tmpLahir},{default:o(()=>[e(m,{modelValue:l.form.tmpLahir,"onUpdate:modelValue":a[2]||(a[2]=r=>l.form.tmpLahir=r),placeholder:"Tempat Lahir"},null,8,["modelValue"])]),_:1},8,["error"])]),_:1}),e(u,{span:12},{default:o(()=>[e(i,{label:"Tanggal Lahir",error:t.errors.tglLahir},{default:o(()=>[e(d,{modelValue:l.form.tglLahir,"onUpdate:modelValue":a[3]||(a[3]=r=>l.form.tglLahir=r),type:"date",placeholder:"Tanggal Lahir",format:"DD-MM-YYYY","value-format":"YYYY-MM-DD",style:{width:"100%"}},null,8,["modelValue"])]),_:1},8,["error"])]),_:1})]),_:1}),e(i,{label:"Agama",error:t.errors.agama},{default:o(()=>[e(p,{modelValue:l.form.agama,"onUpdate:modelValue":a[4]||(a[4]=r=>l.form.agama=r),placeholder:"Pilih",class:"w-100"},{default:o(()=>[e(s,{label:"Islam",value:"Islam"}),e(s,{label:"Katolik",value:"Katolik"}),e(s,{label:"Protestan",value:"Protestan"}),e(s,{label:"Hindu",value:"Hindu"}),e(s,{label:"Budha",value:"Budha"})]),_:1},8,["modelValue"])]),_:1},8,["error"]),e(i,{label:"Pendidikan Terakhir",error:t.errors.pendidikan_terakhir},{default:o(()=>[e(p,{modelValue:l.form.pendidikan_terakhir,"onUpdate:modelValue":a[5]||(a[5]=r=>l.form.pendidikan_terakhir=r),placeholder:"Pilih",class:"w-100"},{default:o(()=>[e(s,{label:"SMA/SMK",value:"SMA/SMK"}),e(s,{label:"D3",value:"D3"}),e(s,{label:"S1",value:"S1"}),e(s,{label:"S2",value:"S2"}),e(s,{label:"S3",value:"S3"})]),_:1},8,["modelValue"])]),_:1},8,["error"]),e(i,{label:"No SK",error:t.errors.sk},{default:o(()=>[e(m,{modelValue:l.form.sk,"onUpdate:modelValue":a[6]||(a[6]=r=>l.form.sk=r),placeholder:"No SK"},null,8,["modelValue"])]),_:1},8,["error"])]),_:1}),e(u,{span:12},{default:o(()=>[e(i,{label:"No Handphone",error:t.errors.phone},{default:o(()=>[e(m,{modelValue:l.form.phone,"onUpdate:modelValue":a[7]||(a[7]=r=>l.form.phone=r)},null,8,["modelValue"])]),_:1},8,["error"]),e(i,{label:"Alamat Email",error:t.errors.email},{default:o(()=>[e(m,{modelValue:l.form.email,"onUpdate:modelValue":a[8]||(a[8]=r=>l.form.email=r)},null,8,["modelValue"])]),_:1},8,["error"]),e(i,{label:"Mulai Bekerja",error:t.errors.tglMulai},{default:o(()=>[e(d,{modelValue:l.form.tglMulai,"onUpdate:modelValue":a[9]||(a[9]=r=>l.form.tglMulai=r),type:"year",placeholder:"Mulai Bekerja",format:"YYYY","value-format":"YYYY",class:"w-100"},null,8,["modelValue"])]),_:1},8,["error"]),e(i,{label:"Tanggal Masuk Bekerja",error:t.errors.tglMasuk},{default:o(()=>[e(d,{modelValue:l.form.tglMasuk,"onUpdate:modelValue":a[10]||(a[10]=r=>l.form.tglMasuk=r),type:"date",placeholder:"Tanggal Masuk Bekerja",format:"DD-MM-YYYY","value-format":"YYYY-MM-DD",style:{width:"100%"}},null,8,["modelValue"])]),_:1},8,["error"]),e(i,{label:"Alamat Lengkap",error:t.errors.alamat},{default:o(()=>[e(m,{modelValue:l.form.alamat,"onUpdate:modelValue":a[11]||(a[11]=r=>l.form.alamat=r),type:"textarea",rows:5},null,8,["modelValue"])]),_:1},8,["error"])]),_:1})]),_:1}),t.editMode?U("",!0):(h(),b(S,{key:0},[X,e(f,{gutter:40},{default:o(()=>[e(u,{span:12},{default:o(()=>[e(i,{label:"Username",error:t.errors.username},{default:o(()=>[e(m,{modelValue:l.form.username,"onUpdate:modelValue":a[12]||(a[12]=r=>l.form.username=r),placeholder:"Masukan Username"},null,8,["modelValue"])]),_:1},8,["error"]),e(i,{label:"Level",error:t.errors.level},{default:o(()=>[e(p,{modelValue:l.form.level,"onUpdate:modelValue":a[13]||(a[13]=r=>l.form.level=r),placeholder:"Pilih",class:"w-100"},{default:o(()=>[e(s,{label:"Admin",value:"Admin"}),e(s,{label:"Guru",value:"Guru"})]),_:1},8,["modelValue"])]),_:1},8,["error"])]),_:1}),e(u,{span:12},{default:o(()=>[e(i,{label:"Password",error:t.errors.password},{default:o(()=>[e(m,{modelValue:l.form.password,"onUpdate:modelValue":a[14]||(a[14]=r=>l.form.password=r),type:"password",placeholder:"Masukan password","show-password":""},null,8,["modelValue"])]),_:1},8,["error"]),e(i,{label:"Konfirmasi Password",error:t.errors.password},{default:o(()=>[e(m,{modelValue:l.form.password_confirmation,"onUpdate:modelValue":a[15]||(a[15]=r=>l.form.password_confirmation=r),type:"password",placeholder:"Masukan konfirmasi password","show-password":""},null,8,["modelValue"])]),_:1},8,["error"])]),_:1})]),_:1})],64)),e(V,{"native-type":"submit",type:"primary",loading:l.loading},{default:o(()=>[Z,P(" Simpan ")]),_:1},8,["loading"])])),[[M,l.loading]])])]),_:1},8,["onSubmit"])])]),_:1})}const ge=L(R,[["render",$]]);export{ge as default};
