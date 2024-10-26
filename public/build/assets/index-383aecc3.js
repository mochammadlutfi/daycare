import{L as V,M as E,Q as N,R as _,c as k,aa as A,aE as x,o as v,j as S,n as p,U as l,k as w,K as D,t as g,V as b,f as y,a8 as F,W as j,a4 as B,r as O,at as H,an as M,ar as P,e as R,a1 as L,S as U,w as z}from"./id-2e276a2e.js";import{C as G}from"./event-9519ab40.js";import{r as h,c as I}from"./raf-840075f3.js";const K=V({decimalSeparator:{type:String,default:"."},groupSeparator:{type:String,default:","},precision:{type:Number,default:0},formatter:Function,value:{type:E([Number,Object]),default:0},prefix:String,suffix:String,title:String,valueStyle:{type:E([String,Object,Array])}}),Q=N({name:"ElStatistic"}),W=N({...Q,props:K,setup(a,{expose:m}){const u=a,s=_("statistic"),r=k(()=>{const{value:e,formatter:f,precision:i,decimalSeparator:n,groupSeparator:c}=u;if(A(f))return f(e);if(!x(e)||Number.isNaN(e))return e;let[t,o=""]=String(e).split(".");return o=o.padEnd(i,"0").slice(0,i>0?i:0),t=t.replace(/\B(?=(\d{3})+(?!\d))/g,c),[t,o].join(o?n:"")});return m({displayValue:r}),(e,f)=>(v(),S("div",{class:p(l(s).b())},[e.$slots.title||e.title?(v(),S("div",{key:0,class:p(l(s).e("head"))},[w(e.$slots,"title",{},()=>[D(g(e.title),1)])],2)):b("v-if",!0),y("div",{class:p(l(s).e("content"))},[e.$slots.prefix||e.prefix?(v(),S("div",{key:0,class:p(l(s).e("prefix"))},[w(e.$slots,"prefix",{},()=>[y("span",null,g(e.prefix),1)])],2)):b("v-if",!0),y("span",{class:p(l(s).e("number")),style:F(e.valueStyle)},g(l(r)),7),e.$slots.suffix||e.suffix?(v(),S("div",{key:1,class:p(l(s).e("suffix"))},[w(e.$slots,"suffix",{},()=>[y("span",null,g(e.suffix),1)])],2)):b("v-if",!0)],2)],2))}});var Y=j(W,[["__file","statistic.vue"]]);const q=B(Y),J=V({format:{type:String,default:"HH:mm:ss"},prefix:String,suffix:String,title:String,value:{type:E([Number,Object]),default:0},valueStyle:{type:E([String,Object,Array])}}),X={finish:()=>!0,[G]:a=>x(a)},Z=[["Y",1e3*60*60*24*365],["M",1e3*60*60*24*30],["D",1e3*60*60*24],["H",1e3*60*60],["m",1e3*60],["s",1e3],["S",1]],T=a=>x(a)?new Date(a).getTime():a.valueOf(),C=(a,m)=>{let u=a;const s=/\[([^\]]*)]/g;return Z.reduce((e,[f,i])=>{const n=new RegExp(`${f}+(?![^\\[\\]]*\\])`,"g");if(n.test(e)){const c=Math.floor(u/i);return u-=c*i,e.replace(n,t=>String(c).padStart(t.length,"0"))}return e},m).replace(s,"$1")},ee=N({name:"ElCountdown"}),te=N({...ee,props:J,emits:X,setup(a,{expose:m,emit:u}){const s=a;let r;const e=O(0),f=k(()=>C(e.value,s.format)),i=t=>C(t,s.format),n=()=>{r&&(I(r),r=void 0)},c=()=>{const t=T(s.value),o=()=>{let d=t-Date.now();u("change",d),d<=0?(d=0,n(),u("finish")):r=h(o),e.value=d};r=h(o)};return H(()=>{e.value=T(s.value)-Date.now(),M(()=>[s.value,s.format],()=>{n(),c()},{immediate:!0})}),P(()=>{n()}),m({displayValue:f}),(t,o)=>(v(),R(l(q),{value:e.value,title:t.title,prefix:t.prefix,suffix:t.suffix,"value-style":t.valueStyle,formatter:i},L({_:2},[U(t.$slots,(d,$)=>({name:$,fn:z(()=>[w(t.$slots,$)])}))]),1032,["value","title","prefix","suffix","value-style"]))}});var se=j(te,[["__file","countdown.vue"]]);const ne=B(se);export{ne as E};
