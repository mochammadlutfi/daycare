import{_ as L}from"./SingleFileUpload-25caea2d.js";import{_ as j,m as f,o as k,e as p,w as o,f as m,a5 as x,g as E,p as e,K as w,$ as M}from"./id-2e276a2e.js";import{E as S}from"./index-57703201.js";import{E as A,a as D}from"./index-23bc7dc4.js";import{E as Y,a as K}from"./index-ebed4644.js";import{E as B,a as F}from"./index-5bcbf47d.js";import{E as J}from"./index-cc2271ad.js";import{v as N}from"./directive-2e5632de.js";import"./index-593b96c3.js";import"./index-80ddcb64.js";import"./scroll-bd1cd202.js";import"./vnode-f4803515.js";import"./event-9519ab40.js";import"./typescript-defaf979.js";import"./_initCloneObject-8785b8d3.js";import"./panel-time-pick-854cfb01.js";import"./utils-2237dd12.js";import"./index-a3b5a262.js";import"./localeData-de255be7.js";const T={components:{SingleFileUpload:L},props:{value:{type:Object},editMode:{type:Boolean,default:!1},errors:{type:Object}},data(){return{form:{nama:null,jk:"Laki-Laki",tmp_lahir:null,tgl_lahir:null,alamat:null,anak_ke:null,jarak:null,sosialisasi_dengan_lingkungan:null,sakit_yang_pernah_diderita:null,makanan_yang_disukai:null,makanan_yang_tidak_disukai:null,memiliki_alergi:null,scan_akte:null,isAntarJemput:!1,isLaundry:!1},loading:!1}},created(){this.editMode&&this.setValue()},watch:{errors(s){console.log(s)}},methods:{setValue(){this.form.nama=this.value.nama,this.form.username=this.value.username,this.form.jk=this.value.jk,this.form.tmp_lahir=this.value.tmp_lahir,this.form.tgl_lahir=this.value.tgl_lahir,this.form.alamat=this.value.alamat,this.form.anak_ke=this.value.anak_ke,this.form.sosialisasi_dengan_lingkungan=this.value.sosialisasi_dengan_lingkungan,this.form.sakit_yang_pernah_diderita=this.value.sakit_yang_pernah_diderita,this.form.makanan_yang_disukai=this.value.makanan_yang_disukai,this.form.memiliki_alergi=this.value.memiliki_alergi,this.form.scan_akte=this.value.scan_akte,this.form.isAntarJemput=this.value.isAntarJemput,this.form.isLaundry=this.value.isLaundry},submit(){this.loading=!0;let s=this.$inertia.form(this.form),a=this.route("admin.anak.update",{id:this.value.id});s.post(a,{preserveScroll:!0,onFinish:()=>{this.loading=!1},onSuccess:()=>{}})}}},C={class:"content"},P=m("div",{class:"content-heading d-flex justify-content-between align-items-center"},[m("div",{class:"d-block"},[m("span",null,"Ubah Data Anak")])],-1),R={class:"block rounded-2"},I={class:"block-content p-4"},O=m("span",{class:"text-dark"},"Km",-1),G={class:"d-flex justify-content-end"},q=m("i",{class:"fa fa-check me-2"},null,-1);function z(s,a,t,H,l,g){const i=S,n=A,d=Y,h=K,u=B,V=J,_=F,y=f("single-file-upload"),b=M,c=D,v=f("base-layout"),U=N;return k(),p(v,null,{default:o(()=>[m("div",C,[P,m("div",R,[x((k(),p(c,{"label-position":"top","label-width":"100%",onSubmit:E(g.submit,["prevent"])},{default:o(()=>[m("div",I,[e(_,{gutter:20},{default:o(()=>[e(u,{lg:12},{default:o(()=>[e(n,{label:"Nama Lengkap",error:t.errors.nama},{default:o(()=>[e(i,{modelValue:l.form.nama,"onUpdate:modelValue":a[0]||(a[0]=r=>l.form.nama=r)},null,8,["modelValue"])]),_:1},8,["error"]),e(n,{label:"Nama Panggilan",error:t.errors.username},{default:o(()=>[e(i,{modelValue:l.form.username,"onUpdate:modelValue":a[1]||(a[1]=r=>l.form.username=r)},null,8,["modelValue"])]),_:1},8,["error"]),e(n,{label:"Jenis Kelamin",error:t.errors.jk},{default:o(()=>[e(h,{modelValue:l.form.jk,"onUpdate:modelValue":a[2]||(a[2]=r=>l.form.jk=r)},{default:o(()=>[e(d,{label:"Laki-Laki",value:"Laki-Laki"}),e(d,{label:"Perempuan",value:"Perempuan"})]),_:1},8,["modelValue"])]),_:1},8,["error"]),e(n,{label:"Anak Ke",error:t.errors.anak_ke},{default:o(()=>[e(i,{modelValue:l.form.anak_ke,"onUpdate:modelValue":a[3]||(a[3]=r=>l.form.anak_ke=r)},null,8,["modelValue"])]),_:1},8,["error"]),e(_,{gutter:20},{default:o(()=>[e(u,{md:12},{default:o(()=>[e(n,{label:"Tempat Lahir",error:t.errors.tmp_lahir},{default:o(()=>[e(i,{modelValue:l.form.tmp_lahir,"onUpdate:modelValue":a[4]||(a[4]=r=>l.form.tmp_lahir=r),placeholder:"Tempat Lahir"},null,8,["modelValue"])]),_:1},8,["error"])]),_:1}),e(u,{md:12},{default:o(()=>[e(n,{label:"Tanggal Lahir",error:t.errors.tgl_lahir},{default:o(()=>[e(V,{modelValue:l.form.tgl_lahir,"onUpdate:modelValue":a[5]||(a[5]=r=>l.form.tgl_lahir=r),type:"date",placeholder:"Tanggal Lahir",format:"DD-MM-YYYY","value-format":"YYYY-MM-DD",style:{width:"100%"}},null,8,["modelValue"])]),_:1},8,["error"])]),_:1})]),_:1}),e(n,{label:"Jarak Rumah Ke Daycare",error:t.errors.jarak},{default:o(()=>[e(i,{modelValue:l.form.jarak,"onUpdate:modelValue":a[6]||(a[6]=r=>l.form.jarak=r),type:"number"},{append:o(()=>[O]),_:1},8,["modelValue"])]),_:1},8,["error"]),e(n,{label:"Alamat",error:t.errors.alamat},{default:o(()=>[e(i,{modelValue:l.form.alamat,"onUpdate:modelValue":a[7]||(a[7]=r=>l.form.alamat=r),type:"textarea"},null,8,["modelValue"])]),_:1},8,["error"])]),_:1}),e(u,{lg:12},{default:o(()=>[e(n,{label:"Sosialisasi dengan lingkungan",error:t.errors.sosialisasi_dengan_lingkungan},{default:o(()=>[e(i,{modelValue:l.form.sosialisasi_dengan_lingkungan,"onUpdate:modelValue":a[8]||(a[8]=r=>l.form.sosialisasi_dengan_lingkungan=r),type:"textarea",placeholder:"contoh: pemalu, pendiam, aktif, baik, tidak baik"},null,8,["modelValue"])]),_:1},8,["error"]),e(n,{label:"Sakit yang pernah diderita",error:t.errors.sakit_yang_pernah_diderita},{default:o(()=>[e(i,{modelValue:l.form.sakit_yang_pernah_diderita,"onUpdate:modelValue":a[9]||(a[9]=r=>l.form.sakit_yang_pernah_diderita=r),type:"textarea"},null,8,["modelValue"])]),_:1},8,["error"]),e(n,{label:"Makanan yang disukai",error:t.errors.makanan_yang_disukai},{default:o(()=>[e(i,{modelValue:l.form.makanan_yang_disukai,"onUpdate:modelValue":a[10]||(a[10]=r=>l.form.makanan_yang_disukai=r),type:"textarea"},null,8,["modelValue"])]),_:1},8,["error"]),e(n,{label:"Makanan yang tidak disukai",error:t.errors.makanan_yang_tidak_disukai},{default:o(()=>[e(i,{modelValue:l.form.makanan_yang_tidak_disukai,"onUpdate:modelValue":a[11]||(a[11]=r=>l.form.makanan_yang_tidak_disukai=r),type:"textarea"},null,8,["modelValue"])]),_:1},8,["error"]),e(n,{label:"Memiliki Alergi",error:t.errors.alergi},{default:o(()=>[e(i,{modelValue:l.form.alergi,"onUpdate:modelValue":a[12]||(a[12]=r=>l.form.alergi=r),type:"textarea"},null,8,["modelValue"])]),_:1},8,["error"]),e(n,{label:"Scan Akta Kelahiran",error:t.errors.scan_akte},{default:o(()=>[e(y,{inputClass:"w-100",modelValue:l.form.scan_akte,"onUpdate:modelValue":a[13]||(a[13]=r=>l.form.scan_akte=r)},null,8,["modelValue"])]),_:1},8,["error"])]),_:1})]),_:1}),m("div",G,[e(b,{"native-type":"submit",type:"primary"},{default:o(()=>[q,w(" Simpan ")]),_:1})])])]),_:1},8,["onSubmit"])),[[U,l.loading]])])])]),_:1})}const ke=j(T,[["render",z]]);export{ke as default};
