import{z as v,A as p,B as d,C as f}from"./main.js";var g=v.exports;var m=typeof window!="undefined",c=function(e,r){var t;return function(){var n=this,i=arguments,a=function(){t=null,e.apply(n,i)};clearTimeout(t),t=setTimeout(a,r)}},x={sm:"640px",md:"768px",lg:"1024px",xl:"1280px","2xl":1536},h={xs:"0px",sm:"480px",md:"768px",lg:"992px",xl:"1200px",xxl:"1400px"},w={mobile:0,tablet:769,desktop:1024,widescreen:1216,fullhd:1408},y={s:0,m:601,l:993,xl:1201},b={small:0,medium:640,large:1024},O={mobile:0,tablet:768,computer:992,large:1201},u={tailwind:x,bootstrap:h,bulma:w,materialize:y,foundation:b,semanticUi:O},E="tailwind",L=function(e){return Object.keys(e).reduce(function(r,t){return r[t]=!1,r},{breakpoint:""})},k=function(e){if(!u[e])throw new Error('Invalid grid type "'+e+'"');return u[e]},o=function(e,r){var t=Object.keys(r).filter(function(n){return!["breakpoint"].includes(n)&&typeof e[n]!="function"}).reverse().find(function(n){return r[n]});return t||""},l=function(e,r){Object.keys(e).filter(function(t){return typeof e[t]=="function"}).forEach(function(t){var n=e[t];r[t]=n.call(null,r)})},F=c(l,100),I=function(e,r){Object.keys(e).filter(function(t){return typeof e[t]!="function"}).forEach(function(t){var n=e[t];typeof n=="number"?n=n+"px":n=n.toString();var i=function(s){r[t]=s.matches,r.breakpoint=o(e,r),F(e,r)},a=window.matchMedia("(min-width: "+n+")");"addEventListener"in a?a.addEventListener("change",i):a.addListener(i),r[t]=a.matches,r.breakpoint=o(e,r),d()&&f(function(){"removeEventListener"in a?a.removeEventListener("change",i):a.removeListener(i)})}),l(e,r)};function B(e){e===void 0&&(e=E);var r;typeof e=="string"?r=k(e):r=Object.assign(e);var t=p(L(r));return m&&I(r,t),t}export{g as a,B as u};