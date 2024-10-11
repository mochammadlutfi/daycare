import{h as _}from"./moment-fbc5633a.js";import{_ as f,m as g,o as b,e as h,w as t,f as a,L as c,p as s,n as r,t as n}from"./id-3481afe5.js";import{E as k}from"./index-b64fb6eb.js";import{E as p}from"./index-6f4b141f.js";import{E as x,a as w}from"./index-64ddff80.js";import"./index-b6dcfd92.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./index-0767bb4b.js";import"./scroll-bcd136fa.js";import"./vnode-c8d30334.js";const v={components:{},inject:["mq"],data(){return{active:0,isLoading:!1,listRekrutan:[]}},props:{data:Object},methods:{percentage(o,m){var e=parseInt(o)/m*100;return Math.round(e)},format_date(o){if(o)return _().locale("id"),_(String(o)).format("DD MMMM YYYY")},hapus(o){k.alert("Data yang dihapus tidak bisa dikembalikan!","Peringatan",{showCancelButton:!0,confirmButtonText:"Ya!",cancelButtonText:"Tidak!",type:"warning"}).then(()=>{this.$inertia.delete(this.route("admin.raport.delete",{id:o}),{preserveScroll:!0,onSuccess:()=>{p({type:"success",message:"Data Berhasil Dihapus!"})}})})}}},B={class:"content"},P={class:"content-heading d-flex justify-content-between align-items-center"},y=a("span",null,"Detail Raport",-1),D={class:"space-x-1"},M=["href"],E=a("i",{class:"fa fa-download me-1"},null,-1),q={class:"block rounded-2"},C={class:"block-content p-4"},S={class:"fw-semibold"},T={class:"fw-semibold"},Y={class:"fw-semibold"},j={class:"fw-semibold"},N={class:"fw-semibold"},R={class:"table-responsive push"},K={class:"table table-bordered"},V=a("tr",{class:""},[a("td",{class:"fw-bold"},"Perkembangan Nilai Agama dan Moral")],-1),A=a("tr",{class:""},[a("td",{class:"fw-bold"},"Perkembangan Sosial dan Emosional")],-1),F=a("tr",{class:""},[a("td",{class:"fw-bold"},"Perkembangan Fisik dan Motorik")],-1),L=a("tr",{class:""},[a("td",{class:"fw-bold"},"Perkembangan Kognitif")],-1),z=a("tr",{class:""},[a("td",{class:"fw-bold"},"Perkembangan Bahasa")],-1);function I(o,m,e,O,G,d){const l=x,i=w,u=g("user-layout");return b(),h(u,{title:"Detail Raport"},{default:t(()=>[a("div",B,[a("div",P,[y,a("div",D,[a("a",{href:o.route("user.raport.pdf",{id:e.data.id}),class:"ep-button ep-button--primary"},[E,c(" Download PDF ")],8,M)])]),a("div",q,[a("div",C,[s(i,{gutter:20,justify:"space-between",class:"mb-4"},{default:t(()=>[s(l,{lg:12},{default:t(()=>[s(i,{class:"mb-2",gutter:10},{default:t(()=>[s(l,{lg:8,sm:8,xs:8},{default:t(()=>[c("Tanggal")]),_:1}),s(l,{lg:16,sm:16,xs:16,class:r({"text-end":!d.mq.smPlus})},{default:t(()=>[a("div",S,n(d.format_date(e.data.tgl)),1)]),_:1},8,["class"])]),_:1}),s(i,{class:"mb-2",gutter:10},{default:t(()=>[s(l,{lg:8,sm:8,xs:8},{default:t(()=>[c("Kelompok")]),_:1}),s(l,{lg:16,sm:16,xs:16,class:r({"text-end":!d.mq.smPlus})},{default:t(()=>[a("div",T,n(e.data.kelompok.nama)+" ("+n(e.data.kelompok.usia)+")",1)]),_:1},8,["class"])]),_:1}),s(i,{class:"mb-2",gutter:10},{default:t(()=>[s(l,{lg:8,sm:8,xs:8},{default:t(()=>[c("Anak")]),_:1}),s(l,{lg:16,sm:16,xs:16,class:r({"text-end":!d.mq.smPlus})},{default:t(()=>[a("div",Y,n(e.data.anak.nama),1)]),_:1},8,["class"])]),_:1})]),_:1}),s(l,{lg:12},{default:t(()=>[s(i,{class:"mb-2",gutter:10},{default:t(()=>[s(l,{lg:8,sm:8,xs:8},{default:t(()=>[c("Tinggi Badan")]),_:1}),s(l,{lg:16,sm:16,xs:16,class:r({"text-end":!d.mq.smPlus})},{default:t(()=>[a("div",j,n(e.data.tinggi)+" CM",1)]),_:1},8,["class"])]),_:1}),s(i,{class:"mb-2",gutter:10},{default:t(()=>[s(l,{lg:8,sm:8,xs:8},{default:t(()=>[c("Berat Badan")]),_:1}),s(l,{lg:16,sm:16,xs:16,class:r({"text-end":!d.mq.smPlus})},{default:t(()=>[a("div",N,n(e.data.berat)+" Kg",1)]),_:1},8,["class"])]),_:1})]),_:1})]),_:1}),a("div",R,[a("table",K,[a("tbody",null,[V,a("tr",null,[a("td",null,n(e.data.perkembangan_nilai_agama_dan_moral),1)]),A,a("tr",null,[a("td",null,n(e.data.perkembangan_sosial_emosional),1)]),F,a("tr",null,[a("td",null,n(e.data.perkembangan_fisik_motorik),1)]),L,a("tr",null,[a("td",null,n(e.data.perkembangan_kognitif),1)]),z,a("tr",null,[a("td",null,n(e.data.perkembangan_bahasa),1)])])])])])])])]),_:1})}const ea=f(v,[["render",I]]);export{ea as default};