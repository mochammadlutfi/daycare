import{r as n,a as A,at as T,m as F,o as V,e as J,w as t,J as L,f as l,p as e,K as p,g as C,a5 as R,j as O,t as d,$ as q}from"./id-44e39273.js";import{S as G}from"./SelectKelompok-18afe301.js";import{S as H}from"./SelectPaket-68dca016.js";import"./moment-fbc5633a.js";import{E as Q,a as W}from"./index-88bb1aa7.js";import{E as X,a as Y}from"./index-84ed3e91.js";import{E as Z}from"./index-4ea0d70f.js";import{E as ee,a as ae}from"./index-b7b101e9.js";import{E as te}from"./index-11481b41.js";import{E as oe,a as le}from"./index-aa7e31ad.js";import{E as ne}from"./index-f9851f1c.js";import{v as se}from"./directive-cd218522.js";import"./index-10bd6a9f.js";import"./event-9519ab40.js";import"./scroll-bd36456a.js";import"./index-9f983416.js";import"./_initCloneObject-24df7827.js";import"./_baseIteratee-982954bc.js";import"./typescript-defaf979.js";import"./isArrayLikeObject-b43587b5.js";import"./raf-3ca20a2c.js";import"./index-05777cc1.js";import"./vnode-eeb9e0f5.js";const re={class:"content"},ie={class:"content-heading d-flex justify-content-between align-items-center"},pe=l("span",null,"Anak",-1),de={class:"space-x-1"},me=l("i",{class:"fa fa-print me-1"},null,-1),ue={class:"block rounded bordered"},ce={class:"block-content py-3"},_e=l("span",null,[l("i",{class:"fa fa-search"})],-1),fe={class:"block-content p-0"},be=["href"],ve=l("i",{class:"si si-eye me-2"},null,-1),ke={class:"block-content py-2"},ge={class:"my-auto text-xs"},he={class:"d-flex"},ye={class:"float-end"},h=25,qe={__name:"Index",setup(we){const y=n([]),_=n(!0),f=n(""),b=n(0),v=n(0),S=n(0),B=n(1),w=n(0),m=n(!1),r=A({kelompok:null,paket:null}),u=async i=>{try{_.value=!0;const a=await L.get("/admin/anak/data",{params:{page:i||1,limit:h,search:f.value}});a.status===200&&(y.value=a.data.data,B.value=a.data.current_page,b.value=a.data.total,w.value=a.data.per_page,v.value=a.data.from,v.to=a.data.to)}catch(a){console.error(a)}finally{_.value=!1}},D=i=>{u()},K=()=>{window.open(route("admin.anak.report",r),"_blank")};return T(()=>{u()}),(i,a)=>{const k=q,g=Q,N=W,c=X,j=Z,E=Y,s=ee,U=ae,I=te,x=oe,M=le,P=ne,$=F("base-layout"),z=se;return V(),J($,null,{default:t(()=>[l("div",re,[l("div",ie,[pe,l("div",de,[e(k,{type:"primary",onClick:a[0]||(a[0]=C(o=>m.value=!0,["prevent"]))},{default:t(()=>[me,p(" Export ")]),_:1})])]),R((V(),O("div",ue,[l("div",ce,[e(E,{justify:"space-between"},{default:t(()=>[e(c,{span:12},{default:t(()=>[e(N,{modelValue:h,"onUpdate:modelValue":a[1]||(a[1]=o=>h=o),placeholder:"Pilih",style:{width:"110px"},onChange:a[2]||(a[2]=o=>u(1))},{default:t(()=>[e(g,{label:"25",value:"25"}),e(g,{label:"50",value:"50"}),e(g,{label:"100",value:"100"})]),_:1})]),_:1}),e(c,{span:7},{default:t(()=>[e(j,{modelValue:f.value,"onUpdate:modelValue":a[3]||(a[3]=o=>f.value=o),clearable:""},{prefix:t(()=>[_e]),_:1},8,["modelValue"])]),_:1})]),_:1})]),l("div",fe,[e(U,{data:y.value,class:"w-100",onSortChange:D,"header-cell-class-name":"bg-body text-dark"},{default:t(()=>[e(s,{type:"index",width:"50"}),e(s,{prop:"nama",label:"Nama",sortable:""}),e(s,{prop:"jk",label:"Jenis Kelamin",sortable:""}),e(s,{label:"Kelompok"},{default:t(o=>[p(d(o.row.kelompok.nama)+" ("+d(o.row.kelompok.usia)+") ",1)]),_:1}),e(s,{prop:"user.detail.nama_ayah",label:"Nama Ayah",sortable:""}),e(s,{prop:"user.detail.nama_ibu",label:"Nama Ibu",sortable:""}),e(s,{label:"Aksi",align:"center",width:"180"},{default:t(o=>[l("a",{href:i.route("admin.anak.show",{id:o.row.id}),class:"ep-button ep-button--primary"},[ve,p(" Detail ")],8,be)]),_:1})]),_:1},8,["data"])]),l("div",ke,[e(E,{justify:"space-between"},{default:t(()=>[e(c,{lg:12,class:"d-flex"},{default:t(()=>[l("p",ge,"Menampilkan "+d(v.value)+" sampai "+d(S.value)+" dari "+d(b.value),1)]),_:1}),e(c,{lg:12,class:"text-end"},{default:t(()=>[e(I,{class:"float-end",background:"",layout:"prev, pager, next","page-size":w.value,total:b.value,"current-page":i.params.page,onCurrentChange:u},null,8,["page-size","total","current-page"])]),_:1})]),_:1})])])),[[z,_.value]])]),e(P,{modelValue:m.value,"onUpdate:modelValue":a[7]||(a[7]=o=>m.value=o),title:"Export",width:"500"},{default:t(()=>[e(M,{"label-width":"30%",onSubmit:C(K,["prevent"]),target:"_blank","label-position":"top"},{default:t(()=>[e(x,{class:"mb-4",label:"Kelompok"},{default:t(()=>[e(G,{name:"kelompok",modelValue:r.kelompok,"onUpdate:modelValue":a[4]||(a[4]=o=>r.kelompok=o)},null,8,["modelValue"])]),_:1}),e(x,{class:"mb-4",label:"Paket"},{default:t(()=>[e(H,{name:"paket",modelValue:r.paket,"onUpdate:modelValue":a[5]||(a[5]=o=>r.paket=o)},null,8,["modelValue"])]),_:1}),l("div",he,[l("div",ye,[e(k,{onClick:a[6]||(a[6]=o=>m.value=!1)},{default:t(()=>[p("Batal")]),_:1}),e(k,{type:"primary","native-type":"submit"},{default:t(()=>[p(" Download ")]),_:1})])])]),_:1},8,["onSubmit"])]),_:1},8,["modelValue"])]),_:1})}}};export{qe as default};