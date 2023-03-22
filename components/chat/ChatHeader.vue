<template>
  <div
    class="chat__header px-5 py-3 flex-grow-0 flex gap-x-3 border-b-1 border-accent_darken border-opacity-15"
  >
    <Icon class="w-5" color="fill-accent" :icon="chatIcon" />
    <div class="header__text text-lg font-medium">Live Chat</div>
  </div>
</template>

<script>
import { mdiForum } from '@mdi/js'
import Icon from '@/components/Icon.vue'
export default {
  name: 'ChatHeader',
  components: { Icon },
  data() {
    return {
      chatIcon: mdiForum,
    }
  },
}
</script>
