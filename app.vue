<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="3" color="#FFF300" />
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
