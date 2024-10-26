import{S as E}from"./SelectKelompok-833f3825.js";import{S as B}from"./SelectJenisKegiatan-ead90dcc.js";import{S as w}from"./SelectKegiatan-904c0911.js";import{h as M}from"./moment-fbc5633a.js";import{_ as S,m as d,o as _,e as Y,w as i,f as s,p as e,t as x,a5 as K,j as T,K as U,g as C,$ as F}from"./id-2e276a2e.js";import{E as I}from"./index-cc2271ad.js";import{E as L,a as N}from"./index-23bc7dc4.js";import{E as O,a as P}from"./index-5bcbf47d.js";import{E as J}from"./index-57703201.js";import{E as A}from"./index-01d316ca.js";import{v as R}from"./directive-2e5632de.js";import"./index-bb79b737.js";import"./index-20f4b275.js";import"./event-9519ab40.js";import"./scroll-bd1cd202.js";import"./index-a3b5a262.js";import"./_initCloneObject-8785b8d3.js";import"./_baseIteratee-0f2e46c6.js";import"./panel-time-pick-854cfb01.js";import"./utils-2237dd12.js";import"./localeData-de255be7.js";import"./typescript-defaf979.js";const q={components:{SelectKelompok:E,SelectJenisKegiatan:B,SelectKegiatan:w},props:{value:{type:Object},editMode:{type:Boolean,default:!1},errors:{type:Object}},data(){return{title:"Tambah Aktivitas Baru",disableKota:!1,form:{tgl:M().format("YYYY-MM-DD"),kelompok_id:null,jenis_id:null,kegiatan_id:null,keterangan:null},images:[],imagesDeleted:[],loading:!1}},created(){this.editMode&&this.setValue()},methods:{setValue(){this.form.id=this.value.id,this.form.kelompok_id=this.value.kelompok_id,this.form.jenis_id=this.value.jenis_id,this.form.kegiatan_id=this.value.kegiatan_id,this.form.keterangan=this.value.keterangan,this.value.foto.length&&this.value.foto.forEach(a=>{this.images.push({name:a.nama,url:a.path})})},submit(){this.loading=!0;let a=Object.assign(this.form,{images:this.images,imagesDeleted:this.imagesDeleted}),o=this.$inertia.form(a),n=this.editMode===!0?this.route("admin.aktivitas.update",{id:this.value.id}):this.route("admin.aktivitas.store");o.post(n,{preserveScroll:!0,onFinish:()=>{this.loading=!1},onSuccess:()=>this.$swal.fire({icon:"success",title:"Berhasil",text:"Pendukung Baru Berhasil Ditambahkan!",showCancelButton:!0,confirmButtonText:"Tambah Lainnya",cancelButtonText:"Kembali"}).then(u=>{u.isConfirmed&&this.$inertia.visit(this.route("user.pendukung.create"))})})},removeImage(a,o){this.imagesDeleted.push(a)}}},z={class:"content"},G={class:"content-heading d-flex justify-content-between align-items-center"},H={class:"block rounded"},Q={class:"block-content p-4"},W=s("i",{class:"fa fa-plus"},null,-1),X=s("div",{class:"el-upload__tip"}," file jpg/png kurang dari 1MB ",-1),Z=s("i",{class:"fa fa-check me-2"},null,-1);function $(a,o,n,u,t,p){const f=I,r=L,m=O,c=d("select-kelompok"),g=d("select-jenis-kegiatan"),k=d("select-kegiatan"),h=P,b=J,v=A,V=F,j=N,D=d("base-layout"),y=R;return _(),Y(D,null,{default:i(()=>[s("div",z,[e(j,{"label-position":"top","label-width":"100%",onSubmit:C(p.submit,["prevent"])},{default:i(()=>[s("div",G,[s("span",null,x(t.title),1)]),s("div",H,[K((_(),T("div",Q,[e(h,{gutter:40},{default:i(()=>[e(m,{md:12},{default:i(()=>[e(r,{label:"Tanggal",error:n.errors.tgl},{default:i(()=>[e(f,{modelValue:t.form.tgl,"onUpdate:modelValue":o[0]||(o[0]=l=>t.form.tgl=l),type:"date",placeholder:"Tanggal",format:"DD MMMM YYYY","value-format":"YYYY-MM-DD",style:{width:"100%"}},null,8,["modelValue"])]),_:1},8,["error"])]),_:1}),e(m,{md:12},{default:i(()=>[e(r,{label:"Kelompok",error:n.errors.kelompok_id},{default:i(()=>[e(c,{modelValue:t.form.kelompok_id,"onUpdate:modelValue":o[1]||(o[1]=l=>t.form.kelompok_id=l)},null,8,["modelValue"])]),_:1},8,["error"])]),_:1}),e(m,{md:12},{default:i(()=>[e(r,{label:"Jenis Kegiatan",error:n.errors.jenis_id,onChange:o[3]||(o[3]=l=>t.form.kegiatan_id=null)},{default:i(()=>[e(g,{modelValue:t.form.jenis_id,"onUpdate:modelValue":o[2]||(o[2]=l=>t.form.jenis_id=l)},null,8,["modelValue"])]),_:1},8,["error"])]),_:1}),e(m,{md:12},{default:i(()=>[e(r,{label:"Kegiatan",error:n.errors.kegiatan_id},{default:i(()=>[e(k,{modelValue:t.form.kegiatan_id,"onUpdate:modelValue":o[4]||(o[4]=l=>t.form.kegiatan_id=l),disabled:!t.form.jenis_id,hasParent:"",jenis:t.form.jenis_id},null,8,["modelValue","disabled","jenis"])]),_:1},8,["error"])]),_:1})]),_:1}),e(r,{label:"Keterangan"},{default:i(()=>[e(b,{modelValue:t.form.keterangan,"onUpdate:modelValue":o[5]||(o[5]=l=>t.form.keterangan=l),type:"textarea",rows:4},null,8,["modelValue"])]),_:1}),e(r,{class:"mb-4",label:"Foto Dokumentasi","label-width":"180px"},{default:i(()=>[e(v,{action:"#","file-list":t.images,"onUpdate:fileList":o[6]||(o[6]=l=>t.images=l),"on-remove":p.removeImage,"list-type":"picture-card","auto-upload":!1},{tip:i(()=>[X]),default:i(()=>[W]),_:1},8,["file-list","on-remove"])]),_:1}),e(V,{"native-type":"submit",type:"primary",loading:t.loading},{default:i(()=>[Z,U(" Simpan ")]),_:1},8,["loading"])])),[[y,t.loading]])])]),_:1},8,["onSubmit"])])]),_:1})}const je=S(q,[["render",$]]);export{je as default};
