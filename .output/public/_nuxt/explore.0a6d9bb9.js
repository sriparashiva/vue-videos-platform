import{_ as C}from"./VideoSlider.6861d235.js";import{_ as E}from"./VideoSliderSkeleton.f4010597.js";import{i as S,j as B,x as t,B as N,C as T,z as L,o as a,a as l,e as p,w as x,F as _,r as w,u as m,T as M,D as P,E as I,b as i,G as A,A as D,c as F}from"./entry.6a7138b8.js";import"./nuxt-link.58474e30.js";import"./VideoCard.46e547c9.js";import"./numbro.min.56cf0f0c.js";import"./_plugin-vue_export-helper.c27b6911.js";import"./CardSkeleton.99747f73.js";const G=i("h1",{class:"text-3xl font-bold text-secondary dark:text-dark_text_lighten <sm:px-6 px-10 mt-10"}," Explore Playlists ",-1),H={class:"my-4"},j={key:0,class:"min-h-400px"},W=S({__name:"explore",async setup(z){let s,v;B({title:"Explore Videos and Playlists - Nithyananda TV"});const r=t([]),f=N(),k=([s,v]=T(()=>f("/playlists/with-videos")),s=await s,v(),s);r.value.push(...k.data);const o=t(!1),c=t(!1),h=t(1),d=t(null);L(()=>{new IntersectionObserver(b).observe(d.value?d.value:new HTMLElement)});const b=(e,y)=>{e.forEach(async u=>{u.isIntersecting&&!c.value&&(o.value=!0,await g()),c.value&&y.disconnect()})},g=async()=>{const e=await f("/playlists/with-videos",{params:{pagination:{start:h.value*5,limit:5}}});e.data.length>0?r.value.push(...e.data):c.value=!0,h.value++,o.value=!1};return(e,y)=>{const u=C,V=E;return a(),l(_,null,[G,p(M,{name:"fade"},{default:x(()=>[(a(!0),l(_,null,w(m(r),n=>(a(),F(u,{key:`playlist-${n.id}`,playlist:n,class:"videoSlider"},null,8,["playlist"]))),128))]),_:1}),p(A,{name:"fade"},{default:x(()=>[P(i("div",H,[(a(),l(_,null,w(3,n=>i("div",{key:n,class:"mt-10"},[p(V)])),64))],512),[[I,m(o)]])]),_:1}),m(o)?(a(),l("div",j)):D("",!0),i("div",{class:"invisible",ref_key:"loadMore",ref:d},".",512)],64)}}});export{W as default};
