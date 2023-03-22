<template>
  <div
    ref="hero"
    class="hero h-screen-50vh relative lg:h-screen-60vh xl:h-screen-70vh flex flex-col md:flex-row bg-white dark:bg-dark justify-between"
  >
    <div class="hero__cover overflow-hidden">
      <div class="w-full h-full aspect-video">
        <img
          :src="`${config.public.strapi.url}${props.video.attributes.coverImage.data.attributes.url}`"
          class="hero__cover__img w-full h-full lazyload object-cover object-center"
        />
      </div>
    </div>
    <div class="hero__text px-10 pt-0 pb-6 flex flex-col justify-center">
      <h1
        class="text-2xl font-bold mb-3 text-secondary dark:text-dark_text_lighten"
      >
        {{ props.video.attributes.title }}
      </h1>
      <div
        v-if="!route.path.startsWith('/video')"
        class="flex gap-2 items-end text-sm opacity-60 text-text_lighten dark:text-dark_text"
      >
        <p class="videoCard__publishDate">
          {{ formattedPublishDate }}
        </p>
        •
        <p class="videoCard__viewCount">{{ formattedViewCount }} views</p>
      </div>
      <p
        v-if="route.path == '/'"
        class="text-xs text-text_lighten dark:text-dark_text overflow-ellipsis overflow-hidden mt-2"
      >
        {{ props.video.attributes.description.substring(0, 100) + `...` }}
      </p>
      <NuxtLink
        v-if="route.path == '/'"
        :to="`/video/${props.video.attributes.slug}`"
        class="hero__morebutton mt-4 bg-accent px-5 py-2 w-max flex justify-center items-center gap-x-1 text-sm transition-colors hover:bg-accent_darken text-white hover:text-white font-medium"
        ><Icon color="fill-white" class="w-5" :icon="playIcon" />Watch
        Now</NuxtLink
      >
      <button
        v-else
        @click="openVideoModal"
        class="hero__playbutton mt-4 bg-accent px-5 py-2 w-max flex justify-center items-center gap-x-1 text-sm transition-colors hover:bg-accent_darken text-white hover:text-white font-medium"
      >
        <Icon color="fill-white" class="w-5" :icon="playIcon" />
        Play Video
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { mdiPlayOutline as playIcon } from '@mdi/js'
  import { formatDistanceToNow, parse } from 'date-fns'
  import BigPicture from 'bigpicture'
  import 'lazysizes'

  import numbro from 'numbro'
  import { useLoginStore } from '~~/stores/login'
  const loginStore = useLoginStore()
  const route = useRoute()
  const config = useRuntimeConfig()
  const client = useStrapiClient()
  const hero = ref<null | HTMLElement>(null)
  const props = defineProps({
    video: {
      type: Object,
      required: true,
    },
  })

  const formattedViewCount = props.video.attributes.viewCount
    ? numbro(Number(props.video.attributes.viewCount)).format({
        average: true,
        mantissa: 1,
      })
    : null

  const formattedPublishDate = props.video.attributes.eventDate
    ? formatDistanceToNow(
        parse(props.video.attributes.eventDate, 'yyyy-MM-dd', new Date())
      ) + ' ago'
    : null

  const openVideoModal = async () => {
    if (loginStore.getLoggedIn) {
      // Add video to watch history
      try {
        const resp: any = await client(`/users-permissions/watch-history`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${loginStore.getJwt}`,
          },
          params: {
            id: props.video.id,
          },
        })
      } catch (err) {
        console.log(err)
      }
    }
    // Increment video view count
    try {
      const resp: any = await client(`/videos/${props.video.id}/watch`, {
        method: 'POST',
      })
    } catch (err) {
      console.log(err)
    }
    BigPicture({
      // element from which animation starts (required)
      el: hero.value,
      // youtube ID
      ytSrc: props.video.attributes.youtubeID,
      // use youtube-nocookie
      ytNoCookie: false,
      // set custom dimensions for embeds / videos
      dimensions: [1920, 1080],
      // show or hide default loading indicator
      noLoader: true,
    })
  }
</script>

<style lang="scss">
  @import '~/assets/sass/variables.scss';
  .hero {
    .hero__cover {
      flex: 0 0 70%;
      @media screen and (min-width: 768px) {
        order: 2;
      }
      position: relative;
      display: flex;
      flex: 1 1 auto;
      min-height: 0;
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        content: '';
        background-image: linear-gradient(
          to top,
          rgba(256, 256, 256, 1) 0%,
          rgba(256, 256, 256, 0.1) 50%,
          rgba(256, 256, 256, 0.1) 100%
        );

        @media (min-width: 768px) {
          background-image: linear-gradient(
            to right,
            #ffffff 0,
            transparent 50%,
            transparent 100%
          );
        }
      }
      img.hero__cover__img {
        transition: all 0.5s ease-in-out;
        &.lazyloading {
          opacity: 0;
        }
        &.lazyloaded {
          opacity: 1;
        }
      }
    }
    .hero__text {
      flex: 0 0 30%;
      @media screen and (min-width: 768px) {
        order: 1;
      }
    }
  }
  .dark .hero {
    .hero__cover {
      &::after {
        background-image: linear-gradient(
          to top,
          $dark 0%,
          rgba(34, 14, 14, 0.1) 50%,
          rgba(34, 14, 14, 0.1) 100%
        );
        @media (min-width: 768px) {
          background-image: linear-gradient(
            to right,
            $dark 0%,
            rgba(34, 14, 14, 0.5) 50%,
            rgba(34, 14, 14, 0.1) 100%
          );
        }
      }
    }
  }

  #bp_container {
    background: $dark !important;

    #bp_sv {
      box-shadow: none !important;
    }
    .bp-x {
      &:hover {
        transition: opacity 0.3s ease-in-out;
        background: none !important;
        opacity: 1 !important;
      }
    }
  }
</style>
