import{_ as B,J as L,a7 as I,y as T,m as b,o as k,e as w,w as l,f as a,K as p,p as e,g as v,a5 as q,t as m,$ as U}from"./id-44e39273.js";import{S as j}from"./SelectKelompok-18afe301.js";import{E as A,a as K}from"./index-88bb1aa7.js";import{E as P,a as R}from"./index-84ed3e91.js";import{E as F}from"./index-4ea0d70f.js";import{E as N,a as O}from"./index-b7b101e9.js";import{E as H}from"./index-11481b41.js";import{E as J,a as G}from"./index-aa7e31ad.js";import{E as Q}from"./index-ebf98ed5.js";import{E as W}from"./index-f9851f1c.js";import{v as X}from"./directive-cd218522.js";import"./index-10bd6a9f.js";import"./event-9519ab40.js";import"./scroll-bd36456a.js";import"./index-9f983416.js";import"./_initCloneObject-24df7827.js";import"./_baseIteratee-982954bc.js";import"./typescript-defaf979.js";import"./isArrayLikeObject-b43587b5.js";import"./raf-3ca20a2c.js";import"./panel-time-pick-f24324ab.js";import"./utils-d95efb42.js";import"./localeData-212d917f.js";import"./index-05777cc1.js";import"./vnode-eeb9e0f5.js";const Z={components:{SelectKelompok:j},data(){return{kota_id:null,selected:[],data:[],isLoading:!0,page:1,pageSize:0,limit:5,total:0,from:0,to:0,params:{page:1,limit:25,q:""},exportModal:!1,form:{kelompok:null,tgl:null}}},async created(){await this.fetchData()},methods:{async setFilter(){this.daerahSelect=!1,await this.fetchData()},doSearch:_.debounce(function(){this.isLoading=!0,this.fetchData()},1e3),async fetchData(t){var t=t??1;try{this.isLoading=!0;const s=await L.get(this.route("admin.absen.data"),{params:{page:t,limit:this.params.limit,q:this.params.q}});s.status==200&&(this.data=s.data.data,this.params.page=s.data.current_page,this.total=s.data.total,this.pageSize=s.data.per_page,this.from=s.data.from,this.to=s.data.to),this.isLoading=!1}catch(s){console.error(s)}},onClickRow(i,t,s){I.visit(this.route("admin.pegawai.show",{id:i.id}),{method:"get"})},selectAll(i){i.target.checked?this.dataList.data.forEach((t,s)=>{this.selected.push(t.id)}):this.selected=[]},format_date(i){if(i)return T(String(i)).format("DD MMMM YYYY")},getReport(){window.open(this.route("admin.absen.report",this.form),"_blank")}}},$={class:"content"},ee={class:"content-heading d-flex justify-content-between align-items-center"},te=a("span",null,"Absen",-1),ae={class:"space-x-1"},oe=["href"],le=a("i",{class:"fa fa-plus me-1"},null,-1),ne=["href"],se=a("i",{class:"fa fa-plus me-1"},null,-1),ie=a("i",{class:"fa fa-print me-1"},null,-1),re={class:"block rounded"},pe={class:"block-content py-3"},me=a("span",null,[a("i",{class:"fa fa-search"})],-1),de={class:"block-content p-0"},ce=["href"],ue=a("i",{class:"fa fa-eye me-1"},null,-1),_e={class:"block-content py-2"},fe={class:"my-auto text-xs"},he={class:"d-flex"},ge={class:"float-end"};function be(i,t,s,ke,o,d){const u=U,f=A,y=K,c=P,E=F,h=R,r=N,x=O,V=H,M=b("select-kelompok"),g=J,D=Q,S=G,C=W,Y=b("base-layout"),z=X;return k(),w(Y,null,{default:l(()=>[a("div",$,[a("div",ee,[te,a("div",ae,[a("a",{href:i.route("admin.absen.create"),class:"ep-button ep-button--primary"},[le,p(" Tambah ")],8,oe),a("a",{href:i.route("admin.absen.scanner"),class:"ep-button ep-button--primary"},[se,p(" Scanner ")],8,ne),e(u,{type:"primary",onClick:t[0]||(t[0]=v(n=>o.exportModal=!0,["prevent"]))},{default:l(()=>[ie,p(" Export ")]),_:1})])]),a("div",re,[a("div",pe,[e(h,{justify:"space-between"},{default:l(()=>[e(c,{span:12},{default:l(()=>[e(y,{modelValue:o.params.limit,"onUpdate:modelValue":t[1]||(t[1]=n=>o.params.limit=n),placeholder:"Pilih",style:{width:"115px"},onChange:t[2]||(t[2]=n=>d.fetchData(1))},{default:l(()=>[e(f,{label:"25",value:"25"}),e(f,{label:"50",value:"50"}),e(f,{label:"100",value:"100"})]),_:1},8,["modelValue"])]),_:1}),e(c,{span:7},{default:l(()=>[e(E,{modelValue:o.params.q,"onUpdate:modelValue":t[3]||(t[3]=n=>o.params.q=n),onInput:d.doSearch,clearable:""},{prefix:l(()=>[me]),_:1},8,["modelValue","onInput"])]),_:1})]),_:1})]),a("div",de,[q((k(),w(x,{data:o.data,class:"w-100","header-cell-class-name":"bg-body text-dark"},{default:l(()=>[e(r,{prop:"tgl",label:"Tanggal",width:"220","header-align":"center"},{default:l(n=>[a("div",null,m(d.format_date(n.row.tgl)),1)]),_:1}),e(r,{label:"Kelompok",width:"220","header-align":"center"},{default:l(n=>[a("div",null,m(n.row.kelompok.nama)+" ("+m(n.row.kelompok.usia)+")",1)]),_:1}),e(r,{prop:"hadir",label:"Hadir","header-align":"center",align:"center"}),e(r,{prop:"izin",label:"Izin","header-align":"center",align:"center"}),e(r,{prop:"sakit",label:"Sakit","header-align":"center",align:"center"}),e(r,{prop:"alpa",label:"Alpa","header-align":"center",align:"center"}),e(r,{label:"Aksi",align:"center",width:"180"},{default:l(n=>[a("a",{href:i.route("admin.absen.show",{id:n.row.id}),class:"ep-button ep-button--primary"},[ue,p(" Detail ")],8,ce)]),_:1})]),_:1},8,["data"])),[[z,o.isLoading]])]),a("div",_e,[e(h,{justify:"space-between"},{default:l(()=>[e(c,{lg:12,class:"d-flex"},{default:l(()=>[a("p",fe,"Menampilkan "+m(o.from)+" sampai "+m(o.to)+" dari "+m(o.total),1)]),_:1}),e(c,{lg:12,class:"text-end"},{default:l(()=>[e(V,{class:"float-end",background:"",layout:"prev, pager, next","page-size":o.pageSize,total:o.total,"current-page":o.page,onCurrentChange:d.fetchData},null,8,["page-size","total","current-page","onCurrentChange"])]),_:1})]),_:1})])]),e(C,{modelValue:o.exportModal,"onUpdate:modelValue":t[7]||(t[7]=n=>o.exportModal=n),title:"Export",width:"500"},{default:l(()=>[e(S,{"label-width":"30%",onSubmit:v(d.getReport,["prevent"]),target:"_blank","label-position":"top"},{default:l(()=>[e(g,{class:"mb-4",label:"Kelompok"},{default:l(()=>[e(M,{name:"kelompok",modelValue:o.form.kelompok,"onUpdate:modelValue":t[4]||(t[4]=n=>o.form.kelompok=n)},null,8,["modelValue"])]),_:1}),e(g,{class:"mb-4",label:o.form.tipe=="bulanan"?"Bulan":"Tahun"},{default:l(()=>[e(D,{modelValue:o.form.tgl,"onUpdate:modelValue":t[5]||(t[5]=n=>o.form.tgl=n),format:"MMMM YYYY","value-format":"YYYY-MM-DD",type:"month",placeholder:"Pilih Bulan"},null,8,["modelValue"])]),_:1},8,["label"]),a("div",he,[a("div",ge,[e(u,{onClick:t[6]||(t[6]=n=>o.exportModal=!1)},{default:l(()=>[p("Batal")]),_:1}),e(u,{type:"primary","native-type":"submit"},{default:l(()=>[p(" Download ")]),_:1})])])]),_:1},8,["onSubmit"])]),_:1},8,["modelValue"])])]),_:1})}const Oe=B(Z,[["render",be]]);export{Oe as default};