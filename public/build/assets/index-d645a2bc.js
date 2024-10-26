import{L as P,M as B,Q as E,R as re,c as m,aE as T,ca as F,o as v,j as _,k as Z,p as L,w as N,a5 as j,f as $,n as C,U as n,a8 as G,t as q,as as J,d as Q,W,a4 as ie,aM as ue,aD as K,cG as ce,bN as de,r as I,cF as A,at as pe,an as fe,b3 as me,au as ge,e as h,V as S,aU as H,aZ as ye,F as ve,g as Ce,cE as be,ck as he,aI as Te,cH as d,aJ as R,cr as X,aa as z,bo as U,bu as V,bA as we,cI as Se}from"./id-2e276a2e.js";import{m as Ne}from"./typescript-defaf979.js";const Be=P({value:{type:[String,Number],default:""},max:{type:Number,default:99},isDot:Boolean,hidden:Boolean,type:{type:String,values:["primary","success","warning","info","danger"],default:"danger"},showZero:{type:Boolean,default:!0},color:String,badgeStyle:{type:B([String,Object,Array])},offset:{type:B(Array),default:[0,0]},badgeClass:{type:String}}),Ee=E({name:"ElBadge"}),Me=E({...Ee,props:Be,setup(s,{expose:t}){const e=s,a=re("badge"),o=m(()=>e.isDot?"":T(e.value)&&T(e.max)?e.max<e.value?`${e.max}+`:e.value===0&&!e.showZero?"":`${e.value}`:`${e.value}`),p=m(()=>{var l,u,f,g,y;return[{backgroundColor:e.color,marginRight:F(-((u=(l=e.offset)==null?void 0:l[0])!=null?u:0)),marginTop:F((g=(f=e.offset)==null?void 0:f[1])!=null?g:0)},(y=e.badgeStyle)!=null?y:{}]});return t({content:o}),(l,u)=>(v(),_("div",{class:C(n(a).b())},[Z(l.$slots,"default"),L(Q,{name:`${n(a).namespace.value}-zoom-in-center`,persisted:""},{default:N(()=>[j($("sup",{class:C([n(a).e("content"),n(a).em("content",l.type),n(a).is("fixed",!!l.$slots.default),n(a).is("dot",l.isDot),l.badgeClass]),style:G(n(p)),textContent:q(n(o))},null,14,["textContent"]),[[J,!l.hidden&&(n(o)||l.isDot)]])]),_:1},8,["name"])],2))}});var ke=W(Me,[["__file","badge.vue"]]);const Ie=ie(ke),Y=["success","info","warning","error"],i=Ne({customClass:"",center:!1,dangerouslyUseHTMLString:!1,duration:3e3,icon:void 0,id:"",message:"",onClose:void 0,showClose:!1,type:"info",plain:!1,offset:16,zIndex:0,grouping:!1,repeatNum:1,appendTo:K?document.body:void 0}),_e=P({customClass:{type:String,default:i.customClass},center:{type:Boolean,default:i.center},dangerouslyUseHTMLString:{type:Boolean,default:i.dangerouslyUseHTMLString},duration:{type:Number,default:i.duration},icon:{type:ue,default:i.icon},id:{type:String,default:i.id},message:{type:B([String,Object,Function]),default:i.message},onClose:{type:B(Function),default:i.onClose},showClose:{type:Boolean,default:i.showClose},type:{type:String,values:Y,default:i.type},plain:{type:Boolean,default:i.plain},offset:{type:Number,default:i.offset},zIndex:{type:Number,default:i.zIndex},grouping:{type:Boolean,default:i.grouping},repeatNum:{type:Number,default:i.repeatNum}}),$e={destroy:()=>!0},c=ce([]),ze=s=>{const t=c.findIndex(o=>o.id===s),e=c[t];let a;return t>0&&(a=c[t-1]),{current:e,prev:a}},Le=s=>{const{prev:t}=ze(s);return t?t.vm.exposed.bottom.value:0},xe=(s,t)=>c.findIndex(a=>a.id===s)>0?16:t,De=E({name:"ElMessage"}),Oe=E({...De,props:_e,emits:$e,setup(s,{expose:t}){const e=s,{Close:a}=be,{ns:o,zIndex:p}=de("message"),{currentZIndex:l,nextZIndex:u}=p,f=I(),g=I(!1),y=I(0);let M;const se=m(()=>e.type?e.type==="error"?"danger":e.type:"info"),ne=m(()=>{const r=e.type;return{[o.bm("icon",r)]:r&&A[r]}}),x=m(()=>e.icon||A[e.type]||""),te=m(()=>Le(e.id)),D=m(()=>xe(e.id,e.offset)+te.value),oe=m(()=>y.value+D.value),ae=m(()=>({top:`${D.value}px`,zIndex:l.value}));function k(){e.duration!==0&&({stop:M}=he(()=>{w()},e.duration))}function O(){M==null||M()}function w(){g.value=!1}function le({code:r}){r===Te.esc&&w()}return pe(()=>{k(),u(),g.value=!0}),fe(()=>e.repeatNum,()=>{O(),k()}),me(document,"keydown",le),ge(f,()=>{y.value=f.value.getBoundingClientRect().height}),t({visible:g,bottom:oe,close:w}),(r,Ve)=>(v(),h(Q,{name:n(o).b("fade"),onBeforeLeave:r.onClose,onAfterLeave:Pe=>r.$emit("destroy"),persisted:""},{default:N(()=>[j($("div",{id:r.id,ref_key:"messageRef",ref:f,class:C([n(o).b(),{[n(o).m(r.type)]:r.type},n(o).is("center",r.center),n(o).is("closable",r.showClose),n(o).is("plain",r.plain),r.customClass]),style:G(n(ae)),role:"alert",onMouseenter:O,onMouseleave:k},[r.repeatNum>1?(v(),h(n(Ie),{key:0,value:r.repeatNum,type:n(se),class:C(n(o).e("badge"))},null,8,["value","type","class"])):S("v-if",!0),n(x)?(v(),h(n(H),{key:1,class:C([n(o).e("icon"),n(ne)])},{default:N(()=>[(v(),h(ye(n(x))))]),_:1},8,["class"])):S("v-if",!0),Z(r.$slots,"default",{},()=>[r.dangerouslyUseHTMLString?(v(),_(ve,{key:1},[S(" Caution here, message could've been compromised, never use user's input as message "),$("p",{class:C(n(o).e("content")),innerHTML:r.message},null,10,["innerHTML"])],2112)):(v(),_("p",{key:0,class:C(n(o).e("content"))},q(r.message),3))]),r.showClose?(v(),h(n(H),{key:2,class:C(n(o).e("closeBtn")),onClick:Ce(w,["stop"])},{default:N(()=>[L(n(a))]),_:1},8,["class","onClick"])):S("v-if",!0)],46,["id"]),[[J,g.value]])]),_:3},8,["name","onBeforeLeave","onAfterLeave"]))}});var Fe=W(Oe,[["__file","message.vue"]]);let Ae=1;const ee=s=>{const t=!s||R(s)||X(s)||z(s)?{message:s}:s,e={...i,...t};if(!e.appendTo)e.appendTo=document.body;else if(R(e.appendTo)){let a=document.querySelector(e.appendTo);we(a)||(a=document.body),e.appendTo=a}return U(d.grouping)&&!e.grouping&&(e.grouping=d.grouping),T(d.duration)&&e.duration===3e3&&(e.duration=d.duration),T(d.offset)&&e.offset===16&&(e.offset=d.offset),U(d.showClose)&&!e.showClose&&(e.showClose=d.showClose),e},He=s=>{const t=c.indexOf(s);if(t===-1)return;c.splice(t,1);const{handler:e}=s;e.close()},Re=({appendTo:s,...t},e)=>{const a=`message_${Ae++}`,o=t.onClose,p=document.createElement("div"),l={...t,id:a,onClose:()=>{o==null||o(),He(y)},onDestroy:()=>{V(null,p)}},u=L(Fe,l,z(l.message)||X(l.message)?{default:z(l.message)?l.message:()=>l.message}:null);u.appContext=e||b._context,V(u,p),s.appendChild(p.firstElementChild);const f=u.component,y={id:a,vnode:u,vm:f,handler:{close:()=>{f.exposed.visible.value=!1}},props:u.component.props};return y},b=(s={},t)=>{if(!K)return{close:()=>{}};const e=ee(s);if(e.grouping&&c.length){const o=c.find(({vnode:p})=>{var l;return((l=p.props)==null?void 0:l.message)===e.message});if(o)return o.props.repeatNum+=1,o.props.type=e.type,o.handler}if(T(d.max)&&c.length>=d.max)return{close:()=>{}};const a=Re(e,t);return c.push(a),a.handler};Y.forEach(s=>{b[s]=(t={},e)=>{const a=ee(t);return b({...a,type:s},e)}});function Ue(s){for(const t of c)(!s||s===t.props.type)&&t.handler.close()}b.closeAll=Ue;b._context=null;const Ge=Se(b,"$message");export{Ge as E};
