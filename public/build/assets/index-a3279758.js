import{U as x,l as C,m as D,b as H,S as P,d as b}from"./_initCloneObject-eb6e072f.js";import{bS as q,bT as I,bg as K,bk as M,bh as B,aE as J,bB as Q}from"./id-3481afe5.js";var X="__lodash_hash_undefined__";function Y(n){return this.__data__.set(n,X),this}function Z(n){return this.__data__.has(n)}function L(n){var e=-1,r=n==null?0:n.length;for(this.__data__=new q;++e<r;)this.add(n[e])}L.prototype.add=L.prototype.push=Y;L.prototype.has=Z;function W(n,e){for(var r=-1,s=n==null?0:n.length;++r<s;)if(e(n[r],r,n))return!0;return!1}function z(n,e){return n.has(e)}var j=1,V=2;function N(n,e,r,s,t,a){var f=r&j,i=n.length,l=e.length;if(i!=l&&!(f&&l>i))return!1;var d=a.get(n),v=a.get(e);if(d&&v)return d==e&&v==n;var p=-1,u=!0,o=r&V?new L:void 0;for(a.set(n,e),a.set(e,n);++p<i;){var g=n[p],_=e[p];if(s)var c=f?s(_,g,p,e,n,a):s(g,_,p,n,e,a);if(c!==void 0){if(c)continue;u=!1;break}if(o){if(!W(e,function(T,E){if(!z(o,E)&&(g===T||t(g,T,r,s,a)))return o.push(E)})){u=!1;break}}else if(!(g===_||t(g,_,r,s,a))){u=!1;break}}return a.delete(n),a.delete(e),u}function k(n){var e=-1,r=Array(n.size);return n.forEach(function(s,t){r[++e]=[t,s]}),r}function nn(n){var e=-1,r=Array(n.size);return n.forEach(function(s){r[++e]=s}),r}var en=1,rn=2,an="[object Boolean]",sn="[object Date]",tn="[object Error]",fn="[object Map]",un="[object Number]",ln="[object RegExp]",dn="[object Set]",gn="[object String]",pn="[object Symbol]",vn="[object ArrayBuffer]",on="[object DataView]",m=I?I.prototype:void 0,R=m?m.valueOf:void 0;function _n(n,e,r,s,t,a,f){switch(r){case on:if(n.byteLength!=e.byteLength||n.byteOffset!=e.byteOffset)return!1;n=n.buffer,e=e.buffer;case vn:return!(n.byteLength!=e.byteLength||!a(new x(n),new x(e)));case an:case sn:case un:return K(+n,+e);case tn:return n.name==e.name&&n.message==e.message;case ln:case gn:return n==e+"";case fn:var i=k;case dn:var l=s&en;if(i||(i=nn),n.size!=e.size&&!l)return!1;var d=f.get(n);if(d)return d==e;s|=rn,f.set(n,e);var v=N(i(n),i(e),s,t,a,f);return f.delete(n),v;case pn:if(R)return R.call(n)==R.call(e)}return!1}var cn=1,An=Object.prototype,Tn=An.hasOwnProperty;function En(n,e,r,s,t,a){var f=r&cn,i=C(n),l=i.length,d=C(e),v=d.length;if(l!=v&&!f)return!1;for(var p=l;p--;){var u=i[p];if(!(f?u in e:Tn.call(e,u)))return!1}var o=a.get(n),g=a.get(e);if(o&&g)return o==e&&g==n;var _=!0;a.set(n,e),a.set(e,n);for(var c=f;++p<l;){u=i[p];var T=n[u],E=e[u];if(s)var S=f?s(E,T,u,e,n,a):s(T,E,u,n,e,a);if(!(S===void 0?T===E||t(T,E,r,s,a):S)){_=!1;break}c||(c=u=="constructor")}if(_&&!c){var y=n.constructor,O=e.constructor;y!=O&&"constructor"in n&&"constructor"in e&&!(typeof y=="function"&&y instanceof y&&typeof O=="function"&&O instanceof O)&&(_=!1)}return a.delete(n),a.delete(e),_}var yn=1,$="[object Arguments]",G="[object Array]",w="[object Object]",On=Object.prototype,U=On.hasOwnProperty;function wn(n,e,r,s,t,a){var f=M(n),i=M(e),l=f?G:D(n),d=i?G:D(e);l=l==$?w:l,d=d==$?w:d;var v=l==w,p=d==w,u=l==d;if(u&&H(n)){if(!H(e))return!1;f=!0,v=!1}if(u&&!v)return a||(a=new P),f||b(n)?N(n,e,r,s,t,a):_n(n,e,l,r,s,t,a);if(!(r&yn)){var o=v&&U.call(n,"__wrapped__"),g=p&&U.call(e,"__wrapped__");if(o||g){var _=o?n.value():n,c=g?e.value():e;return a||(a=new P),t(_,c,r,s,a)}}return u?(a||(a=new P),En(n,e,r,s,t,a)):!1}function h(n,e,r,s,t){return n===e?!0:n==null||e==null||!B(n)&&!B(e)?n!==n&&e!==e:wn(n,e,r,s,h,t)}function Rn(n,e){return h(n,e)}const A=new Map;if(J){let n;document.addEventListener("mousedown",e=>n=e),document.addEventListener("mouseup",e=>{if(n){for(const r of A.values())for(const{documentHandler:s}of r)s(e,n);n=void 0}})}function F(n,e){let r=[];return Array.isArray(e.arg)?r=e.arg:Q(e.arg)&&r.push(e.arg),function(s,t){const a=e.instance.popperRef,f=s.target,i=t==null?void 0:t.target,l=!e||!e.instance,d=!f||!i,v=n.contains(f)||n.contains(i),p=n===f,u=r.length&&r.some(g=>g==null?void 0:g.contains(f))||r.length&&r.includes(i),o=a&&(a.contains(f)||a.contains(i));l||d||v||p||u||o||e.value(s,t)}}const Sn={beforeMount(n,e){A.has(n)||A.set(n,[]),A.get(n).push({documentHandler:F(n,e),bindingFn:e.value})},updated(n,e){A.has(n)||A.set(n,[]);const r=A.get(n),s=r.findIndex(a=>a.bindingFn===e.oldValue),t={documentHandler:F(n,e),bindingFn:e.value};s>=0?r.splice(s,1,t):r.push(t)},unmounted(n){A.delete(n)}};export{Sn as C,L as S,h as b,z as c,Rn as i,nn as s};