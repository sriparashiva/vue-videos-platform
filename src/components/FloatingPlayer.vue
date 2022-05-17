<template>
  <div
    class="floatingPlayer <sm:hidden fixed z-30 bottom-0 right-0 mr-5 mb-5 rounded overflow-hidden"
  >
    <div
      class="actionButtons px-2 w-full mb-2 flex items-center justify-between gap-x-2"
    >
      <g-link to="/live">
        <Icon
          color="fill-gray-200"
          class="actionButtons__icon cursor-pointer transition w-4 transition hover:fill-accent"
          :icon="openIcon"
        />
      </g-link>
      <div @click="$emit('closePlayer')" class="iconss">
        <Icon
          color="fill-gray-200"
          class="actionButtons__icon cursor-pointer transition w-4 transition hover:fill-accent"
          :icon="closeIcon"
        />
      </div>
    </div>
    <div class="aspect-video">
      <iframe
        class="sm:w-200px md:w-300px xl:w-400px"
        id="54bbcb797b3e267a53295023ef9e7a5e"
        src="https://iframe.dacast.com/live/bc4850501756d2c5a80af8ddc5642636/54bbcb797b3e267a53295023ef9e7a5e"
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="no"
        allow="autoplay;encrypted-media"
        allowfullscreen
        webkitallowfullscreen
        mozallowfullscreen
        oallowfullscreen
        msallowfullscreen
      ></iframe>
      <!-- <iframe
        class="sm:w-200px md:w-300px xl:w-400px"
        height="100%"
        :src="
          `https://www.youtube-nocookie.com/embed/${youtubeID}?controls=0&autoplay=1`
        "
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe> -->
    </div>
  </div>
</template>

<script>
import { mdiOpenInNew } from '@mdi/js'
import { mdiWindowClose } from '@mdi/js'
import Icon from '@/components/Icon.vue'

export default {
  name: 'FloatingPlayer',
  props: {
    youtubeID: {
      type: String,
      required: true,
    },
  },
  components: {
    Icon,
  },
  data() {
    return {
      openIcon: mdiOpenInNew,
      closeIcon: mdiWindowClose,
    }
  },
}
</script>

<style lang="scss">
.actionButtons__icon {
  &:hover {
    transform: scale(1.1);
  }
}
</style>
