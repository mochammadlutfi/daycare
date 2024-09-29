import{d7 as Ce,ae as R,cp as Ee,X as Be,R as we,$ as Te,dT as Me,cB as Se,dU as ke,dd as Ie,c as y,r as T,a as Ae,b4 as Y,d6 as _,dV as x,cb as ee,ab as ne,be as Le,ba as Re,bH as Oe,m as M,o as d,e as v,w as p,a5 as N,p as C,f as m,n as r,a9 as oe,j as z,g as H,br as P,W as S,t as L,c1 as U,k as Ve,L as K,bV as q,d as $e,cl as ze,cq as ie,b3 as ue,bp as de,c_ as se,O as Pe,ci as Ue,ac as ae,d1 as te}from"./id-1c1e2a8a.js";import{E as De}from"./index-9517473f.js";import{E as Fe,u as Ne,a as He,b as Ke}from"./index-960b7304.js";const qe='a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])',je=e=>getComputedStyle(e).position==="fixed"?!1:e.offsetParent!==null,le=e=>Array.from(e.querySelectorAll(qe)).filter(o=>Xe(o)&&je(o)),Xe=e=>{if(e.tabIndex>0||e.tabIndex===0&&e.getAttribute("tabIndex")!==null)return!0;if(e.disabled)return!1;switch(e.nodeName){case"A":return!!e.href&&e.rel!=="ignore";case"INPUT":return!(e.type==="hidden"||e.type==="file");case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}},Ge=e=>["",...Ce].includes(e),j="_trap-focus-children",E=[],re=e=>{if(E.length===0)return;const o=E[E.length-1][j];if(o.length>0&&e.code===Ee.tab){if(o.length===1){e.preventDefault(),document.activeElement!==o[0]&&o[0].focus();return}const t=e.shiftKey,i=e.target===o[0],l=e.target===o[o.length-1];i&&t&&(e.preventDefault(),o[o.length-1].focus()),l&&!t&&(e.preventDefault(),o[0].focus())}},We={beforeMount(e){e[j]=le(e),E.push(e),E.length<=1&&document.addEventListener("keydown",re)},updated(e){R(()=>{e[j]=le(e)})},unmounted(){E.shift(),E.length===0&&document.removeEventListener("keydown",re)}},Ze=we({name:"ElMessageBox",directives:{TrapFocus:We},components:{ElButton:Te,ElFocusTrap:Me,ElInput:De,ElOverlay:Fe,ElIcon:Se,...ke},inheritAttrs:!1,props:{buttonSize:{type:String,validator:Ge},modal:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},showClose:{type:Boolean,default:!0},closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},closeOnHashChange:{type:Boolean,default:!0},center:Boolean,draggable:Boolean,overflow:Boolean,roundButton:{default:!1,type:Boolean},container:{type:String,default:"body"},boxType:{type:String,default:""}},emits:["vanish","action"],setup(e,{emit:o}){const{locale:t,zIndex:i,ns:l,size:s}=Ie("message-box",y(()=>e.buttonSize)),{t:u}=t,{nextZIndex:f}=i,h=T(!1),n=Ae({autofocus:!0,beforeClose:null,callback:null,cancelButtonText:"",cancelButtonClass:"",confirmButtonText:"",confirmButtonClass:"",customClass:"",customStyle:{},dangerouslyUseHTMLString:!1,distinguishCancelAndClose:!1,icon:"",inputPattern:null,inputPlaceholder:"",inputType:"text",inputValue:null,inputValidator:null,inputErrorMessage:"",message:null,modalFade:!0,modalClass:"",showCancelButton:!1,showConfirmButton:!0,type:"",title:void 0,showInput:!1,action:"",confirmButtonLoading:!1,cancelButtonLoading:!1,confirmButtonLoadingIcon:Y(_),cancelButtonLoadingIcon:Y(_),confirmButtonDisabled:!1,editorErrorMessage:"",validateError:!1,zIndex:f()}),D=y(()=>{const a=n.type;return{[l.bm("icon",a)]:a&&x[a]}}),F=ee(),c=ee(),ce=y(()=>n.icon||x[n.type]||""),fe=y(()=>!!n.message),B=T(),X=T(),I=T(),V=T(),G=T(),pe=y(()=>n.confirmButtonClass);ne(()=>n.inputValue,async a=>{await R(),e.boxType==="prompt"&&a!==null&&Z()},{immediate:!0}),ne(()=>h.value,a=>{var g,w;a&&(e.boxType!=="prompt"&&(n.autofocus?I.value=(w=(g=G.value)==null?void 0:g.$el)!=null?w:B.value:I.value=B.value),n.zIndex=f()),e.boxType==="prompt"&&(a?R().then(()=>{var Q;V.value&&V.value.$el&&(n.autofocus?I.value=(Q=he())!=null?Q:B.value:I.value=B.value)}):(n.editorErrorMessage="",n.validateError=!1))});const me=y(()=>e.draggable),ge=y(()=>e.overflow);Ne(B,X,me,ge),Le(async()=>{await R(),e.closeOnHashChange&&window.addEventListener("hashchange",A)}),Re(()=>{e.closeOnHashChange&&window.removeEventListener("hashchange",A)});function A(){h.value&&(h.value=!1,R(()=>{n.action&&o("action",n.action)}))}const W=()=>{e.closeOnClickModal&&$(n.distinguishCancelAndClose?"close":"cancel")},ve=Ke(W),be=a=>{if(n.inputType!=="textarea")return a.preventDefault(),$("confirm")},$=a=>{var g;e.boxType==="prompt"&&a==="confirm"&&!Z()||(n.action=a,n.beforeClose?(g=n.beforeClose)==null||g.call(n,a,n,A):A())},Z=()=>{if(e.boxType==="prompt"){const a=n.inputPattern;if(a&&!a.test(n.inputValue||""))return n.editorErrorMessage=n.inputErrorMessage||u("el.messagebox.error"),n.validateError=!0,!1;const g=n.inputValidator;if(typeof g=="function"){const w=g(n.inputValue);if(w===!1)return n.editorErrorMessage=n.inputErrorMessage||u("el.messagebox.error"),n.validateError=!0,!1;if(typeof w=="string")return n.editorErrorMessage=w,n.validateError=!0,!1}}return n.editorErrorMessage="",n.validateError=!1,!0},he=()=>{const a=V.value.$refs;return a.input||a.textarea},J=()=>{$("close")},ye=()=>{e.closeOnPressEscape&&J()};return e.lockScroll&&He(h),{...Oe(n),ns:l,overlayEvent:ve,visible:h,hasMessage:fe,typeClass:D,contentId:F,inputId:c,btnSize:s,iconComponent:ce,confirmButtonClasses:pe,rootRef:B,focusStartRef:I,headerRef:X,inputRef:V,confirmRef:G,doClose:A,handleClose:J,onCloseRequested:ye,handleWrapperClick:W,handleInputEnter:be,handleAction:$,t:u}}});function Je(e,o,t,i,l,s){const u=M("el-icon"),f=M("close"),h=M("el-input"),n=M("el-button"),D=M("el-focus-trap"),F=M("el-overlay");return d(),v($e,{name:"fade-in-linear",onAfterLeave:c=>e.$emit("vanish"),persisted:""},{default:p(()=>[N(C(F,{"z-index":e.zIndex,"overlay-class":[e.ns.is("message-box"),e.modalClass],mask:e.modal},{default:p(()=>[m("div",{role:"dialog","aria-label":e.title,"aria-modal":"true","aria-describedby":e.showInput?void 0:e.contentId,class:r(`${e.ns.namespace.value}-overlay-message-box`),onClick:e.overlayEvent.onClick,onMousedown:e.overlayEvent.onMousedown,onMouseup:e.overlayEvent.onMouseup},[C(D,{loop:"",trapped:e.visible,"focus-trap-el":e.rootRef,"focus-start-el":e.focusStartRef,onReleaseRequested:e.onCloseRequested},{default:p(()=>[m("div",{ref:"rootRef",class:r([e.ns.b(),e.customClass,e.ns.is("draggable",e.draggable),{[e.ns.m("center")]:e.center}]),style:oe(e.customStyle),tabindex:"-1",onClick:z(()=>{},["stop"])},[e.title!==null&&e.title!==void 0?(d(),H("div",{key:0,ref:"headerRef",class:r([e.ns.e("header"),{"show-close":e.showClose}])},[m("div",{class:r(e.ns.e("title"))},[e.iconComponent&&e.center?(d(),v(u,{key:0,class:r([e.ns.e("status"),e.typeClass])},{default:p(()=>[(d(),v(P(e.iconComponent)))]),_:1},8,["class"])):S("v-if",!0),m("span",null,L(e.title),1)],2),e.showClose?(d(),H("button",{key:0,type:"button",class:r(e.ns.e("headerbtn")),"aria-label":e.t("el.messagebox.close"),onClick:c=>e.handleAction(e.distinguishCancelAndClose?"close":"cancel"),onKeydown:U(z(c=>e.handleAction(e.distinguishCancelAndClose?"close":"cancel"),["prevent"]),["enter"])},[C(u,{class:r(e.ns.e("close"))},{default:p(()=>[C(f)]),_:1},8,["class"])],42,["aria-label","onClick","onKeydown"])):S("v-if",!0)],2)):S("v-if",!0),m("div",{id:e.contentId,class:r(e.ns.e("content"))},[m("div",{class:r(e.ns.e("container"))},[e.iconComponent&&!e.center&&e.hasMessage?(d(),v(u,{key:0,class:r([e.ns.e("status"),e.typeClass])},{default:p(()=>[(d(),v(P(e.iconComponent)))]),_:1},8,["class"])):S("v-if",!0),e.hasMessage?(d(),H("div",{key:1,class:r(e.ns.e("message"))},[Ve(e.$slots,"default",{},()=>[e.dangerouslyUseHTMLString?(d(),v(P(e.showInput?"label":"p"),{key:1,for:e.showInput?e.inputId:void 0,innerHTML:e.message},null,8,["for","innerHTML"])):(d(),v(P(e.showInput?"label":"p"),{key:0,for:e.showInput?e.inputId:void 0},{default:p(()=>[K(L(e.dangerouslyUseHTMLString?"":e.message),1)]),_:1},8,["for"]))])],2)):S("v-if",!0)],2),N(m("div",{class:r(e.ns.e("input"))},[C(h,{id:e.inputId,ref:"inputRef",modelValue:e.inputValue,"onUpdate:modelValue":c=>e.inputValue=c,type:e.inputType,placeholder:e.inputPlaceholder,"aria-invalid":e.validateError,class:r({invalid:e.validateError}),onKeydown:U(e.handleInputEnter,["enter"])},null,8,["id","modelValue","onUpdate:modelValue","type","placeholder","aria-invalid","class","onKeydown"]),m("div",{class:r(e.ns.e("errormsg")),style:oe({visibility:e.editorErrorMessage?"visible":"hidden"})},L(e.editorErrorMessage),7)],2),[[q,e.showInput]])],10,["id"]),m("div",{class:r(e.ns.e("btns"))},[e.showCancelButton?(d(),v(n,{key:0,loading:e.cancelButtonLoading,"loading-icon":e.cancelButtonLoadingIcon,class:r([e.cancelButtonClass]),round:e.roundButton,size:e.btnSize,onClick:c=>e.handleAction("cancel"),onKeydown:U(z(c=>e.handleAction("cancel"),["prevent"]),["enter"])},{default:p(()=>[K(L(e.cancelButtonText||e.t("el.messagebox.cancel")),1)]),_:1},8,["loading","loading-icon","class","round","size","onClick","onKeydown"])):S("v-if",!0),N(C(n,{ref:"confirmRef",type:"primary",loading:e.confirmButtonLoading,"loading-icon":e.confirmButtonLoadingIcon,class:r([e.confirmButtonClasses]),round:e.roundButton,disabled:e.confirmButtonDisabled,size:e.btnSize,onClick:c=>e.handleAction("confirm"),onKeydown:U(z(c=>e.handleAction("confirm"),["prevent"]),["enter"])},{default:p(()=>[K(L(e.confirmButtonText||e.t("el.messagebox.confirm")),1)]),_:1},8,["loading","loading-icon","class","round","disabled","size","onClick","onKeydown"]),[[q,e.showConfirmButton]])],2)],14,["onClick"])]),_:3},8,["trapped","focus-trap-el","focus-start-el","onReleaseRequested"])],42,["aria-label","aria-describedby","onClick","onMousedown","onMouseup"])]),_:3},8,["z-index","overlay-class","mask"]),[[q,e.visible]])]),_:3},8,["onAfterLeave"])}var Qe=Be(Ze,[["render",Je],["__file","index.vue"]]);const O=new Map,Ye=e=>{let o=document.body;return e.appendTo&&(ie(e.appendTo)&&(o=document.querySelector(e.appendTo)),te(e.appendTo)&&(o=e.appendTo),te(o)||(o=document.body)),o},_e=(e,o,t=null)=>{const i=C(Qe,e,ae(e.message)||ue(e.message)?{default:ae(e.message)?e.message:()=>e.message}:null);return i.appContext=t,de(i,o),Ye(e).appendChild(o.firstElementChild),i.component},xe=()=>document.createElement("div"),en=(e,o)=>{const t=xe();e.onVanish=()=>{de(null,t),O.delete(l)},e.onAction=s=>{const u=O.get(l);let f;e.showInput?f={value:l.inputValue,action:s}:f=s,e.callback?e.callback(f,i.proxy):s==="cancel"||s==="close"?e.distinguishCancelAndClose&&s!=="cancel"?u.reject("close"):u.reject("cancel"):u.resolve(f)};const i=_e(e,t,o),l=i.proxy;for(const s in e)se(e,s)&&!se(l.$props,s)&&(l[s]=e[s]);return l.visible=!0,l};function k(e,o=null){if(!ze)return Promise.reject();let t;return ie(e)||ue(e)?e={message:e}:t=e.callback,new Promise((i,l)=>{const s=en(e,o??k._context);O.set(s,{options:e,callback:t,resolve:i,reject:l})})}const nn=["alert","confirm","prompt"],on={alert:{closeOnPressEscape:!1,closeOnClickModal:!1},confirm:{showCancelButton:!0},prompt:{showCancelButton:!0,showInput:!0}};nn.forEach(e=>{k[e]=sn(e)});function sn(e){return(o,t,i,l)=>{let s="";return Pe(t)?(i=t,s=""):Ue(t)?s="":s=t,k(Object.assign({title:s,message:o,type:"",...on[e]},i,{boxType:e}),l)}}k.close=()=>{O.forEach((e,o)=>{o.doClose()}),O.clear()};k._context=null;const b=k;b.install=e=>{b._context=e._context,e.config.globalProperties.$msgbox=b,e.config.globalProperties.$messageBox=b,e.config.globalProperties.$alert=b.alert,e.config.globalProperties.$confirm=b.confirm,e.config.globalProperties.$prompt=b.prompt};const rn=b;export{rn as E};
