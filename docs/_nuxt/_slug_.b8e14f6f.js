import{_ as W}from"./Hero.vue.ef132e72.js";import{_ as I,n as q,o as K,p as J,q as Q,r as X,s as G,t as Y,u as Z,b as tt}from"./mdi.d567e790.js";import{a2 as et,v as $,a3 as O,N as st,a4 as V,W as rt,u,$ as at,Q as it,X as nt,o as b,a as C,b as g,e as P,w as H,z as L,E as M,F as ot,r as ct,c as T,i as lt,x as ut,l as dt,B as j,k as ht,A as pt,t as U,f as ft,I as _t,p as mt,h as yt}from"./entry.04416d42.js";import{_ as R}from"./_plugin-vue_export-helper.c27b6911.js";import{_ as gt}from"./VideoSliderSkeleton.f69e4074.js";import{_ as bt}from"./VideoSlider.acfa7851.js";import{a as wt}from"./useApi.d89844ea.js";import{n as A}from"./numbro.min.107d2f30.js";import{f as vt}from"./index.e9cbcaec.js";import{p as xt}from"./VideoCard.b17f5780.js";import"./nuxt-link.d8b12ca1.js";import"./lazysizes.869e4f93.js";import"./CardSkeleton.9fc78275.js";import"./useStrapi.65287fd5.js";const kt=()=>null;function St(...i){var l;const r=typeof i[i.length-1]=="string"?i.pop():void 0;typeof i[0]!="string"&&i.unshift(r);let[s,e,t={}]=i;if(typeof s!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof e!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");t.server=t.server??!0,t.default=t.default??kt,t.lazy=t.lazy??!1,t.immediate=t.immediate??!0;const a=et(),o=()=>a.isHydrating?a.payload.data[s]:a.static.data[s],c=()=>o()!==void 0;a._asyncData[s]||(a._asyncData[s]={data:$(o()??((l=t.default)==null?void 0:l.call(t))??null),pending:$(!c()),error:$(a.payload._errors[s]?O(a.payload._errors[s]):null)});const n={...a._asyncData[s]};n.refresh=n.execute=(_={})=>{if(a._asyncDataPromises[s]){if(_.dedupe===!1)return a._asyncDataPromises[s];a._asyncDataPromises[s].cancelled=!0}if(_._initial&&c())return o();n.pending.value=!0;const y=new Promise((d,h)=>{try{d(e(a))}catch(S){h(S)}}).then(d=>{if(y.cancelled)return a._asyncDataPromises[s];let h=d;t.transform&&(h=t.transform(d)),t.pick&&(h=Bt(h,t.pick)),n.data.value=h,n.error.value=null}).catch(d=>{var h;if(y.cancelled)return a._asyncDataPromises[s];n.error.value=d,n.data.value=u(((h=t.default)==null?void 0:h.call(t))??null)}).finally(()=>{y.cancelled||(n.pending.value=!1,a.payload.data[s]=n.data.value,n.error.value&&(a.payload._errors[s]=O(n.error.value)),delete a._asyncDataPromises[s])});return a._asyncDataPromises[s]=y,a._asyncDataPromises[s]};const p=()=>n.refresh({_initial:!0}),f=t.server!==!1&&a.payload.serverRendered;{const _=at();if(_&&!_._nuxtOnBeforeMountCbs){_._nuxtOnBeforeMountCbs=[];const d=_._nuxtOnBeforeMountCbs;_&&(st(()=>{d.forEach(h=>{h()}),d.splice(0,d.length)}),V(()=>d.splice(0,d.length)))}f&&a.isHydrating&&c()?n.pending.value=!1:_&&(a.payload.serverRendered&&a.isHydrating||t.lazy)&&t.immediate?_._nuxtOnBeforeMountCbs.push(p):t.immediate&&p(),t.watch&&rt(t.watch,()=>n.refresh());const y=a.hook("app:data:refresh",d=>{if(!d||d.includes(s))return n.refresh()});_&&V(y)}const m=Promise.resolve(a._asyncDataPromises[s]).then(()=>n);return Object.assign(m,n),m}function Bt(i,r){const s={};for(const e of r)s[e]=i[e];return s}const Ct={ignoreUnknown:!1,respectType:!1,respectFunctionNames:!1,respectFunctionProperties:!1,unorderedObjects:!0,unorderedArrays:!1,unorderedSets:!1};function $t(i,r={}){r={...Ct,...r};const s=E(r);return s.dispatch(i),s.toString()}function E(i){const r=[];let s=[];const e=t=>{r.push(t)};return{toString(){return r.join("")},getContext(){return s},dispatch(t){return i.replacer&&(t=i.replacer(t)),this["_"+(t===null?"null":typeof t)](t)},_object(t){const a=/\[object (.*)]/i,o=Object.prototype.toString.call(t),c=a.exec(o),n=c?c[1].toLowerCase():"unknown:["+o.toLowerCase()+"]";let p=null;if((p=s.indexOf(t))>=0)return this.dispatch("[CIRCULAR:"+p+"]");if(s.push(t),typeof Buffer<"u"&&Buffer.isBuffer&&Buffer.isBuffer(t))return e("buffer:"),e(t.toString("utf8"));if(n!=="object"&&n!=="function"&&n!=="asyncfunction")if(this["_"+n])this["_"+n](t);else{if(i.ignoreUnknown)return e("["+n+"]");throw new Error('Unknown object type "'+n+'"')}else{let f=Object.keys(t);i.unorderedObjects&&(f=f.sort()),i.respectType!==!1&&!F(t)&&f.splice(0,0,"prototype","__proto__","letructor"),i.excludeKeys&&(f=f.filter(function(m){return!i.excludeKeys(m)})),e("object:"+f.length+":");for(const m of f)this.dispatch(m),e(":"),i.excludeValues||this.dispatch(t[m]),e(",")}},_array(t,a){if(a=typeof a<"u"?a:i.unorderedArrays!==!1,e("array:"+t.length+":"),!a||t.length<=1){for(const n of t)this.dispatch(n);return}const o=[],c=t.map(n=>{const p=E(i);return p.dispatch(n),o.push(p.getContext()),p.toString()});return s=[...s,...o],c.sort(),this._array(c,!1)},_date(t){return e("date:"+t.toJSON())},_symbol(t){return e("symbol:"+t.toString())},_error(t){return e("error:"+t.toString())},_boolean(t){return e("bool:"+t.toString())},_string(t){e("string:"+t.length+":"),e(t.toString())},_function(t){e("fn:"),F(t)?this.dispatch("[native]"):this.dispatch(t.toString()),i.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(t.name)),i.respectFunctionProperties&&this._object(t)},_number(t){return e("number:"+t.toString())},_xml(t){return e("xml:"+t.toString())},_null(){return e("Null")},_undefined(){return e("Undefined")},_regexp(t){return e("regex:"+t.toString())},_uint8array(t){return e("uint8array:"),this.dispatch(Array.prototype.slice.call(t))},_uint8clampedarray(t){return e("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(t))},_int8array(t){return e("int8array:"),this.dispatch(Array.prototype.slice.call(t))},_uint16array(t){return e("uint16array:"),this.dispatch(Array.prototype.slice.call(t))},_int16array(t){return e("int16array:"),this.dispatch(Array.prototype.slice.call(t))},_uint32array(t){return e("uint32array:"),this.dispatch(Array.prototype.slice.call(t))},_int32array(t){return e("int32array:"),this.dispatch(Array.prototype.slice.call(t))},_float32array(t){return e("float32array:"),this.dispatch(Array.prototype.slice.call(t))},_float64array(t){return e("float64array:"),this.dispatch(Array.prototype.slice.call(t))},_arraybuffer(t){return e("arraybuffer:"),this.dispatch(new Uint8Array(t))},_url(t){return e("url:"+t.toString())},_map(t){e("map:");const a=[...t];return this._array(a,i.unorderedSets!==!1)},_set(t){e("set:");const a=[...t];return this._array(a,i.unorderedSets!==!1)},_file(t){return e("file:"),this.dispatch([t.name,t.size,t.type,t.lastModfied])},_blob(){if(i.ignoreUnknown)return e("[blob]");throw new Error(`Hashing Blob objects is currently not supported
Use "options.replacer" or "options.ignoreUnknown"
`)},_domwindow(){return e("domwindow")},_bigint(t){return e("bigint:"+t.toString())},_process(){return e("process")},_timer(){return e("timer")},_pipe(){return e("pipe")},_tcp(){return e("tcp")},_udp(){return e("udp")},_tty(){return e("tty")},_statwatcher(){return e("statwatcher")},_securecontext(){return e("securecontext")},_connection(){return e("connection")},_zlib(){return e("zlib")},_context(){return e("context")},_nodescript(){return e("nodescript")},_httpparser(){return e("httpparser")},_dataview(){return e("dataview")},_signal(){return e("signal")},_fsevent(){return e("fsevent")},_tlswrap(){return e("tlswrap")}}}function F(i){return typeof i!="function"?!1:/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code]\s+}$/i.exec(Function.prototype.toString.call(i))!=null}class D{constructor(r,s){r=this.words=r||[],this.sigBytes=s!==void 0?s:r.length*4}toString(r){return(r||Dt).stringify(this)}concat(r){if(this.clamp(),this.sigBytes%4)for(let s=0;s<r.sigBytes;s++){const e=r.words[s>>>2]>>>24-s%4*8&255;this.words[this.sigBytes+s>>>2]|=e<<24-(this.sigBytes+s)%4*8}else for(let s=0;s<r.sigBytes;s+=4)this.words[this.sigBytes+s>>>2]=r.words[s>>>2];return this.sigBytes+=r.sigBytes,this}clamp(){this.words[this.sigBytes>>>2]&=4294967295<<32-this.sigBytes%4*8,this.words.length=Math.ceil(this.sigBytes/4)}clone(){return new D([...this.words])}}const Dt={stringify(i){const r=[];for(let s=0;s<i.sigBytes;s++){const e=i.words[s>>>2]>>>24-s%4*8&255;r.push((e>>>4).toString(16),(e&15).toString(16))}return r.join("")}},Tt={stringify(i){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s=[];for(let e=0;e<i.sigBytes;e+=3){const t=i.words[e>>>2]>>>24-e%4*8&255,a=i.words[e+1>>>2]>>>24-(e+1)%4*8&255,o=i.words[e+2>>>2]>>>24-(e+2)%4*8&255,c=t<<16|a<<8|o;for(let n=0;n<4&&e*8+n*6<i.sigBytes*8;n++)s.push(r.charAt(c>>>6*(3-n)&63))}return s.join("")}},Pt={parse(i){const r=i.length,s=[];for(let e=0;e<r;e++)s[e>>>2]|=(i.charCodeAt(e)&255)<<24-e%4*8;return new D(s,r)}},Ut={parse(i){return Pt.parse(unescape(encodeURIComponent(i)))}};class zt{constructor(){this._minBufferSize=0,this.blockSize=512/32,this.reset()}reset(){this._data=new D,this._nDataBytes=0}_append(r){typeof r=="string"&&(r=Ut.parse(r)),this._data.concat(r),this._nDataBytes+=r.sigBytes}_doProcessBlock(r,s){}_process(r){let s,e=this._data.sigBytes/(this.blockSize*4);r?e=Math.ceil(e):e=Math.max((e|0)-this._minBufferSize,0);const t=e*this.blockSize,a=Math.min(t*4,this._data.sigBytes);if(t){for(let o=0;o<t;o+=this.blockSize)this._doProcessBlock(this._data.words,o);s=this._data.words.splice(0,t),this._data.sigBytes-=a}return new D(s,a)}}class Lt extends zt{update(r){return this._append(r),this._process(),this}finalize(r){r&&this._append(r)}}const It=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225],Ot=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998],B=[];class Vt extends Lt{constructor(){super(),this.reset()}reset(){super.reset(),this._hash=new D([...It])}_doProcessBlock(r,s){const e=this._hash.words;let t=e[0],a=e[1],o=e[2],c=e[3],n=e[4],p=e[5],f=e[6],m=e[7];for(let l=0;l<64;l++){if(l<16)B[l]=r[s+l]|0;else{const k=B[l-15],v=(k<<25|k>>>7)^(k<<14|k>>>18)^k>>>3,x=B[l-2],z=(x<<15|x>>>17)^(x<<13|x>>>19)^x>>>10;B[l]=v+B[l-7]+z+B[l-16]}const _=n&p^~n&f,y=t&a^t&o^a&o,d=(t<<30|t>>>2)^(t<<19|t>>>13)^(t<<10|t>>>22),h=(n<<26|n>>>6)^(n<<21|n>>>11)^(n<<7|n>>>25),S=m+h+_+Ot[l]+B[l],w=d+y;m=f,f=p,p=n,n=c+S|0,c=o,o=a,a=t,t=S+w|0}e[0]=e[0]+t|0,e[1]=e[1]+a|0,e[2]=e[2]+o|0,e[3]=e[3]+c|0,e[4]=e[4]+n|0,e[5]=e[5]+p|0,e[6]=e[6]+f|0,e[7]=e[7]+m|0}finalize(r){super.finalize(r);const s=this._nDataBytes*8,e=this._data.sigBytes*8;return this._data.words[e>>>5]|=128<<24-e%32,this._data.words[(e+64>>>9<<4)+14]=Math.floor(s/4294967296),this._data.words[(e+64>>>9<<4)+15]=s,this._data.sigBytes=this._data.words.length*4,this._process(),this._hash}}function jt(i){return new Vt().finalize(i).toString(Tt)}function At(i,r={}){const s=typeof i=="string"?i:$t(i,r);return jt(s).slice(0,10)}function N(i,r,s){const[e={},t]=typeof r=="string"?[{},r]:[r,s],a=e.key||At([t,u(e.baseURL),typeof i=="string"?i:"",u(e.params||e.query)]);if(!a||typeof a!="string")throw new TypeError("[nuxt] [useFetch] key must be a string: "+a);if(!i)throw new Error("[nuxt] [useFetch] request is missing.");const o=a===t?"$f"+a:a,c=it(()=>{let v=i;return typeof v=="function"&&(v=v()),u(v)}),{server:n,lazy:p,default:f,transform:m,pick:l,watch:_,immediate:y,...d}=e,h=nt({...d,cache:typeof e.cache=="boolean"?void 0:e.cache}),S={server:n,lazy:p,default:f,transform:m,pick:l,immediate:y,watch:[h,c,..._||[]]};let w;return St(o,()=>{var x;return(x=w==null?void 0:w.abort)==null||x.call(w),w=typeof AbortController<"u"?new AbortController:{},typeof c.value=="string"&&c.value.startsWith("/"),(e.$fetch||globalThis.$fetch)(c.value,{signal:w.signal,...h})},S)}const Ft={name:"SocialShare",components:{Icon:I},props:{title:{type:String,required:!0},url:{type:String,required:!0}},data(){return{copyIcon:q,showTooltip:!1,socialPlatforms:[{icon:K,platform:"facebook",shareUrl:`https://www.facebook.com/sharer.php?u=${this.url}
`},{icon:J,platform:"twitter",shareUrl:`https://twitter.com/intent/tweet?url=${this.url}&text=${this.title}&via=voxdotcom&hashtags=Vox`},{icon:Q,platform:"reddit",shareUrl:`https://reddit.com/submit?url=${this.url}&title=${this.title}`},{icon:X,platform:"linkedin",shareUrl:`https://www.linkedin.com/sharing/share-offsite/?url=${this.url}`},{icon:G,platform:"weibo",shareUrl:`http://service.weibo.com/share/share.php?url=${this.url}&appkey=&title=${this.title}&pic=&ralateUid=`},{icon:Y,platform:"email",shareUrl:`mailto:?subject=${this.title}&amp;body=Watch this video ${this.url}`}]}},methods:{copyClipboard(){navigator.clipboard.writeText(this.url),this.showTooltip=!0,setTimeout(()=>{this.showTooltip=!1},2e3)}}},Nt={class:"shareButtons flex gap-x-3"},Ht={key:0,class:"copyTooltip bg-accent_lighten text-text dark:text-dark_text dark:bg-dark_lighten p-2 rounded text-xs absolute bottom-0 mb-9 whitespace-nowrap"},Mt=["data-network","data-title","data-url","href","aria-label"];function Rt(i,r,s,e,t,a){const o=I;return b(),C("div",Nt,[g("button",{"aria-label":"Copy to Clipboard",class:"relative socialShare",onClick:r[0]||(r[0]=(...c)=>a.copyClipboard&&a.copyClipboard(...c))},[P(M,{name:"fade"},{default:H(()=>[t.showTooltip?(b(),C("div",Ht," Link copied to clipboard! ")):L("",!0)]),_:1}),P(o,{icon:t.copyIcon,color:"fill-gray-400 w-5",class:"transition hover:fill-white"},null,8,["icon"])]),(b(!0),C(ot,null,ct(t.socialPlatforms,(c,n)=>(b(),C("a",{class:"socialShare","data-network":c.platform,"data-title":s.title,"data-url":s.url,href:c.shareUrl,"aria-label":`Share this video on ${c.platform}`,target:"_blank"},[(b(),T(o,{key:`social-share-${n}`,icon:c.icon,class:"w-6 transition"},null,8,["icon"]))],8,Mt))),256))])}const Et=R(Ft,[["render",Rt],["__scopeId","data-v-b1406c08"]]),Wt=i=>(mt("data-v-ad024739"),i=i(),yt(),i),qt={class:"video__description flex p-10 gap-8 <sm:flex-col"},Kt={class:"share__bar"},Jt=["src"],Qt=Wt(()=>g("div",{class:"text-lg font-medium mb-2"},"Share this video:",-1)),Xt={class:"video__text flex-grow-1"},Gt={class:"video__meta flex justify-between items-center pb-2 border-b-1 border-accent_darken border-opacity-20"},Yt={class:"flex gap-2 items-end text-sm opacity-80 text-text_lighten dark:text-dark_text"},Zt={class:"videoCard__viewCount"},te={key:0,class:"video__like"},ee={class:"text-sm opacity-80"},se={class:"text-sm whitespace-pre-line"},re={key:1,class:"video__watchmore"},ae=lt({__name:"[slug]",async setup(i){let r,s;const e=ut(),t=_t(),a=dt(),o=([r,s]=j(()=>wt(e.params.slug.toString())),r=await r,s(),r);ht({title:`${o.attributes.title} - Vox TV`,meta:[{name:"description",content:o.attributes.description.substring(0,160)},{name:"og:title",content:`${o.attributes.title} - Vox TV`},{name:"og:description",content:o.attributes.description.substring(0,160)},{name:"og:image",content:o.attributes.coverImage.data.attributes.url}]});const c=$(!0),n=`https://${t.public.websiteDomain}${e.path}`,p=A(Number(o.attributes.viewCount)).format({average:!0,mantissa:1}),f=o.attributes.likeCount?A(Number(o.attributes.likeCount)).format({average:!0,mantissa:1}):"",m=vt(xt(o.attributes.eventDate.toString(),"yyyy-MM-dd",new Date))+" ago",l=$(!1),_=pt(),y=$(null);if(o.attributes.playlists&&o.attributes.playlists.data.length>0){const h=([r,s]=j(()=>_("/playlists/with-videos",{params:{filters:{id:{$eq:o.attributes.playlists.data[0].id}}}})),r=await r,s(),r);y.value=h.data[0],c.value=!1}else c.value=!1;const d=async()=>{l.value?(await N(`${t.public.strapi.url}/api/users-permissions/unlike-video?id=${o.id}`,{method:"POST",headers:{Authorization:`Bearer ${a.getJwt}`}},"$uOT4gqnvzP"),l.value=!1,a.removeFromLikedVideos(o.id.toString())):(await N(`${t.public.strapi.url}/api/users-permissions/like-video?id=${o.id}`,{method:"POST",headers:{Authorization:`Bearer ${a.getJwt}`}},"$wj83ySUDfv"),l.value=!0,a.addToLikedVideos(o.id.toString()))};return(h,S)=>{const w=W,k=Et,v=I,x=gt,z=bt;return b(),C("div",null,[P(w,{video:u(o)},null,8,["video"]),g("div",qt,[g("div",Kt,[g("img",{class:"<sm:hidden video__thumbnail transition-opacity aspect-video flex-grow-0 flex-shrink-1 sm:max-w-30vw h-max mb-4",src:`${u(t).public.strapi.url}${u(o).attributes.coverImage.data.attributes.formats&&u(o).attributes.coverImage.data.attributes.formats.xsmall?u(o).attributes.coverImage.data.attributes.formats.xsmall.url:u(o).attributes.coverImage.data.attributes.url}
          `},null,8,Jt),Qt,P(k,{title:u(o).attributes.title,url:n},null,8,["title"])]),g("div",Xt,[g("div",Gt,[g("div",Yt,[g("p",{class:"videoCard__publishDate"},U(m)),ft(" • "),g("p",Zt,U(u(p))+" views",1)]),u(a).getLoggedIn?(b(),C("div",te,[g("button",{"aria-label":"Like",onClick:d,class:"like__button flex gap-2 items-center text-text_lighten dark:text-dark_text transition hover:text-accent_darken hover:dark:text-accent hover:opacity-100"},[u(l)?(b(),T(v,{key:0,color:"fill-accent_darken",class:"w-4",icon:u(Z)},null,8,["icon"])):(b(),T(v,{key:1,class:"w-4",icon:u(tt)},null,8,["icon"])),g("span",ee,U(u(l)?`${u(f)} Likes`:"Like this video"),1)])])):L("",!0)]),g("p",se,U(u(o).attributes.description),1)])]),u(c)?(b(),T(M,{key:0,name:"fade"},{default:H(()=>[P(x)]),_:1})):(b(),C("div",re,[u(y)?(b(),T(z,{key:0,playlist:u(y)},null,8,["playlist"])):L("",!0)]))])}}});const be=R(ae,[["__scopeId","data-v-ad024739"]]);export{be as default};