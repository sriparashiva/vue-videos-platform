import{v as dt,_ as xt}from"./mdi.d567e790.js";import{_ as yt}from"./nuxt-link.d8b12ca1.js";import{i as _t,l as vt,x as wt,A as kt,v as $t,o as N,a as P,b as L,u as C,t as W,f as Z,z as pt,c as St,w as Tt,e as ut,I as Ct}from"./entry.04416d42.js";import"./lazysizes.869e4f93.js";import{n as Et}from"./numbro.min.107d2f30.js";import{f as It}from"./index.e9cbcaec.js";import{p as Lt}from"./VideoCard.b17f5780.js";let u,ft,o,n,g,k,H,$,E,V,tt,G,_,mt,x,A,R,q,j,X,S,ot;const K=[];let F,it,B,nt,U,Y,a,l,O,M={},J,f;const c="appendChild",p="createElement",y="removeChild",At=t=>(ft||Mt(t),_&&(clearTimeout(mt),lt()),f=t,G=t.ytSrc||t.vimeoSrc,it=t.animationStart,B=t.animationEnd,nt=t.onChangeImage,u=t.el,F=!1,q=u.getAttribute("data-caption"),t.gallery?Dt(t.gallery,t.position):G||t.iframeSrc?(n=$,Ht()):t.imgSrc?(F=!0,V=t.imgSrc,!~K.indexOf(V)&&z(!0),n=g,n.src=V):t.audio?(z(!0),n=H,n.src=t.audio,rt("audio file")):t.vidSrc?(z(!0),t.dimensions&&m(k,`width:${t.dimensions[0]}px`),Vt(t.vidSrc),rt("video")):(n=g,n.src=u.tagName==="IMG"?u.src:window.getComputedStyle(u).backgroundImage.replace(/^url|[(|)|'|"]/g,"")),o[c](n),document.body[c](o),{close:at,opts:f,updateDimensions:st,display:n,next:()=>w(1),prev:()=>w(-1)});function Mt(t){let e,i;function s(r){const b=document[p]("button");return b.className=r,b.innerHTML='<svg viewBox="0 0 48 48"><path d="M28 24L47 5a3 3 0 1 0-4-4L24 20 5 1a3 3 0 1 0-4 4l19 19L1 43a3 3 0 1 0 4 4l19-19 19 19a3 3 0 0 0 4 0v-4L28 24z"/></svg>',b}function d(r,b){const I=document[p]("button");return I.className="bp-lr",I.innerHTML='<svg viewBox="0 0 129 129" height="70" fill="#fff"><path d="M88.6 121.3c.8.8 1.8 1.2 2.9 1.2s2.1-.4 2.9-1.2a4.1 4.1 0 0 0 0-5.8l-51-51 51-51a4.1 4.1 0 0 0-5.8-5.8l-54 53.9a4.1 4.1 0 0 0 0 5.8l54 53.9z"/></svg>',m(I,b),I.onclick=T=>{T.stopPropagation(),w(r)},I}const h=document[p]("STYLE"),v=t&&t.overlayColor?t.overlayColor:"rgba(0,0,0,.7)";h.innerHTML=`#bp_caption,#bp_container{bottom:0;left:0;right:0;position:fixed;opacity:0}#bp_container>*,#bp_loader{position:absolute;right:0;z-index:10}#bp_container,#bp_caption,#bp_container svg{pointer-events:none}#bp_container{top:0;z-index:9999;background:${v};opacity:0;transition:opacity .35s}#bp_loader{top:0;left:0;bottom:0;display:flex;align-items:center;cursor:wait;background:0;z-index:9}#bp_loader svg{width:50%;max-width:300px;max-height:50%;margin:auto;animation:bpturn 1s infinite linear}#bp_aud,#bp_container img,#bp_sv,#bp_vid{user-select:none;max-height:96%;max-width:96%;top:0;bottom:0;left:0;margin:auto;box-shadow:0 0 3em rgba(0,0,0,.4);z-index:-1}#bp_sv{background:#111}#bp_sv svg{width:66px}#bp_caption{font-size:.9em;padding:1.3em;background:rgba(15,15,15,.94);color:#fff;text-align:center;transition:opacity .3s}#bp_aud{width:650px;top:calc(50% - 20px);bottom:auto;box-shadow:none}#bp_count{left:0;right:auto;padding:14px;color:rgba(255,255,255,.7);font-size:22px;cursor:default}#bp_container button{position:absolute;border:0;outline:0;background:0;cursor:pointer;transition:all .1s}#bp_container>.bp-x{padding:0;height:41px;width:41px;border-radius:100%;top:8px;right:14px;opacity:.8;line-height:1}#bp_container>.bp-x:focus,#bp_container>.bp-x:hover{background:rgba(255,255,255,.2)}.bp-x svg,.bp-xc svg{height:21px;width:20px;fill:#fff;vertical-align:top;}.bp-xc svg{width:16px}#bp_container .bp-xc{left:2%;bottom:100%;padding:9px 20px 7px;background:#d04444;border-radius:2px 2px 0 0;opacity:.85}#bp_container .bp-xc:focus,#bp_container .bp-xc:hover{opacity:1}.bp-lr{top:50%;top:calc(50% - 130px);padding:99px 0;width:6%;background:0;border:0;opacity:.4;transition:opacity .1s}.bp-lr:focus,.bp-lr:hover{opacity:.8}@keyframes bpf{50%{transform:translatex(15px)}100%{transform:none}}@keyframes bpl{50%{transform:translatex(-15px)}100%{transform:none}}@keyframes bpfl{0%{opacity:0;transform:translatex(70px)}100%{opacity:1;transform:none}}@keyframes bpfr{0%{opacity:0;transform:translatex(-70px)}100%{opacity:1;transform:none}}@keyframes bpfol{0%{opacity:1;transform:none}100%{opacity:0;transform:translatex(-70px)}}@keyframes bpfor{0%{opacity:1;transform:none}100%{opacity:0;transform:translatex(70px)}}@keyframes bpturn{0%{transform:none}100%{transform:rotate(360deg)}}@media (max-width:600px){.bp-lr{font-size:15vw}}`,document.head[c](h),o=document[p]("DIV"),o.id="bp_container",o.onclick=at,tt=s("bp-x"),o[c](tt),"ontouchend"in window&&window.visualViewport&&(J=!0,o.ontouchstart=({touches:r,changedTouches:b})=>{i=r.length>1,e=b[0].pageX},o.ontouchend=({changedTouches:r})=>{if(S&&!i&&window.visualViewport.scale<=1){let b=r[0].pageX-e;b<-30&&w(1),b>30&&w(-1)}}),g=document[p]("IMG"),k=document[p]("VIDEO"),k.id="bp_vid",k.setAttribute("playsinline",!0),k.controls=!0,k.loop=!0,H=document[p]("audio"),H.id="bp_aud",H.controls=!0,H.loop=!0,O=document[p]("span"),O.id="bp_count",A=document[p]("DIV"),A.id="bp_caption",j=s("bp-xc"),j.onclick=Q.bind(null,!1),A[c](j),R=document[p]("SPAN"),A[c](R),o[c](A),U=d(1,"transform:scalex(-1)"),Y=d(-1,"left:0;right:auto"),x=document[p]("DIV"),x.id="bp_loader",x.innerHTML='<svg viewbox="0 0 32 32" fill="#fff" opacity=".8"><path d="M16 0a16 16 0 0 0 0 32 16 16 0 0 0 0-32m0 4a12 12 0 0 1 0 24 12 12 0 0 1 0-24" fill="#000" opacity=".5"/><path d="M16 0a16 16 0 0 1 16 16h-4A12 12 0 0 0 16 4z"/></svg>',$=document[p]("DIV"),$.id="bp_sv",E=document[p]("IFRAME"),E.setAttribute("allowfullscreen",!0),E.allow="autoplay; fullscreen",E.onload=()=>$[y](x),m(E,"border:0;position:absolute;height:100%;width:100%;left:0;top:0"),$[c](E),g.onload=D,g.onerror=D.bind(null,"image"),window.addEventListener("resize",()=>{S||_&&z(!0),n===$&&st()}),document.addEventListener("keyup",({keyCode:r})=>{r===27&&X&&at(),S&&(r===39&&w(1),r===37&&w(-1),r===38&&w(10),r===40&&w(-10))}),document.addEventListener("keydown",r=>{S&&~[37,38,39,40].indexOf(r.keyCode)&&r.preventDefault()}),document.addEventListener("focus",r=>{X&&!o.contains(r.target)&&(r.stopPropagation(),tt.focus())},!0),ft=!0}function ht(){const{top:t,left:e,width:i,height:s}=u.getBoundingClientRect(),d=e-(o.clientWidth-i)/2,h=t-(o.clientHeight-s)/2,v=u.clientWidth/n.clientWidth,r=u.clientHeight/n.clientHeight;return`transform:translate3D(${d}px, ${h}px, 0) scale3D(${v}, ${r}, 0)`}function Vt(t){Array.isArray(t)?(n=k.cloneNode(),t.forEach(e=>{const i=document[p]("SOURCE");i.src=e,i.type=`video/${e.match(/.(\w+)$/)[1]}`,n[c](i)})):(n=k,n.src=t)}function Dt(t,e){let i=f.galleryAttribute||"data-bp";if(Array.isArray(t))a=e||0,l=t,q=t[a].caption;else{l=[].slice.call(typeof t=="string"?document.querySelectorAll(`${t} [${i}]`):t);const s=l.indexOf(u);a=e===0||e?e:s!==-1?s:0,l=l.map(d=>({el:d,src:d.getAttribute(i),caption:d.getAttribute("data-caption")}))}F=!0,V=l[a].src,!~K.indexOf(V)&&z(!0),l.length>1?(o[c](O),O.innerHTML=`${a+1}/${l.length}`,J||(o[c](U),o[c](Y))):l=!1,n=g,n.src=V}function w(t){const e=l.length-1;if(_)return;if(t>0&&a===e||t<0&&!a){if(!f.loop){m(g,""),setTimeout(m,9,g,`animation:${t>0?"bpl":"bpf"} .3s;transition:transform .35s`);return}a=t>0?-1:e+1}if(a=Math.max(0,Math.min(a+t,e)),[a-1,a,a+1].forEach(s=>{if(s=Math.max(0,Math.min(s,e)),M[s])return;const d=l[s].src,h=document[p]("IMG");h.addEventListener("load",gt.bind(null,d)),h.src=d,M[s]=h}),M[a].complete)return et(t);_=!0,m(x,"opacity:.4;"),o[c](x),M[a].onload=()=>{S&&et(t)},M[a].onerror=()=>{l[a]={error:"Error loading image"},S&&et(t)}}function et(t){_&&(o[y](x),_=!1);const e=l[a];if(e.error)alert(e.error);else{const i=o.querySelector("img:last-of-type");g=n=M[a],m(g,`animation:${t>0?"bpfl":"bpfr"} .35s;transition:transform .35s`),m(i,`animation:${t>0?"bpfol":"bpfor"} .35s both`),o[c](g),e.el&&(u=e.el)}O.innerHTML=`${a+1}/${l.length}`,Q(l[a].caption),nt&&nt([g,l[a]])}function Ht(){let t;const e="https://",i="autoplay=1";f.ytSrc?t=`${e}www.youtube${f.ytNoCookie?"-nocookie":""}.com/embed/${G}?html5=1&rel=0&playsinline=1&${i}`:f.vimeoSrc?t=`${e}player.vimeo.com/video/${G}?${i}`:f.iframeSrc&&(t=f.iframeSrc),m(x,""),$[c](x),E.src=t,st(),setTimeout(D,9)}function st(){let t,e;const i=window.innerHeight*.95,s=window.innerWidth*.95,d=i/s,[h,v]=f.dimensions||[1920,1080],r=v/h;r>d?(t=Math.min(v,i),e=t/r):(e=Math.min(h,s),t=e*r),$.style.cssText+=`width:${e}px;height:${t}px;`}function rt(t){~[1,4].indexOf(n.readyState)?(D(),setTimeout(()=>{n.play()},99)):n.error?D(t):mt=setTimeout(rt,35,t)}function z(t){f.noLoader||(t&&m(x,`top:${u.offsetTop}px;left:${u.offsetLeft}px;height:${u.clientHeight}px;width:${u.clientWidth}px`),u.parentElement[t?c:y](x),_=t)}function Q(t){t&&(R.innerHTML=t),m(A,`opacity:${t?"1;pointer-events:auto":"0"}`)}function gt(t){!~K.indexOf(t)&&K.push(t)}function D(t){if(_&&z(),it&&it(),typeof t=="string")return lt(),f.onError?f.onError():alert(`Error: The requested ${t} could not be loaded.`);F&&gt(V),n.style.cssText+=ht(),m(o,"opacity:1;pointer-events:auto"),B&&(B=setTimeout(B,410)),X=!0,S=!!l,setTimeout(()=>{n.style.cssText+="transition:transform .35s;transform:none",q&&setTimeout(Q,250,q)},60)}function at(t){const e=t?t.target:o,i=[A,j,k,H,R,Y,U,x];e.blur(),!(ot||~i.indexOf(e))&&(n.style.cssText+=ht(),m(o,"pointer-events:auto"),setTimeout(lt,350),clearTimeout(B),X=!1,ot=!0)}function lt(){if((n===$?E:n).removeAttribute("src"),document.body[y](o),o[y](n),m(o,""),m(n,""),Q(!1),S){const e=o.querySelectorAll("img");for(let i=0;i<e.length;i++)o[y](e[i]);_&&o[y](x),o[y](O),S=l=!1,M={},J||o[y](U),J||o[y](Y),g.onload=D,g.onerror=D.bind(null,"image")}f.onClose&&f.onClose(),ot=_=!1}function m({style:t},e){t.cssText=e}const zt={class:"hero__cover overflow-hidden"},Ot={class:"w-full h-full aspect-video"},Nt=["src"],Bt={class:"hero__text px-10 pt-0 pb-6 flex flex-col justify-center"},Pt={class:"text-2xl font-bold mb-3 text-secondary dark:text-dark_text_lighten"},Wt={key:0,class:"flex gap-2 items-end text-sm opacity-60 text-text_lighten dark:text-dark_text"},jt={class:"videoCard__publishDate"},Gt={class:"videoCard__viewCount"},Rt={key:1,class:"text-xs text-text_lighten dark:text-dark_text overflow-ellipsis overflow-hidden mt-2"},Zt=_t({__name:"Hero",props:{video:{type:Object,required:!0}},setup(t){const e=t,i=vt(),s=wt(),d=Ct(),h=kt(),v=$t(null),r=e.video.attributes.viewCount?Et(Number(e.video.attributes.viewCount)).format({average:!0,mantissa:1}):null,b=e.video.attributes.eventDate?It(Lt(e.video.attributes.eventDate,"yyyy-MM-dd",new Date))+" ago":null,I=async()=>{if(i.getLoggedIn)try{const T=await h("/users-permissions/watch-history",{method:"POST",headers:{Authorization:`Bearer ${i.getJwt}`},params:{id:e.video.id}})}catch(T){console.log(T)}try{const T=await h(`/videos/${e.video.id}/watch`,{method:"POST"})}catch(T){console.log(T)}At({el:v.value,ytSrc:e.video.attributes.youtubeID,ytNoCookie:!1,dimensions:[1920,1080],noLoader:!0})};return(T,qt)=>{const ct=xt,bt=yt;return N(),P("div",{ref_key:"hero",ref:v,class:"hero h-screen-50vh relative lg:h-screen-60vh xl:h-screen-70vh flex flex-col md:flex-row bg-white dark:bg-dark justify-between"},[L("div",zt,[L("div",Ot,[L("img",{alt:"",src:`${C(d).public.strapi.url}${e.video.attributes.coverImage.data.attributes.url}`,class:"hero__cover__img w-full h-full lazyload object-cover object-center"},null,8,Nt)])]),L("div",Bt,[L("h1",Pt,W(e.video.attributes.title),1),C(s).path.startsWith("/video")?pt("",!0):(N(),P("div",Wt,[L("p",jt,W(C(b)),1),Z(" • "),L("p",Gt,W(C(r))+" views",1)])),C(s).path=="/"?(N(),P("p",Rt,W(e.video.attributes.description.substring(0,100)+"..."),1)):pt("",!0),C(s).path=="/"?(N(),St(bt,{key:2,"aria-label":"Watch video",to:`/video/${e.video.attributes.slug}`,class:"hero__morebutton mt-4 bg-accent px-5 py-2 w-max flex justify-center items-center gap-x-1 text-sm transition-colors hover:bg-accent_darken text-white hover:text-white font-medium"},{default:Tt(()=>[ut(ct,{color:"fill-white",class:"w-5",icon:C(dt)},null,8,["icon"]),Z("Watch Now")]),_:1},8,["to"])):(N(),P("button",{key:3,"aria-label":"Play Video",onClick:I,class:"hero__playbutton mt-4 bg-accent px-5 py-2 w-max flex justify-center items-center gap-x-1 text-sm transition-colors hover:bg-accent_darken text-white hover:text-white font-medium"},[ut(ct,{color:"fill-white",class:"w-5",icon:C(dt)},null,8,["icon"]),Z(" Play Video ")]))])],512)}}});export{Zt as _};
