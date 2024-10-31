import{bn as ke,L as Se,M as _e,W as Te,Q,O as Ce,R as q,aj as Pe,c as _,r as X,o as we,j as De,f as k,n as b,U as l,t as x,p as O,V as Re,y as R,X as F,aI as Ve,aV as Ae,bb as xe,a4 as Oe}from"./id-44e39273.js";import{b as Ie,u as Ee,d as Me,e as z,f as Ne,c as ye,t as Be,T as Fe,g as He,C as Ue}from"./panel-time-pick-f24324ab.js";import{b as je,i as Ke}from"./isArrayLikeObject-b43587b5.js";import{s as Z,S as Le,c as $e}from"./index-9f983416.js";import{b as Ge}from"./index-88bb1aa7.js";import{t as H}from"./_initCloneObject-24df7827.js";function We(){}function Ye(a){return a!==a}function qe(a,s,o){for(var i=o-1,d=a.length;++i<d;)if(a[i]===s)return i;return-1}function ze(a,s,o){return s===s?qe(a,s,o):Ge(a,Ye,o)}function Qe(a,s){var o=a==null?0:a.length;return!!o&&ze(a,s,0)>-1}function Xe(a,s,o){for(var i=-1,d=a==null?0:a.length;++i<d;)if(o(s,a[i]))return!0;return!1}var Ze=1/0,Je=H&&1/Z(new H([,-0]))[1]==Ze?function(a){return new H(a)}:We;const en=Je;var nn=200;function tn(a,s,o){var i=-1,d=Qe,v=a.length,t=!0,c=[],f=c;if(o)t=!1,d=Xe;else if(v>=nn){var T=s?null:en(a);if(T)return Z(T);t=!1,d=$e,f=new Le}else f=s?[]:c;e:for(;++i<v;){var g=a[i],S=s?s(g):g;if(g=o||g!==0?g:0,t&&S===S){for(var V=f.length;V--;)if(f[V]===S)continue e;s&&f.push(S),c.push(g)}else d(f,S,o)||(f!==c&&f.push(S),c.push(g))}return c}var an=je(function(a){return tn(ke(a,1,Ke,!0))});const U=an,sn=Se({...Ie,parsedValue:{type:_e(Array)}}),on=Q({__name:"panel-time-range",props:sn,emits:["pick","select-range","set-picker-option"],setup(a,{emit:s}){const o=a,i=(e,n)=>{const r=[];for(let u=e;u<=n;u++)r.push(u);return r},{t:d,lang:v}=Ce(),t=q("time"),c=q("picker"),f=Pe("EP_PICKER_BASE"),{arrowControl:T,disabledHours:g,disabledMinutes:S,disabledSeconds:V,defaultValue:I}=f.props,J=_(()=>[t.be("range-picker","body"),t.be("panel","content"),t.is("arrow",T),w.value?"has-seconds":""]),ee=_(()=>[t.be("range-picker","body"),t.be("panel","content"),t.is("arrow",T),w.value?"has-seconds":""]),C=_(()=>o.parsedValue[0]),P=_(()=>o.parsedValue[1]),ne=Ee(o),te=()=>{s("pick",ne.value,!1)},w=_(()=>o.format.includes("ss")),j=_(()=>o.format.includes("A")?"A":o.format.includes("a")?"a":""),ae=(e=!1)=>{s("pick",[C.value,P.value],e)},se=e=>{K(e.millisecond(0),P.value)},oe=e=>{K(C.value,e.millisecond(0))},le=e=>{const n=e.map(u=>R(u).locale(v.value)),r=$(n);return n[0].isSame(r[0])&&n[1].isSame(r[1])},K=(e,n)=>{s("pick",[e,n],!0)},re=_(()=>C.value>P.value),A=X([0,2]),ie=(e,n)=>{s("select-range",e,n,"min"),A.value=[e,n]},L=_(()=>w.value?11:8),ce=(e,n)=>{s("select-range",e,n,"max");const r=l(L);A.value=[e+r,n+r]},ue=e=>{const n=w.value?[0,3,6,11,14,17]:[0,3,8,11],r=["hours","minutes"].concat(w.value?["seconds"]:[]),p=(n.indexOf(A.value[0])+e+n.length)%n.length,m=n.length/2;p<m?y.start_emitSelectRange(r[p]):y.end_emitSelectRange(r[p-m])},de=e=>{const n=e.code,{left:r,right:u,up:p,down:m}=Ve;if([r,u].includes(n)){ue(n===r?-1:1),e.preventDefault();return}if([p,m].includes(n)){const h=n===p?-1:1,D=A.value[0]<L.value?"start":"end";y[`${D}_scrollDown`](h),e.preventDefault();return}},E=(e,n)=>{const r=g?g(e):[],u=e==="start",m=(n||(u?P.value:C.value)).hour(),h=u?i(m+1,23):i(0,m-1);return U(r,h)},M=(e,n,r)=>{const u=S?S(e,n):[],p=n==="start",m=r||(p?P.value:C.value),h=m.hour();if(e!==h)return u;const D=m.minute(),B=p?i(D+1,59):i(0,D-1);return U(u,B)},N=(e,n,r,u)=>{const p=V?V(e,n,r):[],m=r==="start",h=u||(m?P.value:C.value),D=h.hour(),B=h.minute();if(e!==D||n!==B)return p;const Y=h.second(),he=m?i(Y+1,59):i(0,Y-1);return U(p,he)},$=([e,n])=>[G(e,"start",!0,n),G(n,"end",!1,e)],{getAvailableHours:pe,getAvailableMinutes:me,getAvailableSeconds:fe}=Me(E,M,N),{timePickerOptions:y,getAvailableTime:G,onSetOption:W}=Ne({getAvailableHours:pe,getAvailableMinutes:me,getAvailableSeconds:fe}),be=e=>e?F(e)?e.map(n=>R(n,o.format).locale(v.value)):R(e,o.format).locale(v.value):null,ve=e=>e?F(e)?e.map(n=>n.format(o.format)):e.format(o.format):null,ge=()=>{if(F(I))return I.map(n=>R(n).locale(v.value));const e=R(I).locale(v.value);return[e,e.add(60,"m")]};return s("set-picker-option",["formatToString",ve]),s("set-picker-option",["parseUserInput",be]),s("set-picker-option",["isValidValue",le]),s("set-picker-option",["handleKeydownInput",de]),s("set-picker-option",["getDefaultValue",ge]),s("set-picker-option",["getRangeAvailableTime",$]),(e,n)=>e.actualVisible?(we(),De("div",{key:0,class:b([l(t).b("range-picker"),l(c).b("panel")])},[k("div",{class:b(l(t).be("range-picker","content"))},[k("div",{class:b(l(t).be("range-picker","cell"))},[k("div",{class:b(l(t).be("range-picker","header"))},x(l(d)("el.datepicker.startTime")),3),k("div",{class:b(l(J))},[O(z,{ref:"minSpinner",role:"start","show-seconds":l(w),"am-pm-mode":l(j),"arrow-control":l(T),"spinner-date":l(C),"disabled-hours":E,"disabled-minutes":M,"disabled-seconds":N,onChange:se,onSetOption:l(W),onSelectRange:ie},null,8,["show-seconds","am-pm-mode","arrow-control","spinner-date","onSetOption"])],2)],2),k("div",{class:b(l(t).be("range-picker","cell"))},[k("div",{class:b(l(t).be("range-picker","header"))},x(l(d)("el.datepicker.endTime")),3),k("div",{class:b(l(ee))},[O(z,{ref:"maxSpinner",role:"end","show-seconds":l(w),"am-pm-mode":l(j),"arrow-control":l(T),"spinner-date":l(P),"disabled-hours":E,"disabled-minutes":M,"disabled-seconds":N,onChange:oe,onSetOption:l(W),onSelectRange:ce},null,8,["show-seconds","am-pm-mode","arrow-control","spinner-date","onSetOption"])],2)],2)],2),k("div",{class:b(l(t).be("panel","footer"))},[k("button",{type:"button",class:b([l(t).be("panel","btn"),"cancel"]),onClick:r=>te()},x(l(d)("el.datepicker.cancel")),11,["onClick"]),k("button",{type:"button",class:b([l(t).be("panel","btn"),"confirm"]),disabled:l(re),onClick:r=>ae()},x(l(d)("el.datepicker.confirm")),11,["disabled","onClick"])],2)],2)):Re("v-if",!0)}});var ln=Te(on,[["__file","panel-time-range.vue"]]);R.extend(ye);var rn=Q({name:"ElTimePicker",install:null,props:{...Be,isRange:{type:Boolean,default:!1}},emits:["update:modelValue"],setup(a,s){const o=X(),[i,d]=a.isRange?["timerange",ln]:["time",Fe],v=t=>s.emit("update:modelValue",t);return Ae("ElPopperOptions",a.popperOptions),s.expose({focus:t=>{var c;(c=o.value)==null||c.handleFocusInput(t)},blur:t=>{var c;(c=o.value)==null||c.handleBlurInput(t)},handleOpen:()=>{var t;(t=o.value)==null||t.handleOpen()},handleClose:()=>{var t;(t=o.value)==null||t.handleClose()}}),()=>{var t;const c=(t=a.format)!=null?t:He;return O(Ue,xe(a,{ref:o,type:i,format:c,"onUpdate:modelValue":v}),{default:f=>O(d,f,null)})}}});const bn=Oe(rn);export{bn as E};