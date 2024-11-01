import{h as f}from"./moment-fbc5633a.js";import{_ as b,m as y,o as c,e as w,w as e,f as t,a8 as x,j as r,t as l,p as a,V as k,K as _,S as v,F as D}from"./id-44e39273.js";import{E as B}from"./index-8d5cd002.js";import{E as S}from"./index-ada9f14f.js";import{E}from"./index-852c04a7.js";import{E as T,a as M}from"./index-84ed3e91.js";import"./index-4ea0d70f.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./index-05777cc1.js";import"./scroll-bd36456a.js";import"./vnode-eeb9e0f5.js";import"./raf-3ca20a2c.js";const C={components:{},data(){return{active:0,isLoading:!1,listRekrutan:[]}},props:{data:Object},methods:{percentage(o,m){var s=parseInt(o)/m*100;return Math.round(s)},format_date(o){if(o)return f().locale("id"),f(String(o)).format("DD MMMM YYYY")},hapus(o){B.alert("Data yang dihapus tidak bisa dikembalikan!","Peringatan",{showCancelButton:!0,confirmButtonText:"Ya!",cancelButtonText:"Tidak!",type:"warning"}).then(()=>{this.$inertia.delete(this.route("admin.saksi.delete",{id:o}),{preserveScroll:!0,onSuccess:()=>{this.fetchData(),S({type:"success",message:"Data Berhasil Dihapus!"})}})})}}},N={class:"content"},j={class:"content-heading d-flex justify-content-between align-items-center"},I=t("span",null,"Detail Invoice",-1),V={class:"space-x-1"},Y=["href"],H={class:"block rounded-2"},L={key:0,class:"text-center mb-4"},R={class:"fs-5 fw-bold text-dark mb-3"},q=["href"],F=t("h2",{class:"fw-bold fs-5 mb-2"},"Informasi Dasar",-1),K={class:"fw-semibold"},P={class:"fw-semibold"},z={class:"fw-semibold"},O={key:0,class:"badge bg-success"},Q={key:1,class:"badge bg-danger"},A=t("h2",{class:"fw-bold fs-5 mb-2"},"Informasi Pengguna",-1),G={class:"fw-semibold"},J={class:"table-responsive push"},U={class:"table table-bordered"},W=t("thead",null,[t("tr",{class:"text-dark"},[t("th",{class:"text-center",style:{width:"60px"}}),t("th",null,"Keterangan"),t("th",{class:"text-end",style:{width:"180px"}},"Harga Satuan"),t("th",{class:"text-end",style:{width:"120px"}},"Qty"),t("th",{class:"text-end",style:{width:"120px"}},"Subtotal")])],-1),X={class:"text-center"},Z={class:"fw-semibold mb-1"},$=t("div",{class:"text-muted"},null,-1),tt={class:"text-end"},et={class:"text-end"},at={class:"text-end"},st=t("td",{colspan:"4",class:"fw-bold text-uppercase text-end"},"Total",-1),ot={class:"fw-bold text-end"};function nt(o,m,s,lt,dt,u){const g=E,n=T,d=M,p=y("base-layout");return c(),w(p,{title:"Detail Relawan"},{default:e(()=>[t("div",N,[t("div",j,[I,t("div",V,[t("a",{href:o.route("admin.invoice.pdf",{id:s.data.id}),class:"ep-button ep-button--primary",target:"_blank"}," Download Invoice ",8,Y)])]),t("div",H,[t("div",{class:"block-content p-4",style:x({background:`url(${s.data.status=="paid"?"/images/paid.png":"/images/unpaid.png"}) no-repeat center center`})},[s.data.status=="unpaid"?(c(),r("div",L,[t("div",R," Segera selesaikan pembayaran sebelum tanggal "+l(u.format_date(s.data.tgl_tempo)),1),a(g,{format:"DD [hari] HH [jam] mm [menit] ss [detik]",value:o.tempo,class:"mb-3"},null,8,["value"]),t("a",{href:`https://app.sandbox.midtrans.com/snap/v4/redirection/${s.data.ref}`,class:"ep-button ep-button--primary",target:"_blank"}," Bayar Sekarang ",8,q)])):k("",!0),a(d,{gutter:20,justify:"space-between"},{default:e(()=>[a(n,{lg:12},{default:e(()=>[F,a(d,{class:"mb-2",gutter:10},{default:e(()=>[a(n,{lg:8},{default:e(()=>[_("Nomor")]),_:1}),a(n,{lg:16},{default:e(()=>[t("div",K,l(s.data.nomor),1)]),_:1})]),_:1}),a(d,{class:"mb-2",gutter:10},{default:e(()=>[a(n,{lg:8},{default:e(()=>[_("Tanggal")]),_:1}),a(n,{lg:16},{default:e(()=>[t("div",P,l(u.format_date(s.data.tgl)),1)]),_:1})]),_:1}),a(d,{class:"mb-2",gutter:10},{default:e(()=>[a(n,{lg:8},{default:e(()=>[_("Tanggal Tempo")]),_:1}),a(n,{lg:16},{default:e(()=>[t("div",z,l(u.format_date(s.data.tgl_tempo)),1)]),_:1})]),_:1}),a(d,{class:"mb-2",gutter:10},{default:e(()=>[a(n,{lg:8},{default:e(()=>[_("Status")]),_:1}),a(n,{lg:16},{default:e(()=>[s.data.status=="paid"?(c(),r("span",O," Lunas ")):(c(),r("span",Q," Belum Bayar "))]),_:1})]),_:1})]),_:1}),a(n,{lg:12},{default:e(()=>[A,a(d,{class:"mb-2",gutter:10},{default:e(()=>[a(n,{lg:8},{default:e(()=>[_("Nama")]),_:1}),a(n,{lg:16},{default:e(()=>[t("div",G,l(s.data.user.nama),1)]),_:1})]),_:1})]),_:1})]),_:1}),t("div",J,[t("table",U,[W,t("tbody",null,[(c(!0),r(D,null,v(s.data.detail,(i,h)=>(c(),r("tr",{key:h},[t("td",X,l(h+1),1),t("td",null,[t("p",Z,l(i.tipe),1),$]),t("td",tt,l(o.currency(i.harga)),1),t("td",et,l(i.qty),1),t("td",at,l(o.currency(i.harga*i.qty)),1)]))),128))]),t("tfoot",null,[t("tr",null,[st,t("td",ot,l(o.currency(s.data.total)),1)])])])])],4)])])]),_:1})}const xt=b(C,[["render",nt]]);export{xt as default};
