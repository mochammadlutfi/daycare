import{h as m}from"./moment-fbc5633a.js";import{_ as h,m as g,o as b,e as k,w as e,f as a,p as t,L as c,t as i}from"./id-1c1e2a8a.js";import{E as w}from"./index-bf383f5d.js";import{E as x}from"./index-86db54a9.js";import{E as v,a as y}from"./index-b29a4ac8.js";import{E,a as D}from"./index-20a8f229.js";import"./index-9517473f.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./index-960b7304.js";import"./scroll-3dccf429.js";import"./vnode-6226af66.js";import"./_baseIteratee-5480d325.js";import"./_initCloneObject-9c7c6a23.js";import"./index-3f637f53.js";import"./isArrayLikeObject-63f78cbe.js";import"./raf-a63b4db6.js";const B={components:{},data(){return{active:0,isLoading:!1,listRekrutan:[]}},props:{data:Object},methods:{percentage(o,_){var s=parseInt(o)/_*100;return Math.round(s)},format_date(o){if(o)return m().locale("id"),m(String(o)).format("DD MMMM YYYY")},hapus(o){w.alert("Data yang dihapus tidak bisa dikembalikan!","Peringatan",{showCancelButton:!0,confirmButtonText:"Ya!",cancelButtonText:"Tidak!",type:"warning"}).then(()=>{this.$inertia.delete(this.route("admin.saksi.delete",{id:o}),{preserveScroll:!0,onSuccess:()=>{this.fetchData(),x({type:"success",message:"Data Berhasil Dihapus!"})}})})}}},M={class:"content"},T=a("div",{class:"content-heading d-flex justify-content-between align-items-center"},[a("span",null,"Detail Absen"),a("div",{class:"space-x-1"})],-1),S={class:"block rounded-2"},C={class:"block-content p-4"},Y={class:"fw-semibold"},N={class:"fw-semibold"};function j(o,_,s,P,V,u){const l=v,d=y,r=E,p=D,f=g("base-layout");return b(),k(f,{title:"Detail Penilaian"},{default:e(()=>[a("div",M,[T,a("div",S,[a("div",C,[t(d,{gutter:20,justify:"space-between"},{default:e(()=>[t(l,{lg:12},{default:e(()=>[t(d,{class:"mb-2",gutter:10},{default:e(()=>[t(l,{lg:8},{default:e(()=>[c("Tanggal")]),_:1}),t(l,{lg:16},{default:e(()=>[a("div",Y,i(u.format_date(s.data.tgl)),1)]),_:1})]),_:1})]),_:1}),t(l,{lg:12},{default:e(()=>[t(d,{class:"mb-2",gutter:10},{default:e(()=>[t(l,{lg:8},{default:e(()=>[c("Kelompok")]),_:1}),t(l,{lg:16},{default:e(()=>[a("div",N,i(s.data.kelompok.nama)+" ("+i(s.data.kelompok.usia)+")",1)]),_:1})]),_:1})]),_:1})]),_:1}),t(p,{data:s.data.detail,style:{width:"100%"},border:""},{default:e(()=>[t(r,{type:"index",width:"50"}),t(r,{label:"Nama Anak"},{default:e(n=>[c(i(n.row.anak.nama),1)]),_:1}),t(r,{prop:"status",label:"Status"}),t(r,{label:"Jam Masuk"},{default:e(n=>[c(i(n.row.check_in?n.row.check_in:"-"),1)]),_:1}),t(r,{label:"Jam Pulang"},{default:e(n=>[c(i(n.row.check_out??"-"),1)]),_:1})]),_:1},8,["data"])])])])]),_:1})}const $=h(B,[["render",j]]);export{$ as default};
