import{_ as f,m as h,a as y,b as k}from"./mdi.d567e790.js";import{_ as b}from"./nuxt-link.d8b12ca1.js";import{_ as v}from"./Loader.0ad8c7fd.js";import{i as w,j as S,k as L,l as O,m as V,o as a,a as c,b as e,u as s,t as l,F as I,r as j,e as r,f as _,c as B,w as A,p as C,h as N}from"./entry.04416d42.js";import{_ as U}from"./_plugin-vue_export-helper.c27b6911.js";const H=n=>(C("data-v-8437e2e3"),n=n(),N(),n),T={class:"flex justify-center items-center w-full h-full"},F={class:"px-10 py-14 my-16 <md:min-w-screen md:w-512px bg-accent_lighten dark:bg-dark_lighten"},R={key:0},$={class:"flex justify-center gap-3 mb-5 items-center"},D=["src"],E={class:"text-2xl font-bold text-text dark:text-dark_text_lighten"},M=H(()=>e("p",{class:"separator my-3 text-text dark:text-dark_text opacity-50 text-center overflow-hidden"}," or ",-1)),W=w({__name:"account",setup(n){const{logout:u}=S();L({title:"My Account - Vox TV"});const d=[{title:"Watch History",icon:y,url:"/history"},{title:"Liked Videos",icon:k,url:"/likes"}],t=O(),p=V(),m=()=>{u(),t.setLoggedOut(),t.setAuthChecked(!0),console.log("Redirecting to login"),p.push("/login")};return(q,z)=>{const i=f,g=b,x=v;return a(),c("div",T,[e("div",F,[s(t).getLoggedIn&&s(t).getUser?(a(),c("div",R,[e("div",$,[e("img",{alt:"Avatar image",src:s(t).getUser.picture,class:"rounded-full w-14"},null,8,D),e("div",E,l(s(t).getUser.name),1)]),(a(),c(I,null,j(d,o=>r(g,{key:o.url,to:o.url,"aria-label":`Open ${o.title}`,class:"actionButton flex gap-3 items-center justify-center py-4 text-lg"},{default:A(()=>[r(i,{icon:o.icon,class:"w-5"},null,8,["icon"]),_(" "+l(o.title),1)]),_:2},1032,["to","aria-label"])),64)),M,e("button",{"aria-label":"Sign out",onClick:m,class:"signOut w-full flex justify-center items-center gap-2 mt-6 p-3 rounded transition bg-transparent border-accent border-1 border-opacity-40 font-medium"},[r(i,{icon:s(h),class:"signOut w-4"},null,8,["icon"]),_(" Sign Out ")])])):(a(),B(x,{key:1}))])])}}});const X=U(W,[["__scopeId","data-v-8437e2e3"]]);export{X as default};
