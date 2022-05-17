<template>
  <footer class="px-10 py-12 text-sm bg-accent_lighten dark:bg-dark_lighten">
    <img class="h-3rem mx-auto" src="@/assets/images/logo-rect.svg" />
    <div class="socialLinks my-4 justify-center items-center flex gap-x-4">
      <a
        v-for="(link, index) in socialLinks"
        :key="`social-link-${index}`"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon class="w-5 transition" :icon="link.icon" />
      </a>
    </div>
    <p
      class="my-2 text-text_lighten dark:text-dark_text text-center opacity-80"
    >
      Vox is a general interest news site for the 21st century. Its mission is
      simple: Explain the news.<br />Our goal is to move people from curiosity
      to understanding.
    </p>
  </footer>
</template>

<script>
import {
  mdiFacebook,
  mdiYoutube,
  mdiTwitter,
  mdiInstagram,
  mdiSpotify,
} from '@mdi/js'
import {} from '@mdi/js'
import Icon from '@/components/Icon.vue'
export default {
  name: 'Footer',
  components: { Icon },
  data() {
    return {
      socialLinks: [
        {
          icon: mdiFacebook,
          url: 'https://www.facebook.com/Vox/',
        },
        {
          icon: mdiYoutube,
          url: 'https://www.youtube.com/vox',
        },
        {
          icon: mdiTwitter,
          url: 'https://twitter.com/voxdotcom',
        },
        {
          icon: mdiInstagram,
          url: 'https://www.instagram.com/voxdotcom/',
        },
        {
          icon: mdiSpotify,
          url: 'https://open.spotify.com/show/3pXx5SXzXwJxnf4A5pWN2A',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.socialLinks {
  svg {
    transition: 0.2s all ease-in-out;
    fill: $accent;
    &:hover {
      fill: $accent_darken;
      transform: scale(1.05);
    }
  }
}
.dark .socialLinks {
  svg {
    fill: $info_darken;
    &:hover {
      fill: $primary;
    }
  }
}
</style>
