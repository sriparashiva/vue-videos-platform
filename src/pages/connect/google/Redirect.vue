<template>
  <Layout>
    <div class="flex justify-center items-center w-full h-full">
      <div
        v-if="loader"
        class="flex justify-center items-center p-12 min-w-50vw min-h-50vh"
      >
        <Loader />
      </div>
      <div
        v-else
        class="px-10 py-14 mt-16 min-w-40vw bg-accent_lighten dark:bg-dark_lighten"
      >
        <div v-if="strapiError">
          <p class="text-base text-red-400 opacity-70 text-center">
            {{ strapiError }} <br />Please try
            <g-link
              class="font-medium text-accent dark:text-accent hover:dark:text-accent_lighten"
              to="/login"
              >logging in again</g-link
            >
          </p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
const axios = require('axios')
import Loader from '@/components/Loader.vue'
import loadingBar from '@/mixins/LoadingBar.js'
export default {
  name: 'Redirect',
  components: { Loader },
  mixins: [loadingBar],
  data() {
    return {
      loader: true,
      strapiError: null,
    }
  },
  async mounted() {
    if (this.$route.query.access_token) {
      axios
        .get(
          `${
            process.env.GRIDSOME_STRAPI_URL
          }/api/auth/google/callback?access_token=${
            this.$route.query.access_token
          }`
        )
        .then(async (response) => {
          this.$cookies.set('VoxTV_Session', response.data.jwt)
          this.$store.commit('setLoggedIn', {
            jwt: response.data.jwt,
            user: response.data.user,
          })
          this.$store.commit('setAuthChecked', true)
          this.$router.push('/account')
        })
        .catch((error) => {
          // Handle error.
          // console.log('An error occurred:', error.response.data.error)
          if (error.response.data.error) {
            this.strapiError = error.response.data.error.message
          } else {
            this.strapiError = 'An unknown error occured.'
          }
          this.loader = false
        })
    } else {
      this.strapiError = 'An error occured in signing you in to Google.'
      this.loader = false
    }
  },
}
</script>

<style lang="scss" scoped></style>
