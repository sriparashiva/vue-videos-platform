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
  //   rel: 'stylesheet',
  //   href:
  //     'https://fonts.googleapis.com/css2?family=Balto:wght@400;500;600&display=swap',
  // })
  // Add an external CSS file
  head.link.push({
    rel: 'icon',
    type: 'image/x-icon',
    href: 'https://nithyananda.tv/assets/images/favicon.ico',
  })
  // Add a meta tag
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
    content: 'Livestreams, Events, Discourses of SPH Nithyananda Paramashivam',
  })
  head.meta.push({
    hid: 'author',
    name: 'author',
    content: 'SPH Nithyananda Paramashivam',
  })
  head.meta.push({
    hid: 'og:locale',
    property: 'og:locale',
    content: 'en_GB',
  })
  head.meta.push({
    hid: 'og:title',
    property: 'og:title',
    content: 'Nithyananda TV',
  })
  head.meta.push({
    hid: 'og:description',
    property: 'og:description',
    content:
      'Livestreams, Events, Discourses and Teachings of SPH Nithyananda Paramashivam',
  })
  head.meta.push({
    hid: 'og:image',
    property: 'og:image',
    content:
      'https://nithyananda.tv/assets/images/kailasa-nithyananda-tv-og.jpg',
  })
  head.meta.push({
    hid: 'og:url',
    property: 'og:url',
    content: `https://${process.env.GRIDSOME_WEBSITE_DOMAIN}`,
  })
  head.meta.push({ hid: 'og:type', property: 'og:type', content: 'website' })
  head.meta.push({ name: 'twitter:card', content: 'summary' })
  head.meta.push({
    name: 'twitter:title',
    content: `KAILASA's Nithyananda TV`,
  })
  head.meta.push({
    name: 'twitter:description',
    content: 'Livestreams, Events, Discourses of SPH Nithyananda Paramashivam',
  })
  head.meta.push({ name: 'twitter:site', content: '@SriNithyananda' })
  head.meta.push({ name: 'twitter:creator', content: '@SriNithyananda' })
  head.meta.push({
    name: 'twitter:image',
    content:
      'https://nithyananda.tv/assets/images/kailasa-nithyananda-tv-og.jpg',
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

  // // Set routes reserved for logged out users only
  // const loggedOutRoutes = ['/login', '/register']

  // // Set routes reserved for logged in users only
  // const loggedInRoutes = ['/account']

  // // Set global router guards for protected routes
  // router.beforeEach((to, from, next) => {
  //   // Check for logged out routes
  //   if (
  //     to.matched.some((record) => loggedOutRoutes.indexOf(record.path) >= 0) &&
  //     appOptions.store.getters.loggedIn
  //   ) {
  //     // User is logged in, redirect to account page
  //     next('/account')
  //   }
  //   // Check for logged in routes
  //   else if (
  //     to.matched.some((record) => loggedInRoutes.indexOf(record.path) >= 0) &&
  //     !appOptions.store.getters.loggedIn
  //   ) {
  //     // User is logged out, redirect to login page
  //     next('/login')
  //   }
  //   else {
  //     // Route is not a protected route
  //     next()
  //   }
  //   // if (to.matched.some((record) => record.path.lastIndexOf('/login') === 0)) {
  //   //   console.log('Matched login!')
  //   // }
  // })

  router.afterEach((to, from) => {
    if (!to.hash && typeof document !== 'undefined') {
      NProgress.done()
    }
  })
}
