import VueGtag from 'vue-gtag'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  if (config.public.productionMode) {
    nuxtApp.vueApp.use(VueGtag, {
      config: {
        id: config.public.googleAnalyticsId,
      },
    })
  }
})
