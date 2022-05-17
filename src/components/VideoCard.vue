<template>
  <g-link
    v-if="video.attributes"
    class="videoCard videoCard__link"
    :to="`/video/${video.attributes.slug}`"
  >
    <div
      class="videoThumbnail__container bg-accent_lighten dark:bg-dark_lighten aspect-video relative"
    >
      <img
        :data-src="video.attributes.thumbnailURL"
        class="videoThumbnail lazyload w-full h-full object-cover"
        ref="vImg"
      />
      <div
        class="videoDuration absolute bottom-0 right-0 mb-2 mr-2 rounded text-gray-100 text-xs p-1 font-medium"
      >
        {{ formattedDuration }}
      </div>
    </div>
    <h3
      class="videoCard__title text-sm text-text_lighten dark:text-text_dark mt-2 font-medium"
    >
      {{ video.attributes.title }}
    </h3>
    <div
      class="flex gap-1 items-end text-xs text-text_lighten dark:text-dark_text opacity-70 mt-2"
    >
      <p class="videoCard__viewCount">{{ formattedViewCount }} views</p>
      •
      <p class="videoCard__publishDate">
        {{ formattedPublishDate }}
      </p>
    </div>
  </g-link>
  <g-link v-else :to="video.moreLink">
    <div
      class="moreCard flex justify-center items-center text-lg ml-0.5 bg-accent_lighten dark:bg-dark_lighten font-bold"
    >
      View All
    </div>
  </g-link>
</template>

<script>
import 'lazysizes'
const numeral = require('numeral')
const moment = require('moment')

export default {
  name: 'VideoCard',
  props: {
    video: { type: Object, required: true },
  },
  data() {
    return {
      formattedViewCount: this.video.attributes
        ? numeral(this.video.attributes.viewCount).format('0.0a')
        : null,
      formattedPublishDate: this.video.attributes
        ? moment(this.video.attributes.publishedAt).fromNow()
        : null,
      formattedDuration: this.video.attributes
        ? this.video.attributes.duration >= 3600
          ? moment
              .utc(
                moment
                  .duration(this.video.attributes.duration, 'seconds')
                  .asMilliseconds()
              )
              .format('HH:mm:ss')
          : moment
              .utc(
                moment
                  .duration(this.video.attributes.duration, 'seconds')
                  .asMilliseconds()
              )
              .format('mm:ss')
        : null,
    }
  },
}
</script>

<style lang="scss" scoped>
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
