<template>
  <NuxtLink
    aria-label="Go to video page"
    class="videoCard videoCard__link"
    :to="`/video/${props.video.attributes.slug}`"
  >
    <div
      class="videoThumbnail__container bg-accent_lighten dark:bg-dark_lighten aspect-video relative"
    >
      <img
        alt=""
        :data-src="`${config.public.strapi.url}${
          props.video.attributes.coverImage.data.attributes.formats &&
          props.video.attributes.coverImage.data.attributes.formats.xsmall
            ? props.video.attributes.coverImage.data.attributes.formats.xsmall
                .url
            : props.video.attributes.coverImage.data.attributes.url
        }`"
        class="videoThumbnail lazyload w-full h-full object-cover"
        ref="vImg"
      />
      <div
        class="videoDuration absolute bottom-0 right-0 mb-2 mr-2 rounded text-gray-100 text-xs p-1 font-medium"
      >
        {{ formattedDuration }}
      </div>
    </div>
    <div class="videoCard__meta">
      <h3
        class="videoCard__title text-sm text-text dark:text-text_dark mt-2 font-medium"
      >
        {{ props.video.attributes.title }}
      </h3>
      <div
        class="flex gap-1 items-end text-xs text-text_lighten dark:text-dark_text opacity-70 mt-2"
      >
        <p class="videoCard__viewCount">{{ formattedViewCount }} views</p>
        <span v-if="formattedPublishDate.length > 0">•</span>
        <p
          v-if="formattedPublishDate.length > 0"
          class="videoCard__publishDate"
        >
          {{ formattedPublishDate }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
  import 'lazysizes'
  import { formatDistanceToNow, parse } from 'date-fns'
  const config = useRuntimeConfig()
  import numbro from 'numbro'
  const props = defineProps({
    video: { type: Object, required: true },
  })

  const secondsToTime = (secs: any) => {
    var h = Math.floor(secs / (60 * 60))

    var divisor_for_minutes = secs % (60 * 60)
    var m = Math.floor(divisor_for_minutes / 60)

    var divisor_for_seconds = divisor_for_minutes % 60
    var s = Math.ceil(divisor_for_seconds)

    return `${h ? `${h}:` : ''}${
      m ? `${m > 9 ? m : '0' + m}:${s > 9 ? s : '0' + s}` : `00:${s}`
    }`
  }

  const formattedViewCount = ref<string>(
    props.video.attributes
      ? numbro(Number(props.video.attributes.viewCount)).format({
          average: true,
          mantissa: 0,
        })
      : ''
  )

  const formattedPublishDate = ref<string>(
    props.video.attributes.eventDate
      ? formatDistanceToNow(
          parse(props.video.attributes.eventDate, 'yyyy-MM-dd', new Date())
        ) + ' ago'
      : ''
  )
  const formattedDuration = ref<string>(
    props.video.attributes ? secondsToTime(props.video.attributes.duration) : ''
  )
</script>

<style lang="scss" scoped>
  @import '~/assets/sass/variables.scss';
  .videoCard {
    display: block;
    .videoCard__title {
      transition: 0.2s all ease-in-out;
    }
  }
  .videoCard,
  .moreCard {
    min-height: 1px;
    transition: all 0.3s ease-in-out;
    min-width: calc(0.7 * (100vw - 2.5rem));
    max-width: calc(0.7 * (100vw - 2.5rem));
    scroll-snap-align: start;
    @media screen and (min-width: $breakpoint-sm) {
      min-width: calc(0.4 * (100vw - 2.5rem));
      max-width: calc(0.4 * (100vw - 2.5rem));
    }
    @media screen and (min-width: $breakpoint-md) {
      min-width: calc(0.3 * (100vw - 2.5rem));
      max-width: calc(0.3 * (100vw - 2.5rem));
    }
    @media screen and (min-width: $breakpoint-lg) {
      min-width: calc(0.2 * (100vw - 2.5rem));
      max-width: calc(0.2 * (100vw - 2.5rem));
    }
    @media screen and (min-width: $breakpoint-xl) {
      min-width: calc(0.16 * (100vw - 2.5rem));
      max-width: calc(0.16 * (100vw - 2.5rem));
    }
  }
  .moreCard {
    height: calc(0.7 * (100vw - 2.5rem) * 9 / 16);
    @media (min-width: $breakpoint-md) {
      height: calc(0.3 * (100vw - 2.5rem) * 9 / 16);
    }
    @media (min-width: $breakpoint-lg) {
      height: calc(0.2 * (100vw - 2.5rem) * 9 / 16);
    }

    @media (min-width: $breakpoint-xl) {
      height: calc(0.16 * (100vw - 2.5rem) * 9 / 16);
    }
  }
  img.videoThumbnail {
    transition: all 0.5s ease-in-out;
    &.lazyload {
      opacity: 0;
    }
    &.lazyloading {
      opacity: 0;
    }
    &.lazyloaded {
      opacity: 1;
      transform: scale(1.03);
    }
  }
  .videoCard:hover,
  .videoCard:focus {
    .videoCard__title {
      color: $accent;
    }
    img.videoThumbnail {
      transform: scale(1.05);
    }
  }
  .dark .videoCard:hover,
  .dark .videoCard:focus {
    .videoCard__title {
      color: $dark_accent;
    }
  }
  .moreCard:hover {
    transform: scale(1.02);
  }
  .videoThumbnail__container {
    transform: scale(0.97);
    display: block;
    min-height: 1px;
  }
  .videoCard__title {
    //   overflow: hidden;
    text-overflow: ellipsis;
    //   white-space: nowrap;
  }
  .videoDuration {
    background-color: rgba(0, 0, 0, 0.65);
  }
</style>
