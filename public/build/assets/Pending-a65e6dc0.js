import{_ as D,a7 as K,m as u,o as c,e as p,w as a,f as i,p as e,a5 as T,K as m,$ as B}from"./id-2e276a2e.js";import{h as V}from"./moment-fbc5633a.js";import{E as S}from"./index-522dba8d.js";import{E as L}from"./index-d645a2bc.js";import{E as P,a as M}from"./index-bb79b737.js";import{E as N}from"./index-57703201.js";import{E as z,a as R}from"./index-5bcbf47d.js";import{E as Y,a as j}from"./index-a4208ec2.js";import{E as I}from"./index-20f4b275.js";import{E as A}from"./index-3a9112db.js";import{v as O}from"./directive-2e5632de.js";import"./index-80ddcb64.js";import"./scroll-bd1cd202.js";import"./vnode-f4803515.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./index-a3b5a262.js";import"./_initCloneObject-8785b8d3.js";import"./_baseIteratee-0f2e46c6.js";import"./isArrayLikeObject-5cf94b9b.js";import"./raf-840075f3.js";const U={components:{},data(){return{removeAlert:!1,data:[],isLoading:!0,page:1,pageSize:0,searchKey:"name",searchKeyword:"",limit:15,total:0}},async created(){await this.fetchData()},methods:{async fetchData(t){var t=t??1;try{this.isLoading=!0;const o=await axios.get(this.route("admin.testimoni.data"),{params:{page:t,limit:this.limit,search:this.searchKeyword,searchKey:this.searchKey,pending:1}});o.status==200&&(this.data=o.data.data,this.page=o.data.current_page,this.total=o.data.total,this.pageSize=o.data.per_page),this.isLoading=!1}catch(o){console.error(o)}},onClickRow(n,t,o){K.visit(this.route("admin.testimoni.show",{id:n.id}),{method:"get"})},selectAll(n){n.target.checked?this.dataList.data.forEach((t,o)=>{this.selected.push(t.id)}):this.selected=[]},format_date(n){if(n)return V(String(n)).format("DD MMM YYYY")},hapus(n){S.alert("Data yang dihapus tidak bisa dikembalikan!","Peringatan",{showCancelButton:!0,confirmButtonText:"Ya!",cancelButtonText:"Tidak!",type:"warning"}).then(()=>{this.$inertia.delete(this.route("admin.video.delete",{id:n}),{preserveScroll:!0,onSuccess:()=>{this.fetchData(),L({type:"success",message:"Data Berhasil Dihapus!"})}})})}}},H={class:"content"},q=i("div",{class:"content-heading d-flex justify-content-between align-items-center"}," Testimoni Dukungan ",-1),F={class:"block block-rounded"},G={class:"block-content py-3"},J={class:"block-content p-0"},Q={class:"block-content py-2"},W={class:"row justify-content-end"},X={class:"col-md-6 text-end"};function Z(n,t,o,$,s,_){const h=P,g=M,f=u("Icon"),y=B,k=N,b=z,w=R,l=Y,d=I,E=j,v=A,x=u("base-layout"),C=O;return c(),p(x,null,{default:a(()=>[i("div",H,[q,i("div",F,[i("div",G,[e(w,null,{default:a(()=>[e(b,{span:10},{default:a(()=>[e(k,{modelValue:s.searchKeyword,"onUpdate:modelValue":t[1]||(t[1]=r=>s.searchKeyword=r),placeholder:"Masukan kata kunci",class:"input-with-select"},{prepend:a(()=>[e(g,{modelValue:s.searchKey,"onUpdate:modelValue":t[0]||(t[0]=r=>s.searchKey=r),placeholder:"Pilih",style:{width:"115px"}},{default:a(()=>[e(h,{label:"Nama",value:"name"})]),_:1},8,["modelValue"])]),append:a(()=>[e(y,null,{default:a(()=>[e(f,{icon:"simple-line-icons:magnifier"})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})]),i("div",J,[T((c(),p(E,{data:s.data,class:"table-click",style:{width:"100%"},onRowClick:_.onClickRow},{default:a(()=>[e(l,{type:"index",width:"50"}),e(l,{prop:"nama",label:"Nama Lengkap",sortable:""}),e(l,{prop:"pekerjaan",label:"Pekerjaan",sortable:""}),e(l,{prop:"phone",label:"No HP",sortable:""}),e(l,{prop:"email",label:"Email",sortable:""}),e(l,{label:"Status"},{default:a(r=>[r.row.status=="pending"?(c(),p(d,{key:0,type:"warning"},{default:a(()=>[m("Pending")]),_:1})):r.row.status=="approve"?(c(),p(d,{key:1,type:"primary"},{default:a(()=>[m("Terima")]),_:1})):(c(),p(d,{key:2,type:"danger"},{default:a(()=>[m("Tolak")]),_:1}))]),_:1})]),_:1},8,["data","onRowClick"])),[[C,s.isLoading]])]),i("div",Q,[i("div",W,[i("div",X,[e(v,{class:"float-end",background:"",layout:"prev, pager, next","page-size":s.pageSize,total:s.total,"current-page":s.page,onCurrentChange:_.fetchData},null,8,["page-size","total","current-page","onCurrentChange"])])])])])])]),_:1})}const we=D(U,[["render",Z]]);export{we as default};
