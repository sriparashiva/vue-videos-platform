<template>
  <div class="flex justify-center items-center">
    <div
      v-if="loginStore.getAuthChecked && !loginStore.getLoggedIn"
      class="px-10 py-14 my-16 <md:min-w-screen md:(w-512px) bg-accent_lighten dark:bg-dark_lighten"
    >
      <div v-if="!registered">
        <div
          class="text-3xl font-bold mb-1 text-text dark:text-dark_text_lighten"
        >
          Get Started
        </div>
        <p class="text-base text-text dark:text-dark_text opacity-70">
          Already have an account?
          <NuxtLink
            class="font-medium text-accent dark:text-accent hover:dark:text-accent_lighten"
            to="/login"
            >Log in</NuxtLink
          >
        </p>
        <!-- <a
          :href="`${config.public.strapi.url}/keycloak/login`"
          class="googleLogin flex justify-center items-center gap-2 mt-6 p-3 transition bg-accent hover:bg-accent_darken"
        >
          <Icon :icon="ssoIcon" color="fill-white" class="w-5" />
          <span class="font-medium text-white">
            Sign in with E-Kailasa account
          </span>
        </a>
        <a
          class="googleLogin flex justify-center items-center gap-2 mt-6 p-3 transition bg-accent hover:bg-accent_darken"
          :href="`${config.public.strapi.url}/api/connect/google`"
        >
          <Icon :icon="googleIcon" color="fill-white" class="w-5" />
          <span class="font-medium text-white"> Sign in with Google </span>
        </a>
        <p
          class="separator my-3 text-text dark:text-dark_text opacity-50 text-center overflow-hidden"
        >
          or
        </p> -->
        <RegisterForm @registerSuccess="handleRegister" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    mdiGoogle as googleIcon,
    mdiShieldKeyOutline as ssoIcon,
  } from '@mdi/js'
  import { useLoginStore } from '~~/stores/login'

  useHead({
    title: `Register - Nithyananda TV`,
  })

  definePageMeta({ middleware: ['guest'] })

  const config = useRuntimeConfig()
  const router = useRouter()
  const registered = ref(false)
  const user = ref({})
  const loginStore = useLoginStore()
  // const sessionCookie = useCookie('NTV_Session')
  const handleRegister = async (userTemp: any) => {
    user.value = userTemp.user
    registered.value = true
    // sessionCookie.value = userTemp.jwt
    loginStore.setLoggedIn({ jwt: userTemp.jwt, user: userTemp.user })
    router.push('/account')
  }
</script>
