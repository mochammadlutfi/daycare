import{_ as D}from"./SingleFileUpload-b198c8c3.js";import{_ as A,m as y,o as d,e as g,w as o,f as a,p as e,j as f,a6 as v,a7 as V,t as u,g as h,L as c,F as M,a0 as S}from"./id-97c9e5f5.js";import{E as J}from"./index-ae963a16.js";import{E as P,a as B}from"./index-4f1c3644.js";import{E as C,a as Y}from"./index-d1b32819.js";import{E as F,a as T}from"./index-1567bcf2.js";import{E as K}from"./index-add84256.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./_initCloneObject-9298e566.js";import"./panel-time-pick-fb908530.js";import"./utils-d081b9ca.js";import"./index-91a35dc4.js";import"./localeData-5bb316e4.js";const N={components:{SingleFileUpload:D},props:{biaya:{type:Object},editMode:{type:Boolean,default:!1},errors:{type:Object}},data(){return{step:1,form:{nama:null,jk:"Laki-Laki",tmp_lahir:null,tgl_lahir:null,alamat:null,anak_ke:null,jarak:null,sosialisasi_dengan_lingkungan_anak:null,sakit_yang_pernah_diderita_anak:null,makanan_yang_disukai_anak:null,makanan_yang_tidak_disukai_anak:null,memiliki_alergi_anak:null,scan_akte_anak:null,isAntarJemput:!1,isLaundry:!1},loading:!1}},created(){this.editMode&&this.setValue()},watch:{errors(m){console.log(m)}},methods:{setValue(){this.form.nama_ayah=this.value.nama_ayah,this.form.tmp_lahir_ayah=this.value.tmp_lahir_ayah,this.form.tgl_lahir_ayah=this.value.tgl_lahir_ayah,this.form.telp_ayah=this.value.telp_ayah,this.form.alamat_ayah=this.value.alamat_ayah,this.form.pekerjaan_ayah=this.value.pekerjaan_ayah,this.form.penghasilan_ayah=this.value.penghasilan_ayah,this.form.alamat_kantor_ayah=this.value.alamat_kantor_ayah,this.form.agama_ayah=this.value.agama_ayah,this.form.pendidikan_ayah=this.value.pendidikan_ayah,this.form.nama_ibu=this.value.nama_ibu,this.form.tmp_lahir_ibu=this.value.tmp_lahir_ibu,this.form.tgl_lahir_ibu=this.value.tgl_lahir_ibu,this.form.telp_ibu=this.value.telp_ibu,this.form.alamat_ibu=this.value.alamat_ibu,this.form.pekerjaan_ibu=this.value.pekerjaan_ibu,this.form.penghasilan_ibu=this.value.penghasilan_ibu,this.form.alamat_kantor_ibu=this.value.alamat_kantor_ibu,this.form.agama_ibu=this.value.agama_ibu,this.form.pendidikan_ibu=this.value.pendidikan_ibu},submit(){this.loading=!0;let m=this.$inertia.form(this.form),l=this.route("user.anak.store");m.post(l,{preserveScroll:!0,onFinish:()=>{this.loading=!1},onSuccess:()=>{},onError:s=>{this.step=1}})}}},R={class:"content"},I=a("div",{class:"block block-rounded"},[a("div",{class:"block-content block-content-full"},[a("div",{class:"py-3 text-center"},[a("h2",{class:"fw-bold mb-2"}," Data Anak "),a("h3",{class:"fs-base fw-medium text-muted mb-0"}," Lengkapi Data Anak ")])])],-1),O={class:"block rounded-2"},G={key:0,class:"block-content"},H=a("span",{class:"text-dark"},"Km",-1),q=a("div",{class:"border-bottom border-2 mb-4"},[a("h3",{class:"h5 mb-2"},"Layanan Tambahan")],-1),z={class:"form-check form-block mb-4"},Q={class:"form-check-label",for:"isLaundry"},W={class:"d-flex align-items-center"},X={class:"ms-2"},Z=a("span",{class:"fw-bold"},"Layanan Laundry",-1),$=a("span",{class:"d-block fs-sm text-muted"},"Dihitung dalam satuan kilo gram",-1),aa={class:"d-block fs-sm text-muted"},ea={class:"form-check form-block"},la={class:"form-check-label",for:"isAntarJemput"},ta={class:"d-flex align-items-center"},na={class:"ms-2"},oa=a("span",{class:"fw-bold"},"Layanan Antar Jemput",-1),sa=a("span",{class:"d-block fs-sm text-muted"},"Dihitung dalam satuan kilometer dari jarak alamat Daycare ke lokasi Penjemputan Anak",-1),ra={class:"d-block fs-sm text-muted"},ia={key:1,class:"block-content"},ma={class:"table-responsive push"},ua={class:"table table-bordered table-hover"},da=a("thead",null,[a("tr",null,[a("th",{class:"text-center",style:{width:"60px"}}),a("th",null,"Nama"),a("th",{class:"text-end",style:{width:"120px"}},"Harga")])],-1),_a=a("td",{class:"text-center"},"1",-1),ka=a("td",null,[a("p",{class:"fw-semibold mb-1"},"Pembangunan"),a("div",{class:"text-muted"},"Dibayar 1x ketika pendaftaran")],-1),fa={class:"text-end"},ha=a("td",{class:"text-center"},"2",-1),ca=a("td",null,[a("p",{class:"fw-semibold mb-1"},"Pendaftaran"),a("div",{class:"text-muted"},"Dibayar 1x ketika pendaftaran")],-1),pa={class:"text-end"},ba=a("td",{class:"text-center"},"3",-1),ya=a("td",null,[a("p",{class:"fw-semibold mb-1"},"SPP"),a("div",{class:"text-muted"},"Perbulan")],-1),ga={class:"text-end"},va=a("td",{colspan:"2"},[a("p",{class:"fw-semibold mb-1"},"Total")],-1),Va={class:"text-end"},xa={class:"block-content p-4"},La={class:"d-flex justify-content-end"},ja=a("i",{class:"fa fa-chevron-right me-2"},null,-1),wa=a("i",{class:"fa fa-chevron-left me-2"},null,-1),Ua=a("i",{class:"fa fa-check me-2"},null,-1);function Ea(m,l,s,Da,t,x){const i=J,r=P,p=C,L=Y,_=F,j=K,b=T,w=y("single-file-upload"),k=S,U=B,E=y("user-layout");return d(),g(E,null,{default:o(()=>[a("div",R,[I,a("div",O,[e(U,{"label-position":"top","label-width":"100%",onSubmit:h(x.submit,["prevent"])},{default:o(()=>[t.step==1?(d(),f("div",G,[e(b,{gutter:20},{default:o(()=>[e(_,{lg:12},{default:o(()=>[e(r,{label:"Nama Lengkap",error:s.errors.nama},{default:o(()=>[e(i,{modelValue:t.form.nama,"onUpdate:modelValue":l[0]||(l[0]=n=>t.form.nama=n)},null,8,["modelValue"])]),_:1},8,["error"]),e(r,{label:"Nama Panggilan",error:s.errors.username},{default:o(()=>[e(i,{modelValue:t.form.username,"onUpdate:modelValue":l[1]||(l[1]=n=>t.form.username=n)},null,8,["modelValue"])]),_:1},8,["error"]),e(r,{label:"Jenis Kelamin",error:s.errors.jk},{default:o(()=>[e(L,{modelValue:t.form.jk,"onUpdate:modelValue":l[2]||(l[2]=n=>t.form.jk=n)},{default:o(()=>[e(p,{label:"Laki-Laki",value:"Laki-Laki"}),e(p,{label:"Perempuan",value:"Perempuan"})]),_:1},8,["modelValue"])]),_:1},8,["error"]),e(r,{label:"Anak Ke",error:s.errors.anak_ke},{default:o(()=>[e(i,{modelValue:t.form.anak_ke,"onUpdate:modelValue":l[3]||(l[3]=n=>t.form.anak_ke=n)},null,8,["modelValue"])]),_:1},8,["error"]),e(b,{gutter:20},{default:o(()=>[e(_,{md:12},{default:o(()=>[e(r,{label:"Tempat Lahir",error:s.errors.tmp_lahir},{default:o(()=>[e(i,{modelValue:t.form.tmp_lahir,"onUpdate:modelValue":l[4]||(l[4]=n=>t.form.tmp_lahir=n),placeholder:"Tempat Lahir"},null,8,["modelValue"])]),_:1},8,["error"])]),_:1}),e(_,{md:12},{default:o(()=>[e(r,{label:"Tanggal Lahir",error:s.errors.tgl_lahir},{default:o(()=>[e(j,{modelValue:t.form.tgl_lahir,"onUpdate:modelValue":l[5]||(l[5]=n=>t.form.tgl_lahir=n),type:"date",placeholder:"Tanggal Lahir",format:"DD-MM-YYYY","value-format":"YYYY-MM-DD",style:{width:"100%"}},null,8,["modelValue"])]),_:1},8,["error"])]),_:1})]),_:1}),e(r,{label:"Jarak Rumah Ke Daycare",error:s.errors.jarak},{default:o(()=>[e(i,{modelValue:t.form.jarak,"onUpdate:modelValue":l[6]||(l[6]=n=>t.form.jarak=n),type:"number"},{append:o(()=>[H]),_:1},8,["modelValue"])]),_:1},8,["error"]),e(r,{label:"Alamat",error:s.errors.alamat},{default:o(()=>[e(i,{modelValue:t.form.alamat,"onUpdate:modelValue":l[7]||(l[7]=n=>t.form.alamat=n),type:"textarea"},null,8,["modelValue"])]),_:1},8,["error"])]),_:1}),e(_,{lg:12},{default:o(()=>[e(r,{label:"Sosialisasi dengan lingkungan",error:s.errors.sosialisasi_dengan_lingkungan_anak},{default:o(()=>[e(i,{modelValue:t.form.sosialisasi_dengan_lingkungan_anak,"onUpdate:modelValue":l[8]||(l[8]=n=>t.form.sosialisasi_dengan_lingkungan_anak=n),type:"textarea",placeholder:"contoh: pemalu, pendiam, aktif, baik, tidak baik"},null,8,["modelValue"])]),_:1},8,["error"]),e(r,{label:"Sakit yang pernah diderita",error:s.errors.sakit_yang_pernah_diderita_anak},{default:o(()=>[e(i,{modelValue:t.form.sakit_yang_pernah_diderita_anak,"onUpdate:modelValue":l[9]||(l[9]=n=>t.form.sakit_yang_pernah_diderita_anak=n),type:"textarea"},null,8,["modelValue"])]),_:1},8,["error"]),e(r,{label:"Makanan yang disukai",error:s.errors.makanan_yang_disukai_anak},{default:o(()=>[e(i,{modelValue:t.form.makanan_yang_disukai_anak,"onUpdate:modelValue":l[10]||(l[10]=n=>t.form.makanan_yang_disukai_anak=n),type:"textarea"},null,8,["modelValue"])]),_:1},8,["error"]),e(r,{label:"Makanan yang tidak disukai",error:s.errors.makanan_yang_tidak_disukai_anak},{default:o(()=>[e(i,{modelValue:t.form.makanan_yang_tidak_disukai_anak,"onUpdate:modelValue":l[11]||(l[11]=n=>t.form.makanan_yang_tidak_disukai_anak=n),type:"textarea"},null,8,["modelValue"])]),_:1},8,["error"]),e(r,{label:"Memiliki Alergi",error:s.errors.memiliki_alergi_anak},{default:o(()=>[e(i,{modelValue:t.form.memiliki_alergi_anak,"onUpdate:modelValue":l[12]||(l[12]=n=>t.form.memiliki_alergi_anak=n),type:"textarea"},null,8,["modelValue"])]),_:1},8,["error"]),e(r,{label:"Scan Akta Kelahiran",error:s.errors.scan_akte_anak},{default:o(()=>[e(w,{inputClass:"w-100",modelValue:t.form.scan_akte_anak,"onUpdate:modelValue":l[13]||(l[13]=n=>t.form.scan_akte_anak=n)},null,8,["modelValue"])]),_:1},8,["error"])]),_:1})]),_:1}),q,a("div",z,[v(a("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":l[14]||(l[14]=n=>t.form.isLaundry=n),id:"isLaundry",name:"isLaundry"},null,512),[[V,t.form.isLaundry]]),a("label",Q,[a("span",W,[a("span",X,[Z,$,a("span",aa,u(m.currency(s.biaya.laundry))+" x Berat Cucian",1)])])])]),a("div",ea,[v(a("input",{class:"form-check-input",type:"checkbox","onUpdate:modelValue":l[15]||(l[15]=n=>t.form.isAntarJemput=n),id:"isAntarJemput",name:"isAntarJemput"},null,512),[[V,t.form.isAntarJemput]]),a("label",la,[a("span",ta,[a("span",na,[oa,sa,a("span",ra,u(m.currency(s.biaya.antar_jemput))+" x "+u(t.form.jarak??0)+" km (Jarak Lokasi) x 20 hari",1)])])])])])):(d(),f("div",ia,[a("div",ma,[a("table",ua,[da,a("tbody",null,[a("tr",null,[_a,ka,a("td",fa,u(m.currency(s.biaya.pembangunan)),1)]),a("tr",null,[ha,ca,a("td",pa,u(m.currency(s.biaya.pendaftaran)),1)]),a("tr",null,[ba,ya,a("td",ga,u(m.currency(s.biaya.spp)),1)])]),a("tfoot",null,[a("tr",null,[va,a("td",Va,u(m.currency(s.biaya.pembangunan+s.biaya.pendaftaran+s.biaya.spp)),1)])])])])])),a("div",xa,[a("div",La,[t.step==1?(d(),g(k,{key:0,"native-type":"button",type:"primary",onClick:l[16]||(l[16]=h(n=>t.step=2,["prevent"]))},{default:o(()=>[ja,c(" Selanjutnya ")]),_:1})):(d(),f(M,{key:1},[e(k,{"native-type":"button",type:"primary",onClick:l[17]||(l[17]=h(n=>t.step=1,["prevent"]))},{default:o(()=>[wa,c(" Kembali ")]),_:1}),e(k,{"native-type":"submit",type:"primary",loading:t.loading},{default:o(()=>[Ua,c(" Bayar ")]),_:1},8,["loading"])],64))])])]),_:1},8,["onSubmit"])])])]),_:1})}const Oa=A(N,[["render",Ea]]);export{Oa as default};