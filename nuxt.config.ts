// https://nuxt.com/docs/api/configuration/nuxt-config
import aspectRatioPlugin from 'windicss/plugin/aspect-ratio'
import scrollSnapPlugin from 'windicss/plugin/scroll-snap'
import { isProduction } from 'std-env'
import axios from 'axios'

let allRoutes: Array<String> = []

const getRoutes = async (type: string) => {
  let page = 1
  let pageCount = null
  let slugs = []
  do {
    let resp: any = await axios.get(
      `${process.env.NUXT_SERVERSIDE_STRAPI_URL}/api/${type}s?pagination[page]=${page}&pagination[pageSize]=100&fields[0]=slug`
    )
    if (!pageCount) pageCount = resp.data.meta.pagination.pageCount
    page++

    slugs.push(
      ...resp.data.data.map((each: any) => {
        return `/${type}/` + each.attributes.slug
      })
    )
  } while (page <= pageCount)
  return slugs
}

export default defineNuxtConfig({
  // debug: true,
  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.dev) {
        return
      }
      let videoSlugs = await getRoutes('video')
      let playlistSlugs = await getRoutes('playlist')

      console.log('Pre-render routes fetched')
      allRoutes.push(...videoSlugs)
      allRoutes.push(...playlistSlugs)

      nitroConfig.prerender?.routes?.push(...videoSlugs)
      nitroConfig.prerender?.routes?.push(...playlistSlugs)

      return
    },
  },
  app: {
    head: {
      title: `Vox - Understand the News`,
      meta: [
        {
          name: `description`,
          content: `Vox is a general interest news site for the 21st century. Its mission is simple: Explain the news. Politics, public policy, world affairs, pop culture, science, business, food, sports and everything else that matters are part of our editorial ambit. Our goal is to move people from curiosity to understanding.`,
        },
        {
          name: `og:title`,
          content: `Vox - Understand the News`,
        },
        {
          name: `og:description`,
          content: `Vox is a general interest news site for the 21st century. Its mission is simple: Explain the news. Politics, public policy, world affairs, pop culture, science, business, food, sports and everything else that matters are part of our editorial ambit. Our goal is to move people from curiosity to understanding.`,
        },
        {
          name: `og:image`,
          content: `https://${process.env.NUXT_WEBSITE_DOMAIN}/vox-og.jpg`,
        },
        {
          name: `author`,
          content: `Rohit Mistry`,
        },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  runtimeConfig: {
    strapi: {
      // nuxt/strapi options available server-side
      url: process.env.NUXT_SERVERSIDE_STRAPI_URL,
    },
    public: {
      websiteDomain: process.env.NUXT_WEBSITE_DOMAIN,
      livechatServer: process.env.NUXT_LIVECHAT_SERVER,
      googleAnalyticsId: process.env.NUXT_GOOGLE_ANALYTICS_ID,
      productionMode: isProduction,
      strapi: {
        // nuxt/strapi options available client-side
        url: process.env.NUXT_CLIENTSIDE_STRAPI_URL,
      },
    },
  },
  modules: [
    'nuxt-windicss',
    '@nuxtjs/strapi',
    '@pinia/nuxt',
    '@nuxtjs/robots',
    'nuxt-schema-org',
    'nuxt-simple-sitemap',
  ],
  sitemap: {
    hostname: `https://${process.env.NUXT_WEBSITE_DOMAIN}`,
    urls: () => {
      return allRoutes.map((page) => ({
        url: page,
        changefreq: 'yearly',
        priority: 0.6,
      }))
    },
  },
  schemaOrg: {
    host: `https://${process.env.NUXT_WEBSITE_DOMAIN}`,
    title: `Vox - Understand the News`,
    description: `Vox is a general interest news site for the 21st century. Its mission is simple: Explain the news. Politics, public policy, world affairs, pop culture, science, business, food, sports and everything else that matters are part of our editorial ambit. Our goal is to move people from curiosity to understanding.`,
  },
  strapi: {
    url: process.env.NUXT_STRAPI_URL,
    prefix: '/api',
    version: 'v4',
    cookie: {
      sameSite: true,
    },
    cookieName: 'Vox_Session',
  },
  windicss: {
    config: {
      attributify: true,
      darkMode: 'class', // or 'media'
      // prefix: 'tw-',
      theme: {
        extend: {
          colors: {
            // theme_bg: '#240909',
            // theme_dark: '#1A0000',
            // theme_light: '#3A1919',
            // theme_lighter: '#502727',
            // accent: '#fef08a',
            // accent_light: '#fef9c3',
            // accent_dark: '#d1af83',
            // text_light: '#ffe4e6',
            // text_dark: '#d6d3d1',
            // primary: '#FFF200',
            // accent: '#4E7177',
            // accent_darken: '#33555A',
            // accent_lighten: '#F1F3F2',
            // dark_accent: '#6DA0A9',
            // text: '#4C4E4D',
            // text_lighten: '#626262',
            // info: '#E9E7E8',
            // info_darken: '#b4b4b4',
            // dark_info: '#282a2b',
            // dark: '#181A1B',
            // dark_lighten: '#202223',
            // dark_text: '#B7B1A8',
            // dark_text_lighten: '#CFC8BE',
            // white: '#ffffff',
            accent_light: '#fef9c3',
            accent_dark: '#d1af83',
            text_light: '#ffe4e6',
            text_dark: '#d6d3d1',
            primary: '#FFF200',
            dark_accent: '#6DA0A9',
            accent: '#4E7177',
            accent_darken: '#33555A',
            accent_lighten: '#F1F3F2',
            text: '#4C4E4D',
            text_lighten: '#626262',
            info: '#E9E7E8',
            info_darken: '#b4b4b4',
            dark_info: '#282a2b',
            theme_lighter: '#282a2b',
            dark: '#181A1B',
            dark_lighten: '#202223',
            dark_text: '#B7B1A8',
            dark_text_lighten: '#CFC8BE',
            white: '#ffffff',
            secondary: '#202223',
          },
        },
      },
      plugins: [
        scrollSnapPlugin,
        aspectRatioPlugin,
        // require('windicss/plugin/aspect-ratio'),
        // ...
      ],
    },
  },
  css: [
    'virtual:windi-base.css',
    '~/assets/sass/base.scss',
    'virtual:windi-components.css',
    'virtual:windi-utilities.css',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/sass/variables.scss";',
        },
      },
    },
  },
})
