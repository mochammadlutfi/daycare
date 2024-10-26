import{S as P}from"./SelectKelompok-833f3825.js";import{k as T}from"./vue-qrcode-reader-5609c67e.js";import{_ as B,y as c,m as f,o as g,e as Y,w as l,f as n,p as e,t as w,a5 as j,j as A,K as d,g as F,$ as K}from"./id-2e276a2e.js";import{E as N}from"./index-cc2271ad.js";import{E as O,a as Q}from"./index-23bc7dc4.js";import{E as R,a as q}from"./index-5bcbf47d.js";import{E as x,a as I}from"./index-a4208ec2.js";import{E as J,a as L}from"./index-bb79b737.js";import{E as z}from"./index-f2e89185.js";import{E as G}from"./index-593b96c3.js";import{v as W}from"./directive-2e5632de.js";import"./panel-time-pick-854cfb01.js";import"./index-57703201.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./utils-2237dd12.js";import"./index-a3b5a262.js";import"./_initCloneObject-8785b8d3.js";import"./localeData-de255be7.js";import"./_baseIteratee-0f2e46c6.js";import"./isArrayLikeObject-5cf94b9b.js";import"./raf-840075f3.js";import"./index-20f4b275.js";import"./scroll-bd1cd202.js";import"./index-80ddcb64.js";import"./vnode-f4803515.js";const X={components:{SelectKelompok:P,QrcodeStream:T},props:{value:{type:Object},editMode:{type:Boolean,default:!1},errors:{type:Object}},data(){return{title:"Tambah Absen Baru",disableKota:!1,form:{tgl:c().format(),kelompok_id:null,jenis_id:null,kegiatan_id:null},lines:[],cameraPermission:"prompt",loading:!1,showScanner:!1}},created(){this.editMode&&this.setValue()},methods:{updateStatus(t,o){console.log(t),o=="Hadir"?(this.lines[t].check_in=new c("07:00:00","HH:mm:ss").format("HH:mm:ss"),this.lines[t].check_out=new c("16:30:00","HH:mm:ss").format("HH:mm:ss")):(this.lines[t].check_in="",this.lines[t].check_out="")},setValue(){this.title="Ubah Absen",this.form.tgl=this.value.tgl,this.form.kelompok_id=this.value.kelompok_id},async fetchAnak(){try{this.isLoading=!0,this.lines=[];const t=await axios.get(this.route("admin.absen.anak"),{params:{kelompok_id:this.form.kelompok_id,tgl:this.form.tgl}});t.status==200&&t.data.forEach((o,i)=>{this.lines.push({id:null,anak_id:o.anak_id,user_id:o.user_id,anak_nama:o.anak_nama,status:o.status,check_in:new c(o.check_in,"HH:mm:ss").format("HH:mm:ss"),check_out:new c(o.check_out,"HH:mm:ss").format("HH:mm:ss")})}),this.isLoading=!1}catch(t){console.error(t)}},submit(){this.loading=!0;let t=Object.assign(this.form,{lines:this.lines}),o=this.$inertia.form(t),i=this.editMode===!0?this.route("admin.absen.update",{id:this.value.id}):this.route("admin.absen.store");o.post(i,{preserveScroll:!0,onFinish:()=>{this.loading=!1},onSuccess:()=>{}})},openQR(){this.showScanner=!0},async onDetect(t){const o=JSON.stringify(t.map(i=>i.rawValue));console.log(o),await this.timeout(500)},timeout(t){return new Promise(o=>{window.setTimeout(o,t)})},checkCameraPermission(){navigator.permissions.query({name:"camera"}).then(t=>{this.cameraPermission=t.state,t.onchange=()=>{this.cameraPermission=t.state}}).catch(t=>{console.error("Error checking camera permission:",t)})}}},Z={class:"content"},$={class:"content-heading d-flex justify-content-between align-items-center"},ee={class:"block rounded"},te={class:"block-content p-4"},oe={class:"mb-3"},ae=n("i",{class:"fa fa-check me-2"},null,-1),le={class:"dialog-footer"},se=n("i",{class:"fa fa-close me-2"},null,-1),ne=n("i",{class:"fa fa-check me-2"},null,-1);function ie(t,o,i,re,s,m){const H=N,h=O,k=R,v=f("select-kelompok"),V=q,u=K,_=x,p=J,y=L,b=z,E=I,S=Q,C=f("qrcode-stream"),D=G,M=f("base-layout"),U=W;return g(),Y(M,null,{default:l(()=>[n("div",Z,[e(S,{"label-position":"top","label-width":"100%",onSubmit:F(m.submit,["prevent"])},{default:l(()=>[n("div",$,[n("span",null,w(s.title),1)]),n("div",ee,[j((g(),A("div",te,[e(V,{gutter:40},{default:l(()=>[e(k,{md:12},{default:l(()=>[e(h,{label:"Tanggal",error:i.errors.tgl},{default:l(()=>[e(H,{modelValue:s.form.tgl,"onUpdate:modelValue":o[0]||(o[0]=a=>s.form.tgl=a),type:"date",placeholder:"Tanggal",format:"DD MMMM YYYY","value-format":"YYYY-MM-DD",style:{width:"100%"}},null,8,["modelValue"])]),_:1},8,["error"])]),_:1}),e(k,{md:12},{default:l(()=>[e(h,{label:"Kelompok",error:i.errors.kelompok_id},{default:l(()=>[e(v,{modelValue:s.form.kelompok_id,"onUpdate:modelValue":o[1]||(o[1]=a=>s.form.kelompok_id=a),onChange:m.fetchAnak},null,8,["modelValue","onChange"])]),_:1},8,["error"])]),_:1})]),_:1}),n("div",oe,[e(u,{type:"primary",onClick:m.openQR},{default:l(()=>[d(" Scan QR ")]),_:1},8,["onClick"])]),e(E,{data:s.lines,border:"",class:"mb-4",id:"variant"},{default:l(()=>[e(_,{label:"Nama Anak"},{default:l(a=>[d(w(a.row.anak_nama),1)]),_:1}),e(_,{label:"Status"},{default:l(a=>[e(y,{modelValue:a.row.status,"onUpdate:modelValue":r=>a.row.status=r,placeholder:"Pilih",class:"w-100",onChange:r=>m.updateStatus(a.$index,a.row.status)},{default:l(()=>[e(p,{label:"Hadir",value:"Hadir"}),e(p,{label:"Izin",value:"Izin"}),e(p,{label:"Sakit",value:"Sakit"}),e(p,{label:"Alpa",value:"Tanpa Keterangan"})]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])]),_:1}),e(_,{label:"Jam Masuk"},{default:l(a=>[e(b,{modelValue:a.row.check_in,"onUpdate:modelValue":r=>a.row.check_in=r,format:"HH:mm","value-format":"HH:mm:ss",disabled:a.row.status!="Hadir"},null,8,["modelValue","onUpdate:modelValue","disabled"])]),_:1}),e(_,{label:"Jam Pulang"},{default:l(a=>[e(b,{modelValue:a.row.check_out,"onUpdate:modelValue":r=>a.row.check_out=r,format:"HH:mm","value-format":"HH:mm:ss",disabled:a.row.status!="Hadir"},null,8,["modelValue","onUpdate:modelValue","disabled"])]),_:1})]),_:1},8,["data"]),e(u,{"native-type":"submit",type:"primary",loading:s.loading},{default:l(()=>[ae,d(" Simpan ")]),_:1},8,["loading"])])),[[U,s.loading]])])]),_:1},8,["onSubmit"])]),e(D,{modelValue:s.showScanner,"onUpdate:modelValue":o[2]||(o[2]=a=>s.showScanner=a),title:"Absen QR",width:"40%"},{footer:l(()=>[n("span",le,[e(u,{onClick:t.onCloseForm},{default:l(()=>[se,d(" Batal ")]),_:1},8,["onClick"]),e(u,{type:"primary"},{default:l(()=>[ne,d(" Simpan ")]),_:1})])]),default:l(()=>[e(C,{onDetect:m.onDetect},null,8,["onDetect"])]),_:1},8,["modelValue"])]),_:1})}const je=B(X,[["render",ie]]);export{je as default};
