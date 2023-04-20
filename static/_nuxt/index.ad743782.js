import{_ as k}from"./_plugin-vue_export-helper.c27b6911.js";import{o as s,a as f,G as y,H as b,i as g,v as i,A as S,B as v,u as c,c as _,F as w,r as F}from"./entry.04416d42.js";import{_ as V}from"./Hero.vue.ef132e72.js";import{_ as $}from"./VideoSlider.acfa7851.js";import"./mdi.d567e790.js";import"./nuxt-link.d8b12ca1.js";import"./lazysizes.869e4f93.js";import"./numbro.min.107d2f30.js";import"./index.e9cbcaec.js";import"./VideoCard.b17f5780.js";const P={},A={ref:"hero",class:"hero h-screen-50vh lg:h-screen-60vh xl:h-screen-70vh flex flex-col md:flex-row bg-white dark:bg-dark justify-between"},B=y('<div class="hero__cover overflow-hidden" data-v-fb63ad6f><div class="w-full h-full" data-v-fb63ad6f><div class="hero__cover__img skeleton w-full h-full" data-v-fb63ad6f></div></div></div><div class="hero__text px-10 pt-0 pb-6 flex flex-col justify-center" data-v-fb63ad6f><div class="textSkeleton flex flex-col w-full" data-v-fb63ad6f><h2 class="textSkeleton__intro skeleton h-6 mr-18 mb-3 rounded" data-v-fb63ad6f></h2><p class="textSkeleton__title skeleton mt-2 h-3 mr-3 rounded" data-v-fb63ad6f></p><p class="textSkeleton__title skeleton mt-2 h-3 mr-3 rounded" data-v-fb63ad6f></p></div></div>',2),H=[B];function j(o,e,r,t,d,l){return s(),f("div",A,H,512)}const C=k(P,[["render",j],["__scopeId","data-v-fb63ad6f"]]),q=b("api",{state:()=>({featuredVideo:{},featuredPlaylists:[]}),getters:{getFeaturedVideo:o=>o.featuredVideo,getFeaturedPlaylists:o=>o.featuredPlaylists},actions:{}}),Q=g({__name:"index",async setup(o){let e,r;const t=q(),d=i({}),l=i(!1),n=i([]),u=S();if(t.getFeaturedPlaylists.length==0){const a=([e,r]=v(()=>u("/playlists/with-videos",{params:{filters:{isFeatured:{$eq:!0}},sort:["updatedAt:desc"]}})),e=await e,r(),e);n.value=a.data,t.featuredPlaylists=a.data}else n.value=t.getFeaturedPlaylists;if(Object.keys(t.getFeaturedVideo).length===0){const a=([e,r]=v(()=>u("/videos/random",{params:{filters:{isFeatured:{$eq:!0}}}})),e=await e,r(),e);d.value=a.data,l.value=!0,t.featuredVideo=a.data}else d.value=t.getFeaturedVideo,l.value=!0;return(a,L)=>{const m=C,h=V,x=$;return s(),f("div",null,[c(l)?(s(),_(h,{key:1,video:c(d)},null,8,["video"])):(s(),_(m,{key:0})),(s(!0),f(w,null,F(c(n),p=>(s(),_(x,{key:p.id,playlist:p},null,8,["playlist"]))),128))])}}});export{Q as default};
