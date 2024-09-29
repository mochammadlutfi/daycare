import{h as V}from"./moment-fbc5633a.js";import{_ as L,K as P,a8 as q,m as M,o as g,e as b,w as t,f as a,L as r,p as e,a6 as j,t as p,g as z,a0 as I,q as B,u as N,v as T}from"./id-97c9e5f5.js";import{E as U,a as Y}from"./index-bcb34dd7.js";import{E as A,a as O}from"./index-1567bcf2.js";import{E as R}from"./index-ae963a16.js";import{E as F,a as H}from"./index-ec964314.js";import{E as K}from"./index-de85108f.js";import{v as G}from"./directive-7739a56c.js";import"./index-4a89f490.js";import"./event-9519ab40.js";import"./scroll-1fa1a40e.js";import"./index-91a35dc4.js";import"./_initCloneObject-9298e566.js";import"./_baseIteratee-2fd9a4cf.js";import"./typescript-defaf979.js";import"./isArrayLikeObject-55c2e828.js";import"./raf-85a89f42.js";const J={components:{},data(){return{kota_id:null,selected:[],data:[],isLoading:!0,page:1,pageSize:0,total:0,from:0,to:0,params:{page:1,limit:25,q:""}}},async created(){await this.fetchData()},methods:{async setFilter(){this.daerahSelect=!1,await this.fetchData()},doSearch:_.debounce(function(){this.isLoading=!0,this.fetchData()},1e3),async fetchData(o){var o=o??1;try{this.isLoading=!0;const l=await P.get(this.route("admin.paket.data"),{params:{page:o,limit:this.params.limit,q:this.params.q}});l.status==200&&(this.data=l.data.data,this.params.page=l.data.current_page,this.total=l.data.total,this.pageSize=l.data.per_page,this.from=l.data.from,this.to=l.data.to),this.isLoading=!1}catch(l){console.error(l)}},onClickRow(s,o,l){q.visit(this.route("admin.pegawai.show",{id:s.id}),{method:"get"})},selectAll(s){s.target.checked?this.dataList.data.forEach((o,l)=>{this.selected.push(o.id)}):this.selected=[]},format_date(s){if(s)return V(String(s)).format("DD MMM YYYY")}}},Q={class:"content"},W={class:"content-heading d-flex justify-content-between align-items-center"},X=a("span",null,"Paket",-1),Z={class:"space-x-1"},$=["href"],ee=a("i",{class:"fa fa-plus me-1"},null,-1),te={class:"block rounded"},ae={class:"block-content py-3"},oe=a("span",null,[a("i",{class:"fa fa-search"})],-1),se={class:"block-content p-0"},ne=a("i",{class:"fa fa-angle-down ms-1"},null,-1),le=["href"],ie=a("i",{class:"si fa-fw si-note"},null,-1),re=a("i",{class:"si fa-fw si-trash"},null,-1),ce={class:"block-content py-2"},pe={class:"my-auto text-xs"};function de(s,o,l,_e,i,m){const u=U,w=Y,d=A,y=R,f=O,c=F,k=I,h=B,v=N,E=T,x=H,D=K,C=M("base-layout"),S=G;return g(),b(C,null,{default:t(()=>[a("div",Q,[a("div",W,[X,a("div",Z,[a("a",{href:s.route("admin.paket.create"),class:"ep-button ep-button--primary"},[ee,r(" Tambah ")],8,$)])]),a("div",te,[a("div",ae,[e(f,{justify:"space-between"},{default:t(()=>[e(d,{span:12},{default:t(()=>[e(w,{modelValue:i.params.limit,"onUpdate:modelValue":o[0]||(o[0]=n=>i.params.limit=n),placeholder:"Pilih",style:{width:"115px"},onChange:o[1]||(o[1]=n=>m.fetchData(1))},{default:t(()=>[e(u,{label:"25",value:"25"}),e(u,{label:"50",value:"50"}),e(u,{label:"100",value:"100"})]),_:1},8,["modelValue"])]),_:1}),e(d,{span:7},{default:t(()=>[e(y,{modelValue:i.params.q,"onUpdate:modelValue":o[2]||(o[2]=n=>i.params.q=n),onInput:m.doSearch,clearable:""},{prefix:t(()=>[oe]),_:1},8,["modelValue","onInput"])]),_:1})]),_:1})]),a("div",se,[j((g(),b(x,{data:i.data,class:"w-100","header-cell-class-name":"bg-body text-dark"},{default:t(()=>[e(c,{prop:"nama",label:"Nama"}),e(c,{prop:"usia",label:"Usia"}),e(c,{prop:"pembangunan",label:"Pembangunan"},{default:t(n=>[r(p(s.currency(n.row.pembangunan)),1)]),_:1}),e(c,{prop:"pendaftaran",label:"Pendaftaran"},{default:t(n=>[r(p(s.currency(n.row.pendaftaran)),1)]),_:1}),e(c,{prop:"spp",label:"SPP"},{default:t(n=>[r(p(s.currency(n.row.spp)),1)]),_:1}),e(c,{label:"Aksi",align:"center",width:"180"},{default:t(n=>[e(E,{"popper-class":"dropdown-action",trigger:"click"},{dropdown:t(()=>[e(v,null,{default:t(()=>[e(h,null,{default:t(()=>[a("a",{href:s.route("admin.paket.edit",{id:n.row.id}),class:"d-flex justify-content-between space-x-1"},[r(" Ubah "),ie],8,le)]),_:2},1024),e(h,{class:"d-flex align-items-center justify-content-between space-x-1",onClick:z(me=>s.hapus(n.row.id),["prevent"])},{default:t(()=>[r(" Hapus "),re]),_:2},1032,["onClick"])]),_:2},1024)]),default:t(()=>[e(k,{type:"primary"},{default:t(()=>[r(" Aksi "),ne]),_:1})]),_:2},1024)]),_:1})]),_:1},8,["data"])),[[S,i.isLoading]])]),a("div",ce,[e(f,{justify:"space-between"},{default:t(()=>[e(d,{lg:12,class:"d-flex"},{default:t(()=>[a("p",pe,"Menampilkan "+p(i.from)+" sampai "+p(i.to)+" dari "+p(i.total),1)]),_:1}),e(d,{lg:12,class:"text-end"},{default:t(()=>[e(D,{class:"float-end",background:"",layout:"prev, pager, next","page-size":i.pageSize,total:i.total,"current-page":i.page,onCurrentChange:m.fetchData},null,8,["page-size","total","current-page","onCurrentChange"])]),_:1})]),_:1})])])])]),_:1})}const qe=L(J,[["render",de]]);export{qe as default};