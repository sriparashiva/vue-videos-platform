<template>
  <div class="flex justify-center items-center">
    <div
      v-if="loginStore.getAuthChecked && !loginStore.getLoggedIn"
      class="px-10 py-14 my-16 <md:min-w-screen md:(w-512px) bg-accent_lighten dark:bg-dark_lighten"
    >
      <div
        class="text-3xl font-bold mb-1 text-text dark:text-dark_text_lighten"
      >
        Log in
      </div>
      <p class="text-base text-text_lighten dark:text-dark_text">
        Don't have an account?
        <NuxtLink
          aria-label="Sign up"
          class="font-medium text-accent dark:text-accent hover:dark:text-accent_lighten"
          to="/register"
          >Sign up</NuxtLink
        >
      </p>
      <a
        :href="`${config.public.strapi.url}/api/connect/google`"
        aria-label="Sign in with Google"
        class="googleLogin flex justify-center items-center gap-2 mt-6 p-3 transition bg-accent hover:bg-accent_darken"
      >
        <Icon :icon="googleIcon" color="fill-white" class="w-5" />
        <span class="font-medium text-white"> Sign in with Google </span>
      </a>
      <!-- <a
        :href="`${config.public.strapi.url}/api/connect/google`"
        class="googleLogin flex justify-center items-center gap-2 mt-6 p-3 transition bg-accent hover:bg-accent_darken"
      >
        <Icon :icon="googleIcon" color="fill-white" class="w-5" />
        <span class="font-medium text-white"> Sign in with Google </span>
      </a> -->
      <p
        class="separator my-3 text-text dark:text-dark_text opacity-50 text-center overflow-hidden"
      >
        or
      </p>
      <LoginForm @loginSuccess="handleLogin" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { mdiGoogle as googleIcon } from '@mdi/js'
  import { useLoginStore } from '~~/stores/login'

  useHead({
    title: `Login - Nithyananda TV`,
  })

  definePageMeta({ middleware: ['guest'] })

  const config = useRuntimeConfig()
  const loginStore = useLoginStore()
  const loggedIn = ref(false)
  // const sessionCookie = useCookie('NTV_Session')
  const router = useRouter()
  const handleLogin = (user: any) => {
    // sessionCookie.value = user.jwt
    loginStore.setLoggedIn({ jwt: user.jwt, user: user.user })
    loginStore.setAuthChecked(true)
    loggedIn.value = true
    router.push('/account')
  }
</script>
