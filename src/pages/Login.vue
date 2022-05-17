<template>
  <Layout>
    <div class="flex justify-center items-center">
      <div
        v-if="$store.getters.authChecked && !$store.getters.loggedIn"
        class="px-10 py-14 my-16 <md:min-w-screen md:(w-512px) bg-accent_lighten dark:bg-dark_lighten"
      >
        <div
          class="text-3xl font-bold mb-1 text-text dark:text-dark_text_lighten"
        >
          Log in
        </div>
        <span class="text-base text-text_lighten dark:text-dark_text">
          Don't have an account?
          <g-link
            class="font-medium text-accent dark:text-accent hover:dark:text-accent_lighten"
            to="/register"
            >Sign up</g-link
          >
        </span>
        <a
          :href="`${strapiUrl}/api/connect/google`"
          class="googleLogin flex justify-center items-center gap-2 mt-6 p-3 transition bg-accent hover:bg-accent_darken"
        >
          <Icon :icon="googleIcon" color="fill-white" class="w-5" />
          <span class="font-medium text-white">
            Sign in with Google
          </span>
        </a>
        <div
          class="separator my-3 text-text dark:text-dark_text opacity-50 text-center overflow-hidden"
        >
          or
        </div>
        <LoginForm @loginSuccess="handleLogin" />
      </div>
    </div>
  </Layout>
</template>

<script>
import { mdiGoogle } from '@mdi/js'
import Icon from '@/components/Icon.vue'
import LoginForm from '../components/LoginForm.vue'
import loggedOutOnly from '@/mixins/LoggedOutGuard.js'
import loadingBar from '@/mixins/LoadingBar.js'
export default {
  name: 'Login',
  components: { Icon, LoginForm },
  mixins: [loadingBar, loggedOutOnly],
  data() {
    return {
      googleIcon: mdiGoogle,
      loggedIn: false,
      strapiUrl: process.env.GRIDSOME_STRAPI_URL,
    }
  },
  methods: {
    async handleLogin(user) {
      this.$cookies.set('NTV_Session', user.jwt)
      this.$store.commit('setLoggedIn', { jwt: user.jwt, user: user.user })
      this.$store.commit('setAuthChecked', true)
      this.loggedIn = true
      this.$router.push('/account')
    },
  },
}
</script>
