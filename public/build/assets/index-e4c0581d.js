import{M as Y,ct as ae,R as N,Q as se,aW as K,dZ as te,c as D,o as E,j as U,f as O,k,n as p,V as e,t as ne,p as M,w as m,e as _,bq as re,cB as ie,W as j,a9 as G,X as J,d_ as de,d$ as ce,N as W,cW as ue,dL as fe,cb as Z,r as w,e0 as ve,e1 as ye,dD as pe,bX as Q,e2 as me,ad as ge,bd as be,aO as Ce,dW as X,cl as he,bP as ke,cY as we,S as De,bk as Ee,d as Be,a6 as Ie,dT as Te,b6 as Se,a2 as Ae,bU as Fe,dQ as Pe,a5 as $e}from"./id-ebd2aa87.js";import{u as Le,a as Re,E as Oe,b as Me}from"./index-8a1cff73.js";import{U as H}from"./event-9519ab40.js";const x=Symbol("dialogInjectionKey"),ee=Y({center:Boolean,alignCenter:Boolean,closeIcon:{type:ae},draggable:Boolean,overflow:Boolean,fullscreen:Boolean,showClose:{type:Boolean,default:!0},title:{type:String,default:""},ariaLevel:{type:String,default:"2"}}),Ne={close:()=>!0},ze=N({name:"ElDialogContent"}),Ve=N({...ze,props:ee,emits:Ne,setup(o,{expose:d}){const t=o,{t:F}=se(),{Close:n}=de,{dialogRef:f,headerRef:g,bodyId:b,ns:a,style:r}=K(x),{focusTrapRef:v}=K(te),y=D(()=>[a.b(),a.is("fullscreen",t.fullscreen),a.is("draggable",t.draggable),a.is("align-center",t.alignCenter),{[a.m("center")]:t.center}]),C=ce(v,f),c=D(()=>t.draggable),u=D(()=>t.overflow),{resetPosition:B}=Le(f,g,c,u);return d({resetPosition:B}),(s,P)=>(E(),U("div",{ref:e(C),class:p(e(y)),style:G(e(r)),tabindex:"-1"},[O("header",{ref_key:"headerRef",ref:g,class:p([e(a).e("header"),{"show-close":s.showClose}])},[k(s.$slots,"header",{},()=>[O("span",{role:"heading","aria-level":s.ariaLevel,class:p(e(a).e("title"))},ne(s.title),11,["aria-level"])]),s.showClose?(E(),U("button",{key:0,"aria-label":e(F)("el.dialog.close"),class:p(e(a).e("headerbtn")),type:"button",onClick:I=>s.$emit("close")},[M(e(ie),{class:p(e(a).e("close"))},{default:m(()=>[(E(),_(re(s.closeIcon||e(n))))]),_:1},8,["class"])],10,["aria-label","onClick"])):j("v-if",!0)],2),O("div",{id:e(b),class:p(e(a).e("body"))},[k(s.$slots,"default")],10,["id"]),s.$slots.footer?(E(),U("footer",{key:0,class:p(e(a).e("footer"))},[k(s.$slots,"footer")],2)):j("v-if",!0)],6))}});var Ue=J(Ve,[["__file","dialog-content.vue"]]);const _e=Y({...ee,appendToBody:Boolean,appendTo:{type:W([String,Object]),default:"body"},beforeClose:{type:W(Function)},destroyOnClose:Boolean,closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:Boolean,modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:Boolean,headerAriaLevel:{type:String,default:"2"}}),je={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[H]:o=>ue(o),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},qe=(o,d)=>{var t;const n=Ce().emit,{nextZIndex:f}=fe();let g="";const b=Z(),a=Z(),r=w(!1),v=w(!1),y=w(!1),C=w((t=o.zIndex)!=null?t:f());let c,u;const B=ve("namespace",ye),s=D(()=>{const i={},h=`--${B.value}-dialog`;return o.fullscreen||(o.top&&(i[`${h}-margin-top`]=o.top),o.width&&(i[`${h}-width`]=pe(o.width))),i}),P=D(()=>o.alignCenter?{display:"flex"}:{});function I(){n("opened")}function z(){n("closed"),n(H,!1),o.destroyOnClose&&(y.value=!1)}function V(){n("close")}function $(){u==null||u(),c==null||c(),o.openDelay&&o.openDelay>0?{stop:c}=X(()=>L(),o.openDelay):L()}function T(){c==null||c(),u==null||u(),o.closeDelay&&o.closeDelay>0?{stop:u}=X(()=>R(),o.closeDelay):R()}function S(){function i(h){h||(v.value=!0,r.value=!1)}o.beforeClose?o.beforeClose(i):T()}function A(){o.closeOnClickModal&&S()}function L(){he&&(r.value=!0)}function R(){r.value=!1}function l(){n("openAutoFocus")}function q(){n("closeAutoFocus")}function oe(i){var h;((h=i.detail)==null?void 0:h.focusReason)==="pointer"&&i.preventDefault()}o.lockScroll&&Re(r);function le(){o.closeOnPressEscape&&S()}return Q(()=>o.modelValue,i=>{i?(v.value=!1,$(),y.value=!0,C.value=me(o.zIndex)?f():C.value++,ge(()=>{n("open"),d.value&&(d.value.scrollTop=0)})):r.value&&T()}),Q(()=>o.fullscreen,i=>{d.value&&(i?(g=d.value.style.transform,d.value.style.transform=""):d.value.style.transform=g)}),be(()=>{o.modelValue&&(r.value=!0,y.value=!0,$())}),{afterEnter:I,afterLeave:z,beforeLeave:V,handleClose:S,onModalClick:A,close:T,doClose:R,onOpenAutoFocus:l,onCloseAutoFocus:q,onCloseRequested:le,onFocusoutPrevented:oe,titleId:b,bodyId:a,closed:v,style:s,overlayDialogStyle:P,rendered:y,visible:r,zIndex:C}},Ke=N({name:"ElDialog",inheritAttrs:!1}),We=N({...Ke,props:_e,emits:je,setup(o,{expose:d}){const t=o,F=ke();we({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},D(()=>!!F.title));const n=De("dialog"),f=w(),g=w(),b=w(),{visible:a,titleId:r,bodyId:v,style:y,overlayDialogStyle:C,rendered:c,zIndex:u,afterEnter:B,afterLeave:s,beforeLeave:P,handleClose:I,onModalClick:z,onOpenAutoFocus:V,onCloseAutoFocus:$,onCloseRequested:T,onFocusoutPrevented:S}=qe(t,f);Ee(x,{dialogRef:f,headerRef:g,bodyId:v,ns:n,rendered:c,style:y});const A=Me(z),L=D(()=>t.draggable&&!t.fullscreen);return d({visible:a,dialogContentRef:b,resetPosition:()=>{var l;(l=b.value)==null||l.resetPosition()}}),(l,q)=>(E(),_(e(Pe),{to:l.appendTo,disabled:l.appendTo!=="body"?!1:!l.appendToBody},{default:m(()=>[M(Be,{name:"dialog-fade",onAfterEnter:e(B),onAfterLeave:e(s),onBeforeLeave:e(P),persisted:""},{default:m(()=>[Ie(M(e(Oe),{"custom-mask-event":"",mask:l.modal,"overlay-class":l.modalClass,"z-index":e(u)},{default:m(()=>[O("div",{role:"dialog","aria-modal":"true","aria-label":l.title||void 0,"aria-labelledby":l.title?void 0:e(r),"aria-describedby":e(v),class:p(`${e(n).namespace.value}-overlay-dialog`),style:G(e(C)),onClick:e(A).onClick,onMousedown:e(A).onMousedown,onMouseup:e(A).onMouseup},[M(e(Te),{loop:"",trapped:e(a),"focus-start-el":"container",onFocusAfterTrapped:e(V),onFocusAfterReleased:e($),onFocusoutPrevented:e(S),onReleaseRequested:e(T)},{default:m(()=>[e(c)?(E(),_(Ue,Se({key:0,ref_key:"dialogContentRef",ref:b},l.$attrs,{center:l.center,"align-center":l.alignCenter,"close-icon":l.closeIcon,draggable:e(L),overflow:l.overflow,fullscreen:l.fullscreen,"show-close":l.showClose,title:l.title,"aria-level":l.headerAriaLevel,onClose:e(I)}),Ae({header:m(()=>[l.$slots.title?k(l.$slots,"title",{key:1}):k(l.$slots,"header",{key:0,close:e(I),titleId:e(r),titleClass:e(n).e("title")})]),default:m(()=>[k(l.$slots,"default")]),_:2},[l.$slots.footer?{name:"footer",fn:m(()=>[k(l.$slots,"footer")])}:void 0]),1040,["center","align-center","close-icon","draggable","overflow","fullscreen","show-close","title","aria-level","onClose"])):j("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,["aria-label","aria-labelledby","aria-describedby","onClick","onMousedown","onMouseup"])]),_:3},8,["mask","overlay-class","z-index"]),[[Fe,e(a)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])]),_:3},8,["to","disabled"]))}});var Ze=J(We,[["__file","dialog.vue"]]);const Ge=$e(Ze);export{Ge as E};
