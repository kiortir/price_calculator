(function(e){function t(t){for(var r,c,i=t[0],s=t[1],u=t[2],d=0,f=[];d<i.length;d++)c=i[d],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&f.push(n[c][0]),n[c]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(t);while(f.length)f.shift()();return o.push.apply(o,u||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],r=!0,i=1;i<a.length;i++){var s=a[i];0!==n[s]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=a[0]))}return e}var r={},n={app:0},o=[];function c(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.m=e,c.c=r,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(a,r,function(t){return e[t]}.bind(null,r));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/static/src/graph/dist/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=s;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d"),a("ac1f"),a("1276"),a("498a");var r=a("f2bf"),n={class:"mt-3"},o={class:"qz-block"},c=Object(r["createElementVNode"])("div",{class:"h3"},"Кварцевый агломерат",-1),i={class:"mb-3"},s=Object(r["createElementVNode"])("label",{for:"qz_spec",class:"form-label"},"Число мастеров",-1),u={id:"chart",class:"apex"},l={class:"ac-block"},d=Object(r["createElementVNode"])("div",{class:"h3"},"Акриловый камень",-1),f={class:"mb-3"},p=Object(r["createElementVNode"])("label",{for:"ac_spec",class:"form-label"},"Число мастеров",-1),h={id:"chart",class:"apex"};function m(e,t,a,m,b,v){var _=Object(r["resolveComponent"])("apexchart");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",n,[Object(r["createElementVNode"])("div",o,[c,Object(r["createElementVNode"])("div",i,[s,Object(r["withDirectives"])(Object(r["createElementVNode"])("input",{type:"number",class:"form-control",id:"qz_spec","onUpdate:modelValue":t[0]||(t[0]=function(e){return b.qz_specialists=e}),onInput:t[1]||(t[1]=function(){return v.setQzData&&v.setQzData.apply(v,arguments)}),onChange:t[2]||(t[2]=function(e){return v.updateCount("qz_specialists",e.target.value)})},null,544),[[r["vModelText"],b.qz_specialists,void 0,{number:!0}]])]),Object(r["createElementVNode"])("div",u,[Object(r["createVNode"])(_,{ref:"realtimeQzChart",height:600,options:b.chartOptions,series:b.series,onClick:v.clickHandler},null,8,["options","series","onClick"])])]),Object(r["createElementVNode"])("div",l,[d,Object(r["createElementVNode"])("div",f,[p,Object(r["withDirectives"])(Object(r["createElementVNode"])("input",{type:"number",class:"form-control",id:"ac_spec","onUpdate:modelValue":t[3]||(t[3]=function(e){return b.acryl_specialists=e}),onInput:t[4]||(t[4]=function(){return v.setAcData&&v.setAcData.apply(v,arguments)}),onChange:t[5]||(t[5]=function(e){return v.updateCount("acryl_specialists",e.target.value)})},null,544),[[r["vModelText"],b.acryl_specialists,void 0,{number:!0}]])]),Object(r["createElementVNode"])("div",h,[Object(r["createVNode"])(_,{ref:"realtimeAcChart",height:600,options:b.chartOptions,series:b.series,onClick:v.clickHandler},null,8,["options","series","onClick"])])])])}var b=a("ade3"),v=a("b85c"),_=a("2909"),y=a("1da1");a("96cf"),a("99af"),a("b0c0"),a("d3b7"),a("159b"),a("a9e3"),a("5319"),a("4e82"),a("3ca3"),a("ddb0"),a("caad"),a("2532"),a("d81d"),a("820e"),a("b64b");Date.prototype.addDays=function(e){var t=new Date(this.valueOf()).getTime();return new Date(t+864e5*e)};var g={name:"app",data:function(){return{dealdata:[],dayoffs:[],status:null,updating:!1,qz_specialists:5,acryl_specialists:5,series:[],pollInterval:null,chartOptions:{noData:{text:"Загрузка..."},chart:{locales:[{name:"ru",options:{months:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],shortMonths:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],days:["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],shortDays:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],toolbar:{exportToSVG:"Сохранить как SVG",exportToPNG:"Сохранить как  PNG",menu:"Меню",selection:"Выбранная область",selectionZoom:"Приблизить выбранную область",zoomIn:"Приблизить",zoomOut:"Отдалить",pan:"Панорамировать",reset:"Сбросить зум"}}}],type:"rangeBar",defaultLocale:"ru"},plotOptions:{bar:{horizontal:!0,barHeight:"50%",rangeBarGroupRows:!0}},colors:["#008FFB","#00E396","#FEB019","#FF4560","#775DD0","#3F51B5","#546E7A","#D4526E","#8D5B4C","#F86624","#D7263D","#1B998B","#2E294E","#F46036","#E2C044"],fill:{type:"solid"},tooltip:{enabled:!0,y:{formatter:function(e,t){var a=t.seriesIndex,r=t.w,n=r.config.series[a].data[0],o=n.work_start_date,c="<div>Дата заключения: ".concat(new Date(n.contract_start_date).toLocaleDateString(),"</div>").concat(o>0?"<div>Дата передачи в производство: ".concat(new Date(o).toLocaleDateString(),"</div>"):"");return console.log(c),c},title:{formatter:function(e){return e}}}},annotations:{xaxis:[{x:(new Date).getTime(),strokeDashArray:0,borderColor:"#ff0000"}]},dataLabels:{enabled:!0,formatter:function(e,t){var a=t.seriesIndex,r=t.w;return r.config.series[a].name},textAnchor:"middle",style:{fontSize:"0.6em"},distributed:!1,offsetX:0,offsetY:0},xaxis:{type:"datetime"},legend:{show:!1},grid:{xaxis:{lines:{show:!0}}}}}},methods:{addBusyDays:function(e,t){for(var a=0;a<t;a++)e=e.addDays(1),this.isDayoff(e)&&t++;return e},deserializeDayoffs:function(e){return Object(y["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=[],e.data.months.forEach((function(t){t.days.split(",").forEach((function(r){a.push(Date.UTC(e.data.year,t.month-1,Number(r.replace(/\D/g,""))))}))})),t.abrupt("return",a);case 3:case"end":return t.stop()}}),t)})))()},getLeads:function(){var e=this;return Object(y["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",e.axios.post("/amo/leads").then((function(t){var a=t.data.leads,r={in_progress:[],queue:[]},n={in_progress:[],queue:[]};a.forEach((function(e){"Акрил"==e.material?18033010==e.status_id?n.in_progress.push(e):n.queue.push(e):18033010==e.status_id?r.in_progress.push(e):r.queue.push(e)})),r.in_progress.sort((function(e,t){return e.work_start_date-t.work_start_date})),r.queue.sort((function(e,t){return e.contract_start_date-t.contract_start_date})),n.in_progress.sort((function(e,t){return e.work_start_date-t.work_start_date})),n.queue.sort((function(e,t){return e.contract_start_date-t.contract_start_date})),e.dealdata={qz:r,ac:n}})));case 1:case"end":return t.stop()}}),t)})))()},getDayoffs:function(){var e=this;return Object(y["a"])(regeneratorRuntime.mark((function t(){var a,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=function(){return e.axios.post("/pricelist/prox/",{url:"http://xmlcalendar.ru/data/ru/".concat((new Date).getFullYear()-1,"/calendar.json")}).then((function(t){return e.deserializeDayoffs(t)})).catch((function(){return[]}))},r=function(){return e.axios.post("/pricelist/prox/",{url:"http://xmlcalendar.ru/data/ru/".concat((new Date).getFullYear()+1,"/calendar.json")}).then((function(t){return e.deserializeDayoffs(t)})).catch((function(){return[]}))},n=function(){return e.axios.post("/pricelist/prox/",{url:"http://xmlcalendar.ru/data/ru/".concat((new Date).getFullYear(),"/calendar.json")}).then((function(t){return e.deserializeDayoffs(t)})).catch((function(){return[]}))},t.abrupt("return",Promise.all([a(),r(),n()]).then((function(t){e.dayoffs=[].concat.apply([],Object(_["a"])(t))})).then((function(){0==e.dayoffs.length&&alert("Ошибка! Обновите страницу")})));case 4:case"end":return t.stop()}}),t)})))()},clickHandler:function(e,t,a){e.ctrlKey&&window.open("https://unirock.amocrm.ru/leads/detail/"+a.config.series[a.seriesIndex].data[0].lead)},isDayoff:function(e){return e instanceof Date&&(e=e.getTime()),0!=this.dayoffs.length&&this.dayoffs.includes(e)},firstToFinish:function(e){var t=0,a=1/0;for(var r in e)e[r]<a&&(a=e[r],t=r);return{index:t,value:a}},setQzData:function(){var e=this;return Object(y["a"])(regeneratorRuntime.mark((function t(){var a,r,n,o,c,i,s,u,l,d,f,p,h,m,b,y;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=[],r=Object(_["a"])(Array(e.qz_specialists)).map((function(){return 0})),n=Object(v["a"])(e.dealdata.qz.in_progress);try{for(n.s();!(o=n.n()).done;)c=o.value,i=1e3*(c.work_start_date+10800),console.log(r),s=e.firstToFinish(r),9658==c.contract_number&&console.log({utc_start:i,first_to_finish:s,specialists:r}),u=i>s.value?i:s.value,l=e.addBusyDays(new Date(u),c.work_duration).getTime(),a.push({name:c.contract_number,data:[{lead:c.lead_id,contract_start_date:1e3*(c.contract_start_date+10800),work_start_date:i,x:"Мастер ".concat(s.index),y:[u,l]}]}),r[s.index]=l}catch(g){n.e(g)}finally{n.f()}d=Object(v["a"])(e.dealdata.qz.queue);try{for(d.s();!(f=d.n()).done;)p=f.value,h=1e3*(p.contract_start_date+10800),m=e.firstToFinish(r),b=h>m.value?h:m.value,y=e.addBusyDays(new Date(b),p.work_duration).getTime(),a.push({name:p.contract_number,data:[{lead:p.lead_id,contract_start_date:h,x:"Мастер ".concat(m.index),y:[b,y]}]}),r[m.index]=y}catch(g){d.e(g)}finally{d.f()}e.$refs.realtimeQzChart.updateSeries(a);case 7:case"end":return t.stop()}}),t)})))()},setAcData:function(){var e=this;return Object(y["a"])(regeneratorRuntime.mark((function t(){var a,r,n,o,c,i,s,u,l,d,f,p,h,m,b,y;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=[],r=Object(_["a"])(Array(e.acryl_specialists)).map((function(){return 0})),n=Object(v["a"])(e.dealdata.ac.in_progress);try{for(n.s();!(o=n.n()).done;)c=o.value,i=1e3*(c.work_start_date+10800),s=e.firstToFinish(r),u=i>s.value?i:s.value,l=e.addBusyDays(new Date(u),c.work_duration).getTime(),a.push({name:c.contract_number,data:[{lead:c.lead_id,contract_start_date:1e3*(c.contract_start_date+10800),work_start_date:i,x:"Мастер ".concat(s.index),y:[u,l]}]}),r[s.index]=l}catch(g){n.e(g)}finally{n.f()}d=Object(v["a"])(e.dealdata.ac.queue);try{for(d.s();!(f=d.n()).done;)p=f.value,h=1e3*(p.contract_start_date+10800),m=e.firstToFinish(r),b=h>m.value?h:m.value,y=e.addBusyDays(new Date(b),p.work_duration).getTime(),a.push({name:p.contract_number,data:[{lead:p.lead_id,contract_start_date:h,x:"Мастер ".concat(m.index),y:[b,y]}]}),r[m.index]=y}catch(g){d.e(g)}finally{d.f()}e.$refs.realtimeAcChart.updateSeries(a);case 7:case"end":return t.stop()}}),t)})))()},updateCount:function(e,t){this.axios.put("/production/updatecount",Object(b["a"])({},e,t))},updateGraph:function(){var e=this,t=function(){var t=Object(y["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){e.updating=!0,t()})));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Promise.allSettled([t(),this.getLeads()]).then((function(){Promise.all([e.setQzData(),e.setAcData()]).then((function(){e.updating=!1}))}))}},mounted:function(){var e=this;document.addEventListener("visibilitychange",(function(){"visible"!=document.visibilityState||e.updating||e.updateGraph()}));var t=function(){var t=Object(y["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){var a=JSON.parse(document.getElementById("specialists").textContent);Object.keys(a).forEach((function(r){e[r]=a[r],t()}))})));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Promise.allSettled([this.getLeads(),this.getDayoffs(),t()]).then((function(){Promise.all([e.setQzData(),e.setAcData()])})).then((function(){var t=e.updateGraph;e.pollInterval=setTimeout((function e(){t(),this.pollInterval=setTimeout(e,5e3)}),5e3)}))}},w=a("6b0d"),x=a.n(w);const D=x()(g,[["render",m]]);var O=D,j=a("bc3a"),k=a.n(j),z=a("130e"),E=a("ae27"),T=a.n(E);function C(e){var t=null;if(document.cookie&&""!==document.cookie)for(var a=document.cookie.split(";"),r=0;r<a.length;r++){var n=a[r].trim();if(n.substring(0,e.length+1)===e+"="){t=decodeURIComponent(n.substring(e.length+1));break}}return t}var q=C("csrftoken");k.a.defaults.headers.common={"X-CSRFToken":q};var N=Object(r["createApp"])(O);N.use(T.a),N.use(z["a"],k.a),N.mount("#app")}});