<template>
  <footer
    class="px-10 py-12 <md:pb-18 text-sm bg-accent_lighten dark:bg-dark_lighten"
  >
    <img
      alt="Brand logo of Vox"
      class="h-3rem mx-auto"
      src="@/assets/images/logo-rect.svg"
    />
    <div
      class="my-2 text-text_lighten dark:text-dark_text text-center opacity-80"
    >
      <!-- <p>
        &copy; {{ new Date().getFullYear() }} Vox - Understand the News. All
        rights reserved.
      </p> -->
      <p class="my-2">
        Vox is a general interest news site for the 21st century. Its mission is
        simple: Explain the news. Our goal is to move people from curiosity to
        understanding.
      </p>
    </div>
    <div class="socialLinks my-4 justify-center items-center flex gap-x-4">
      <a
        v-for="(link, index) in socialLinks"
        :key="`social-link-${index}`"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Visit Vox on ${link.name}`"
      >
        <Icon class="w-5 transition" :icon="link.icon" />
      </a>
    </div>
  </footer>
</template>

<script>
  import { mdiFacebook } from '@mdi/js'
  import { mdiYoutube } from '@mdi/js'
  import { mdiTwitter } from '@mdi/js'
  import { mdiInstagram } from '@mdi/js'
  import { mdiWeb } from '@mdi/js'
  import { mdiSpotify } from '@mdi/js'
  import Icon from '@/components/Icon.vue'
  export default {
    name: 'Footer',
    components: { Icon },
    data() {
      return {
        socialLinks: [
          {
            name: 'Facebook',
            icon: mdiFacebook,
            url: 'https://facebook.com/Vox',
          },
          {
            name: 'Youtube',
            icon: mdiYoutube,
            url: 'https://www.youtube.com/@Vox',
          },
          {
            name: 'Twitter',
            icon: mdiTwitter,
            url: 'https://twitter.com/voxdotcom',
          },
          {
            name: 'Instagram',
            icon: mdiInstagram,
            url: 'https://instagram.com/voxdotcom',
          },
          {
            name: 'Spotify',
            icon: mdiSpotify,
            url: 'https://open.spotify.com/show/3pXx5SXzXwJxnf4A5pWN2A',
          },
          {
            name: 'Web',
            icon: mdiWeb,
            url: 'https://vox.com',
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
