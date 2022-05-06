var I=Object.defineProperty;var z=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable;var N=(i,n,l)=>n in i?I(i,n,{enumerable:!0,configurable:!0,writable:!0,value:l}):i[n]=l,w=(i,n)=>{for(var l in n||(n={}))L.call(n,l)&&N(i,l,n[l]);if(z)for(var l of z(n))P.call(n,l)&&N(i,l,n[l]);return i};/* empty css    */import{u as Y,a as A}from"./vue-screen.esm.js";import{d as U,c as M,r as d,E as R,a as S,b as T,e as K,o as k,f as B,g as o,w as c,u as C,i as G,h as H,j as $,k as q,l as J,m as O,n as Q,p as W,q as X,s as r,F as Z,t as j,v as ee,x as V,y as te}from"./main.js";const ue={class:"flex items-center"},le=$("\u041F\u043E\u0438\u0441\u043A"),ae=U({props:{title:null,lead:null,dates:null},emits:["search","update"],setup(i,{emit:n}){const l=i,b=Y("tailwind"),p=M({get(){return l.dates},set(g){n("update",{field:"dates",value:g})}}),v=d(l.lead),_=d(),s=d(),D=/https:\/\/unirock.amocrm.ru\/leads\/detail\/\d{8}/gm,E=g=>{const a=D.exec(g),t=a?a[0]:null;t?(_.value.input.classList.remove("invalid-input"),v.value=t):_.value.input.classList.add("invalid-input")},y=d(l.title),F=()=>{n("search",{title:y.value,lead:v.value,dates:p.value})};return(g,a)=>{const t=R,u=S,m=T,f=q,x=K;return k(),B("div",ue,[o(x,{inline:C(b).md,class:"mx-auto w-fit","label-position":C(b).md?"left":"top"},{default:c(()=>[o(u,{label:"\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F",class:"w-fit mx-auto"},{default:c(()=>[o(t,{id:"toolbox-datepicker",modelValue:C(p),"onUpdate:modelValue":a[0]||(a[0]=e=>G(p)?p.value=e:null),type:"daterange","unlink-panels":"","start-placeholder":"\u041D\u0430\u0447\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u0430\u0442\u0430",format:"DD.MM.YYYY","end-placeholder":"\u041A\u043E\u043D\u0435\u0447\u043D\u0430\u044F \u0434\u0430\u0442\u0430"},null,8,["modelValue"])]),_:1}),o(u,{label:"\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043B\u0438\u0434"},{default:c(()=>[o(m,{modelValue:s.value,"onUpdate:modelValue":a[1]||(a[1]=e=>s.value=e),onKeyup:a[2]||(a[2]=H(e=>E(s.value),["enter"])),onBlur:a[3]||(a[3]=e=>E(s.value)),ref_key:"lead_input",ref:_},null,8,["modelValue"])]),_:1}),o(u,{label:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435"},{default:c(()=>[o(m,{modelValue:y.value,"onUpdate:modelValue":a[4]||(a[4]=e=>y.value=e)},null,8,["modelValue"])]),_:1}),o(u,null,{default:c(()=>[o(f,{type:"primary",onClick:a[5]||(a[5]=e=>F())},{default:c(()=>[le]),_:1})]),_:1})]),_:1},8,["inline","label-position"])])}}}),ne={class:"container mx-auto mt-10"},se={class:"flex flex-col gap-3 align-center w-full px-10"},oe={class:"card-header flex justify-between items-center"},ie=$(" \u041F\u0435\u0440\u0435\u0439\u0442\u0438 "),de={key:0},re=$("\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0439 \u043B\u0438\u0434: "),ce=["href"],pe={class:"mx-auto w-fit mt-3 mb-10"},fe=U({setup(i){const n=J(),l=O(),b=d([]),p=d(1),v=d(),_=d(10),s=d({title:"",dates:["",""],lead:""}),D=({page:t=1,limit:u=_.value,title:m="",dates:f=[],lead:x=""})=>{const e={page:t,limit:u,title:m,dates:f,lead:x};A.get("api/",{params:e}).then(h=>{l.replace({query:e}),v.value=t,s.value.dates=f,s.value.title=m,s.value.lead=x,b.value=h.data.estimations,p.value=h.data.total})};Q(()=>{v.value=parseInt(n.query.page),D(w({},n.query))});const E=t=>(t.first_name+t.last_name?" "+t.last_name:"")||t.username,y=t=>new Date(t).toLocaleString(),F=d(),g=t=>{F.value=t,l.push({name:"estimation",params:{id:t}})},a=t=>{const u=t.field;s.value[u]=t.value};return(t,u)=>{const m=q,f=W,x=X;return k(),B("div",ne,[o(ae,{title:s.value.title,lead:s.value.lead,dates:s.value.dates,onUpdate:u[0]||(u[0]=e=>a(e)),onSearch:u[1]||(u[1]=e=>D(w({},e)))},null,8,["title","lead","dates"]),r("div",se,[(k(!0),B(Z,null,j(b.value,e=>(k(),ee(f,{class:"box-card w-full"},{header:c(()=>[r("div",oe,[r("span",null,V(e.globals.title||`\u0420\u0430\u0441\u0447\u0435\u0442 #${e.globals.id}`),1),o(m,{class:"button",type:"text",onClick:h=>g(e.globals.id),loading:F.value===e.globals.id},{default:c(()=>[ie]),_:2},1032,["onClick","loading"])])]),default:c(()=>[r("div",null,[r("ul",null,[r("li",null,"\u0410\u0432\u0442\u043E\u0440: "+V(E(e.globals.created_by)),1),r("li",null,"\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F: "+V(y(e.globals.created_at)),1),e.globals.amo_lead_id?(k(),B("li",de,[re,r("a",{href:e.globals.amo_lead_id},V(e.globals.amo_lead_id),9,ce)])):te("",!0)])])]),_:2},1024))),256))]),r("div",pe,[o(x,{"page-size":_.value,"onUpdate:page-size":u[2]||(u[2]=e=>_.value=e),layout:"prev, pager, next, sizes","page-count":p.value,"current-page":v.value,onCurrentChange:u[3]||(u[3]=e=>D({page:e})),"page-sizes":[10,25,50,75],"hide-on-single-page":""},null,8,["page-size","page-count","current-page"])])])}}});export{fe as default};
