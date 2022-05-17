// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '@/assets/sass/base.scss'
// import 'lazysizes'
import Vuex from 'vuex'
import myStore from '@/store/index.js'
import NProgress from 'nprogress'
import '@/assets/sass/nprogress.scss'
import VueCookies from 'vue-cookies'
import jwtAuth from '@/mixins/JwtAuth.js'

export default async function(Vue, { router, head, appOptions }) {
  // head.link.push({
  //   rel: 'icon',
  //   type: 'image/x-icon',
  //   href: '/assets/images/favicon.ico',
  // })
  head.meta.push({
    name: 'viewport',
    content: 'width=device-width, initial-scale=1',
  })
  head.meta.push({
    name: 'viewport',
    content: 'width=device-width, initial-scale=1',
  })
  head.meta.push({
    hid: 'description',
    name: 'description',
    content:
      'Vox is a general interest news site for the 21st century. Its mission is simple: Explain the news. Politics, public policy, world affairs, pop culture, science, business, food, sports, and everything else that matters are part of our editorial ambit. Our goal is to move people from curiosity to understanding.',
  })
  head.meta.push({
    hid: 'author',
    name: 'author',
    content: 'Rohit Mistry',
  })
  head.meta.push({
    hid: 'og:locale',
    property: 'og:locale',
    content: 'en_GB',
  })
  head.meta.push({
    hid: 'og:title',
    property: 'og:title',
    content: 'Vox - Understand the News',
  })
  head.meta.push({
    hid: 'og:description',
    property: 'og:description',
    content:
      'Vox is a general interest news site for the 21st century. Its mission is simple: Explain the news. Politics, public policy, world affairs, pop culture, science, business, food, sports, and everything else that matters are part of our editorial ambit. Our goal is to move people from curiosity to understanding.',
  })
  // head.meta.push({
  //   hid: 'og:image',
  //   property: 'og:image',
  //   content:
  //     '/assets/images/og.jpg',
  // })
  head.meta.push({
    hid: 'og:url',
    property: 'og:url',
    content: `https://${process.env.GRIDSOME_WEBSITE_DOMAIN}`,
  })
  head.meta.push({ hid: 'og:type', property: 'og:type', content: 'website' })
  head.meta.push({ name: 'twitter:card', content: 'summary' })
  head.meta.push({
    name: 'twitter:title',
    content: `Vox - Understand the News`,
  })

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Add vue store
  Vue.use(Vuex)
  appOptions.store = myStore

  // Add cookies module
  Vue.use(VueCookies)
  // set secure, only https works
  Vue.$cookies.config('30d', '', '', true, 'Strict')

  // Enable devtools on production
  // Vue.config.devtools = true

  router.afterEach((to, from) => {
    if (!to.hash && typeof document !== 'undefined') {
      NProgress.done()
    }
  })
}
