import{u as U,W as G,X as J,f as L,h as X,z as B,K as N,y as Z,Y as Q,af as k,r as w,D,P as W,ag as ee}from"./entry.5d5c16c2.js";function x(e){return G()?(J(e),!0):!1}function p(e){return typeof e=="function"?e():U(e)}const te=typeof window<"u",S=()=>{};function Y(e,n){function t(...o){return new Promise((r,l)=>{Promise.resolve(e(()=>n.apply(this,o),{fn:n,thisArg:this,args:o})).then(r).catch(l)})}return t}function ne(e,n={}){let t,o,r=S;const l=i=>{clearTimeout(i),r(),r=S};return i=>{const f=p(e),a=p(n.maxWait);return t&&l(t),f<=0||a!==void 0&&a<=0?(o&&(l(o),o=null),Promise.resolve(i())):new Promise((u,d)=>{r=n.rejectOnCancel?d:u,a&&!o&&(o=setTimeout(()=>{t&&l(t),o=null,u(i())},a)),t=setTimeout(()=>{o&&l(o),o=null,u(i())},f)})}}function re(e,n=!0,t=!0,o=!1){let r=0,l,s=!0,i=S,f;const a=()=>{l&&(clearTimeout(l),l=void 0,i(),i=S)};return d=>{const m=p(e),g=Date.now()-r,b=()=>f=d();return a(),m<=0?(r=Date.now(),b()):(g>m&&(t||!s)?(r=Date.now(),b()):n&&(f=new Promise((v,h)=>{i=o?h:v,l=setTimeout(()=>{r=Date.now(),s=!0,v(b()),a()},Math.max(0,m-g))})),!t&&!l&&(l=setTimeout(()=>s=!0,m)),s=!1,f)}}function oe(...e){if(e.length!==1)return Z(...e);const n=e[0];return typeof n=="function"?Q(k(()=>({get:n,set:S}))):w(n)}function ie(e,n=200,t={}){return Y(ne(n,t),e)}function se(e,n=200,t=!1,o=!0,r=!1){return Y(re(n,t,o,r),e)}function le(e,n=!0){X()?B(e):n?e():N(e)}function ue(e){return Array.from(new Set(e))}function ae(e,n){return e.reduce((t,o)=>(t.some(r=>n(o,r,e))||t.push(o),t),[])}function Se(e,n){return L(()=>{const t=p(e).map(o=>p(o));return n?ae(t,n):ue(t)})}function ce(e){var n;const t=p(e);return(n=t==null?void 0:t.$el)!=null?n:t}const O=te?window:void 0;function M(...e){let n,t,o,r;if(typeof e[0]=="string"||Array.isArray(e[0])?([t,o,r]=e,n=O):[n,t,o,r]=e,!n)return S;Array.isArray(t)||(t=[t]),Array.isArray(o)||(o=[o]);const l=[],s=()=>{l.forEach(u=>u()),l.length=0},i=(u,d,m,g)=>(u.addEventListener(d,m,g),()=>u.removeEventListener(d,m,g)),f=W(()=>[ce(n),p(r)],([u,d])=>{s(),u&&l.push(...t.flatMap(m=>o.map(g=>i(u,m,g,d))))},{immediate:!0,flush:"post"}),a=()=>{f(),s()};return x(a),a}function fe(){const e=w(!1);return X()&&B(()=>{e.value=!0}),e}function de(e){const n=fe();return L(()=>(n.value,!!e()))}function Ee(e,n={}){const{immediate:t=!0,window:o=O}=n,r=w(!1);let l=0,s=null;function i(u){if(!r.value||!o)return;const d=u-l;e({delta:d,timestamp:u}),l=u,s=o.requestAnimationFrame(i)}function f(){!r.value&&o&&(r.value=!0,s=o.requestAnimationFrame(i))}function a(){r.value=!1,s!=null&&o&&(o.cancelAnimationFrame(s),s=null)}return t&&f(),x(a),{isActive:Q(r),pause:a,resume:f}}function me(e,n={}){const{window:t=O}=n,o=de(()=>t&&"matchMedia"in t&&typeof t.matchMedia=="function");let r;const l=w(!1),s=()=>{r&&("removeEventListener"in r?r.removeEventListener("change",i):r.removeListener(i))},i=()=>{o.value&&(s(),r=t.matchMedia(oe(e).value),l.value=!!(r!=null&&r.matches),r&&("addEventListener"in r?r.addEventListener("change",i):r.addListener(i)))};return ee(i),x(()=>s()),l}const q=1;function pe(e,n={}){const{throttle:t=0,idle:o=200,onStop:r=S,onScroll:l=S,offset:s={left:0,right:0,top:0,bottom:0},eventListenerOptions:i={capture:!1,passive:!0},behavior:f="auto"}=n,a=w(0),u=w(0),d=L({get(){return a.value},set(c){g(c,void 0)}}),m=L({get(){return u.value},set(c){g(void 0,c)}});function g(c,y){var T,A,_;const P=p(e);P&&((_=P instanceof Document?document.body:P)==null||_.scrollTo({top:(T=p(y))!=null?T:m.value,left:(A=p(c))!=null?A:d.value,behavior:p(f)}))}const b=w(!1),v=D({left:!0,right:!1,top:!0,bottom:!1}),h=D({left:!1,right:!1,top:!1,bottom:!1}),$=c=>{b.value&&(b.value=!1,h.left=!1,h.right=!1,h.top=!1,h.bottom=!1,r(c))},K=ie($,t+o),H=c=>{const y=c===document?c.documentElement:c,{display:T,flexDirection:A}=getComputedStyle(y),_=y.scrollLeft;h.left=_<a.value,h.right=_>a.value;const P=Math.abs(_)<=0+(s.left||0),I=Math.abs(_)+y.clientWidth>=y.scrollWidth-(s.right||0)-q;T==="flex"&&A==="row-reverse"?(v.left=I,v.right=P):(v.left=P,v.right=I),a.value=_;let E=y.scrollTop;c===document&&!E&&(E=document.body.scrollTop),h.top=E<u.value,h.bottom=E>u.value;const R=Math.abs(E)<=0+(s.top||0),j=Math.abs(E)+y.clientHeight>=y.scrollHeight-(s.bottom||0)-q;T==="flex"&&A==="column-reverse"?(v.top=j,v.bottom=R):(v.top=R,v.bottom=j),u.value=E},F=c=>{const y=c.target===document?c.target.documentElement:c.target;H(y),b.value=!0,K(c),l(c)};return M(e,"scroll",t?se(F,t,!0,!1):F,i),M(e,"scrollend",$,i),{x:d,y:m,isScrolling:b,arrivedState:v,directions:h,measure(){const c=p(e);c&&H(c)}}}var ve=Object.defineProperty,he=Object.defineProperties,ye=Object.getOwnPropertyDescriptors,C=Object.getOwnPropertySymbols,ge=Object.prototype.hasOwnProperty,we=Object.prototype.propertyIsEnumerable,V=(e,n,t)=>n in e?ve(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,z=(e,n)=>{for(var t in n||(n={}))ge.call(n,t)&&V(e,t,n[t]);if(C)for(var t of C(n))we.call(n,t)&&V(e,t,n[t]);return e},be=(e,n)=>he(e,ye(n));function Pe(e,n,t={}){var o;const{direction:r="bottom",interval:l=100}=t,s=D(pe(e,be(z({},t),{offset:z({[r]:(o=t.distance)!=null?o:0},t.offset)}))),i=w(),f=L(()=>!!i.value);function a(){s.measure();const u=p(e);if(!u)return;const d=r==="bottom"||r==="top"?u.scrollHeight<=u.clientHeight:u.scrollWidth<=u.clientWidth;(s.arrivedState[r]||d)&&(i.value||(i.value=Promise.all([n(s),new Promise(m=>setTimeout(m,l))]).finally(()=>{i.value=null,N(()=>a())})))}return W(()=>[s.arrivedState[r],p(e)],a,{immediate:!0}),{isLoading:f}}function Te(e={}){const{window:n=O,initialWidth:t=1/0,initialHeight:o=1/0,listenOrientation:r=!0,includeScrollbar:l=!0}=e,s=w(t),i=w(o),f=()=>{n&&(l?(s.value=n.innerWidth,i.value=n.innerHeight):(s.value=n.document.documentElement.clientWidth,i.value=n.document.documentElement.clientHeight))};if(f(),le(f),M("resize",f,{passive:!0}),r){const a=me("(orientation: portrait)");W(a,()=>f())}return{width:s,height:i}}export{Se as a,Ee as b,Te as c,Pe as u};