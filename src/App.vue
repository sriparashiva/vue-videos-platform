<template>
  <router-view />
</template>

<script>
import jwtAuth from '@/mixins/JwtAuth.js'
export default {
  mixins: [jwtAuth],
  async mounted() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
      this.$store.commit('setDark', true)
    } else {
      document.documentElement.classList.add('light')
      this.$store.commit('setDark', false)
    }

    if (!this.$store.getters.authChecked) {
      // Check for logged in cookie
      if (this.$cookies.isKey('NTV_Session')) {
        // Check if jwt cookie has expired
        let isValid = jwtAuth.validateExpiry(this.$cookies.get('NTV_Session'))

        if (isValid) {
          // Fetch user from strapi using jwt
          const user = await jwtAuth.getUser(this.$cookies.get('NTV_Session'))
          if (user.error) {
            // jwt invalidated by Strapi, set logged out in store and remove cookie
            this.$store.commit('setLoggedOut')
            this.$cookies.remove('NTV_Session')
          } else {
            // User authenticated by Strapi, set logged in and store user
            this.$store.commit('setLoggedIn', {
              jwt: this.$cookies.get('NTV_Session'),
              user: user,
            })
          }
        } else {
          // jwt Cookie expired, set logged out in store and remove cookie
          this.$store.commit('setLoggedOut')
          this.$cookies.remove('NTV_Session')
        }
      } else {
        // No login cookie present, set logged out in store
        this.$store.commit('setLoggedOut')
      }
      // Set authorization checked flag to true
      this.$store.commit('setAuthChecked', true)
    }
  },
  metaInfo() {
    return {
      title: 'Nithyananda TV',
      meta: [
        {
          key: 'description',
          name: 'description',
          content:
            'Livestreams, Events, Discourses and Teachings of SPH Nithyananda Paramashivam',
        },
      ],
    }
  },
}
</script>
