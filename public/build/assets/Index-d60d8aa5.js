import{r as n,a as A,at as T,m as F,o as C,e as J,w as t,J as L,f as l,p as e,K as i,g as S,a5 as R,j as O,t as p,$ as q}from"./id-2e276a2e.js";import{S as G}from"./SelectKelompok-833f3825.js";import{S as H}from"./SelectPaket-98119c0f.js";import"./moment-fbc5633a.js";import{E as Q,a as W}from"./index-bb79b737.js";import{E as X,a as Y}from"./index-5bcbf47d.js";import{E as Z}from"./index-57703201.js";import{E as ee,a as ae}from"./index-a4208ec2.js";import{E as te}from"./index-3a9112db.js";import{E as oe,a as le}from"./index-23bc7dc4.js";import{E as ne}from"./index-593b96c3.js";import{v as se}from"./directive-2e5632de.js";import"./index-20f4b275.js";import"./event-9519ab40.js";import"./scroll-bd1cd202.js";import"./index-a3b5a262.js";import"./_initCloneObject-8785b8d3.js";import"./_baseIteratee-0f2e46c6.js";import"./typescript-defaf979.js";import"./isArrayLikeObject-5cf94b9b.js";import"./raf-840075f3.js";import"./index-80ddcb64.js";import"./vnode-f4803515.js";const re={class:"content"},ie={class:"content-heading d-flex justify-content-between align-items-center"},pe=l("span",null,"Anak",-1),de={class:"space-x-1"},me=l("i",{class:"fa fa-print me-1"},null,-1),ue={class:"block rounded bordered"},ce={class:"block-content py-3"},_e=l("span",null,[l("i",{class:"fa fa-search"})],-1),fe={class:"block-content p-0"},ve=["href"],be=l("i",{class:"si si-eye me-2"},null,-1),ke={class:"block-content py-2"},ge={class:"my-auto text-xs"},he={class:"d-flex"},ye={class:"float-end"},h=25,qe={__name:"Index",setup(we){const y=n([]),_=n(!0),f=n(""),v=n(0),b=n(0),B=n(0),w=n(1),E=n(0),d=n(!1),r=A({kelompok:null,paket:null}),m=async u=>{try{_.value=!0;const a=await L.get("/admin/anak/data",{params:{page:u||1,limit:h,search:f.value}});a.status===200&&(y.value=a.data.data,w.value=a.data.current_page,v.value=a.data.total,E.value=a.data.per_page,b.value=a.data.from,b.to=a.data.to)}catch(a){console.error(a)}finally{_.value=!1}},D=u=>{m()},K=()=>{window.open(route("admin.anak.report",r),"_blank")};return T(()=>{m()}),(u,a)=>{const k=q,g=Q,N=W,c=X,j=Z,x=Y,s=ee,U=ae,I=te,V=oe,M=le,P=ne,$=F("base-layout"),z=se;return C(),J($,null,{default:t(()=>[l("div",re,[l("div",ie,[pe,l("div",de,[e(k,{type:"primary",onClick:a[0]||(a[0]=S(o=>d.value=!0,["prevent"]))},{default:t(()=>[me,i(" Export ")]),_:1})])]),R((C(),O("div",ue,[l("div",ce,[e(x,{justify:"space-between"},{default:t(()=>[e(c,{span:12},{default:t(()=>[e(N,{modelValue:h,"onUpdate:modelValue":a[1]||(a[1]=o=>h=o),placeholder:"Pilih",style:{width:"110px"},onChange:a[2]||(a[2]=o=>m(1))},{default:t(()=>[e(g,{label:"25",value:"25"}),e(g,{label:"50",value:"50"}),e(g,{label:"100",value:"100"})]),_:1})]),_:1}),e(c,{span:7},{default:t(()=>[e(j,{modelValue:f.value,"onUpdate:modelValue":a[3]||(a[3]=o=>f.value=o),clearable:""},{prefix:t(()=>[_e]),_:1},8,["modelValue"])]),_:1})]),_:1})]),l("div",fe,[e(U,{data:y.value,class:"w-100",onSortChange:D,"header-cell-class-name":"bg-body text-dark"},{default:t(()=>[e(s,{type:"index",width:"50"}),e(s,{prop:"nama",label:"Nama",sortable:""}),e(s,{prop:"jk",label:"Jenis Kelamin",sortable:""}),e(s,{label:"Kelompok"},{default:t(o=>[i(p(o.row.kelompok.nama)+" ("+p(o.row.kelompok.usia)+") ",1)]),_:1}),e(s,{prop:"user.detail.nama_ayah",label:"Nama Ayah",sortable:""}),e(s,{prop:"user.detail.nama_ibu",label:"Nama Ibu",sortable:""}),e(s,{label:"Aksi",align:"center",width:"180"},{default:t(o=>[l("a",{href:u.route("admin.anak.show",{id:o.row.id}),class:"ep-button ep-button--primary"},[be,i(" Detail ")],8,ve)]),_:1})]),_:1},8,["data"])]),l("div",ke,[e(x,{justify:"space-between"},{default:t(()=>[e(c,{lg:12,class:"d-flex"},{default:t(()=>[l("p",ge,"Menampilkan "+p(b.value)+" sampai "+p(B.value)+" dari "+p(v.value),1)]),_:1}),e(c,{lg:12,class:"text-end"},{default:t(()=>[e(I,{class:"float-end",background:"",layout:"prev, pager, next","page-size":E.value,total:v.value,"current-page":w.value,onCurrentChange:m},null,8,["page-size","total","current-page"])]),_:1})]),_:1})])])),[[z,_.value]])]),e(P,{modelValue:d.value,"onUpdate:modelValue":a[7]||(a[7]=o=>d.value=o),title:"Export",width:"500"},{default:t(()=>[e(M,{"label-width":"30%",onSubmit:S(K,["prevent"]),target:"_blank","label-position":"top"},{default:t(()=>[e(V,{class:"mb-4",label:"Kelompok"},{default:t(()=>[e(G,{name:"kelompok",modelValue:r.kelompok,"onUpdate:modelValue":a[4]||(a[4]=o=>r.kelompok=o)},null,8,["modelValue"])]),_:1}),e(V,{class:"mb-4",label:"Paket"},{default:t(()=>[e(H,{name:"paket",modelValue:r.paket,"onUpdate:modelValue":a[5]||(a[5]=o=>r.paket=o)},null,8,["modelValue"])]),_:1}),l("div",he,[l("div",ye,[e(k,{onClick:a[6]||(a[6]=o=>d.value=!1)},{default:t(()=>[i("Batal")]),_:1}),e(k,{type:"primary","native-type":"submit"},{default:t(()=>[i(" Download ")]),_:1})])])]),_:1},8,["onSubmit"])]),_:1},8,["modelValue"])]),_:1})}}};export{qe as default};