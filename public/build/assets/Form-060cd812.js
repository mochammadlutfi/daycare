import{S as P}from"./SelectKelompok-15197cc3.js";import{k as T}from"./vue-qrcode-reader-6db04f7a.js";import{_ as B,y as c,m as f,o as g,e as Y,w as l,f as n,p as e,t as w,a6 as j,j as A,L as d,g as F,a0 as N}from"./id-97c9e5f5.js";import{E as O}from"./index-add84256.js";import{E as Q,a as R}from"./index-4f1c3644.js";import{E as K,a as L}from"./index-1567bcf2.js";import{E as q,a as x}from"./index-ec964314.js";import{E as I,a as J}from"./index-bcb34dd7.js";import{E as z}from"./index-ae1667d5.js";import{E as G}from"./index-56cc5e45.js";import{v as W}from"./directive-7739a56c.js";import"./panel-time-pick-fb908530.js";import"./index-ae963a16.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./utils-d081b9ca.js";import"./index-91a35dc4.js";import"./_initCloneObject-9298e566.js";import"./localeData-5bb316e4.js";import"./_baseIteratee-2fd9a4cf.js";import"./isArrayLikeObject-55c2e828.js";import"./raf-85a89f42.js";import"./index-4a89f490.js";import"./scroll-1fa1a40e.js";import"./index-01cbe581.js";import"./vnode-4e97093f.js";const X={components:{SelectKelompok:P,QrcodeStream:T},props:{value:{type:Object},editMode:{type:Boolean,default:!1},errors:{type:Object}},data(){return{title:"Tambah Absen Baru",disableKota:!1,form:{tgl:c().format(),kelompok_id:null,jenis_id:null,kegiatan_id:null},lines:[],cameraPermission:"prompt",loading:!1,showScanner:!1}},created(){this.editMode&&this.setValue()},methods:{updateStatus(t,o){console.log(t),o=="Hadir"?(this.lines[t].check_in=new c("07:00:00","HH:mm:ss").format("HH:mm:ss"),this.lines[t].check_out=new c("16:30:00","HH:mm:ss").format("HH:mm:ss")):(this.lines[t].check_in="",this.lines[t].check_out="")},setValue(){this.title="Ubah Absen",this.form.tgl=this.value.tgl,this.form.kelompok_id=this.value.kelompok_id},async fetchAnak(){try{this.isLoading=!0,this.lines=[];const t=await axios.get(this.route("admin.absen.anak"),{params:{kelompok_id:this.form.kelompok_id,tgl:this.form.tgl}});t.status==200&&t.data.forEach((o,i)=>{this.lines.push({id:null,anak_id:o.anak_id,user_id:o.user_id,anak_nama:o.anak_nama,status:o.status,check_in:new c(o.check_in,"HH:mm:ss").format("HH:mm:ss"),check_out:new c(o.check_out,"HH:mm:ss").format("HH:mm:ss")})}),this.isLoading=!1}catch(t){console.error(t)}},submit(){this.loading=!0;let t=Object.assign(this.form,{lines:this.lines}),o=this.$inertia.form(t),i=this.editMode===!0?this.route("admin.absen.update",{id:this.value.id}):this.route("admin.absen.store");o.post(i,{preserveScroll:!0,onFinish:()=>{this.loading=!1},onSuccess:()=>{}})},openQR(){this.showScanner=!0},async onDetect(t){const o=JSON.stringify(t.map(i=>i.rawValue));console.log(o),await this.timeout(500)},timeout(t){return new Promise(o=>{window.setTimeout(o,t)})},checkCameraPermission(){navigator.permissions.query({name:"camera"}).then(t=>{this.cameraPermission=t.state,t.onchange=()=>{this.cameraPermission=t.state}}).catch(t=>{console.error("Error checking camera permission:",t)})}}},Z={class:"content"},$={class:"content-heading d-flex justify-content-between align-items-center"},ee={class:"block rounded"},te={class:"block-content p-4"},oe={class:"mb-3"},ae=n("i",{class:"fa fa-check me-2"},null,-1),le={class:"dialog-footer"},se=n("i",{class:"fa fa-close me-2"},null,-1),ne=n("i",{class:"fa fa-check me-2"},null,-1);function ie(t,o,i,re,s,m){const H=O,h=Q,k=K,v=f("select-kelompok"),V=L,u=N,_=q,p=I,y=J,b=z,E=x,S=R,C=f("qrcode-stream"),D=G,M=f("base-layout"),U=W;return g(),Y(M,null,{default:l(()=>[n("div",Z,[e(S,{"label-position":"top","label-width":"100%",onSubmit:F(m.submit,["prevent"])},{default:l(()=>[n("div",$,[n("span",null,w(s.title),1)]),n("div",ee,[j((g(),A("div",te,[e(V,{gutter:40},{default:l(()=>[e(k,{md:12},{default:l(()=>[e(h,{label:"Tanggal",error:i.errors.tgl},{default:l(()=>[e(H,{modelValue:s.form.tgl,"onUpdate:modelValue":o[0]||(o[0]=a=>s.form.tgl=a),type:"date",placeholder:"Tanggal",format:"DD MMMM YYYY","value-format":"YYYY-MM-DD",style:{width:"100%"}},null,8,["modelValue"])]),_:1},8,["error"])]),_:1}),e(k,{md:12},{default:l(()=>[e(h,{label:"Kelompok",error:i.errors.kelompok_id},{default:l(()=>[e(v,{modelValue:s.form.kelompok_id,"onUpdate:modelValue":o[1]||(o[1]=a=>s.form.kelompok_id=a),onChange:m.fetchAnak},null,8,["modelValue","onChange"])]),_:1},8,["error"])]),_:1})]),_:1}),n("div",oe,[e(u,{type:"primary",onClick:m.openQR},{default:l(()=>[d(" Scan QR ")]),_:1},8,["onClick"])]),e(E,{data:s.lines,border:"",class:"mb-4",id:"variant"},{default:l(()=>[e(_,{label:"Nama Anak"},{default:l(a=>[d(w(a.row.anak_nama),1)]),_:1}),e(_,{label:"Status"},{default:l(a=>[e(y,{modelValue:a.row.status,"onUpdate:modelValue":r=>a.row.status=r,placeholder:"Pilih",class:"w-100",onChange:r=>m.updateStatus(a.$index,a.row.status)},{default:l(()=>[e(p,{label:"Hadir",value:"Hadir"}),e(p,{label:"Izin",value:"Izin"}),e(p,{label:"Sakit",value:"Sakit"}),e(p,{label:"Alpa",value:"Tanpa Keterangan"})]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"])]),_:1}),e(_,{label:"Jam Masuk"},{default:l(a=>[e(b,{modelValue:a.row.check_in,"onUpdate:modelValue":r=>a.row.check_in=r,format:"HH:mm","value-format":"HH:mm:ss",disabled:a.row.status!="Hadir"},null,8,["modelValue","onUpdate:modelValue","disabled"])]),_:1}),e(_,{label:"Jam Pulang"},{default:l(a=>[e(b,{modelValue:a.row.check_out,"onUpdate:modelValue":r=>a.row.check_out=r,format:"HH:mm","value-format":"HH:mm:ss",disabled:a.row.status!="Hadir"},null,8,["modelValue","onUpdate:modelValue","disabled"])]),_:1})]),_:1},8,["data"]),e(u,{"native-type":"submit",type:"primary",loading:s.loading},{default:l(()=>[ae,d(" Simpan ")]),_:1},8,["loading"])])),[[U,s.loading]])])]),_:1},8,["onSubmit"])]),e(D,{modelValue:s.showScanner,"onUpdate:modelValue":o[2]||(o[2]=a=>s.showScanner=a),title:"Absen QR",width:"40%"},{footer:l(()=>[n("span",le,[e(u,{onClick:t.onCloseForm},{default:l(()=>[se,d(" Batal ")]),_:1},8,["onClick"]),e(u,{type:"primary"},{default:l(()=>[ne,d(" Simpan ")]),_:1})])]),default:l(()=>[e(C,{onDetect:m.onDetect},null,8,["onDetect"])]),_:1},8,["modelValue"])]),_:1})}const je=B(X,[["render",ie]]);export{je as default};
