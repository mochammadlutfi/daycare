import{_ as k,K as D,a7 as C,m as L,o as h,e as f,w as l,f as t,L as g,p as e,a5 as S,t as p}from"./id-1c1e2a8a.js";import{E as V,a as q}from"./index-e88e0ccf.js";import{E as z,a as I}from"./index-b29a4ac8.js";import{E as M}from"./index-9517473f.js";import{E as N,a as T}from"./index-20a8f229.js";import{E as Y}from"./index-8d957708.js";import{v as j}from"./directive-d6b9c9af.js";import"./index-82c08022.js";import"./event-9519ab40.js";import"./scroll-3dccf429.js";import"./index-3f637f53.js";import"./_initCloneObject-9c7c6a23.js";import"./_baseIteratee-5480d325.js";import"./typescript-defaf979.js";import"./isArrayLikeObject-63f78cbe.js";import"./raf-a63b4db6.js";const A={components:{},data(){return{kota_id:null,selected:[],data:[],isLoading:!0,page:1,pageSize:0,limit:5,total:0,from:0,to:0,params:{page:1,limit:25,q:""}}},async created(){await this.fetchData()},methods:{async setFilter(){this.daerahSelect=!1,await this.fetchData()},doSearch:_.debounce(function(){this.isLoading=!0,this.fetchData()},1e3),async fetchData(a){var a=a??1;try{this.isLoading=!0;const o=await D.get(this.route("admin.pegawai.data"),{params:{page:a,limit:this.params.limit,q:this.params.q}});o.status==200&&(this.data=o.data.data,this.params.page=o.data.current_page,this.total=o.data.total,this.pageSize=o.data.per_page,this.from=o.data.from,this.to=o.data.to),this.isLoading=!1}catch(o){console.error(o)}},onClickRow(n,a,o){C.visit(this.route("admin.pegawai.show",{id:n.id}),{method:"get"})},selectAll(n){n.target.checked?this.dataList.data.forEach((a,o)=>{this.selected.push(a.id)}):this.selected=[]},format_date(n){if(n)return moment(String(n)).format("DD MMM YYYY")}}},B={class:"content"},P={class:"content-heading d-flex justify-content-between align-items-center"},O=t("span",null,"Pegawai",-1),R={class:"space-x-1"},U=["href"],F=t("i",{class:"fa fa-plus me-1"},null,-1),K={class:"block rounded"},G={class:"block-content py-3"},H=t("span",null,[t("i",{class:"fa fa-search"})],-1),J={class:"block-content p-0"},Q=["href"],W=t("i",{class:"fa fa-eye me-1"},null,-1),X={class:"block-content py-2"},Z={class:"my-auto text-xs"};function $(n,a,o,ee,s,d){const m=V,b=q,r=z,w=M,u=I,c=N,v=T,y=Y,x=L("base-layout"),E=j;return h(),f(x,null,{default:l(()=>[t("div",B,[t("div",P,[O,t("div",R,[t("a",{href:n.route("admin.pegawai.create"),class:"ep-button ep-button--primary"},[F,g(" Tambah ")],8,U)])]),t("div",K,[t("div",G,[e(u,{justify:"space-between"},{default:l(()=>[e(r,{span:12},{default:l(()=>[e(b,{modelValue:s.params.limit,"onUpdate:modelValue":a[0]||(a[0]=i=>s.params.limit=i),placeholder:"Pilih",style:{width:"115px"},onChange:a[1]||(a[1]=i=>d.fetchData(1))},{default:l(()=>[e(m,{label:"25",value:"25"}),e(m,{label:"50",value:"50"}),e(m,{label:"100",value:"100"})]),_:1},8,["modelValue"])]),_:1}),e(r,{span:7},{default:l(()=>[e(w,{modelValue:s.params.q,"onUpdate:modelValue":a[2]||(a[2]=i=>s.params.q=i),onInput:d.doSearch,clearable:""},{prefix:l(()=>[H]),_:1},8,["modelValue","onInput"])]),_:1})]),_:1})]),t("div",J,[S((h(),f(v,{data:s.data,class:"w-100","header-cell-class-name":"bg-body text-dark"},{default:l(()=>[e(c,{prop:"nama",label:"Nama",width:"220","header-align":"center"}),e(c,{prop:"alamat",label:"Alamat",width:"400","header-align":"center"},{default:l(i=>[t("div",null,p(i.row.alamat),1)]),_:1}),e(c,{prop:"level",label:"Level"}),e(c,{label:"Aksi",align:"center",width:"180"},{default:l(i=>[t("a",{href:n.route("admin.pegawai.show",{id:i.row.id}),class:"ep-button ep-button--primary"},[W,g(" Detail ")],8,Q)]),_:1})]),_:1},8,["data"])),[[E,s.isLoading]])]),t("div",X,[e(u,{justify:"space-between"},{default:l(()=>[e(r,{lg:12,class:"d-flex"},{default:l(()=>[t("p",Z,"Menampilkan "+p(s.from)+" sampai "+p(s.to)+" dari "+p(s.total),1)]),_:1}),e(r,{lg:12,class:"text-end"},{default:l(()=>[e(y,{class:"float-end",background:"",layout:"prev, pager, next","page-size":s.pageSize,total:s.total,"current-page":s.page,onCurrentChange:d.fetchData},null,8,["page-size","total","current-page","onCurrentChange"])]),_:1})]),_:1})])])])]),_:1})}const ge=k(A,[["render",$]]);export{ge as default};
