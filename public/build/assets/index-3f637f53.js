import{U as x,l as C,m as D,b as H,S as P,d as q}from"./_initCloneObject-9c7c6a23.js";import{dh as K,di as I,cN as J,cR as M,cO as B,cl as Q,d1 as X}from"./id-1c1e2a8a.js";var Y="__lodash_hash_undefined__";function Z(n){return this.__data__.set(n,Y),this}function W(n){return this.__data__.has(n)}function L(n){var e=-1,r=n==null?0:n.length;for(this.__data__=new K;++e<r;)this.add(n[e])}L.prototype.add=L.prototype.push=Z;L.prototype.has=W;function b(n,e){for(var r=-1,s=n==null?0:n.length;++r<s;)if(e(n[r],r,n))return!0;return!1}function z(n,e){return n.has(e)}var j=1,V=2;function F(n,e,r,s,t,a){var f=r&j,i=n.length,l=e.length;if(i!=l&&!(f&&l>i))return!1;var d=a.get(n),v=a.get(e);if(d&&v)return d==e&&v==n;var p=-1,u=!0,c=r&V?new L:void 0;for(a.set(n,e),a.set(e,n);++p<i;){var g=n[p],o=e[p];if(s)var _=f?s(o,g,p,e,n,a):s(g,o,p,n,e,a);if(_!==void 0){if(_)continue;u=!1;break}if(c){if(!b(e,function(T,y){if(!z(c,y)&&(g===T||t(g,T,r,s,a)))return c.push(y)})){u=!1;break}}else if(!(g===o||t(g,o,r,s,a))){u=!1;break}}return a.delete(n),a.delete(e),u}function k(n){var e=-1,r=Array(n.size);return n.forEach(function(s,t){r[++e]=[t,s]}),r}function nn(n){var e=-1,r=Array(n.size);return n.forEach(function(s){r[++e]=s}),r}var en=1,rn=2,an="[object Boolean]",sn="[object Date]",tn="[object Error]",fn="[object Map]",un="[object Number]",ln="[object RegExp]",dn="[object Set]",gn="[object String]",pn="[object Symbol]",vn="[object ArrayBuffer]",cn="[object DataView]",m=I?I.prototype:void 0,R=m?m.valueOf:void 0;function on(n,e,r,s,t,a,f){switch(r){case cn:if(n.byteLength!=e.byteLength||n.byteOffset!=e.byteOffset)return!1;n=n.buffer,e=e.buffer;case vn:return!(n.byteLength!=e.byteLength||!a(new x(n),new x(e)));case an:case sn:case un:return J(+n,+e);case tn:return n.name==e.name&&n.message==e.message;case ln:case gn:return n==e+"";case fn:var i=k;case dn:var l=s&en;if(i||(i=nn),n.size!=e.size&&!l)return!1;var d=f.get(n);if(d)return d==e;s|=rn,f.set(n,e);var v=F(i(n),i(e),s,t,a,f);return f.delete(n),v;case pn:if(R)return R.call(n)==R.call(e)}return!1}var _n=1,An=Object.prototype,Tn=An.hasOwnProperty;function yn(n,e,r,s,t,a){var f=r&_n,i=C(n),l=i.length,d=C(e),v=d.length;if(l!=v&&!f)return!1;for(var p=l;p--;){var u=i[p];if(!(f?u in e:Tn.call(e,u)))return!1}var c=a.get(n),g=a.get(e);if(c&&g)return c==e&&g==n;var o=!0;a.set(n,e),a.set(e,n);for(var _=f;++p<l;){u=i[p];var T=n[u],y=e[u];if(s)var S=f?s(y,T,u,e,n,a):s(T,y,u,n,e,a);if(!(S===void 0?T===y||t(T,y,r,s,a):S)){o=!1;break}_||(_=u=="constructor")}if(o&&!_){var E=n.constructor,O=e.constructor;E!=O&&"constructor"in n&&"constructor"in e&&!(typeof E=="function"&&E instanceof E&&typeof O=="function"&&O instanceof O)&&(o=!1)}return a.delete(n),a.delete(e),o}var En=1,$="[object Arguments]",G="[object Array]",w="[object Object]",On=Object.prototype,N=On.hasOwnProperty;function wn(n,e,r,s,t,a){var f=M(n),i=M(e),l=f?G:D(n),d=i?G:D(e);l=l==$?w:l,d=d==$?w:d;var v=l==w,p=d==w,u=l==d;if(u&&H(n)){if(!H(e))return!1;f=!0,v=!1}if(u&&!v)return a||(a=new P),f||q(n)?F(n,e,r,s,t,a):on(n,e,l,r,s,t,a);if(!(r&En)){var c=v&&N.call(n,"__wrapped__"),g=p&&N.call(e,"__wrapped__");if(c||g){var o=c?n.value():n,_=g?e.value():e;return a||(a=new P),t(o,_,r,s,a)}}return u?(a||(a=new P),yn(n,e,r,s,t,a)):!1}function h(n,e,r,s,t){return n===e?!0:n==null||e==null||!B(n)&&!B(e)?n!==n&&e!==e:wn(n,e,r,s,h,t)}function Rn(n,e){return h(n,e)}const A=new Map;if(Q){let n;document.addEventListener("mousedown",e=>n=e),document.addEventListener("mouseup",e=>{if(n){for(const r of A.values())for(const{documentHandler:s}of r)s(e,n);n=void 0}})}function U(n,e){let r=[];return Array.isArray(e.arg)?r=e.arg:X(e.arg)&&r.push(e.arg),function(s,t){const a=e.instance.popperRef,f=s.target,i=t==null?void 0:t.target,l=!e||!e.instance,d=!f||!i,v=n.contains(f)||n.contains(i),p=n===f,u=r.length&&r.some(g=>g==null?void 0:g.contains(f))||r.length&&r.includes(i),c=a&&(a.contains(f)||a.contains(i));l||d||v||p||u||c||e.value(s,t)}}const Sn={beforeMount(n,e){A.has(n)||A.set(n,[]),A.get(n).push({documentHandler:U(n,e),bindingFn:e.value})},updated(n,e){A.has(n)||A.set(n,[]);const r=A.get(n),s=r.findIndex(a=>a.bindingFn===e.oldValue),t={documentHandler:U(n,e),bindingFn:e.value};s>=0?r.splice(s,1,t):r.push(t)},unmounted(n){A.delete(n)}};export{Sn as C,L as S,h as b,z as c,Rn as i,nn as s};
