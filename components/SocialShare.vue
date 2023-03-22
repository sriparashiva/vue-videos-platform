<template>
  <div class="shareButtons flex gap-x-3">
    <button
      aria-label="Copy to Clipboard"
      class="relative socialShare"
      @click="copyClipboard"
    >
      <Transition name="fade">
        <div
          v-if="showTooltip"
          class="copyTooltip bg-accent_lighten text-text dark:text-dark_text dark:bg-dark_lighten p-2 rounded text-xs absolute bottom-0 mb-9 whitespace-nowrap"
        >
          Link copied to clipboard!
        </div>
      </Transition>
      <Icon
        :icon="copyIcon"
        color="fill-gray-400 w-5"
        class="transition hover:fill-white"
      />
    </button>
    <a
      class="socialShare"
      v-for="(item, index) in socialPlatforms"
      :data-network="item.platform"
      :data-title="title"
      :data-url="url"
      :href="item.shareUrl"
      :aria-label="`Share this video on ${item.platform}`"
      target="_blank"
    >
      <Icon
        :key="`social-share-${index}`"
        :icon="item.icon"
        class="w-6 transition"
      />
    </a>
  </div>
</template>

<script>
  import { mdiFacebook } from '@mdi/js'
  import { mdiTwitter } from '@mdi/js'
  import { mdiSinaWeibo } from '@mdi/js'
  import { mdiEmail } from '@mdi/js'
  import { mdiLinkVariant } from '@mdi/js'
  import { mdiReddit } from '@mdi/js'
  import { mdiLinkedin } from '@mdi/js'
  import Icon from '@/components/Icon.vue'
  export default {
    name: 'SocialShare',
    components: { Icon },
    props: {
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        copyIcon: mdiLinkVariant,
        showTooltip: false,
        socialPlatforms: [
          {
            icon: mdiFacebook,
            platform: 'facebook',
            shareUrl: `https://www.facebook.com/sharer.php?u=${this.url}
`,
          },
          {
            icon: mdiTwitter,
            platform: 'twitter',
            shareUrl: `https://twitter.com/intent/tweet?url=${this.url}&text=${this.title}&via=SriNithyananda&hashtags=Kailasa,Nithyananda`,
          },
          {
            icon: mdiReddit,
            platform: 'reddit',
            shareUrl: `https://reddit.com/submit?url=${this.url}&title=${this.title}`,
          },
          {
            icon: mdiLinkedin,
            platform: 'linkedin',
            shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${this.url}`,
          },
          {
            icon: mdiSinaWeibo,
            platform: 'weibo',
            shareUrl: `http://service.weibo.com/share/share.php?url=${this.url}&appkey=&title=${this.title}&pic=&ralateUid=`,
          },
          {
            icon: mdiEmail,
            platform: 'email',
            shareUrl: `mailto:?subject=${this.title}&amp;body=Watch this video ${this.url}`,
          },
        ],
      }
    },
    methods: {
      copyClipboard() {
        navigator.clipboard.writeText(this.url)
        this.showTooltip = true
        setTimeout(() => {
          this.showTooltip = false
        }, 2000)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .socialShare {
    svg {
      transition: 0.2s all ease-in-out;
      fill: $accent;
      &:hover {
        fill: $accent_darken;
        transform: scale(1.05);
      }
    }
  }
  .dark .socialShare {
    svg {
      fill: $info_darken;
      &:hover {
        fill: $primary;
      }
    }
  }
</style>
