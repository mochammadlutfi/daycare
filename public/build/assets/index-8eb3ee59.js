import{M as G,N as V,O as ee,y as C,Q as I,c as _,R as L,S as W,o as f,j as p,F as j,U as T,t as S,V as t,W as K,f as x,n as w,k as R,X as Q,r as te,Y as X,$ as A,p as P,w as O,a0 as Y,L as B,a1 as ae,a2 as z,a3 as U,a4 as H,e as ne,a5 as se}from"./id-97c9e5f5.js";import{r as $}from"./utils-d081b9ca.js";import{l as re,W as F}from"./localeData-5bb316e4.js";import{I as J,U as Z}from"./event-9519ab40.js";const oe=(e,o)=>{const d=e.subtract(1,"month").endOf("month").date();return $(o).map((c,i)=>d-(o-i-1))},le=e=>{const o=e.daysInMonth();return $(o).map((d,c)=>c+1)},ce=e=>$(e.length/7).map(o=>{const d=o*7;return e.slice(d,d+7)}),de=G({selectedDay:{type:V(Object)},range:{type:V(Array)},date:{type:V(Object),required:!0},hideHeader:{type:Boolean}}),ie={pick:e=>ee(e)},ue=(e,o)=>{C.extend(re);const d=C.localeData().firstDayOfWeek(),{t:c,lang:i}=I(),k=C().locale(i.value),y=_(()=>!!e.range&&!!e.range.length),v=_(()=>{let s=[];if(y.value){const[n,u]=e.range,m=$(u.date()-n.date()+1).map(r=>({text:n.date()+r,type:"current"}));let a=m.length%7;a=a===0?0:7-a;const l=$(a).map((r,D)=>({text:D+1,type:"next"}));s=m.concat(l)}else{const n=e.date.startOf("month").day(),u=oe(e.date,(n-d+7)%7).map(r=>({text:r,type:"prev"})),m=le(e.date).map(r=>({text:r,type:"current"}));s=[...u,...m];const a=7-(s.length%7||7),l=$(a).map((r,D)=>({text:D+1,type:"next"}));s=s.concat(l)}return ce(s)}),h=_(()=>{const s=d;return s===0?F.map(n=>c(`el.datepicker.weeks.${n}`)):F.slice(s).concat(F.slice(0,s)).map(n=>c(`el.datepicker.weeks.${n}`))}),M=(s,n)=>{switch(n){case"prev":return e.date.startOf("month").subtract(1,"month").date(s);case"next":return e.date.startOf("month").add(1,"month").date(s);case"current":return e.date.date(s)}};return{now:k,isInRange:y,rows:v,weekDays:h,getFormattedDate:M,handlePickDay:({text:s,type:n})=>{const u=M(s,n);o("pick",u)},getSlotData:({text:s,type:n})=>{const u=M(s,n);return{isSelected:u.isSame(e.selectedDay),type:`${n}-month`,day:u.format("YYYY-MM-DD"),date:u.toDate()}}}},me=L({name:"DateTable"}),ye=L({...me,props:de,emits:ie,setup(e,{expose:o,emit:d}){const c=e,{isInRange:i,now:k,rows:y,weekDays:v,getFormattedDate:h,handlePickDay:M,getSlotData:b}=ue(c,d),g=W("calendar-table"),s=W("calendar-day"),n=({text:u,type:m})=>{const a=[m];if(m==="current"){const l=h(u,m);l.isSame(c.selectedDay,"day")&&a.push(s.is("selected")),l.isSame(k,"day")&&a.push(s.is("today"))}return a};return o({getFormattedDate:h}),(u,m)=>(f(),p("table",{class:w([t(g).b(),t(g).is("range",t(i))]),cellspacing:"0",cellpadding:"0"},[u.hideHeader?K("v-if",!0):(f(),p("thead",{key:0},[(f(!0),p(j,null,T(t(v),a=>(f(),p("th",{key:a},S(a),1))),128))])),x("tbody",null,[(f(!0),p(j,null,T(t(y),(a,l)=>(f(),p("tr",{key:l,class:w({[t(g).e("row")]:!0,[t(g).em("row","hide-border")]:l===0&&u.hideHeader})},[(f(!0),p(j,null,T(a,(r,D)=>(f(),p("td",{key:D,class:w(n(r)),onClick:E=>t(M)(r)},[x("div",{class:w(t(s).b())},[R(u.$slots,"date-cell",{data:t(b)(r)},()=>[x("span",null,S(r.text),1)])],2)],10,["onClick"]))),128))],2))),128))])],2))}});var q=Q(ye,[["__file","date-table.vue"]]);const he=(e,o)=>{const d=e.endOf("month"),c=o.startOf("month"),k=d.isSame(c,"week")?c.add(1,"week"):c;return[[e,d],[k.startOf("week"),o]]},De=(e,o)=>{const d=e.endOf("month"),c=e.add(1,"month").startOf("month"),i=d.isSame(c,"week")?c.add(1,"week"):c,k=i.endOf("month"),y=o.startOf("month"),v=k.isSame(y,"week")?y.add(1,"week"):y;return[[e,d],[i.startOf("week"),k],[v.startOf("week"),o]]},fe=(e,o,d)=>{const{lang:c}=I(),i=te(),k=C().locale(c.value),y=_({get(){return e.modelValue?h.value:i.value},set(a){if(!a)return;i.value=a;const l=a.toDate();o(J,l),o(Z,l)}}),v=_(()=>{if(!e.range||!X(e.range)||e.range.length!==2||e.range.some(D=>!A(D)))return[];const a=e.range.map(D=>C(D).locale(c.value)),[l,r]=a;return l.isAfter(r)?[]:l.isSame(r,"month")?n(l,r):l.add(1,"month").month()!==r.month()?[]:n(l,r)}),h=_(()=>e.modelValue?C(e.modelValue).locale(c.value):y.value||(v.value.length?v.value[0][0]:k)),M=_(()=>h.value.subtract(1,"month").date(1)),b=_(()=>h.value.add(1,"month").date(1)),g=_(()=>h.value.subtract(1,"year").date(1)),s=_(()=>h.value.add(1,"year").date(1)),n=(a,l)=>{const r=a.startOf("week"),D=l.endOf("week"),E=r.get("month"),N=D.get("month");return E===N?[[r,D]]:(E+1)%12===N?he(r,D):E+2===N||(E+1)%11===N?De(r,D):[]},u=a=>{y.value=a};return{calculateValidatedDateRange:n,date:h,realSelectedDay:y,pickDay:u,selectDate:a=>{const r={"prev-month":M.value,"next-month":b.value,"prev-year":g.value,"next-year":s.value,today:k}[a];r.isSame(h.value,"day")||u(r)},validatedRange:v}},ke=e=>X(e)&&e.length===2&&e.every(o=>A(o)),ve=G({modelValue:{type:Date},range:{type:V(Array),validator:ke}}),ge={[Z]:e=>A(e),[J]:e=>A(e)},pe="ElCalendar",Me=L({name:pe}),_e=L({...Me,props:ve,emits:ge,setup(e,{expose:o,emit:d}){const c=e,i=W("calendar"),{calculateValidatedDateRange:k,date:y,pickDay:v,realSelectedDay:h,selectDate:M,validatedRange:b}=fe(c,d),{t:g}=I(),s=_(()=>{const n=`el.datepicker.month${y.value.format("M")}`;return`${y.value.year()} ${g("el.datepicker.year")} ${g(n)}`});return o({selectedDay:h,pickDay:v,selectDate:M,calculateValidatedDateRange:k}),(n,u)=>(f(),p("div",{class:w(t(i).b())},[x("div",{class:w(t(i).e("header"))},[R(n.$slots,"header",{date:t(s)},()=>[x("div",{class:w(t(i).e("title"))},S(t(s)),3),t(b).length===0?(f(),p("div",{key:0,class:w(t(i).e("button-group"))},[P(t(ae),null,{default:O(()=>[P(t(Y),{size:"small",onClick:m=>t(M)("prev-month")},{default:O(()=>[B(S(t(g)("el.datepicker.prevMonth")),1)]),_:1},8,["onClick"]),P(t(Y),{size:"small",onClick:m=>t(M)("today")},{default:O(()=>[B(S(t(g)("el.datepicker.today")),1)]),_:1},8,["onClick"]),P(t(Y),{size:"small",onClick:m=>t(M)("next-month")},{default:O(()=>[B(S(t(g)("el.datepicker.nextMonth")),1)]),_:1},8,["onClick"])]),_:1})],2)):K("v-if",!0)])],2),t(b).length===0?(f(),p("div",{key:0,class:w(t(i).e("body"))},[P(q,{date:t(y),"selected-day":t(h),onPick:t(v)},z({_:2},[n.$slots["date-cell"]?{name:"date-cell",fn:O(m=>[R(n.$slots,"date-cell",U(H(m)))])}:void 0]),1032,["date","selected-day","onPick"])],2)):(f(),p("div",{key:1,class:w(t(i).e("body"))},[(f(!0),p(j,null,T(t(b),(m,a)=>(f(),ne(q,{key:a,date:m[0],"selected-day":t(h),range:m,"hide-header":a!==0,onPick:t(v)},z({_:2},[n.$slots["date-cell"]?{name:"date-cell",fn:O(l=>[R(n.$slots,"date-cell",U(H(l)))])}:void 0]),1032,["date","selected-day","range","hide-header","onPick"]))),128))],2))],2))}});var we=Q(_e,[["__file","calendar.vue"]]);const $e=se(we);export{$e as E};
