(function(e){function t(t){for(var c,l,a=t[0],i=t[1],u=t[2],b=0,d=[];b<a.length;b++)l=a[b],Object.prototype.hasOwnProperty.call(r,l)&&r[l]&&d.push(r[l][0]),r[l]=0;for(c in i)Object.prototype.hasOwnProperty.call(i,c)&&(e[c]=i[c]);s&&s(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],c=!0,a=1;a<n.length;a++){var i=n[a];0!==r[i]&&(c=!1)}c&&(o.splice(t--,1),e=l(l.s=n[0]))}return e}var c={},r={app:0},o=[];function l(t){if(c[t])return c[t].exports;var n=c[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=c,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)l.d(n,c,function(t){return e[t]}.bind(null,c));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/static/src/pricelist/dist/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],i=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var s=i;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var c=n("f2bf"),r={class:"container"};function o(e,t,n,o,l,a){var i=Object(c["j"])("default-pricelist-loader");return Object(c["h"])(),Object(c["d"])("div",r,[Object(c["g"])(i)])}n("b0c0");var l={class:"row row-cols-1 row-cols-lg-2"},a={class:"table table-sm table-striped table-hover"},i=Object(c["e"])("thead",null,[Object(c["e"])("tr",null,[Object(c["e"])("th",{scope:"col"},"Коллекция"),Object(c["e"])("th",{scope:"col"},"Цена")])],-1),u={class:"align-middle"},s={class:"table table-sm mb-0"},b={key:0},d={class:"text-end pe-2"},f=Object(c["e"])("sup",null,"2",-1);function O(e,t,n,r,o,O){return Object(c["h"])(),Object(c["d"])("div",l,[(Object(c["h"])(!0),Object(c["d"])(c["a"],null,Object(c["i"])(o.stonelist,(function(e){return Object(c["h"])(),Object(c["d"])("div",{class:"col",key:e.name},[Object(c["e"])("h3",null,Object(c["k"])(e.name),1),Object(c["e"])("table",a,[i,Object(c["e"])("tbody",null,[(Object(c["h"])(!0),Object(c["d"])(c["a"],null,Object(c["i"])(e.collections,(function(e){return Object(c["h"])(),Object(c["d"])("tr",{key:e.name},[Object(c["e"])("td",u,Object(c["k"])(e.name),1),Object(c["e"])("table",s,[Object(c["e"])("tbody",null,[(Object(c["h"])(!0),Object(c["d"])(c["a"],null,Object(c["i"])(e.configurations,(function(t){return Object(c["h"])(),Object(c["d"])("tr",{class:"fs-6",key:t.alias},[e.configurations.length>1?(Object(c["h"])(),Object(c["d"])("td",b,Object(c["k"])(t.alias)+" "+Object(c["k"])(t.thickness),1)):Object(c["c"])("",!0),Object(c["e"])("td",d,[Object(c["f"])(Object(c["k"])(t.price)+" руб/м",1),f])])})),128))])])])})),128))])])])})),128))])}var j={name:"DefaultPricelistLoader",data:function(){return{stonelist:null}},mounted:function(){var e=this;this.axios.get("/pricelist/acryl/default").then((function(t){e.stonelist=t.data})).catch((function(e){console.log(e)}))}},p=n("6b0d"),h=n.n(p);const v=h()(j,[["render",O]]);var y=v,g={name:"App",components:{DefaultPricelistLoader:y}};const m=h()(g,[["render",o]]);var k=m,w=n("bc3a"),P=n.n(w),x=n("130e"),_=Object(c["b"])(k);_.use(x["a"],P.a),_.mount("#app")}});
//# sourceMappingURL=app.js.map