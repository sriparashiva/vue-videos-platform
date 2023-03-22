<template>
  <NuxtLink
    v-if="video"
    aria-label="Go to video page"
    class="videoCard videoCard__link flex gap-3"
    :to="`/video/${video.attributes.slug}`"
  >
    <div
      class="videoThumbnail__container bg-accent_lighten dark:bg-dark_lighten aspect-video relative flex-grow-0 flex-shrink-0 basis-3/12"
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
      <!-- <img
        :data-src="video.thumbnailURL"
        class="videoThumbnail lazyload w-full h-full object-cover"
        ref="vImg"
      /> -->
      <div
        class="videoDuration absolute bottom-0 right-0 mb-2 mr-2 rounded text-gray-100 text-xs p-1 font-medium"
      >
        {{ formattedDuration }}
      </div>
    </div>
    <div class="videoCard__meta flex-grow flex-shrink basis-9/12">
      <h3
        class="videoCard__title text-sm text-text dark:text-text_dark font-medium"
      >
        {{ video.attributes.title }}
      </h3>
      <div
        class="text-xs text-text_lighten dark:text-dark_text opacity-70 mt-2"
      >
        <p class="videoCard__viewCount">{{ formattedViewCount }} views</p>
        <p class="<sm:hidden">
          {{ video.attributes.description.substring(0, 100) + `...` }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
  import 'lazysizes'
  import { formatDistanceToNow } from 'date-fns'
  // import numeral from 'numeral-es6'
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

  const formattedViewCount = ref(
    props.video.attributes.viewCount
      ? numbro(Number(props.video.attributes.viewCount)).format({
          average: true,
          mantissa: 1,
        })
      : ''
  )

  const formattedDuration = ref(
    props.video.attributes.duration
      ? secondsToTime(props.video.attributes.duration)
      : ''
  )
</script>

<style lang="scss" scoped>
  .videoCard {
    .videoCard__title {
      transition: 0.2s all ease-in-out;
    }
  }
  .videoCard {
    min-height: 1px;
    transition: all 0.3s ease-in-out;
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
  .moreCard:hover {
    transform: scale(1.02);
  }
  .videoThumbnail__container {
    transform: scale(0.97);
    display: block;
    min-height: 1px;
  }
  @media (max-width: $breakpoint-sm) {
    .videoThumbnail__container {
      height: calc((100vw - 40px) * 0.25 * 9 / 16) !important;
    }
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
