<template>
  <Layout>
    <div class="flex justify-center items-center w-full h-full">
      <div
        class="px-10 py-14 my-16 <md:min-w-screen md:(w-512px) bg-accent_lighten dark:bg-dark_lighten"
      >
        <div v-if="$store.getters.loggedIn && $store.getters.user">
          <img
            :src="$store.getters.user.picture"
            class="rounded-full mx-auto w-18 mb-4"
          />
          <div
            class="text-2xl font-bold mb-3 text-center text-text dark:text-dark_text_lighten"
          >
            Welcome<br />{{ $store.getters.user.name }}!
          </div>
          <p
            class="text-base text-text dark:text-dark_text opacity-70 text-center"
          >
            Proceed to the
            <g-link class="font-medium text-accent" to="/">homepage</g-link>
          </p>
          <p
            class="separator my-3 text-text dark:text-dark_text opacity-50 text-center overflow-hidden"
          >
            or
          </p>
          <button
            @click="signOut"
            class="signOut w-full flex justify-center items-center gap-2 mt-6 p-3 transition bg-accent hover:bg-accent_darken text-accent_lighten font-medium"
          >
            <Icon :icon="signOutIcon" color="fill-white" class="w-4" />
            Sign Out
          </button>
        </div>
        <Loader v-else />
      </div>
    </div>
  </Layout>
</template>

<script>
import Loader from '@/components/Loader.vue'
import loadingBar from '@/mixins/LoadingBar.js'
import loggedInOnly from '@/mixins/LoggedInGuard.js'
import { mdiLogoutVariant } from '@mdi/js'
import Icon from '@/components/Icon.vue'

export default {
  name: 'Account',
  components: { Loader, Icon },
  mixins: [loadingBar, loggedInOnly],
  data() {
    return {
      signOutIcon: mdiLogoutVariant,
    }
  },
  methods: {
    signOut() {
      this.$cookies.remove('VoxTV_Session')
      this.$store.commit('setLoggedOut')
      this.$store.commit('setAuthChecked', true)
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped></style>
