import{k as _}from"./vue-qrcode-reader-5609c67e.js";import{_ as h,m as c,o as u,e as p,w as i,f as s,p as f,a5 as v,as as C,G as w,H as S}from"./id-2e276a2e.js";import{E as m}from"./index-d645a2bc.js";import"./typescript-defaf979.js";const g={components:{QrcodeStream:_},data(){return{cameraPermission:"prompt",paused:!1,result:"",showScanConfirmation:!1}},mounted(){this.checkCameraPermission},methods:{onCameraOn(){this.showScanConfirmation=!1},onError:console.error,onCameraOff(){this.showScanConfirmation=!0},async onDetect(e){const o=JSON.stringify(e.map(n=>n.rawValue)).replace(/[\[\]"]/g,"");this.submit(o),this.paused=!0,await this.timeout(500),this.paused=!1},timeout(e){return new Promise(a=>{window.setTimeout(a,e)})},submit(e){this.loading=!0,this.$inertia.form({code:e}).post(this.route("admin.absen.scan"),{preserveScroll:!0,onFinish:()=>{this.loading=!1},onSuccess:()=>{m({type:"success",message:"Terimakasih"})},onError:o=>{m({type:"error",message:o.code})}})},checkCameraPermission(){navigator.permissions.query({name:"camera"}).then(e=>{this.cameraPermission=e.state,e.onchange=()=>{this.cameraPermission=e.state}}).catch(e=>{console.error("Error checking camera permission:",e)})}}},k=e=>(w("data-v-c6a088ed"),e=e(),S(),e),y={class:"content"},b=k(()=>s("div",{class:"content-heading d-flex justify-content-between align-items-center"},[s("span",null,"Scanner"),s("div",{class:"space-x-1"})],-1)),O={class:"block rounded-2"},E={class:"block-content p-4"},x={class:"scanner-frame"},P={class:"scan-confirmation"};function D(e,a,o,n,r,t){const d=c("qrcode-stream"),l=c("base-layout");return u(),p(l,{title:"Scanner Absen"},{default:i(()=>[s("div",y,[b,s("div",O,[s("div",E,[s("div",x,[f(d,{paused:r.paused,onDetect:t.onDetect,onCameraOn:t.onCameraOn,onCameraOff:t.onCameraOff,onError:t.onError},{default:i(()=>[v(s("div",P,null,512),[[C,r.showScanConfirmation]])]),_:1},8,["paused","onDetect","onCameraOn","onCameraOff","onError"])])])])])]),_:1})}const V=h(g,[["render",D],["__scopeId","data-v-c6a088ed"]]);export{V as default};