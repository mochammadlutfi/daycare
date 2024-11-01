import{L as x,aE as K,Q as g,R as L,an as I,aV as F,o as c,j as f,k as E,n as i,U as e,W as M,ao as Q,aM as X,r as N,aj as Y,at as ee,ar as se,c as o,a as te,V as _,f as h,a8 as D,e as C,w as b,aZ as ae,aU as B,p as T,cJ as ie,bQ as ne,t as V,K as U,a4 as re,b0 as le}from"./id-2e276a2e.js";import{C as A}from"./event-9519ab40.js";import{u as oe}from"./index-4b8929ed.js";const ce=x({space:{type:[Number,String],default:""},active:{type:Number,default:0},direction:{type:String,default:"horizontal",values:["horizontal","vertical"]},alignCenter:{type:Boolean},simple:{type:Boolean},finishStatus:{type:String,values:["wait","process","finish","error","success"],default:"finish"},processStatus:{type:String,values:["wait","process","finish","error","success"],default:"process"}}),ue={[A]:(m,S)=>[m,S].every(K)},pe=g({name:"ElSteps"}),ve=g({...pe,props:ce,emits:ue,setup(m,{emit:S}){const t=m,l=L("steps"),{children:v,addChild:u,removeChild:a}=oe(Q(),"ElStep");return I(v,()=>{v.value.forEach((n,r)=>{n.setIndex(r)})}),F("ElSteps",{props:t,steps:v,addStep:u,removeStep:a}),I(()=>t.active,(n,r)=>{S(A,n,r)}),(n,r)=>(c(),f("div",{class:i([e(l).b(),e(l).m(n.simple?"simple":n.direction)])},[E(n.$slots,"default")],2))}});var de=M(ve,[["__file","steps.vue"]]);const fe=x({title:{type:String,default:""},icon:{type:X},description:{type:String,default:""},status:{type:String,values:["","wait","process","finish","error","success"],default:""}}),me=g({name:"ElStep"}),Se=g({...me,props:fe,setup(m){const S=m,t=L("step"),l=N(-1),v=N({}),u=N(""),a=Y("ElSteps"),n=Q();ee(()=>{I([()=>a.props.active,()=>a.props.processStatus,()=>a.props.finishStatus],([s])=>{q(s)},{immediate:!0})}),se(()=>{a.removeStep(W.uid)});const r=o(()=>S.status||u.value),H=o(()=>{const s=a.steps.value[l.value-1];return s?s.currentStatus:"wait"}),w=o(()=>a.props.alignCenter),P=o(()=>a.props.direction==="vertical"),p=o(()=>a.props.simple),$=o(()=>a.steps.value.length),z=o(()=>{var s;return((s=a.steps.value[$.value-1])==null?void 0:s.uid)===(n==null?void 0:n.uid)}),y=o(()=>p.value?"":a.props.space),J=o(()=>[t.b(),t.is(p.value?"simple":a.props.direction),t.is("flex",z.value&&!y.value&&!w.value),t.is("center",w.value&&!P.value&&!p.value)]),O=o(()=>{const s={flexBasis:K(y.value)?`${y.value}px`:y.value?y.value:`${100/($.value-(w.value?0:1))}%`};return P.value||z.value&&(s.maxWidth=`${100/$.value}%`),s}),R=s=>{l.value=s},Z=s=>{const d=s==="wait",k={transitionDelay:`${d?"-":""}${150*l.value}ms`},j=s===a.props.processStatus||d?0:100;k.borderWidth=j&&!p.value?"1px":0,k[a.props.direction==="vertical"?"height":"width"]=`${j}%`,v.value=k},q=s=>{s>l.value?u.value=a.props.finishStatus:s===l.value&&H.value!=="error"?u.value=a.props.processStatus:u.value="wait";const d=a.steps.value[l.value-1];d&&d.calcProgress(u.value)},W=te({uid:n.uid,currentStatus:r,setIndex:R,calcProgress:Z});return a.addStep(W),(s,d)=>(c(),f("div",{style:D(e(O)),class:i(e(J))},[_(" icon & line "),h("div",{class:i([e(t).e("head"),e(t).is(e(r))])},[e(p)?_("v-if",!0):(c(),f("div",{key:0,class:i(e(t).e("line"))},[h("i",{class:i(e(t).e("line-inner")),style:D(v.value)},null,6)],2)),h("div",{class:i([e(t).e("icon"),e(t).is(s.icon||s.$slots.icon?"icon":"text")])},[E(s.$slots,"icon",{},()=>[s.icon?(c(),C(e(B),{key:0,class:i(e(t).e("icon-inner"))},{default:b(()=>[(c(),C(ae(s.icon)))]),_:1},8,["class"])):e(r)==="success"?(c(),C(e(B),{key:1,class:i([e(t).e("icon-inner"),e(t).is("status")])},{default:b(()=>[T(e(ie))]),_:1},8,["class"])):e(r)==="error"?(c(),C(e(B),{key:2,class:i([e(t).e("icon-inner"),e(t).is("status")])},{default:b(()=>[T(e(ne))]),_:1},8,["class"])):e(p)?_("v-if",!0):(c(),f("div",{key:3,class:i(e(t).e("icon-inner"))},V(l.value+1),3))])],2)],2),_(" title & description "),h("div",{class:i(e(t).e("main"))},[h("div",{class:i([e(t).e("title"),e(t).is(e(r))])},[E(s.$slots,"title",{},()=>[U(V(s.title),1)])],2),e(p)?(c(),f("div",{key:0,class:i(e(t).e("arrow"))},null,2)):(c(),f("div",{key:1,class:i([e(t).e("description"),e(t).is(e(r))])},[E(s.$slots,"description",{},()=>[U(V(s.description),1)])],2))],2)],6))}});var G=M(Se,[["__file","item.vue"]]);const Ce=re(de,{Step:G}),Ee=le(G);export{Ee as E,Ce as a};