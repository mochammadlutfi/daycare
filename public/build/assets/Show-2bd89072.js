import{h as m}from"./moment-fbc5633a.js";import{_ as v,m as w,o as _,e as h,w as t,f as a,L as l,p as e,t as d,j as y,U as E,F as x,a0 as B}from"./id-97c9e5f5.js";import{E as j}from"./index-d0506f46.js";import{E as D}from"./index-1919b3f8.js";import{E as M,a as L}from"./index-1567bcf2.js";import{E as S}from"./index-4a845842.js";import"./index-ae963a16.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./index-01cbe581.js";import"./scroll-1fa1a40e.js";import"./vnode-4e97093f.js";import"./position-58158764.js";const C={components:{},data(){return{active:0,isLoading:!1,listRekrutan:[],fotoList:[]}},props:{data:Object},mounted(){this.data.foto.length&&this.data.foto.forEach(s=>{this.fotoList.push(s.path)})},methods:{percentage(s,r){var o=parseInt(s)/r*100;return Math.round(o)},format_date(s){if(s)return m().locale("id"),m(String(s)).format("DD MMMM YYYY")},format_jam(s){if(s)return m(String(s),"hh:mm:ss").format("hh:mm")},hapus(s){j.alert("Data yang dihapus tidak bisa dikembalikan!","Peringatan",{showCancelButton:!0,confirmButtonText:"Ya!",cancelButtonText:"Tidak!",type:"warning"}).then(()=>{this.$inertia.delete(this.route("admin.antarjemput.delete",{id:s}),{preserveScroll:!0,onSuccess:()=>{this.fetchData(),D({type:"success",message:"Data Berhasil Dihapus!"})}})})}}},T={class:"content"},Y={class:"content-heading d-flex justify-content-between align-items-center"},A=a("span",null,"Detail Antar Jemput",-1),N={class:"space-x-1"},J=["href"],V=a("i",{class:"si si-note me-1"},null,-1),F=a("i",{class:"si si-trash me-1"},null,-1),I={class:"block rounded-2"},K={class:"block-content p-4"},R={class:"fw-semibold"},U={class:"fw-semibold"},z={class:"fw-semibold"},H={class:"fw-semibold"},O={class:"demo-image__preview"},P=a("div",{class:""},"Bukti Antar Jemput",-1);function q(s,r,o,G,p,c){const g=B,n=M,i=L,b=S,k=w("base-layout");return _(),h(k,{title:"Detail Antar Jemput"},{default:t(()=>[a("div",T,[a("div",Y,[A,a("div",N,[a("a",{href:s.route("admin.antarjemput.edit",{id:o.data.id}),class:"ep-button ep-button--primary"},[V,l(" Ubah ")],8,J),e(g,{type:"danger",onClick:r[0]||(r[0]=u=>c.hapus(o.data.id))},{default:t(()=>[F,l(" Hapus ")]),_:1})])]),a("div",I,[a("div",K,[e(i,{gutter:20,justify:"space-between",class:"mb-4"},{default:t(()=>[e(n,{lg:12},{default:t(()=>[e(i,{class:"mb-2",gutter:10},{default:t(()=>[e(n,{lg:8},{default:t(()=>[l("Tanggal")]),_:1}),e(n,{lg:16},{default:t(()=>[a("div",R,d(c.format_date(o.data.tgl))+" "+d(c.format_jam(o.data.jam)),1)]),_:1})]),_:1}),e(i,{class:"mb-2",gutter:10},{default:t(()=>[e(n,{lg:8},{default:t(()=>[l("Kelompok")]),_:1}),e(n,{lg:16},{default:t(()=>[a("div",U,d(o.data.kelompok.nama)+" ("+d(o.data.kelompok.usia)+")",1)]),_:1})]),_:1})]),_:1}),e(n,{lg:12},{default:t(()=>[e(i,{class:"mb-2",gutter:10},{default:t(()=>[e(n,{lg:8},{default:t(()=>[l("Nama Anak")]),_:1}),e(n,{lg:16},{default:t(()=>[a("div",z,d(o.data.anak.nama),1)]),_:1})]),_:1}),e(i,{class:"mb-2",gutter:10},{default:t(()=>[e(n,{lg:8},{default:t(()=>[l("Keterangan")]),_:1}),e(n,{lg:16},{default:t(()=>[a("div",H,d(o.data.keterangan??"-"),1)]),_:1})]),_:1})]),_:1})]),_:1}),a("div",O,[P,e(i,{gutter:20},{default:t(()=>[(_(!0),y(x,null,E(o.data.foto,(u,f)=>(_(),h(n,{md:4,key:f},{default:t(()=>[e(b,{src:u.path,lazy:"","preview-src-list":p.fotoList,"initial-index":f},null,8,["src","preview-src-list","initial-index"])]),_:2},1024))),128))]),_:1})])])])])]),_:1})}const dt=v(C,[["render",q]]);export{dt as default};
