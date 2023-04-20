import{_ as D}from"./VideoCard.b17f5780.js";import{_ as E}from"./CardSkeleton.9fc78275.js";import{i as $,x as R,A as P,v as u,Q as T,W as z,y as q,o as l,a as p,u as o,z as x,b as y,F as b,r as C,c as g,C as I,D as V,e as S,w as M,T as L,E as j,k as Q,m as F,a1 as O,J as N}from"./entry.04416d42.js";import{_ as A}from"./VideoSlider.acfa7851.js";import{_ as G}from"./VideoSliderSkeleton.f69e4074.js";import{u as H}from"./search.409bbc54.js";import"./nuxt-link.d8b12ca1.js";import"./lazysizes.869e4f93.js";import"./numbro.min.107d2f30.js";import"./index.e9cbcaec.js";import"./_plugin-vue_export-helper.c27b6911.js";const J={key:0,class:"flex p-18 text-lg justify-center items-center"},W={class:"px-10 pb-10 pt-4 flex flex-wrap gap-x-2 gap-y-5 mb-16 pb-16"},K={key:1,class:"min-h-400px"},U=$({__name:"SearchVideos",setup(B){const i=R(),_=P(),v=u(null),t=u(1),d=u(0),s=u(!0),e=u([]),k=T(()=>i.query.q);z(k,async(a,r)=>{t.value=1,a&&a.length>2&&(e.value.splice(0,e.value.length),s.value=!0,await m(t.value,20))});const m=async(a,r)=>{const n=await _("/videos",{params:{filters:{title:{$containsi:i.query.q}},populate:["coverImage"],pagination:{page:a,pageSize:r}}});if(n.data.length>0){let h=new Set(e.value.map(f=>f.id)),c=[...e.value,...n.data.filter(f=>!h.has(f.id))];e.value.splice(0,e.value.length),e.value.push(...c)}d.value=n.meta.pagination.pageCount,t.value++,s.value=!1},w=(a,r)=>{a.forEach(async n=>{n.isIntersecting&&t<=d&&(s.value=!0,await m(t.value,20)),t.value>d.value&&r.disconnect()})};return q(async()=>{s.value=!0,await m(t.value,20);const a=new IntersectionObserver(w,{rootMargin:"100px",threshold:0});v.value&&a.observe(v.value)}),(a,r)=>{const n=D,h=E;return l(),p("div",null,[!o(s)&&o(e).length==0?(l(),p("div",J," No search results ")):x("",!0),y("div",W,[(l(!0),p(b,null,C(o(e),c=>(l(),g(n,{key:`search-video-${c.id}`,video:c},null,8,["video"]))),128)),(l(),p(b,null,C(4,c=>I(S(h,{key:c}),[[V,o(s)]])),64))]),o(s)?(l(),p("div",K)):x("",!0),y("div",{class:"invisible",ref_key:"loadMore",ref:v},null,512)])}}}),X={key:0,class:"flex p-18 text-lg justify-center items-center"},Y={key:3,class:"min-h-400px"},Z=$({__name:"SearchPlaylists",setup(B){const i=R(),_=P(),v=u(null),t=u(1),d=u(0),s=u(!0),e=u([]),k=T(()=>i.query.q);z(k,async(a,r)=>{t.value=1,a&&a.length>2&&(e.value.splice(0,e.value.length),s.value=!0,await m(t.value,10))});const m=async(a,r)=>{const n=await _("/playlists",{params:{filters:{title:{$containsi:i.query.q}},fields:["title","description","slug"],populate:{videos:{fields:["title","slug","description","youtubeID","eventDate","viewCount","duration"],populate:["coverImage"]}},pagination:{page:a,pageSize:r}}});if(n.data.length>0){let h=new Set(e.value.map(f=>f.id)),c=[...e.value,...n.data.filter(f=>!h.has(f.id))];e.value.splice(0,e.value.length),e.value.push(...c)}d.value=n.meta.pagination.pageCount,t.value++,s.value=!1},w=(a,r)=>{a.forEach(async n=>{n.isIntersecting&&t<=d&&(s.value=!0,await m(t.value,10)),t.value>d.value&&r.disconnect()})};return q(async()=>{s.value=!0,await m(t.value,10);const a=new IntersectionObserver(w,{rootMargin:"100px",threshold:0});v.value&&a.observe(v.value)}),(a,r)=>{const n=A,h=G;return l(),p("div",null,[!o(s)&&o(e).length==0?(l(),p("div",X," No search results ")):(l(),g(L,{key:1,name:"fade"},{default:M(()=>[(l(!0),p(b,null,C(o(e),c=>(l(),g(n,{key:`search-playlist-${c.id}`,playlist:c,class:"videoSlider"},null,8,["playlist"]))),128))]),_:1})),o(s)?(l(),g(j,{key:2,name:"fade"},{default:M(()=>[S(h)]),_:1})):x("",!0),o(s)?(l(),p("div",Y)):x("",!0),y("div",{class:"invisible",ref_key:"loadMore",ref:v},".",512)])}}}),ee={class:"search__tabs mt-18 mb-8 text-lg text-center flex justify-center items-center"},de=$({__name:"search",setup(B){Q({title:"Search Results - Vox TV"});const i=u("videos"),_=H();return R(),F(),q(()=>{_.searchBarStatus||_.displaySearchBar()}),O(()=>{_.hideSearchBar()}),(v,t)=>{const d=U,s=Z;return l(),p(b,null,[y("div",ee,[y("div",{class:N(["tab__button py-3 px-10 flex-1",o(i)=="videos"?"active":""]),onClick:t[0]||(t[0]=e=>i.value="videos")}," Videos ",2),y("div",{class:N(["tab__button py-3 px-10 flex-1",o(i)=="playlists"?"active":""]),onClick:t[1]||(t[1]=e=>i.value="playlists")}," Playlists ",2)]),I(S(d,{class:"tab__videoResults"},null,512),[[V,o(i)=="videos"]]),I(S(s,{class:"tab__playlistResults"},null,512),[[V,o(i)=="playlists"]])],64)}}});export{de as default};