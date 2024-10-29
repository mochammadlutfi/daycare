import{h as c}from"./moment-fbc5633a.js";import{_ as h,m as f,o as p,e as g,w as t,f as o,K as i,p as s,g as b,t as n,$ as k}from"./id-2e276a2e.js";import{E as v}from"./index-522dba8d.js";import{E as w}from"./index-d645a2bc.js";import{E as D,a as M}from"./index-b7116d67.js";import"./index-57703201.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./index-80ddcb64.js";import"./scroll-bd1cd202.js";import"./vnode-f4803515.js";const B={components:{},data(){return{active:0,isLoading:!1,listRekrutan:[]}},props:{data:Object},computed:{getImage(){return this.data.image?this.data.image:"/media/placeholder/avatar.jpg"},getKTP(){return this.data.ktp?this.data.ktp:"/media/placeholder/ktp.jpg"}},methods:{setMenu(e){this.active=e},zeroPad(e){return e.toString().padStart(3,"0")},percentage(e,d){var a=parseInt(e)/d*100;return Math.round(a)},format_date(e){if(e)return c().locale("id"),c(String(e)).format("DD MMMM YYYY")},hapus(e){v.alert("Data yang dihapus tidak bisa dikembalikan!","Peringatan",{showCancelButton:!0,confirmButtonText:"Ya!",cancelButtonText:"Tidak!",type:"warning"}).then(()=>{this.$inertia.delete(this.route("admin.pegawai.delete",{id:e}),{preserveScroll:!0,onSuccess:()=>{this.fetchData(),w({type:"success",message:"Data Berhasil Dihapus!"})}})})}}},x={class:"content"},E={class:"content-heading d-flex justify-content-between align-items-center"},T=o("span",null,"Detail Pegawai",-1),y={class:"space-x-1"},S=["href"],j=o("i",{class:"si si-note me-1"},null,-1),P=o("i",{class:"si si-trash me-1"},null,-1),N={class:"block block-rounded block-bordered"},Y={class:"block-content p-3"},C=o("div",{class:"border-bottom border-2 mb-4"},[o("h3",{class:"h5 mb-2"},"1. Informasi Personal")],-1);function I(e,d,a,L,K,r){const m=k,l=D,_=M,u=f("base-layout");return p(),g(u,{title:"Detail Relawan"},{default:t(()=>[o("div",x,[o("div",E,[T,o("div",y,[o("a",{href:e.route("admin.pegawai.edit",{id:a.data.id}),class:"ep-button"},[j,i(" Ubah ")],8,S),s(m,{type:"danger",onClick:d[0]||(d[0]=b(V=>r.hapus(a.data.id),["prevent"]))},{default:t(()=>[P,i(" Hapus ")]),_:1})])]),o("div",N,[o("div",Y,[C,s(_,{column:2,border:""},{default:t(()=>[s(l,{label:"Nama Lengkap"},{default:t(()=>[i(n(a.data.nama),1)]),_:1}),s(l,{label:"Jenis Kelamin"},{default:t(()=>[i(n(a.data.jk),1)]),_:1}),s(l,{label:"Tempat / Tanggal Lahir"},{default:t(()=>[i(n(a.data.tmp_lahir)+" / "+n(r.format_date(a.data.tgl_lahir)),1)]),_:1}),s(l,{label:"No Handphone"},{default:t(()=>[i(n(a.data.phone),1)]),_:1}),s(l,{label:"Email"},{default:t(()=>[i(n(a.data.email),1)]),_:1}),s(l,{label:"Alamat Lengkap"},{default:t(()=>[i(n(a.data.alamat),1)]),_:1}),s(l,{label:"Agama"},{default:t(()=>[i(n(a.data.agama),1)]),_:1}),s(l,{label:"Pendidikan Terakhir"},{default:t(()=>[i(n(a.data.pendidikan_terakhir),1)]),_:1}),s(l,{label:"Mulai Bekerja"},{default:t(()=>[i(n(a.data.tgl_mulai),1)]),_:1}),s(l,{label:"Tanggal Masuk"},{default:t(()=>[i(n(r.format_date(a.data.tgl_masuk)),1)]),_:1})]),_:1})])])])]),_:1})}const W=h(B,[["render",I]]);export{W as default};