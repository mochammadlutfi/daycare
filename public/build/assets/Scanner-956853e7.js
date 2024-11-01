import{k as u}from"./vue-qrcode-reader-5609c67e.js";import{_ as p,m as c,o as _,e as f,w as i,f as s,p as h,a5 as v,as as w,G as C,H as S}from"./id-2e276a2e.js";import{E as m}from"./index-d645a2bc.js";import"./typescript-defaf979.js";const g={components:{QrcodeStream:u},data(){return{cameraPermission:"prompt",paused:!1,result:"",showScanConfirmation:!1}},mounted(){this.checkCameraPermission},methods:{onCameraOn(){this.showScanConfirmation=!1},onError:console.error,onCameraOff(){this.showScanConfirmation=!0},async onDetect(e){const a=JSON.stringify(e.map(n=>n.rawValue)).replace(/[\[\]"]/g,"");this.submit(a),this.paused=!0,await this.timeout(500),this.paused=!1},timeout(e){return new Promise(o=>{window.setTimeout(o,e)})},submit(e){this.loading=!0,this.$inertia.form({code:e}).post(this.route("admin.absen.scan"),{preserveScroll:!0,onFinish:()=>{this.loading=!1},onSuccess:()=>{var a=new Audio("/sound/success.mp3");a.play(),m({type:"success",message:"Terimakasih"})},onError:a=>{var n=new Audio("/sound/error.mp3");n.play(),m({type:"error",message:a.code})}})},checkCameraPermission(){navigator.permissions.query({name:"camera"}).then(e=>{this.cameraPermission=e.state,e.onchange=()=>{this.cameraPermission=e.state}}).catch(e=>{console.error("Error checking camera permission:",e)})}}},y=e=>(C("data-v-ef87ccaa"),e=e(),S(),e),k={class:"content"},b=y(()=>s("div",{class:"content-heading d-flex justify-content-between align-items-center"},[s("span",null,"Scanner"),s("div",{class:"space-x-1"})],-1)),O={class:"block rounded-2"},E={class:"block-content p-4"},x={class:"scanner-frame"},P={class:"scan-confirmation"};function D(e,o,a,n,r,t){const d=c("qrcode-stream"),l=c("base-layout");return _(),f(l,{title:"Scanner Absen"},{default:i(()=>[s("div",k,[b,s("div",O,[s("div",E,[s("div",x,[h(d,{paused:r.paused,onDetect:t.onDetect,onCameraOn:t.onCameraOn,onCameraOff:t.onCameraOff,onError:t.onError},{default:i(()=>[v(s("div",P,null,512),[[w,r.showScanConfirmation]])]),_:1},8,["paused","onDetect","onCameraOn","onCameraOff","onError"])])])])])]),_:1})}const N=p(g,[["render",D],["__scopeId","data-v-ef87ccaa"]]);export{N as default};