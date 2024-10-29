import{h as T}from"./moment-fbc5633a.js";import{_ as j,J as Y,m as k,o as b,e as w,w as a,f as l,p as e,K as c,t as m,a5 as B,$ as K}from"./id-2e276a2e.js";import{S as L}from"./SelectKelompok-833f3825.js";import{E as q}from"./index-d645a2bc.js";import{E as z,a as I}from"./index-bb79b737.js";import{E as P,a as U}from"./index-5bcbf47d.js";import{E as J}from"./index-57703201.js";import{E as N,a as A}from"./index-a4208ec2.js";import{E as O}from"./index-3a9112db.js";import{E as G,a as R}from"./index-23bc7dc4.js";import{E as H}from"./index-cc2271ad.js";import{E as Q}from"./index-593b96c3.js";import{v as W}from"./directive-2e5632de.js";import"./typescript-defaf979.js";import"./index-20f4b275.js";import"./event-9519ab40.js";import"./scroll-bd1cd202.js";import"./index-a3b5a262.js";import"./_initCloneObject-8785b8d3.js";import"./_baseIteratee-0f2e46c6.js";import"./isArrayLikeObject-5cf94b9b.js";import"./raf-840075f3.js";import"./panel-time-pick-854cfb01.js";import"./utils-2237dd12.js";import"./localeData-de255be7.js";import"./index-80ddcb64.js";import"./vnode-f4803515.js";const X={components:{SelectKelompok:L},props:{errors:{type:Object}},data(){return{kota_id:null,selected:[],data:[],isLoading:!0,page:1,pageSize:0,limit:5,total:0,from:0,to:0,params:{page:1,limit:25,q:""},showForm:!1,loadingForm:!1,editMode:!1,form:{id:null,kelompok_id:null,minggu:null},formTitle:"Tambah Jadwal Kegiatan"}},async created(){await this.fetchData()},methods:{submit(){this.loadingForm=!0;let n=this.$inertia.form(this.form),t=this.editMode==!0?this.route("admin.jadwal.update",{id:this.form.id}):this.route("admin.jadwal.store");n.post(t,{preserveScroll:!0,onFinish:()=>{this.loadingForm=!1},onSuccess:()=>{q({type:"success",message:"Data Berhasil Disimpan!"}),this.showForm=!1,this.onCloseForm()}})},async setFilter(){this.daerahSelect=!1,await this.fetchData()},doSearch:_.debounce(function(){this.isLoading=!0,this.fetchData()},1e3),async fetchData(t){var t=t??1;try{this.isLoading=!0;const i=await Y.get(this.route("admin.jadwal.data"),{params:{page:t,limit:this.params.limit,q:this.params.q}});i.status==200&&(this.data=i.data.data,this.params.page=i.data.current_page,this.total=i.data.total,this.pageSize=i.data.per_page,this.from=i.data.from,this.to=i.data.to),this.isLoading=!1}catch(i){console.error(i)}},openModal(){this.showForm=!0},onCloseForm(){this.showForm=!1,this.form.id=null,this.form.kelompok_id=null,this.form.periode=null},selectAll(n){n.target.checked?this.dataList.data.forEach((t,i)=>{this.selected.push(t.id)}):this.selected=[]},format_date(n){if(n)return T(String(n)).format("DD MMM YYYY")}}},Z={class:"content"},$={class:"content-heading d-flex justify-content-between align-items-center"},ee=l("span",null,"Jawdal Kegiatan",-1),te={class:"space-x-1"},oe=l("i",{class:"fa fa-plus me-1"},null,-1),ae={class:"block rounded"},le={class:"block-content py-3"},se=l("span",null,[l("i",{class:"fa fa-search"})],-1),ie={class:"block-content p-0"},re=["href"],ne=l("i",{class:"fa fa-eye me-1"},null,-1),me={class:"block-content py-2"},de={class:"my-auto text-xs"},pe={class:"text-end"},ce=l("i",{class:"fa fa-close me-2"},null,-1),ue=l("i",{class:"fa fa-check me-2"},null,-1);function _e(n,t,i,fe,o,r){const u=K,f=z,y=I,d=P,E=J,h=U,p=N,v=A,C=O,F=k("select-kelompok"),g=G,V=H,x=R,D=Q,S=k("base-layout"),M=W;return b(),w(S,null,{default:a(()=>[l("div",Z,[l("div",$,[ee,l("div",te,[e(u,{onClick:r.openModal,type:"primary"},{default:a(()=>[oe,c(" Tambah ")]),_:1},8,["onClick"])])]),l("div",ae,[l("div",le,[e(h,{justify:"space-between"},{default:a(()=>[e(d,{span:12},{default:a(()=>[e(y,{modelValue:o.params.limit,"onUpdate:modelValue":t[0]||(t[0]=s=>o.params.limit=s),placeholder:"Pilih",style:{width:"115px"},onChange:t[1]||(t[1]=s=>r.fetchData(1))},{default:a(()=>[e(f,{label:"25",value:"25"}),e(f,{label:"50",value:"50"}),e(f,{label:"100",value:"100"})]),_:1},8,["modelValue"])]),_:1}),e(d,{span:7},{default:a(()=>[e(E,{modelValue:o.params.q,"onUpdate:modelValue":t[2]||(t[2]=s=>o.params.q=s),onInput:r.doSearch,clearable:""},{prefix:a(()=>[se]),_:1},8,["modelValue","onInput"])]),_:1})]),_:1})]),l("div",ie,[e(v,{data:o.data,class:"w-100","header-cell-class-name":"bg-body text-dark"},{default:a(()=>[e(p,{label:"Kelompok",width:"220","header-align":"center"},{default:a(s=>[l("div",null,m(s.row.kelompok.nama)+" ("+m(s.row.kelompok.usia)+")",1)]),_:1}),e(p,{prop:"admin.nama",label:"Guru"}),e(p,{prop:"tgl",label:"Periode",width:"200","header-align":"center"},{default:a(s=>[l("div",null,m(r.format_date(s.row.tgl_mulai))+" - "+m(r.format_date(s.row.tgl_selesai)),1)]),_:1}),e(p,{label:"Aksi",align:"center",width:"180"},{default:a(s=>[l("a",{href:n.route("admin.jadwal.detail",{id:s.row.id}),class:"ep-button ep-button--primary"},[ne,c(" Detail ")],8,re)]),_:1})]),_:1},8,["data"])]),l("div",me,[e(h,{justify:"space-between"},{default:a(()=>[e(d,{lg:12,class:"d-flex"},{default:a(()=>[l("p",de,"Menampilkan "+m(o.from)+" sampai "+m(o.to)+" dari "+m(o.total),1)]),_:1}),e(d,{lg:12,class:"text-end"},{default:a(()=>[e(C,{class:"float-end",background:"",layout:"prev, pager, next","page-size":o.pageSize,total:o.total,"current-page":o.page,onCurrentChange:r.fetchData},null,8,["page-size","total","current-page","onCurrentChange"])]),_:1})]),_:1})])])]),B((b(),w(D,{modelValue:o.showForm,"onUpdate:modelValue":t[5]||(t[5]=s=>o.showForm=s),title:o.formTitle,width:"30%","before-close":r.onCloseForm},{default:a(()=>[e(x,{model:o.form,"label-position":"top"},{default:a(()=>[e(g,{label:"Kelompok",error:i.errors.kelompok_id},{default:a(()=>[e(F,{modelValue:o.form.kelompok_id,"onUpdate:modelValue":t[3]||(t[3]=s=>o.form.kelompok_id=s)},null,8,["modelValue"])]),_:1},8,["error"]),e(g,{label:"Periode",error:i.errors.periode},{default:a(()=>[e(V,{modelValue:o.form.periode,"onUpdate:modelValue":t[4]||(t[4]=s=>o.form.periode=s),class:"w-100",type:"daterange","range-separator":"-",format:"DD MMMM YYYY","start-placeholder":"Tanggal Mulai","end-placeholder":"Tanggal Selesai"},null,8,["modelValue"])]),_:1},8,["error"]),l("div",pe,[e(u,{onClick:r.onCloseForm},{default:a(()=>[ce,c(" Batal ")]),_:1},8,["onClick"]),e(u,{type:"primary",onClick:r.submit},{default:a(()=>[ue,c(" Simpan ")]),_:1},8,["onClick"])])]),_:1},8,["model"])]),_:1},8,["modelValue","title","before-close"])),[[M,o.loadingForm]])]),_:1})}const Ne=j(X,[["render",_e]]);export{Ne as default};