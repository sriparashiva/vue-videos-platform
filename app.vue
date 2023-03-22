<template>
  <NuxtLayout>
    <NuxtLoadingIndicator
      :height="themeStore.dark ? 3 : 5"
      :color="
        themeStore.dark
          ? 'linear-gradient(90deg, rgba(255,172,62,1) 0%, rgba(242,206,159,1) 50%, rgba(255,240,221,1) 100%)'
          : 'linear-gradient(90deg, rgba(255,177,0,1) 0%, rgba(255,213,156,1) 50%, rgba(255,240,221,1) 100%)'
      "
    />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { useLoginStore } from '~~/stores/login'
  import { useThemeStore } from './stores/theme'
  const loginStore = useLoginStore()
  const themeStore = useThemeStore()

  useSchemaOrg([
    defineOrganization({
      name: `Vox - Understand the News`,
      logo: '/favicon.png',
      sameAs: ['https://twitter.com/voxdotcom'],
    }),
    defineWebSite({
      name: `Vox - Understand the News`,
    }),
    defineWebPage(),
  ])

  onMounted(async () => {
    // One-time theme check
    themeStore.initializeTheme()

    // One-time authentication check when app is loaded
    if (!loginStore.getAuthChecked) {
      const user = useStrapiUser()
      if (user.value) {
        const token = useStrapiToken()
        loginStore.setLoggedIn({
          jwt: token.value,
          user: user.value,
        })
      } else {
        loginStore.setLoggedOut()
      }
      loginStore.setAuthChecked(true)
    }
  })
</script>
