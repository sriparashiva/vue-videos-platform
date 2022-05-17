<template>
  <div
    class="userBar color-gray-100 py-2 px-6 flex justify-end gap-4 w-full bg-theme_dark border-b-1 border-warm-gray-600 border-opacity-40"
  >
    <g-link
      to="/account"
      v-if="$store.getters.loggedIn"
      class="account transition text-accent_dark hover:(text-accent) flex gap-3 items-center"
    >
      <img :src="$store.getters.user.picture" class="w-8 rounded-full" />
      <div class="text-base">
        {{ $store.getters.user.name }}
      </div>
    </g-link>
    <div v-else>
      <g-link
        class="signIn px-4 py-1 border-1 border-accent_dark border-opacity-40 text-accent_dark transition hover:(border-opacity-100 text-accent) text-sm uppercase tracking-widest font-medium flex gap-2 items-center"
        to="/login"
        ><Icon class="w-4" :icon="userIcon" />Sign In</g-link
      >
    </div>
  </div>
</template>

<script>
import { mdiAccountCircleOutline } from '@mdi/js'
import Icon from '@/components/Icon.vue'
export default {
  name: 'UserBar',
  components: { Icon },
  data() {
    return {
      userIcon: mdiAccountCircleOutline,
    }
  },
}
</script>

<style lang="scss" scoped>
.signIn {
  svg {
    transition: 0.2s ease-in-out;
    fill: $accent_dark;
  }
  &:hover {
    svg {
      fill: $accent;
    }
    color: $accent;
  }
}
</style>
