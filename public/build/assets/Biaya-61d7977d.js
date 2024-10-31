import{_ as g,m as b,o as u,e as v,w as o,f as n,a5 as B,j as V,p as a,K as E,g as j,$ as k}from"./id-44e39273.js";import{E as w}from"./index-ada9f14f.js";import{E as x}from"./index-4ea0d70f.js";import{E as L,a as R}from"./index-aa7e31ad.js";import{E as S,a as D}from"./index-84ed3e91.js";import{v as K}from"./directive-cd218522.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./_initCloneObject-24df7827.js";const M={props:{value:{type:Object},errors:{type:Object}},data(){return{step:1,form:{pembangunan:null,pendaftaran:null,spp:null,denda:null,laundry:null,antar_jemput:null},loading:!1}},created(){this.setValue()},methods:{setValue(){this.form.pembangunan=this.value.pembangunan,this.form.pendaftaran=this.value.pendaftaran,this.form.spp=this.value.spp,this.form.denda=this.value.denda,this.form.laundry=this.value.laundry,this.form.antar_jemput=this.value.antar_jemput},onSubmit(){this.loading=!0;let m=this.$inertia.form(this.form),t=this.route("admin.biaya.store");m.post(t,{preserveScroll:!0,onFinish:()=>{this.loading=!1},onSuccess:()=>{w({type:"success",message:"Data Berhasil Disimpan!"})}})}}},C={class:"content"},F=n("div",{class:"content-heading d-flex justify-content-between align-items-center"},[n("span",null,"Biaya"),n("div",{class:"space-x-1"})],-1),N={class:"block rounded-2"},U={class:"block-content p-4"},A=n("i",{class:"fa fa-check me-2"},null,-1);function I(m,t,l,J,r,d){const s=x,i=L,p=S,c=D,f=k,_=R,h=b("base-layout"),y=K;return u(),v(h,null,{default:o(()=>[n("div",C,[F,B((u(),V("div",N,[a(_,{onSubmit:j(d.onSubmit,["prevent"]),"label-position":"top"},{default:o(()=>[n("div",U,[a(c,{gutter:30},{default:o(()=>[a(p,{md:12},{default:o(()=>[a(i,{label:"Layanan Antar Jemput / Km",error:l.errors.antar_jemput},{default:o(()=>[a(s,{modelValue:r.form.antar_jemput,"onUpdate:modelValue":t[0]||(t[0]=e=>r.form.antar_jemput=e),placeholder:"Masukan Biaya Layanan Antar Jemput",formatter:e=>`Rp ${e}`.replace(/\B(?=(\d{3})+(?!\d))/g,","),parser:e=>e.replace(/^Rp\s+|(\,)/gi,"")},null,8,["modelValue","formatter","parser"])]),_:1},8,["error"]),a(i,{label:"Denda Keterlambatan",error:l.errors.denda},{default:o(()=>[a(s,{modelValue:r.form.denda,"onUpdate:modelValue":t[1]||(t[1]=e=>r.form.denda=e),placeholder:"Masukan Biaya Denda Keterlambatan",formatter:e=>`Rp ${e}`.replace(/\B(?=(\d{3})+(?!\d))/g,","),parser:e=>e.replace(/^Rp\s+|(\,)/gi,"")},null,8,["modelValue","formatter","parser"])]),_:1},8,["error"]),a(i,{label:"Layanan Laundry / Kg",error:l.errors.laundry},{default:o(()=>[a(s,{modelValue:r.form.laundry,"onUpdate:modelValue":t[2]||(t[2]=e=>r.form.laundry=e),placeholder:"Masukan Biaya Layanan Laundry",formatter:e=>`Rp ${e}`.replace(/\B(?=(\d{3})+(?!\d))/g,","),parser:e=>e.replace(/^Rp\s+|(\,)/gi,"")},null,8,["modelValue","formatter","parser"])]),_:1},8,["error"])]),_:1})]),_:1}),a(f,{"native-type":"submit",type:"primary",loading:r.loading},{default:o(()=>[A,E(" Simpan ")]),_:1},8,["loading"])])]),_:1},8,["onSubmit"])])),[[y,r.loading]])])]),_:1})}const X=g(M,[["render",I]]);export{X as default};