import{S as V}from"./SelectKelompok-aa48e4f9.js";import{S as B}from"./SelectJenisKegiatan-370ba5bd.js";import{S}from"./SelectKegiatan-5d57edc9.js";import{_ as y,m as E,o as d,e as k,w as a,f as i,p as t,t as w,a5 as P,g as T,L as R,j as U,$ as x}from"./id-1c1e2a8a.js";import{E as j}from"./index-9517473f.js";import{E as F,a as K}from"./index-dfa584b8.js";import{E as M,a as N}from"./index-b29a4ac8.js";import{E as C,a as O}from"./index-e88e0ccf.js";import{v as D}from"./directive-d6b9c9af.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./_initCloneObject-9c7c6a23.js";import"./index-82c08022.js";import"./scroll-3dccf429.js";import"./index-3f637f53.js";import"./_baseIteratee-5480d325.js";const I={components:{SelectKelompok:V,SelectJenisKegiatan:B,SelectKegiatan:S},props:{value:{type:Object},editMode:{type:Boolean,default:!1},errors:{type:Object}},data(){return{title:"Tambah Paket Baru",disableKota:!1,form:{nama:null,usia:null,pembangunan:null,pendaftaran:null,spp:null},loading:!1}},created(){this.editMode&&this.setValue()},methods:{setValue(){this.title="Ubah Paket",this.form.nama=this.value.nama,this.form.usia=this.value.usia,this.form.pembangunan=this.value.pembangunan,this.form.pendaftaran=this.value.pendaftaran,this.form.spp=this.value.spp},submit(){this.loading=!0;let u=this.$inertia.form(this.form),l=this.editMode===!0?this.route("admin.paket.update",{id:this.value.id}):this.route("admin.paket.store");u.post(l,{preserveScroll:!0,onFinish:()=>{this.loading=!1},onSuccess:()=>{}})}}},L={class:"content"},J={class:"content-heading d-flex justify-content-between align-items-center"},q={class:"block rounded"},z={class:"block-content p-4"},A=i("i",{class:"fa fa-check me-2"},null,-1);function G(u,l,r,H,o,f){const m=j,n=F,s=M,p=C,c=O,_=N,h=x,b=K,g=E("base-layout"),v=D;return d(),k(g,null,{default:a(()=>[i("div",L,[t(b,{"label-position":"top","label-width":"100%",onSubmit:U(f.submit,["prevent"])},{default:a(()=>[i("div",J,[i("span",null,w(o.title),1)]),i("div",q,[P((d(),T("div",z,[t(_,{gutter:40},{default:a(()=>[t(s,{md:12},{default:a(()=>[t(n,{label:"Nama Paket",error:r.errors.nama},{default:a(()=>[t(m,{modelValue:o.form.nama,"onUpdate:modelValue":l[0]||(l[0]=e=>o.form.nama=e)},null,8,["modelValue"])]),_:1},8,["error"])]),_:1}),t(s,{md:12},{default:a(()=>[t(n,{label:"Usia",error:r.errors.usia},{default:a(()=>[t(c,{modelValue:o.form.usia,"onUpdate:modelValue":l[1]||(l[1]=e=>o.form.usia=e),placeholder:"Pilih",class:"w-100"},{default:a(()=>[t(p,{label:"3 Bulan - 2,5 Tahun",value:"3 Bulan - 2,5 Tahun"}),t(p,{label:"2,5 Tahun - 6 Tahun",value:"3 Tahun- 6 Tahun"})]),_:1},8,["modelValue"])]),_:1},8,["error"])]),_:1}),t(s,{md:12},{default:a(()=>[t(n,{label:"Biaya Pembangunan",error:r.errors.tgl},{default:a(()=>[t(m,{modelValue:o.form.pembangunan,"onUpdate:modelValue":l[2]||(l[2]=e=>o.form.pembangunan=e),formatter:e=>`Rp ${e}`.replace(/\B(?=(\d{3})+(?!\d))/g,","),parser:e=>e.replace(/^Rp\s+|(\,)/gi,"")},null,8,["modelValue","formatter","parser"])]),_:1},8,["error"])]),_:1}),t(s,{md:12},{default:a(()=>[t(n,{label:"Biaya Pendaftaran",error:r.errors.tgl},{default:a(()=>[t(m,{modelValue:o.form.pendaftaran,"onUpdate:modelValue":l[3]||(l[3]=e=>o.form.pendaftaran=e),formatter:e=>`Rp ${e}`.replace(/\B(?=(\d{3})+(?!\d))/g,","),parser:e=>e.replace(/^Rp\s+|(\,)/gi,"")},null,8,["modelValue","formatter","parser"])]),_:1},8,["error"])]),_:1}),t(s,{md:12},{default:a(()=>[t(n,{label:"Biaya SPP Bulanan",error:r.errors.tgl},{default:a(()=>[t(m,{modelValue:o.form.spp,"onUpdate:modelValue":l[4]||(l[4]=e=>o.form.spp=e),formatter:e=>`Rp ${e}`.replace(/\B(?=(\d{3})+(?!\d))/g,","),parser:e=>e.replace(/^Rp\s+|(\,)/gi,"")},null,8,["modelValue","formatter","parser"])]),_:1},8,["error"])]),_:1})]),_:1}),t(h,{"native-type":"submit",type:"primary",loading:o.loading},{default:a(()=>[A,R(" Simpan ")]),_:1},8,["loading"])])),[[v,o.loading]])])]),_:1},8,["onSubmit"])])]),_:1})}const ue=y(I,[["render",G]]);export{ue as default};
