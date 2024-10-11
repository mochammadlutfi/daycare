import{S as V}from"./SelectKelompok-ed653d16.js";import{_ as j,y as h,m as v,o as c,e as y,w as a,f as s,j as r,p as t,L as l,F as p,W as C,t as n,a9 as D,U as S,a0 as N}from"./id-3481afe5.js";import{E as B}from"./index-6f4b141f.js";import{E as L,a as K}from"./index-64ddff80.js";import{E as F,a as U}from"./index-30e4479b.js";import{E as Y,a as O}from"./index-361ca79f.js";import{E as J}from"./index-b6dcfd92.js";import{E as H}from"./index-7afa1b35.js";import"./index-39beff3f.js";import"./index-facbdfef.js";import"./event-9519ab40.js";import"./scroll-bcd136fa.js";import"./index-a3279758.js";import"./_initCloneObject-eb6e072f.js";import"./_baseIteratee-e7ebdd39.js";import"./typescript-defaf979.js";import"./index-7efcceaf.js";import"./vnode-c8d30334.js";import"./index-0767bb4b.js";const R={components:{SelectKelompok:V},props:{data:{type:Object},invoice:{type:Object},errors:{type:Object}},data(){return{showModal:!1,modalTitle:"Terima Pendaftaran",loadingForm:!1,form:{kelompok_id:null,status:null,alasan:null},activeTab:"anak",ageInMonths:null}},mounted(){const _=new h(this.data.tgl_lahir),i=new h;this.ageInMonths=i.diff(_,"month")},methods:{openModal(_){this.form.status=_,this.showModal=!0,this.modalTitle=_=="terima"?"Terima Pendaftaran":"Tolak Pendaftaran"},closeModal(){this.modalTitle="Terima Pendaftaran",this.form.status=null,this.form.kelompok_id=null,this.form.alasan=null,this.showModal=!1},updateTab(_,i){console.log(_,i)},submit(){this.loadingForm=!0,this.$inertia.form(this.form).post(this.route("admin.register.update",{id:this.data.id}),{preserveScroll:!0,onFinish:()=>{this.loadingForm=!1},onSuccess:()=>{B({type:"success",message:"Data Berhasil Disimpan!"}),this.onCloseForm()}})},format_date(_){if(_)return h(String(_)).format("DD MMM YYYY")},get_umur(_){if(this.ageInMonths>12){const i=new h(_),g=new h().diff(i,"year");return g+" Tahun "+(this.ageInMonths-12*g)+" Bulan"}else return this.ageInMonths/12+" Bulan"}}},W={class:"content"},z={class:"content-heading d-flex justify-content-between align-items-center"},q=s("span",null,"Detail Anak",-1),G={class:"space-x-1"},Q=s("i",{class:"fa fa-check me-2"},null,-1),X=s("i",{class:"fa fa-close me-2"},null,-1),Z={class:"block-content"},$={class:"fw-semibold"},aa={class:"fw-semibold"},ta={class:"fw-semibold"},ea={class:"fw-semibold"},la={class:"fw-semibold"},sa={class:"fw-semibold"},da={class:"fw-semibold"},na={class:"fw-semibold"},oa={class:"fw-semibold"},ia={class:"fw-semibold"},_a={class:"fw-semibold"},ma={class:"fw-semibold"},ua={class:"fw-semibold"},ca=["href"],fa={class:"block-content"},ra={class:"fw-semibold"},ha={class:"fw-semibold"},ba={class:"fw-semibold"},ga={class:"fw-semibold"},ka={class:"fw-semibold"},ya={class:"fw-semibold"},pa={class:"fw-semibold"},wa={class:"fw-semibold"},Ta={class:"fw-semibold"},va={class:"fw-semibold"},Aa={class:"fw-semibold"},Ia={class:"fw-semibold"},Ma={class:"fw-semibold"},xa={class:"fw-semibold"},Pa={class:"fw-semibold"},Ea={class:"fw-semibold"},Va={class:"fw-semibold"},ja={class:"fw-semibold"},Ca=s("h2",{class:"fw-bold fs-5 mb-2"},"Informasi Dasar",-1),Da={class:"fw-semibold"},Sa={class:"fw-semibold"},Na={class:"fw-semibold"},Ba={key:0,class:"badge bg-success"},La={key:1,class:"badge bg-danger"},Ka=s("h2",{class:"fw-bold fs-5 mb-2"},"Informasi Pengguna",-1),Fa={class:"fw-semibold"},Ua={class:"table-responsive push"},Ya={class:"table table-bordered"},Oa=s("thead",null,[s("tr",{class:"text-dark"},[s("th",{class:"text-center",style:{width:"60px"}}),s("th",null,"Keterangan"),s("th",{class:"text-end",style:{width:"120px"}},"Jumlah")])],-1),Ja={class:"text-center"},Ha={class:"fw-semibold mb-1"},Ra=s("div",{class:"text-muted"},null,-1),Wa={class:"text-end"},za=s("td",{colspan:"2",class:"fw-bold text-uppercase text-end"},"Total",-1),qa={class:"fw-bold text-end"},Ga={class:"text-end"},Qa=s("i",{class:"fa fa-close me-2"},null,-1),Xa=s("i",{class:"fa fa-check me-2"},null,-1);function Za(_,i,d,g,m,f){const b=N,e=L,o=K,k=F,A=U,I=v("select-kelompok"),w=Y,M=J,x=O,P=H,E=v("base-layout");return c(),y(E,null,{default:a(()=>[s("div",W,[s("div",z,[q,s("div",G,[d.data.status=="Pending"?(c(),r(p,{key:0},[t(b,{onClick:i[0]||(i[0]=u=>f.openModal("terima")),type:"primary"},{default:a(()=>[Q,l(" Terima ")]),_:1}),t(b,{onClick:i[1]||(i[1]=u=>f.openModal("tolak")),type:"danger"},{default:a(()=>[X,l(" Tolak ")]),_:1})],64)):C("",!0)])]),t(A,{modelValue:m.activeTab,"onUpdate:modelValue":i[2]||(i[2]=u=>m.activeTab=u),class:"block rounded-2",onTabClick:f.updateTab,stretch:""},{default:a(()=>[t(k,{label:"Informasi Anak",name:"anak"},{default:a(()=>[s("div",Z,[t(o,{gutter:20},{default:a(()=>[t(e,{md:12},{default:a(()=>[t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Nama Lengkap")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",$,n(d.data.nama),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Nama Panggilan")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",aa,n(d.data.username),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Jenis Kelamin")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",ta,n(d.data.jk=="L"?"Laki-Laki":"Perempuan"),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Tempat / Tanggal Lahir")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",ea,n(d.data.tmp_lahir)+" / "+n(d.data.tgl_lahir),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Usia")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",la,n(f.get_umur(d.data.tgl_lahir)),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Anak Ke")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",sa,n(d.data.anak_ke),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Jarak Rumah")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",da,n(d.data.jarak)+" Km",1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Alamat")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",na,n(d.data.alamat),1)]),_:1})]),_:1})]),_:1}),t(e,{md:12},{default:a(()=>[t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Sosialisasi dengan lingkungan")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",oa,n(d.data.sosialisasi_dengan_lingkungan_anak),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Sakit yang pernah diderita")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",ia,n(d.data.sakit_yang_pernah_diderita_anak),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Makanan yang disukai")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",_a,n(d.data.makanan_yang_disukai_anak),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Makanan yang tidak disukai")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",ma,n(d.data.makanan_yang_tidak_disukai_anak),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Memiliki Alergi")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",ua,n(d.data.memiliki_alergi_anak),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Scan Akta Kelahiran")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),d.data.scan_akte?(c(),r("a",{key:0,href:`/uploads/${d.data.scan_akte}`,class:"ep-button ep-button--primary",target:"_blank"}," Lihat Akte Kelahiran ",8,ca)):(c(),r(p,{key:1},[l(" - ")],64))]),_:1})]),_:1})]),_:1})]),_:1})])]),_:1}),t(k,{label:"Informasi Orang Tua/Wali",name:"ortu"},{default:a(()=>[s("div",fa,[t(o,{gutter:20},{default:a(()=>[t(e,{md:12},{default:a(()=>[t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Nama Ayah")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",ra,n(d.data.user.detail.nama_ayah),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Tempat / Tanggal Lahir Ayah")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",ha,n(d.data.user.detail.tmp_lahir_ayah)+" / "+n(d.data.user.detail.tgl_lahir_ayah),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("No HP Ayah")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",ba,n(d.data.user.detail.telp_ayah),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Pendidkan Terakhir Ayah")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",ga,n(d.data.user.detail.pendidikan_ayah),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Agama Ayah")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",ka,n(d.data.user.detail.agama_ayah),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Alamat Ayah")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",ya,n(d.data.user.detail.alamat_ayah),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Pekerjaan Ayah")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",pa,n(d.data.user.detail.pekerjaan_ayah),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Penghasilan Ayah")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",wa,n(d.data.user.detail.penghasilan_ayah),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Alamat Kantor Ayah")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",Ta,n(d.data.user.detail.alamat_kantor_ayah),1)]),_:1})]),_:1})]),_:1}),t(e,{md:12},{default:a(()=>[t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Nama Ibu")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",va,n(d.data.user.detail.nama_ibu),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Tempat / Tanggal Lahir Ibu")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",Aa,n(d.data.user.detail.tmp_lahir_ibu)+" / "+n(d.data.user.detail.tgl_lahir_ibu),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("No HP Ibu")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",Ia,n(d.data.user.detail.telp_ibu),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Pendidkan Terakhir Ibu")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",Ma,n(d.data.user.detail.pendidikan_ibu),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Agama Ibu")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",xa,n(d.data.user.detail.agama_ibu),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Alamat Ibu")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",Pa,n(d.data.user.detail.alamat_ibu),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Pekerjaan Ibu")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",Ea,n(d.data.user.detail.pekerjaan_ibu),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Penghasilan Ibu")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",Va,n(d.data.user.detail.penghasilan_ibu),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{md:10},{default:a(()=>[l("Alamat Kantor Ibu")]),_:1}),t(e,{md:14},{default:a(()=>[l(" : "),s("span",ja,n(d.data.user.detail.alamat_kantor_ibu),1)]),_:1})]),_:1})]),_:1})]),_:1})])]),_:1}),t(k,{label:"Informasi Pembayaran",name:"invoice"},{default:a(()=>[s("div",{class:"block-content p-4",style:D({background:`url(${d.invoice.status=="paid"?"/images/paid.png":"/images/unpaid.png"}) no-repeat center center`})},[t(o,{gutter:20,justify:"space-between"},{default:a(()=>[t(e,{lg:12},{default:a(()=>[Ca,t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{lg:8},{default:a(()=>[l("Nomor")]),_:1}),t(e,{lg:16},{default:a(()=>[s("div",Da,n(d.invoice.nomor),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{lg:8},{default:a(()=>[l("Tanggal")]),_:1}),t(e,{lg:16},{default:a(()=>[s("div",Sa,n(f.format_date(d.invoice.tgl)),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{lg:8},{default:a(()=>[l("Tanggal Tempo")]),_:1}),t(e,{lg:16},{default:a(()=>[s("div",Na,n(f.format_date(d.invoice.tgl_tempo)),1)]),_:1})]),_:1}),t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{lg:8},{default:a(()=>[l("Status")]),_:1}),t(e,{lg:16},{default:a(()=>[d.invoice.status=="paid"?(c(),r("span",Ba," Lunas ")):(c(),r("span",La," Belum Bayar "))]),_:1})]),_:1})]),_:1}),t(e,{lg:12},{default:a(()=>[Ka,t(o,{class:"mb-2",gutter:10},{default:a(()=>[t(e,{lg:8},{default:a(()=>[l("Nama")]),_:1}),t(e,{lg:16},{default:a(()=>[s("div",Fa,n(d.invoice.user.nama),1)]),_:1})]),_:1})]),_:1})]),_:1}),s("div",Ua,[s("table",Ya,[Oa,s("tbody",null,[(c(!0),r(p,null,S(d.invoice.detail,(u,T)=>(c(),r("tr",{key:T},[s("td",Ja,n(T+1),1),s("td",null,[s("p",Ha,n(u.tipe),1),Ra]),s("td",Wa,n(_.currency(u.harga)),1)]))),128))]),s("tfoot",null,[s("tr",null,[za,s("td",qa,n(_.currency(d.invoice.total)),1)])])])])],4)]),_:1})]),_:1},8,["modelValue","onTabClick"])]),t(P,{modelValue:m.showModal,"onUpdate:modelValue":i[5]||(i[5]=u=>m.showModal=u),title:m.modalTitle,width:"40%"},{default:a(()=>[t(x,{model:m.form,"label-position":"top"},{default:a(()=>[m.form.status=="terima"?(c(),y(w,{key:0,label:"Kelompok",error:d.errors.kelompok_id,usia:m.ageInMonths},{default:a(()=>[t(I,{modelValue:m.form.kelompok_id,"onUpdate:modelValue":i[3]||(i[3]=u=>m.form.kelompok_id=u)},null,8,["modelValue"])]),_:1},8,["error","usia"])):(c(),y(w,{key:1,label:"Alasan",error:d.errors.alasan},{default:a(()=>[t(M,{type:"textarea",modelValue:m.form.alasan,"onUpdate:modelValue":i[4]||(i[4]=u=>m.form.alasan=u)},null,8,["modelValue"])]),_:1},8,["error"])),s("div",Ga,[t(b,{onClick:f.closeModal},{default:a(()=>[Qa,l(" Batal ")]),_:1},8,["onClick"]),t(b,{type:"primary",onClick:f.submit},{default:a(()=>[Xa,l(" Simpan ")]),_:1},8,["onClick"])])]),_:1},8,["model"])]),_:1},8,["modelValue","title"])]),_:1})}const kt=j(R,[["render",Za]]);export{kt as default};