import{_ as g,E as c,i as b,o as w,e as x,w as r,f as e,K as m,p as t,g as v,$ as y}from"./id-2e276a2e.js";import{E as k}from"./index-57703201.js";import{E,a as V}from"./index-23bc7dc4.js";import"./typescript-defaf979.js";import"./event-9519ab40.js";import"./_initCloneObject-8785b8d3.js";const B={components:{ElConfigProvider:c},setup(){return{zIndex:3e3,size:"small",locale:b}},props:{canResetPassword:Boolean,status:String,errors:Object},data(){return{form:this.$inertia.form({nama:"",email:"",password:"",password_confirmation:"",remember:!1}),rules:{required:o=>!!o||"Required.",counter:o=>o.length<=20||"Max 20 characters",email:o=>/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(o)||"Invalid e-mail."},loading:!1}},methods:{submit(){this.loading=!0,this.form.post(this.route("login"),{onFinish:()=>{this.form.reset("password"),this.loading=!1}})}}},M={id:"page-container",class:"main-content-boxed"},z={id:"page-container",class:"main-content-boxed"},I={id:"main-container"},P={class:"bg-image",style:{"background-image":"url('/images/auth/1.jpg')"}},S={class:"row mx-0 bg-black-50"},A=e("div",{class:"hero-static col-md-6 col-xl-8 d-none d-md-flex align-items-md-end"},[e("div",{class:"p-4"},[e("p",{class:"fs-3 fw-semibold text-white"}," DayCare Baiturrahman ")])],-1),C={class:"hero-static col-md-6 col-xl-4 d-flex align-items-md-center bg-body-extra-light"},F={class:"content content-full"},N={class:"px-4 py-2 mb-4 text-center text-md-start"},j=e("a",{href:"/",class:"text-center"},[e("img",{src:"/images/logo/logo.png",style:{width:"40%"}})],-1),q=e("h2",{class:"h3 fw-bold mt-4 mb-2"},"Masuk",-1),D=["href"];function R(o,s,n,p,a,_){const i=k,d=E,u=y,f=V,h=c;return w(),x(h,{namespace:"ep",locale:p.locale},{default:r(()=>[e("div",M,[e("div",z,[e("main",I,[e("div",P,[e("div",S,[A,e("div",C,[e("div",F,[e("div",N,[j,q,e("p",null,[m("Belum Punya Akun ?"),e("a",{href:o.route("register"),class:"text-fw-bold"}," Daftar Sekarang",8,D)])]),t(f,{"label-position":"top","label-width":"100%",onSubmit:v(_.submit,["prevent"])},{default:r(()=>[t(d,{label:"Email",error:n.errors.email},{default:r(()=>[t(i,{modelValue:a.form.email,"onUpdate:modelValue":s[0]||(s[0]=l=>a.form.email=l),type:"text",placeholder:"Masukan Email"},null,8,["modelValue"])]),_:1},8,["error"]),t(d,{label:"Password",error:n.errors.password},{default:r(()=>[t(i,{modelValue:a.form.password,"onUpdate:modelValue":s[1]||(s[1]=l=>a.form.password=l),type:"password",placeholder:"Masukan password","show-password":""},null,8,["modelValue"])]),_:1},8,["error"]),t(u,{"native-type":"submit",type:"primary",class:"w-100",loading:a.loading},{default:r(()=>[m(" Masuk ")]),_:1},8,["loading"])]),_:1},8,["onSubmit"])])])])])])])])]),_:1},8,["locale"])}const G=g(B,[["render",R]]);export{G as default};
