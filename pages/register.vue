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
            aria-label="Log in"
            class="font-medium text-accent dark:text-accent hover:dark:text-accent_lighten"
            to="/login"
            >Log in</NuxtLink
          >
        </p>
        <RegisterForm @registerSuccess="handleRegister" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useLoginStore } from '~~/stores/login'

  useHead({
    title: `Register - Vox TV`,
  })

  definePageMeta({ middleware: ['guest'] })

  const router = useRouter()
  const registered = ref(false)
  const user = ref({})
  const loginStore = useLoginStore()
  const handleRegister = async (userTemp: any) => {
    user.value = userTemp.user
    registered.value = true
    loginStore.setLoggedIn({ jwt: userTemp.jwt, user: userTemp.user })
    router.push('/account')
  }
</script>
