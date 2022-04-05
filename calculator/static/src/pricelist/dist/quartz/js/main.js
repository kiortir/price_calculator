var Ce=Object.defineProperty;var oe=Object.getOwnPropertySymbols;var Me=Object.prototype.hasOwnProperty,Be=Object.prototype.propertyIsEnumerable;var le=(t,r,a)=>r in t?Ce(t,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[r]=a,W=(t,r)=>{for(var a in r||(r={}))Me.call(r,a)&&le(t,a,r[a]);if(oe)for(var a of oe(r))Be.call(r,a)&&le(t,a,r[a]);return t};import{d as I,u as q,r as A,c as F,o as s,a as u,b as e,w as P,v as de,e as o,i as M,f as z,g as b,F as B,h as D,T as fe,p as X,j as Z,n as T,t as g,k as _e,l as pe,m as xe,q as y,s as Q,_ as he,x as ve,y as ze,G as me,z as U,A as Ee,B as H,C as ge,D as Y,Q as ne,Y as De,K,E as Ae,H as je,I as Fe,J as Ie,L as J,M as Se,N as Te}from"./vendor.js";var ee=(t,r)=>{const a=t.__vccOpts||t;for(const[f,l]of r)a[f]=l;return a};const Oe=t=>(X("data-v-99d969e0"),t=t(),Z(),t),Ve={class:"flex-col flex gap-3 h-full"},Le={class:"search-tab w-full mt-4 relative px-2"},qe=Oe(()=>e("div",{class:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-auto"},[e("svg",{class:"absolute h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1)),He=["onClick"],Ne={class:"w-full"},Re={class:""},Ue=I({props:{tab:null},emits:["update"],setup(t,{emit:r}){const a=t,f=q();function l(c){r("update",c)}let i=A(""),v=F(()=>Object.values(f.state.manufacturers).filter(x=>x.name.toLowerCase().startsWith(i.value.toLowerCase())));return(c,m)=>(s(),u("div",Ve,[e("div",Le,[qe,P(e("input",{"onUpdate:modelValue":m[0]||(m[0]=x=>M(i)?i.value=x:i=x),type:"text",class:"font-sans block w-full pl-10 py-2 px-3 ring-1 ring-palette_olive/[0.4] rounded-xl accent-palette_accent"},null,512),[[de,o(i)]])]),z(fe,{class:"overflow-y-auto overscroll-contain scroll-smooth manufacturer-list result-tab flex flex-1 flex-col w-full mx-auto gap-3 xl:gap-0 xl:divide-y pl-1 pr-1 xl:pr-0 pt-2 overflow-x-hidden",name:"list",tag:"div"},{default:b(()=>[(s(!0),u(B,null,D(o(v),x=>(s(),u("div",{type:"button",class:T(["last:mb-[111px] last:flex last:flex-grow ring-1 ring-inset xl:ring-0 rounded-xl xl:rounded-none transition-color duration-100 text-xl font-sans hover:shadow-md lg:shadow-none",[x.name===a.tab?"ring-unirock xl:ring-sky-400":"text-gray-500 border-r-2  "]]),key:x.id,onClick:j=>l(x.name)},[e("div",Ne,[e("div",{class:T(["w-full text-left pl-3 py-2 h-content xl:hover:shadow-md hover:text-gray-700 xl:hover:bg-sky-100 active:contrast-135 transition-all transition-ease duration-100",[x.name===a.tab?"white text-black xl:shadow-xl xl:border-l-4 xl:border-l-blue-400 borter-t-0 translate-x-1":"text-gray-500"]])},[e("span",Re,g(x.name),1)],2)])],10,He))),128))]),_:1})]))}});var ae=ee(Ue,[["__scopeId","data-v-99d969e0"]]);const re={" ":" ",q:"\u0439",w:"\u0446",e:"\u0443",r:"\u043A",t:"\u0435",y:"\u043D",u:"\u0433",i:"\u0448",o:"\u0449",p:"\u0437","[":"\u0445","{":"\u0425","]":"\u044A","}":"\u042A","|":"/","`":"\u0451","~":"\u0401",a:"\u0444",s:"\u044B",d:"\u0432",f:"\u0430",g:"\u043F",h:"\u0440",j:"\u043E",k:"\u043B",l:"\u0434",";":"\u0436",":":"\u0416","'":"\u044D",'"':"\u042D",z:"\u044F",x:"\u0447",c:"\u0441",v:"\u043C",b:"\u0438",n:"\u0442",m:"\u044C",",":"\u0431","<":"\u0411",".":"\u044E",">":"\u042E","/":".","?":",","@":'"',"#":"\u2116",$:";","^":":","&":"?"},Ge=()=>{const t={};return Object.entries(re).forEach(r=>{const[a,f]=r;t[f]=a}),{dict:re,reverse:t}};var ie=Ge();const N=t=>(X("data-v-84f4e968"),t=t(),Z(),t),We={key:0,class:"dispaly_settings flex flex-row gap-3 font-sans lg:max-w-[60vw]"},Ke={class:"surface ring-1 rounded-md grid grid-flow-col divide-x divide-slate-400 flex-grow"},Qe=["onClick"],Ye={class:""},Je={class:"align-middle"},Pe={class:"thickness ring-1 rounded-md grid grid-flow-col divide-x divide-slate-400 flex-grow"},Xe=["onClick"],Ze={class:""},et={class:"align-middle"},tt=N(()=>e("path",{stroke:"none",d:"M0 0h24v24H0z"},null,-1)),st=N(()=>e("path",{d:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"},null,-1)),ot=N(()=>e("circle",{cx:"12",cy:"12",r:"3"},null,-1)),lt=[tt,st,ot],nt={class:"fixed inset-0 z-20 overflow-y-auto"},at={class:"min-h-screen px-4 text-center"},rt=N(()=>e("span",{class:"inline-block h-screen align-middle","aria-hidden":"true"},"\u200B",-1)),it={class:"font-sans inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"},ut=H("\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u043F\u0438\u0441\u043A\u0430"),ct={class:"mt-3"},dt={class:"dispaly_settings flex flex-col gap-3 font-sans lg:max-w-[60vw]"},ft={class:"surface ring-1 rounded-md grid grid-flow-col divide-x divide-slate-400 flex-grow"},_t=["onClick"],pt={class:"align-middle"},xt={class:"thickness ring-1 rounded-md grid grid-flow-col divide-x divide-slate-400 flex-grow"},ht=["onClick"],vt={class:"align-middle"},mt={class:"p-1 px-2 rounded-md ring-1 active:bg-sky-100"},gt=N(()=>e("label",{for:"hideexcessive",class:"px-2 select-none"},"\u0421\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u043A\u0430\u043C\u043D\u0438 \u0431\u0435\u0437 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0439",-1)),yt={key:2,class:"overflow-x-auto border-slate-300 w-full max-w-[60vw] border-x"},bt={class:"table-auto border-separate overflow-hidden xl:border-t w-full h-fit"},wt={class:"shadow-sm"},kt={class:"first:bg-[#26a69a] first:text-white text-slate-600 last:bg-white bg-[#26a69a]/10 last:text-black only:bg-[#26a69a] only:text-white"},$t={class:"py-1 border-r last:border-r-0 border-b text-inherit bg-inherit px-5 font-sans border-slate-400/[0.8] font-semibold"},Ct=["onClick"],Mt={class:"px-2 flex flex-row gap-2 select-none group-active:text-white group-active:bg-teal-400"},Bt={class:"flex-grow"},zt={class:"flex-grow"},Et={key:3,class:"card-stones gap-3 before:box-inherit after:box-inherit box-border w-full xl:max-w-[60vw] flex flex-col"},Dt={class:"card font-sans ring-1 ring-unirock/30 shadow-md w-fill rounded-xl py-3 px-5 mb-3 last:mb-0 flex flex-col"},At={class:"card-header w-fit self-end"},jt={class:"text-xl font-semibold"},Ft={class:"text-right text-sm text-gray-400"},It={class:"mt-1 border-t border-slate-600"},St={class:"table-fixed w-full"},Tt={class:"text-left font-sans py-2"},Ot={class:"last:after:content-['\u043C\u043C']"},Vt={class:"text-right"},Lt={key:0,class:"text-left mt-1 border-t text-gray-500"},qt=I({props:{columns:null,source:null,filter:null,currency:null,multiplier:null,surface_configurations:null,thickness_configurations:null,manufacturer:null},setup(t){const r=t,a=_e("tailwind"),f=pe();let l=A(r.surface_configurations[0]),i=A(r.thickness_configurations[0]);const v={_name:{"text-align":"left","font-weight":550},_slab_size:{"font-weight":300},_code:{"text-align":"center","font-weight":400}},c=A(!0),m=F(()=>{const _=r.filter,d=[],$=[];Array.from(_).forEach(E=>{d.push(ie.dict[E]),$.push(ie.reverse[E])});const n=d.join("")||"_",p=$.join("")||"_";return{filter:_,reverse:p,translit:n}}),x=F(()=>{const{filter:_,translit:d,reverse:$}=m.value,n=_===""&&d==="_"&&$==="_";let p=[];const E=i.value.replace("\u043C\u043C","");return r.source.forEach(C=>{const[k,we]=[C._code?C._code.toLowerCase():"",C._name.toLowerCase()];if(n||[we,k].some(S=>[_,d,$].filter(O=>O.replaceAll(" ","")!=="").some(O=>{let V=S.split(" "),L=O.split(" ");return L.length===L.filter(ke=>V.some($e=>$e.startsWith(ke))).length})))if(a.xl)p.push(C);else{const S={configurations:{}};Object.entries(C).forEach(O=>{const[V,L]=O;V.startsWith("_")?S[V]=L:V===l.value&&(S.configurations=L[E]||{})}),(Object.keys(S.configurations).length||!c.value)&&p.push(S)}}),p});let j=new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB",maximumFractionDigits:0});const R=F(()=>i.value.replace("\u043C\u043C",""));function h(_,d){let $,n;$=n=_[d]||"-";let p=!1,E=v[d]||{},C=_[l.value];if(C&&(C=C[R.value]),C){let k;d==="_price"?(k=C[_._slab_size],k&&(n=j.format(k.price),$=Math.ceil(k.price),p=k.is_on_order)):d==="_code"?(k=C[_._slab_size],k&&($=n=k.code||_[d]||"-")):d.startsWith("_")||(k=C[d],k&&(n=j.format(k.price),$=Math.ceil(k.price),p=k.is_on_order))}return{value:n,raw:$,is_on_order:p,style:E}}const w=F(()=>x.value.map(_=>r.columns.map(d=>h(_,d.key))));function ye(_){return j.format(Math.ceil(Number(_)))}const te=A(!1);function se(_){te.value=_}function be(_){navigator.clipboard.writeText(String(_))}return(_,d)=>{const $=xe("TransitionChild");return s(),u(B,null,[o(a).xl?(s(),u("div",We,[e("div",Ke,[(s(!0),u(B,null,D(t.surface_configurations,n=>(s(),u("div",{class:T(["surface_variant xl:py-1 first:rounded-t-md xl:first:rounded-tr-none xl:first:rounded-l-md last:rounded-b-md xl:last:rounded-bl-none xl:last:rounded-r-md text-left xl:text-center px-1 flex-row inline my-auto h-full",[o(l)===n?"bg-sky-100":""]]),onClick:p=>M(l)?l.value=n:l=n},[e("span",Ye,[e("span",Je,g(n),1)])],10,Qe))),256))]),e("div",Pe,[(s(!0),u(B,null,D(t.thickness_configurations,n=>(s(),u("div",{class:T(["thickness_variant xl:py-1 first:rounded-tr-none xl:first:rounded-l-md last:rounded-b-md xl:last:rounded-bl-none xl:last:rounded-r-md text-left xl:text-center px-1 flex-row inline my-auto h-full",[o(i)===n?"bg-sky-100":""]]),onClick:p=>M(i)?i.value=n:i=n},[e("span",Ze,[e("span",et,g(n),1)])],10,Xe))),256))])])):t.manufacturer===o(f).query.manufacturer?(s(),y(Q,{to:"#header-settings",key:t.manufacturer},[(s(),u("svg",{onClick:d[0]||(d[0]=n=>se(!0)),type:"button",class:"h-7 w-7",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},lt)),(s(),y(Q,{to:"body"},[z(o(me),{as:"div",open:te.value,onClose:d[2]||(d[2]=n=>se(!1))},{default:b(()=>[e("div",nt,[e("div",at,[z($,{as:"template",enter:"duration-300 ease-out","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-200 ease-in","leave-from":"opacity-100","leave-to":"opacity-0"},{default:b(()=>[z(o(he),{class:"fixed inset-0 bg-black opacity-30"})]),_:1}),rt,z($,{as:"template",enter:"duration-300 ease-out","enter-from":"opacity-0 scale-95","enter-to":"opacity-100 scale-100",leave:"duration-200 ease-in","leave-from":"opacity-100 scale-100","leave-to":"opacity-0 scale-95"},{default:b(()=>[e("div",it,[z(o(ve),{as:"h3",class:"text-xl font-medium leading-6 text-gray-900"},{default:b(()=>[ut]),_:1}),e("div",ct,[e("div",dt,[e("div",ft,[(s(!0),u(B,null,D(t.surface_configurations,n=>(s(),u("div",{class:T(["surface_variant py-1 first:rounded-t-md first:rounded-tr-none first:rounded-l-md last:rounded-b-md last:rounded-bl-none last:rounded-r-md text-center px-1 flex-row inline my-auto h-full",[o(l)===n?"bg-sky-100":""]]),onClick:p=>M(l)?l.value=n:l=n},[e("span",pt,g(n),1)],10,_t))),256))]),e("div",xt,[(s(!0),u(B,null,D(t.thickness_configurations,n=>(s(),u("div",{class:T(["text-center surface_variant py-1 first:rounded-t-md first:rounded-tr-none first:rounded-l-md last:rounded-b-md last:rounded-bl-none last:rounded-r-md px-1 flex-row inline my-auto h-full",[o(i)===n?"bg-sky-100":""]]),onClick:p=>M(i)?i.value=n:i=n},[e("span",vt,g(n),1)],10,ht))),256))]),e("div",mt,[P(e("input",{"onUpdate:modelValue":d[1]||(d[1]=n=>c.value=n),type:"checkbox",id:"hideexcessive"},null,512),[[ze,c.value]]),gt])])])])]),_:1})])])]),_:1},8,["open"])]))])):U("",!0),o(a).xl?(s(),u("div",yt,[e("table",bt,[e("thead",wt,[e("tr",kt,[(s(!0),u(B,null,D(t.columns,n=>(s(),u("td",$t,g(n.title),1))),256))])]),z(fe,{name:"list",tag:"tbody",class:""},{default:b(()=>[(s(!0),u(B,null,D(o(w),n=>(s(),u("tr",{class:"even:bg-[#ddf2f0] odd:bg-white hover:bg-sky-200",key:n[0].value},[(s(!0),u(B,null,D(n,(p,E)=>(s(),u("td",{class:"bg-inherit border-r last:border-r-0 mx-5 font-sans border-t border-[#e2e3e3] group",key:n[0].value+E+n[1].value||"",onClick:C=>be(p.raw),style:Ee(p.style)},[e("div",Mt,[e("div",Bt,[e("span",zt,g(p.value),1)])])],12,Ct))),128))]))),128))]),_:1})])])):(s(),u("div",Et,[(s(!0),u(B,null,D(o(x),n=>(s(),u("div",Dt,[e("div",At,[e("div",jt,g(n._name),1),e("div",Ft,g(n._code),1)]),e("div",It,[e("table",St,[e("tbody",null,[(s(!0),u(B,null,D(n.configurations,(p,E)=>(s(),u("tr",{key:E,class:"border-b last:border-b-0"},[e("td",Tt,[e("div",Ot,g(E),1)]),e("td",Vt,g(ye(p.price)),1)]))),128))])])]),n._info?(s(),u("div",Lt,g(n._info),1)):U("",!0)]))),256))]))],64)}}});var Ht=ee(qt,[["__scopeId","data-v-84f4e968"]]);const Nt=t=>(X("data-v-44b331b4"),t=t(),Z(),t),Rt={class:"flex flex-col px-3 gap-y-3 w-full mb-10"},Ut={class:"searchcontainer flex flex-col xl:flex-row gap-5"},Gt={class:"search-tab mt-4 relative w-full xl:w-80 mx-auto xl:mx-0 max-w-80 h-100 flex"},Wt=Nt(()=>e("div",{class:"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-auto"},[e("svg",{class:"absolute h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor"},[e("path",{"fill-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z","clip-rule":"evenodd"})])],-1)),Kt={class:"currency-data flex self-end place-self-end"},Qt={class:"currency-source font-sans"},Yt=I({props:{manufacturer:null},setup(t,{expose:r}){const a=t,f=q();let l=F(()=>f.state.manufacturers[a.manufacturer]),i=A("");const v=A(document.body);function c(m){(m.key=="F3"||m.ctrlKey&&m.code=="KeyF")&&(m.preventDefault(),v.value.focus()),m.key=="Escape"&&(document.activeElement===v.value?v.value.blur():i.value="")}return ge(()=>{window.addEventListener("keydown",c)}),r({stonesearch:v}),(m,x)=>(s(),u("div",Rt,[e("div",Ut,[e("div",Gt,[Wt,P(e("input",{id:"search",ref_key:"stonesearch",ref:v,placeholder:"\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u043C\u043D\u044F",type:"search",class:"font-sans block w-full pl-10 py-2 ring-1 rounded-xl accent-palette_accent","onUpdate:modelValue":x[0]||(x[0]=j=>M(i)?i.value=j:i=j)},null,512),[[de,o(i)]])]),e("div",Kt,[e("div",Qt,"\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u043A\u0443\u0440\u0441\u0430: "+g(o(l).applied_currency.source),1)])]),(s(),y(Ht,{class:"w-full",columns:o(l).schema,source:o(l).stones,filter:o(i).toLowerCase(),currency:o(l).applied_currency.value,multiplier:o(l).multipliers,thickness_configurations:o(l).thickness_configurations,surface_configurations:o(l).surface_configurations,key:t.manufacturer,manufacturer:t.manufacturer},null,8,["columns","source","filter","currency","multiplier","thickness_configurations","surface_configurations","manufacturer"]))]))}});var Jt=ee(Yt,[["__scopeId","data-v-44b331b4"]]);const Pt={class:"px-3 font-sans divide-y divide-slate-500 text-left"},Xt={class:"cut py-3"},Zt=e("span",{class:"text-xl"},"\u0426\u0435\u043D\u0430 \u0440\u0430\u0441\u043F\u0438\u043B\u0430:",-1),es={key:0,class:"flex flex-col divide-y gap-2"},ts=["src"],ss={class:"flex py-10 w-full"},os=["src"],ls=["innerHTML"],ue=I({props:{manufacturer:null},setup(t){const r=t,a=q();let f=F(()=>a.state.manufacturers[r.manufacturer]);const l=A(!1);return(i,v)=>(s(),u("div",Pt,[Y(i.$slots,"default"),e("div",Xt,[e("p",null,[Zt,H(" "+g(o(f).additional_info.cut_price)+"\u0440. ",1)])]),o(f).additional_info.images.length?(s(),u("div",es,[(s(!0),u(B,null,D(o(f).additional_info.images,c=>(s(),u("div",{class:"image-continer py-3 px-2 hover:bg-sky-100",onClick:v[1]||(v[1]=m=>l.value=!0)},[e("img",{class:"float-left",src:c.thumbnail},null,8,ts),(s(),y(Q,{to:"body"},[l.value?(s(),u("div",{key:0,class:"fixed z-[100] top-0 w-screen h-screen flex bg-[rgb(0,0,0,0.6)]",onClick:v[0]||(v[0]=m=>l.value=!1)},[e("div",ss,[e("img",{class:"mx-auto z-[200] object-contain",src:c.image},null,8,os)])])):U("",!0)])),e("div",null,g(c.text),1)]))),256))])):U("",!0),e("p",{class:"w-100 pt-2",innerHTML:o(f).additional_info.text},null,8,ls)]))}}),ns={class:""},as={class:"min-h-screen px-4 text-center fixed lg:inset-0 z-40"},rs=e("span",{class:"inline-block h-screen align-middle","aria-hidden":"true"},"\u200B",-1),is={class:"overflow-y-auto overflow-x-hidden inline-block w-full fixed lg:relative top-0 left-0 lg:top-auto lg:left-auto h-screen lg:max-h-[90vh] lg:md:max-w-[45vw] lg:min-h-[70vh] p-6 text-left lg:align-middle transition-all transform bg-white shadow-xl lg:rounded-2xl"},us={class:"flex flex-grow"},cs=e("button",{class:"h-full rounded-full focus:outline-none"},[e("svg",{class:"h-6 w-6 text-gray-300",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e("line",{x1:"6",y1:"6",x2:"18",y2:"18"})])],-1),ds=[cs],fs={class:"dialog-body border-t border-slate-700"},ce=I({props:{open:{type:Boolean}},emits:["setIsOpen"],setup(t,{emit:r}){const a=t;function f(l){r("setIsOpen",l)}return(l,i)=>(s(),y(o(De),{appear:"",show:a.open,as:"template",enter:"duration-300 ease-out","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-200 ease-in","leave-from":"opacity-100","leave-to":"opacity-0"},{default:b(()=>[z(o(me),{open:a.open,onClose:f},{default:b(()=>[e("div",ns,[e("div",as,[z(o(ne),{as:"template",enter:"duration-200 ease-out","enter-from":"opacity-0","enter-to":"opacity-100",leave:"duration-100 ease-in","leave-from":"opacity-100","leave-to":"opacity-0"},{default:b(()=>[z(o(he),{class:"fixed inset-0 bg-black opacity-30"})]),_:1}),rs,z(o(ne),{as:"template",enter:"duration-200 ease-out","enter-from":"opacity-0 scale-95","enter-to":"opacity-100 scale-100",leave:"duration-100 ease-in","leave-from":"opacity-100 scale-100","leave-to":"opacity-0 scale-95"},{default:b(()=>[e("div",is,[z(o(ve),{as:"h3",class:"text-2xl font-medium leading-6 mb-4 text-gray-900 flex flex-row gap-3 place-items-center"},{default:b(()=>[e("div",us,[Y(l.$slots,"title")]),e("div",{class:"flex align-middle",onClick:i[0]||(i[0]=v=>f(!1))},ds)]),_:3}),e("div",fs,[Y(l.$slots,"body")])])]),_:3})])])]),_:3},8,["open"])]),_:3},8,["show"]))}}),_s={class:"flex flex-col xl:flex-row mx-auto h-full"},ps={class:"manufacturer-nav mb-2 xl:mb-0 sticky flex flex-col min-w-[250px] xl:h-screen top-0 overflow-y-auto border-slate-600 z-20"},xs={class:"gap-y-2 flex-col flex pt-[1px] bg-white xl:h-screen"},hs={class:"xl:hidden"},vs={class:"nav flex flex-row gap-2 place-items-center border-b p-3 h-12 w-full"},ms={class:"text-xl flex-grow text-left"},gs=e("div",{id:"header-settings"},null,-1),ys=e("svg",{class:"h-6 w-6",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[e("circle",{cx:"12",cy:"12",r:"10"}),e("line",{x1:"12",y1:"16",x2:"12",y2:"12"}),e("line",{x1:"12",y1:"8",x2:"12.01",y2:"8"})],-1),bs=[ys],ws=e("svg",{class:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"})],-1),ks=[ws],$s=H("\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u0438"),Cs={key:0,class:"flex flex-row w-full"},Ms=e("p",{class:"text-2xl font-semibold mb-5"},"\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",-1),Bs=H("\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F"),zs={key:1,class:"w-full h-screen flex absolute top-0"},Es=e("p",{class:"self-center mx-auto flex flex-row"},[e("svg",{class:"animate-spin -ml-1 mr-3 h-5 w-5",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},[e("circle",{class:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor","stroke-width":"4"}),e("path",{class:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]),H("\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430... ")],-1),Ds=[Es],As=e("svg",{class:"h-8 w-8 text-white",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})],-1),js=[As],Fs=I({setup(t){const r=q(),a=pe(),f=Ae();let l=A(!1),i=A(!1);const v=F(()=>r.state.loaded);let c=F({get(){return a.query.manufacturer||"Avant"},set(R){const h=Object.assign({},{manufacturer:R});f.push({query:h})}});const m=A({});function x(){m.value.stonesearch.focus()}const j=_e("tailwind");return(R,h)=>(s(),u("div",_s,[e("div",ps,[e("div",xs,[e("div",hs,[e("div",vs,[e("div",ms,g(o(c)),1),gs,e("div",{type:"button",class:"show-manufacturers rounded-full p-1",onClick:h[0]||(h[0]=w=>M(i)?i.value=!o(l):i=!o(l))},bs),e("div",{type:"button",id:"mobile-func-header",class:"show-manufacturers rounded-full p-1",onClick:h[1]||(h[1]=w=>M(l)?l.value=!o(l):l=!o(l))},ks)])]),o(j).xl?(s(),y(ae,{key:0,tab:o(c),onUpdate:h[2]||(h[2]=w=>M(c)?c.value=w:c=w)},null,8,["tab"])):(s(),y(ce,{key:1,open:o(l),onSetIsOpen:h[4]||(h[4]=w=>M(l)?l.value=w:l=w)},{title:b(()=>[$s]),body:b(()=>[(s(),y(K,null,[(s(),y(ae,{tab:o(c),key:o(c),onUpdate:h[3]||(h[3]=w=>{M(c)?c.value=w:c=w,M(l)?l.value=!1:l=!1})},null,8,["tab"]))],1024))]),_:1},8,["open"]))])]),o(v)?(s(),u("div",Cs,[(s(),y(K,null,[(s(),y(Jt,{ref_key:"table_c",ref:m,manufacturer:o(c),key:o(c)},null,8,["manufacturer"]))],1024)),o(j).xl?(s(),y(ue,{class:"info flex-col sticky top-0 right-0 flex w-full max-w-[25vw] xl:h-screen overflow-y-auto",manufacturer:o(c),key:o(c)},{default:b(()=>[Ms]),_:1},8,["manufacturer"])):(s(),y(ce,{key:1,open:o(i),onSetIsOpen:h[5]||(h[5]=w=>M(i)?i.value=w:i=w)},{title:b(()=>[Bs]),body:b(()=>[(s(),y(K,null,[(s(),y(ue,{class:"info flex-col flex-grow w-fit",manufacturer:o(c),key:o(c)},null,8,["manufacturer"]))],1024))]),_:1},8,["open"]))])):(s(),u("div",zs,Ds)),e("a",{href:"#top",class:"xl:hidden fixed bottom-7 right-3 p-3 bg-blue-500 rounded-full",onClick:h[6]||(h[6]=()=>x())},js)]))}}),Is=[{path:"/",name:"Home",component:Fs}],Ss=je({history:Fe("/pricelist/quartz/"),routes:Is});var Ts=Ie({state:{loaded:!1,manufacturers:{}},mutations:{setManufacturers(t,r){t.manufacturers=Object.assign({},...r.map(a=>({[a.name]:a})))},addManufacturers(t,r){r.forEach(a=>{t.manufacturers[a.name]=W(W({},t.manufacturers[a.name]),a)}),t.loaded=!0}},actions:{async hydrate({commit:t,dispatch:r}){J.get("manufacturers/").then(a=>{t("setManufacturers",a.data)}).then(()=>r("loadManufacturers"))},async loadManufacturers({commit:t}){J.get("manufacturer/",{headers:{"Cache-Control":"max-age=0"}}).then(r=>{t("addManufacturers",r.data)})}},getters:{isDesktop(){return window.matchMedia("(min-width: 1024px)").matches}}});const Os=I({setup(t){const r=q();return ge(async()=>{r.dispatch("hydrate")}),(a,f)=>{const l=xe("router-view");return s(),y(l)}}});const G=Se(Os);G.use(Te,J);G.use(Ss);G.use(Ts);G.mount("#app");
