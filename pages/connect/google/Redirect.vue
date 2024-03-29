<template>
  <div class="flex justify-center items-center w-full h-full">
    <div
      v-if="loader"
      class="flex justify-center items-center p-12 min-w-50vw min-h-50vh"
    >
      <Loader />
    </div>
    <div
      v-else
      class="px-10 py-14 my-16 min-w-40vw bg-accent_lighten dark:bg-dark_lighten"
    >
      <div v-if="strapiError.length > 0">
        <p class="text-base text-red-400 opacity-70 text-center">
          {{ strapiError }} <br />Please try
          <NuxtLink
            aria-label="Log in again"
            class="font-medium text-accent dark:text-accent hover:dark:text-accent_lighten"
            to="/login"
            >logging in again</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useLoginStore } from '~~/stores/login'

  const { authenticateProvider } = useStrapiAuth()
  const user = useStrapiUser()
  const token = useStrapiToken()

  const loader = ref(true)
  const strapiError = ref('')
  const route = useRoute()
  const router = useRouter()
  const loginStore = useLoginStore()
  onMounted(async () => {
    if (route.query.access_token) {
      try {
        await authenticateProvider(
          'google',
          route.query.access_token.toString()
        )
        loginStore.setLoggedIn({
          jwt: token.value,
          user: user.value,
        })
        loginStore.setAuthChecked(true)
        router.push('/account')
      } catch (error: any) {
        if (error.response) {
          /*
           * The request was made and the server responded with a
           * status code that falls out of the range of 2xx
           */
          strapiError.value = error.response._data.error.message
        } else {
          // Something happened in setting up the request and triggered an Error
          strapiError.value = 'An unknown error occured.'
        }
        loader.value = false
      }
    } else {
      strapiError.value = 'An error occured in signing you in to Google.'
      loader.value = false
    }
  })
</script>

<style lang="scss" scoped></style>
