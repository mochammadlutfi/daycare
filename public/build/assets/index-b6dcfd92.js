import{aE as Fe,c as f,b2 as Ue,ap as ke,b3 as X,r as M,ao as Y,b4 as Q,ab as xe,ad as k,aF as we,M as _e,aL as Xe,N as ee,aN as Ce,aS as Ye,aK as te,R as Pe,b5 as Ze,b6 as qe,aw as Ge,ax as Je,aA as Qe,b7 as et,S as Se,az as tt,b8 as at,b9 as ot,ba as nt,av as st,aD as Ie,au as lt,bb as it,o as m,j as C,W as h,F as ae,n as g,V as t,k as W,f as T,e as I,w as L,a_ as U,aV as A,bc as oe,p as rt,aO as ut,g as ct,bd as dt,t as _,a9 as pt,X as ft,O as Ee,a5 as vt}from"./id-3481afe5.js";import{m as mt}from"./typescript-defaf979.js";import{U as ne}from"./event-9519ab40.js";const ht=()=>Fe&&/firefox/i.test(window.navigator.userAgent),bt=o=>/([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(o),gt=["class","style"],yt=/^on[A-Z]/,xt=(o={})=>{const{excludeListeners:r=!1,excludeKeys:l}=o,a=f(()=>((l==null?void 0:l.value)||[]).concat(gt)),s=ke();return s?f(()=>{var u;return Ue(Object.entries((u=s.proxy)==null?void 0:u.$attrs).filter(([d])=>!a.value.includes(d)&&!(r&&yt.test(d))))}):f(()=>({}))};function wt(o){let r;function l(){if(o.value==null)return;const{selectionStart:s,selectionEnd:u,value:d}=o.value;if(s==null||u==null)return;const i=d.slice(0,Math.max(0,s)),c=d.slice(Math.max(0,u));r={selectionStart:s,selectionEnd:u,value:d,beforeTxt:i,afterTxt:c}}function a(){if(o.value==null||r==null)return;const{value:s}=o.value,{beforeTxt:u,afterTxt:d,selectionStart:i}=r;if(u==null||d==null||i==null)return;let c=s.length;if(s.endsWith(d))c=s.length-d.length;else if(s.startsWith(u))c=u.length;else{const y=u[i-1],x=s.indexOf(y,i-1);x!==-1&&(c=x+1)}o.value.setSelectionRange(c,c)}return[l,a]}function Ct(o,{beforeFocus:r,afterFocus:l,beforeBlur:a,afterBlur:s}={}){const u=ke(),{emit:d}=u,i=X(),c=M(!1),y=b=>{xe(r)&&r(b)||c.value||(c.value=!0,d("focus",b),l==null||l())},x=b=>{var E;xe(a)&&a(b)||b.relatedTarget&&((E=i.value)!=null&&E.contains(b.relatedTarget))||(c.value=!1,d("blur",b),s==null||s())},v=()=>{var b,E;(b=i.value)!=null&&b.contains(document.activeElement)&&i.value!==document.activeElement||(E=o.value)==null||E.focus()};return Y(i,b=>{b&&b.setAttribute("tabindex","-1")}),Q(i,"focus",y,!0),Q(i,"blur",x,!0),Q(i,"click",v,!0),{isFocused:c,wrapperRef:i,handleFocus:y,handleBlur:x}}function St({afterComposition:o,emit:r}){const l=M(!1),a=i=>{r==null||r("compositionstart",i),l.value=!0},s=i=>{var c;r==null||r("compositionupdate",i);const y=(c=i.target)==null?void 0:c.value,x=y[y.length-1]||"";l.value=!bt(x)},u=i=>{r==null||r("compositionend",i),l.value&&(l.value=!1,k(()=>o(i)))};return{isComposing:l,handleComposition:i=>{i.type==="compositionend"?u(i):s(i)},handleCompositionStart:a,handleCompositionUpdate:s,handleCompositionEnd:u}}let w;const It=`
  height:0 !important;
  visibility:hidden !important;
  ${ht()?"":"overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`,Et=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"];function zt(o){const r=window.getComputedStyle(o),l=r.getPropertyValue("box-sizing"),a=Number.parseFloat(r.getPropertyValue("padding-bottom"))+Number.parseFloat(r.getPropertyValue("padding-top")),s=Number.parseFloat(r.getPropertyValue("border-bottom-width"))+Number.parseFloat(r.getPropertyValue("border-top-width"));return{contextStyle:Et.map(d=>`${d}:${r.getPropertyValue(d)}`).join(";"),paddingSize:a,borderSize:s,boxSizing:l}}function ze(o,r=1,l){var a;w||(w=document.createElement("textarea"),document.body.appendChild(w));const{paddingSize:s,borderSize:u,boxSizing:d,contextStyle:i}=zt(o);w.setAttribute("style",`${i};${It}`),w.value=o.value||o.placeholder||"";let c=w.scrollHeight;const y={};d==="border-box"?c=c+u:d==="content-box"&&(c=c-s),w.value="";const x=w.scrollHeight-s;if(we(r)){let v=x*r;d==="border-box"&&(v=v+s+u),c=Math.max(v,c),y.minHeight=`${v}px`}if(we(l)){let v=x*l;d==="border-box"&&(v=v+s+u),c=Math.min(v,c)}return y.height=`${c}px`,(a=w.parentNode)==null||a.removeChild(w),w=void 0,y}const Ft=_e({id:{type:String,default:void 0},size:Xe,disabled:Boolean,modelValue:{type:ee([String,Number,Object]),default:""},maxlength:{type:[String,Number]},minlength:{type:[String,Number]},type:{type:String,default:"text"},resize:{type:String,values:["none","both","horizontal","vertical"]},autosize:{type:ee([Boolean,Object]),default:!1},autocomplete:{type:String,default:"off"},formatter:{type:Function},parser:{type:Function},placeholder:{type:String},form:{type:String},readonly:Boolean,clearable:Boolean,showPassword:Boolean,showWordLimit:Boolean,suffixIcon:{type:Ce},prefixIcon:{type:Ce},containerRole:{type:String,default:void 0},tabindex:{type:[String,Number],default:0},validateEvent:{type:Boolean,default:!0},inputStyle:{type:ee([Object,Array,String]),default:()=>mt({})},autofocus:Boolean,rows:{type:Number,default:2},...Ye(["ariaLabel"])}),kt={[ne]:o=>te(o),input:o=>te(o),change:o=>te(o),focus:o=>o instanceof FocusEvent,blur:o=>o instanceof FocusEvent,clear:()=>!0,mouseleave:o=>o instanceof MouseEvent,mouseenter:o=>o instanceof MouseEvent,keydown:o=>o instanceof Event,compositionstart:o=>o instanceof CompositionEvent,compositionupdate:o=>o instanceof CompositionEvent,compositionend:o=>o instanceof CompositionEvent},Pt=Pe({name:"ElInput",inheritAttrs:!1}),Nt=Pe({...Pt,props:Ft,emits:kt,setup(o,{expose:r,emit:l}){const a=o,s=Ze(),u=qe(),d=f(()=>{const e={};return a.containerRole==="combobox"&&(e["aria-haspopup"]=s["aria-haspopup"],e["aria-owns"]=s["aria-owns"],e["aria-expanded"]=s["aria-expanded"]),e}),i=f(()=>[a.type==="textarea"?se.b():n.b(),n.m(E.value),n.is("disabled",z.value),n.is("exceed",Be.value),{[n.b("group")]:u.prepend||u.append,[n.m("prefix")]:u.prefix||a.prefixIcon,[n.m("suffix")]:u.suffix||a.suffixIcon||a.clearable||a.showPassword,[n.bm("suffix","password-clear")]:j.value&&q.value,[n.b("hidden")]:a.type==="hidden"},s.class]),c=f(()=>[n.e("wrapper"),n.is("focus",K.value)]),y=xt({excludeKeys:f(()=>Object.keys(d.value))}),{form:x,formItem:v}=Ge(),{inputId:b}=Je(a,{formItemContext:v}),E=Qe(),z=et(),n=Se("input"),se=Se("textarea"),O=X(),S=X(),Z=M(!1),H=M(!1),le=M(),D=X(a.inputStyle),P=f(()=>O.value||S.value),{wrapperRef:Ne,isFocused:K,handleFocus:Ve,handleBlur:Te}=Ct(P,{beforeFocus(){return z.value},afterBlur(){var e;a.validateEvent&&((e=v==null?void 0:v.validate)==null||e.call(v,"blur").catch(p=>Ie()))}}),ie=f(()=>{var e;return(e=x==null?void 0:x.statusIcon)!=null?e:!1}),R=f(()=>(v==null?void 0:v.validateState)||""),re=f(()=>R.value&&tt[R.value]),Re=f(()=>H.value?at:ot),$e=f(()=>[s.style]),ue=f(()=>[a.inputStyle,D.value,{resize:a.resize}]),F=f(()=>nt(a.modelValue)?"":String(a.modelValue)),j=f(()=>a.clearable&&!z.value&&!a.readonly&&!!F.value&&(K.value||Z.value)),q=f(()=>a.showPassword&&!z.value&&!a.readonly&&!!F.value&&(!!F.value||K.value)),N=f(()=>a.showWordLimit&&!!a.maxlength&&(a.type==="text"||a.type==="textarea")&&!z.value&&!a.readonly&&!a.showPassword),G=f(()=>F.value.length),Be=f(()=>!!N.value&&G.value>Number(a.maxlength)),Le=f(()=>!!u.suffix||!!a.suffixIcon||j.value||a.showPassword||N.value||!!R.value&&ie.value),[Ae,Me]=wt(O);st(S,e=>{if(Oe(),!N.value||a.resize!=="both")return;const p=e[0],{width:V}=p.contentRect;le.value={right:`calc(100% - ${V+15+6}px)`}});const $=()=>{const{type:e,autosize:p}=a;if(!(!Fe||e!=="textarea"||!S.value))if(p){const V=Ee(p)?p.minRows:void 0,ge=Ee(p)?p.maxRows:void 0,ye=ze(S.value,V,ge);D.value={overflowY:"hidden",...ye},k(()=>{S.value.offsetHeight,D.value=ye})}else D.value={minHeight:ze(S.value).minHeight}},Oe=(e=>{let p=!1;return()=>{var V;if(p||!a.autosize)return;((V=S.value)==null?void 0:V.offsetParent)===null||(e(),p=!0)}})($),B=()=>{const e=P.value,p=a.formatter?a.formatter(F.value):F.value;!e||e.value===p||(e.value=p)},J=async e=>{Ae();let{value:p}=e.target;if(a.formatter&&(p=a.parser?a.parser(p):p),!de.value){if(p===F.value){B();return}l(ne,p),l("input",p),await k(),B(),Me()}},ce=e=>{l("change",e.target.value)},{isComposing:de,handleCompositionStart:pe,handleCompositionUpdate:fe,handleCompositionEnd:ve}=St({emit:l,afterComposition:J}),He=()=>{H.value=!H.value,me()},me=async()=>{var e;await k(),(e=P.value)==null||e.focus()},De=()=>{var e;return(e=P.value)==null?void 0:e.blur()},Ke=e=>{Z.value=!1,l("mouseleave",e)},je=e=>{Z.value=!0,l("mouseenter",e)},he=e=>{l("keydown",e)},We=()=>{var e;(e=P.value)==null||e.select()},be=()=>{l(ne,""),l("change",""),l("clear"),l("input","")};return Y(()=>a.modelValue,()=>{var e;k(()=>$()),a.validateEvent&&((e=v==null?void 0:v.validate)==null||e.call(v,"change").catch(p=>Ie()))}),Y(F,()=>B()),Y(()=>a.type,async()=>{await k(),B(),$()}),lt(()=>{!a.formatter&&a.parser,B(),k($)}),r({input:O,textarea:S,ref:P,textareaStyle:ue,autosize:it(a,"autosize"),isComposing:de,focus:me,blur:De,select:We,clear:be,resizeTextarea:$}),(e,p)=>(m(),C("div",oe(t(d),{class:[t(i),{[t(n).bm("group","append")]:e.$slots.append,[t(n).bm("group","prepend")]:e.$slots.prepend}],style:t($e),role:e.containerRole,onMouseenter:je,onMouseleave:Ke}),[h(" input "),e.type!=="textarea"?(m(),C(ae,{key:0},[h(" prepend slot "),e.$slots.prepend?(m(),C("div",{key:0,class:g(t(n).be("group","prepend"))},[W(e.$slots,"prepend")],2)):h("v-if",!0),T("div",{ref_key:"wrapperRef",ref:Ne,class:g(t(c))},[h(" prefix slot "),e.$slots.prefix||e.prefixIcon?(m(),C("span",{key:0,class:g(t(n).e("prefix"))},[T("span",{class:g(t(n).e("prefix-inner"))},[W(e.$slots,"prefix"),e.prefixIcon?(m(),I(t(A),{key:0,class:g(t(n).e("icon"))},{default:L(()=>[(m(),I(U(e.prefixIcon)))]),_:1},8,["class"])):h("v-if",!0)],2)],2)):h("v-if",!0),T("input",oe({id:t(b),ref_key:"input",ref:O,class:t(n).e("inner")},t(y),{minlength:e.minlength,maxlength:e.maxlength,type:e.showPassword?H.value?"text":"password":e.type,disabled:t(z),readonly:e.readonly,autocomplete:e.autocomplete,tabindex:e.tabindex,"aria-label":e.ariaLabel,placeholder:e.placeholder,style:e.inputStyle,form:e.form,autofocus:e.autofocus,onCompositionstart:t(pe),onCompositionupdate:t(fe),onCompositionend:t(ve),onInput:J,onChange:ce,onKeydown:he}),null,16,["id","minlength","maxlength","type","disabled","readonly","autocomplete","tabindex","aria-label","placeholder","form","autofocus","onCompositionstart","onCompositionupdate","onCompositionend"]),h(" suffix slot "),t(Le)?(m(),C("span",{key:1,class:g(t(n).e("suffix"))},[T("span",{class:g(t(n).e("suffix-inner"))},[!t(j)||!t(q)||!t(N)?(m(),C(ae,{key:0},[W(e.$slots,"suffix"),e.suffixIcon?(m(),I(t(A),{key:0,class:g(t(n).e("icon"))},{default:L(()=>[(m(),I(U(e.suffixIcon)))]),_:1},8,["class"])):h("v-if",!0)],64)):h("v-if",!0),t(j)?(m(),I(t(A),{key:1,class:g([t(n).e("icon"),t(n).e("clear")]),onMousedown:ct(t(dt),["prevent"]),onClick:be},{default:L(()=>[rt(t(ut))]),_:1},8,["class","onMousedown"])):h("v-if",!0),t(q)?(m(),I(t(A),{key:2,class:g([t(n).e("icon"),t(n).e("password")]),onClick:He},{default:L(()=>[(m(),I(U(t(Re))))]),_:1},8,["class"])):h("v-if",!0),t(N)?(m(),C("span",{key:3,class:g(t(n).e("count"))},[T("span",{class:g(t(n).e("count-inner"))},_(t(G))+" / "+_(e.maxlength),3)],2)):h("v-if",!0),t(R)&&t(re)&&t(ie)?(m(),I(t(A),{key:4,class:g([t(n).e("icon"),t(n).e("validateIcon"),t(n).is("loading",t(R)==="validating")])},{default:L(()=>[(m(),I(U(t(re))))]),_:1},8,["class"])):h("v-if",!0)],2)],2)):h("v-if",!0)],2),h(" append slot "),e.$slots.append?(m(),C("div",{key:1,class:g(t(n).be("group","append"))},[W(e.$slots,"append")],2)):h("v-if",!0)],64)):(m(),C(ae,{key:1},[h(" textarea "),T("textarea",oe({id:t(b),ref_key:"textarea",ref:S,class:[t(se).e("inner"),t(n).is("focus",t(K))]},t(y),{minlength:e.minlength,maxlength:e.maxlength,tabindex:e.tabindex,disabled:t(z),readonly:e.readonly,autocomplete:e.autocomplete,style:t(ue),"aria-label":e.ariaLabel,placeholder:e.placeholder,form:e.form,autofocus:e.autofocus,rows:e.rows,onCompositionstart:t(pe),onCompositionupdate:t(fe),onCompositionend:t(ve),onInput:J,onFocus:t(Ve),onBlur:t(Te),onChange:ce,onKeydown:he}),null,16,["id","minlength","maxlength","tabindex","disabled","readonly","autocomplete","aria-label","placeholder","form","autofocus","rows","onCompositionstart","onCompositionupdate","onCompositionend","onFocus","onBlur"]),t(N)?(m(),C("span",{key:0,style:pt(le.value),class:g(t(n).e("count"))},_(t(G))+" / "+_(e.maxlength),7)):h("v-if",!0)],64))],16,["role"]))}});var Vt=ft(Nt,[["__file","input.vue"]]);const Lt=vt(Vt);export{Lt as E,Ct as a,xt as b,St as u};
