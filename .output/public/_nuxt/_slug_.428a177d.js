import{_ as S}from"./VideoCard.46e547c9.js";import{_ as B}from"./CardSkeleton.99747f73.js";import{i as I,y as E,B as M,C as $,x as o,j as D,z as L,o as i,a as _,b as l,t as h,u as r,F as y,r as x,A as T,J as A,c as F,D as H,E as P,e as R}from"./entry.6a7138b8.js";import{g as j}from"./useApi.f9a49b26.js";import"./nuxt-link.58474e30.js";import"./numbro.min.56cf0f0c.js";import"./_plugin-vue_export-helper.c27b6911.js";const q={class:"playlist__header px-6 sm:px-10 pt-10 pb-8"},z={class:"text-4xl font-medium mb-3"},J={class:"text-base"},O={class:"playlist__content px-6 sm:px-10 pb-10 pt-4 flex flex-wrap gap-x-2 gap-y-5 mb-16 pb-16"},G={key:0,class:"min-h-400px"},te=I({__name:"[slug]",async setup(K){let c,f;const w=E(),C=A(),k=M(),e=([c,f]=$(()=>j(w.params.slug.toString())),c=await c,f(),c),t=o(e.attributes.videos?e.attributes.videos.data:null);D({title:`${e.attributes.title} - Nithyananda TV`,meta:[{name:"description",content:e.attributes.description.substring(0,160)},{name:"og:title",content:`${e.attributes.title} - Nithyananda TV`},{name:"og:description",content:e.attributes.description.substring(0,160)}]});const u=o(!1),p=o(2),m=o(4),v=o(null);L(()=>{new IntersectionObserver(V).observe(v.value?v.value:new HTMLElement)});const V=(n,d)=>{n.forEach(async s=>{s.isIntersecting&&p.value<=m.value&&(u.value=!0,await N(p.value,20)),p.value>m.value&&d.disconnect()})},N=async(n,d)=>{const s=await k(`${C.public.strapi.url}/api/videos`,{params:{filters:{playlists:{slug:{$eq:e.attributes.slug}}},populate:["coverImage"],pagination:{page:n,pageSize:d}}});if(m.value=s.meta.pagination.pageCount,s.data.length>0&&t.value){let g=new Set(t.value.map(b=>b.id)),a=[...t.value,...s.data.filter(b=>!g.has(b.id))];t.value.splice(0,t.value.length),t.value.push(...a)}u.value=!1,p.value++};return(n,d)=>{const s=S,g=B;return i(),_("div",null,[l("div",q,[l("h1",z,h(r(e).attributes.title),1),l("p",J,h(r(e).attributes.description),1)]),l("div",O,[(i(!0),_(y,null,x(r(t),a=>(i(),F(s,{key:a.id,video:a},null,8,["video"]))),128)),(i(),_(y,null,x(5,a=>H(R(g,{key:a}),[[P,r(u)]])),64))]),r(u)?(i(),_("div",G)):T("",!0),l("div",{class:"invisible",ref_key:"loadMore",ref:v},".",512)])}}});export{te as default};
