import{h as g}from"./moment-fbc5633a.js";import{_ as p,m as b,o,e as k,w as t,f as e,p as a,L as _,t as i,j as d,U as B,F as w,W as x}from"./id-ebd2aa87.js";import{E as v}from"./index-7383163a.js";import{E as y}from"./index-49bd9fbe.js";import{E as D,a as M}from"./index-6077a84f.js";import"./index-4dfa613b.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./index-8a1cff73.js";import"./scroll-7f616a59.js";import"./vnode-a5b99e31.js";const S={components:{},data(){return{active:0,isLoading:!1,listRekrutan:[]}},props:{data:Object},methods:{percentage(l,u){var n=parseInt(l)/u*100;return Math.round(n)},format_date(l){if(l)return g().locale("id"),g(String(l)).format("DD MMMM YYYY")},hapus(l){v.alert("Data yang dihapus tidak bisa dikembalikan!","Peringatan",{showCancelButton:!0,confirmButtonText:"Ya!",cancelButtonText:"Tidak!",type:"warning"}).then(()=>{this.$inertia.delete(this.route("admin.saksi.delete",{id:l}),{preserveScroll:!0,onSuccess:()=>{this.fetchData(),y({type:"success",message:"Data Berhasil Dihapus!"})}})})}}},E={class:"content"},j=e("div",{class:"content-heading d-flex justify-content-between align-items-center"},[e("span",null,"Detail Penilaian"),e("div",{class:"space-x-1"})],-1),C={class:"block rounded-2"},T={class:"block-content p-4"},Y={class:"fw-semibold"},N={class:"fw-semibold"},P={class:"fw-semibold"},V={class:"fw-semibold"},K={class:"table-responsive push"},L={class:"table table-bordered table-hover"},F=e("thead",null,[e("tr",null,[e("th",{class:"text-center",style:{width:"60px"}}),e("th",null,"Anak"),e("th",{class:"text-end",style:{width:"120px"}},"Penilaian")])],-1),H={class:"text-center"},R={class:"fw-semibold mb-1"},A=e("div",{class:"text-muted"},null,-1),I={class:"text-end"},J={key:0,class:"badge bg-danger"},O={key:1,class:"badge bg-warning"},U={key:2,class:"badge bg-info"},W={key:3,class:"badge bg-success"};function q(l,u,n,z,G,h){const s=D,c=M,f=b("base-layout");return o(),k(f,{title:"Detail Penilaian"},{default:t(()=>[e("div",E,[j,e("div",C,[e("div",T,[a(c,{gutter:20,justify:"space-between"},{default:t(()=>[a(s,{lg:12},{default:t(()=>[a(c,{class:"mb-2",gutter:10},{default:t(()=>[a(s,{lg:8},{default:t(()=>[_("Tanggal")]),_:1}),a(s,{lg:16},{default:t(()=>[e("div",Y,i(h.format_date(n.data.tgl)),1)]),_:1})]),_:1}),a(c,{class:"mb-2",gutter:10},{default:t(()=>[a(s,{lg:8},{default:t(()=>[_("Kelompok")]),_:1}),a(s,{lg:16},{default:t(()=>[e("div",N,i(n.data.kelompok.nama)+" ("+i(n.data.kelompok.usia)+")",1)]),_:1})]),_:1})]),_:1}),a(s,{lg:12},{default:t(()=>[a(c,{class:"mb-2",gutter:10},{default:t(()=>[a(s,{lg:8},{default:t(()=>[_("Jenis Kegiatan")]),_:1}),a(s,{lg:16},{default:t(()=>[e("div",P,i(n.data.jenis.nama),1)]),_:1})]),_:1}),a(c,{class:"mb-2",gutter:10},{default:t(()=>[a(s,{lg:8},{default:t(()=>[_("Kegiatan")]),_:1}),a(s,{lg:16},{default:t(()=>[e("div",V,i(n.data.kegiatan.nama),1)]),_:1})]),_:1})]),_:1})]),_:1}),e("div",K,[e("table",L,[F,e("tbody",null,[(o(!0),d(w,null,B(n.data.detail,(r,m)=>(o(),d("tr",{key:m},[e("td",H,i(m+1),1),e("td",null,[e("p",R,i(r.anak.nama),1),A]),e("td",I,[r.nilai=="BB"?(o(),d("span",J," Belum Berkembang ")):r.nilai=="MB"?(o(),d("span",O," Mulai Berkembang ")):r.nilai=="BSH"?(o(),d("span",U," Berkembang Sesuai Harapan ")):r.nilai=="BSB"?(o(),d("span",W," Berkembang Sangat Baik ")):x("",!0)])]))),128))])])])])])])]),_:1})}const ie=p(S,[["render",q]]);export{ie as default};