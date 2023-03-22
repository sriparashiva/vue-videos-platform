import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  if (config.public.productionMode) {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: config.public.googleAnalyticsId,
      },
    })
  }
})
