var M=Object.defineProperty;var B=(r,e,t)=>e in r?M(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var w=(r,e,t)=>(B(r,typeof e!="symbol"?e+"":e,t),t);import{_ as A}from"./nuxt-link.8299fcb0.js";import{ac as V,aa as z,r as d,ad as L,f as E,a as P,ae as F,z as T,P as H,o as f,e as g,j as x,F as D,B as N,u as b,m as _,w as $,C as G,A as I,s as W,k as j}from"./entry.e4a41ace.js";import{b as q,c as O}from"./index.e994bc95.js";import{_ as U}from"./client-only.0c70a250.js";import{_ as X}from"./Footer.c4ea7b74.js";import{_ as Y}from"./_plugin-vue_export-helper.c27b6911.js";const J=()=>V("color-mode").value,K=z("app",()=>{const r=d(!1),e=d(L),t=E(()=>r.value?e.value.dark:e.value.light);return{isDark:r,currentTheme:t}}),Q=x("div",{class:"i-carbon-sun dark:i-carbon-moon"},null,-1),Z=[Q],tt=P({__name:"DarkToggle",setup(r){const e=J();F({meta:[{id:"theme-color",name:"theme-color",content:()=>e.value==="dark"?"#222222":"#ffffff"}]});const t=d(!1),n=d(a=>{}),o=K();T(()=>{t.value=document.documentElement.classList.contains("dark");const a=document.startViewTransition&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches;function p(){const l=window.matchMedia("(prefers-color-scheme: dark)"),k=document.documentElement.classList;let i=e.value,c=e.preference==="dark"&&i==null||(i==="auto"||i==null?l.matches:i==="dark");l.onchange=h=>{i==="auto"&&v(c=h.matches)};function m(h){if(!a){v(c=!c),i=c?l.matches?"auto":"dark":l.matches?"light":"auto",e.preference=i;return}h.clientX,h.clientY,document.startViewTransition(()=>{v(c=!c),i=c?l.matches?"auto":"dark":l.matches?"light":"auto",e.preference=i}).ready.then(()=>{const S=["polygon(0 0, 50% 50%, 100% 100%, 50% 50%)","polygon(0 0, 0 100%, 100% 100%, 100% 0)"];document.documentElement.animate({clipPath:c?S:[...S].reverse()},{duration:500,easing:"ease-in-out",pseudoElement:c?"::view-transition-new(root)":"::view-transition-old(root)"})})}function v(h){const u=document.createElement("style");u.appendChild(document.createTextNode(`:not(.VPSwitchAppearance):not(.VPSwitchAppearance *) {
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -o-transition: none !important;
    -ms-transition: none !important;
    transition: none !important;
  }`)),document.head.appendChild(u),t.value=h,k[h?"add":"remove"]("dark"),window.getComputedStyle(u).opacity,document.head.removeChild(u)}return m}n.value=p()}),H(t,a=>{e.preference=a?"dark":"light",o.isDark=a});function s(a){var p;(p=n.value)==null||p.call(n,a)}return(a,p)=>(f(),g("button",{class:"!outline-none",onClick:s},Z))}});const et={"w-full":"",flex:"","items-center":"","px-5":"","py-2":""},st={"ml-auto":"",flex:"","gap-x-5":""},nt=P({__name:"Header",setup(r){const e=d([{name:"博客",path:"/blog"}]);return(t,n)=>{const o=A,s=tt;return f(),g("div",et,[x("div",st,[(f(!0),g(D,null,N(b(e),a=>(f(),g("div",{key:a.path},[_(o,{to:a.path,"active-class":"!c-$bl-main",class:"c-$bl-title"},{default:$(()=>[G(I(a.name),1)]),_:2},1032,["to"])]))),128)),_(s)])])}}});d(()=>{});const R=Math.PI,y=R/2,C=y/6;class ot{constructor(e={length:10,minBranch:50,color:"#99999920",fps:25},t=[],n=[],o=performance.now(),s=null,a=!1){w(this,"context2D");w(this,"canvas");w(this,"size");this.opts=e,this.steps=t,this.prevSteps=n,this.lastExecutedTime=o,this.pauseableController=s,this.stopped=a}polar2cart(e=0,t=0,n=0,o=0){const s=n*Math.cos(o),a=n*Math.sin(o);return[e+s,t+a]}init(){if(!this.canvas||!this.size)return;const{size:e}=this,t=this.canvas.getContext("2d"),n=window.devicePixelRatio||1,o=t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||t.backingStorePixelRatio||1,s=n/o;this.canvas.style.width=`${e.width}px`,this.canvas.style.height=`${e.height}px`,this.canvas.width=s*e.width,this.canvas.height=s*e.height,t.scale(s,s),this.context2D=t,this.pauseableController=q(this.frame.bind(this),{immediate:!1})}getRandomPos(){return Math.random()*.6+.2}step(e,t,n,o={value:0}){const{random:s}=Math,{minBranch:a,length:p}=this.opts,{size:l}=this,k=s()*p;o.value+=1;const[i,c]=this.polar2cart(e,t,k,n),m=this.context2D;m.beginPath(),m.moveTo(e,t),m.lineTo(i,c),m.stroke();const v=n+s()*C,h=n-s()*C;if(!l||i<-100||i>l.width+100||c<-100||c>l.height+100)return;const u=o.value<=a?.8:.5;s()<u&&this.steps.push(()=>this.step(i,c,v,o)),s()<u&&this.steps.push(()=>this.step(i,c,h,o))}frame(){var e;performance.now()-this.lastExecutedTime<this.opts.fps||(this.prevSteps=this.steps,this.steps=[],this.lastExecutedTime=performance.now(),this.prevSteps.length||((e=this.pauseableController)==null||e.pause(),this.stopped=!0),this.prevSteps.forEach(t=>{Math.random()<.5?this.steps.push(t):t()}))}start(e,t={width:600,height:600}){var o,s;this.canvas=e,this.size=t,this.init(),(o=this.pauseableController)==null||o.pause();const n=this.context2D;n.clearRect(0,0,this.canvas.width,this.canvas.height),n.lineWidth=1,n.strokeStyle=this.opts.color,this.prevSteps=[],this.steps=[()=>this.step(this.getRandomPos()*t.width,-5,y),()=>this.step(this.getRandomPos()*t.width,t.height+5,-y),()=>this.step(-5,this.getRandomPos()*t.height,0),()=>this.step(t.width+5,this.getRandomPos()*t.height,R)],(s=this.pauseableController)==null||s.resume(),this.stopped=!1}}const at=P({__name:"Plum",setup(r){const e=d(null),t=d(new ot),{width:n,height:o}=O();T(()=>{t.value.start(e.value,{width:n.value,height:o.value})});const s=E(()=>"radial-gradient(circle, transparent, black);");return(a,p)=>(f(),g("div",{class:"pointer-events-none fixed bottom-0 left-0 right-0 top-0",style:W([{"z-index":"-1"},`mask-image: ${b(s)};--webkit-mask-image: ${b(s)};`])},[x("canvas",{ref_key:"el",ref:e,width:"400",height:"400"},null,512)],4))}}),it={},ct={style:{height:"calc(100vh - 176px - 40px)"},"overflow-hidden":"","py-20":""},rt={"m-auto":"","h-full":"","max-w100ch":""};function lt(r,e){const t=nt,n=at,o=U,s=X;return f(),g(D,null,[_(t),x("main",ct,[x("div",rt,[j(r.$slots,"default"),_(o,null,{default:$(()=>[_(n,{"pointer-events-none":"",absolute:"","bottom-0":"","left-0":"","right-0":"","top-0":"","z-100":""})]),_:1})])]),_(s)],64)}const gt=Y(it,[["render",lt]]);export{gt as default};
