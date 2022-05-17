<template>
  <div
    ref="hero"
    class="hero h-screen-50vh relative lg:h-screen-60vh xl:h-screen-70vh flex flex-col md:flex-row bg-white dark:bg-dark justify-between"
  >
    <div
      v-if="isLive"
      class="liveChip absolute top-0 right-0 z-20  bg-red-600 p-1 mt-3 mr-3 sm:(mt-6 mr-6) rounded flex jusitfy-center items-center gap-x-1 uppercase text-xs sm:text-sm font-medium tracking-wider"
    >
      <Icon
        color="fill-white"
        class="liveChip__icon w-2 sm:w-3"
        :icon="liveIcon"
      />Live
    </div>
    <div class="hero__cover overflow-hidden">
      <div class="w-full h-full">
        <g-image
          v-if="isLive"
          src="@/assets/images/featured-live-video.jpg"
          class="hero__cover__img w-full h-full object-cover object-center"
        />
        <img
          v-else
          :src="video.attributes.thumbnailURL"
          class="hero__cover__img w-full h-full lazyload object-cover object-center"
        />
      </div>
    </div>
    <div class="hero__text px-10 pt-0 pb-6 flex flex-col justify-center">
      <h1 class="text-2xl font-bold mb-3 text-text dark:text-dark_text_lighten">
        {{ video.attributes.title }}
      </h1>
      <div
        class="flex gap-2 items-end text-sm opacity-60 text-text_lighten dark:text-dark_text"
      >
        <p class="videoCard__publishDate">
          {{ formattedPublishDate }}
        </p>
        •
        <p class="videoCard__viewCount">{{ formattedViewCount }} views</p>
      </div>
      <p
        v-if="$route.path == '/'"
        class="text-xs text-text_lighten dark:text-dark_text overflow-ellipsis overflow-hidden mt-2"
      >
        {{ video.attributes.description.substring(0, 100) + `...` }}
      </p>
      <g-link
        v-if="$route.path == '/'"
        :to="isLive ? '/live' : `/video/${video.attributes.slug}`"
        class="hero__morebutton mt-4 bg-accent px-5 py-2 w-max flex justify-center items-center gap-x-1 text-sm transition-colors hover:bg-accent_darken text-white hover:text-white font-medium"
        ><Icon color="fill-gray-100" class="w-5" :icon="playIcon" />Watch
        Now</g-link
      >
      <button
        v-else
        @click="openVideoModal"
        class="hero__playbutton mt-4 bg-accent px-5 py-2 w-max flex justify-center items-center gap-x-1 text-sm transition-colors hover:bg-accent_darken text-white hover:text-white font-medium"
      >
        <Icon color="fill-gray-100" class="w-5" :icon="playIcon" />
        Play Video
      </button>
    </div>
  </div>
</template>

<script>
import { mdiPlayOutline } from '@mdi/js'
import { mdiRecord } from '@mdi/js'
import Icon from '@/components/Icon.vue'
import BigPicture from 'bigpicture'
import 'lazysizes'
const numeral = require('numeral')
const moment = require('moment')
export default {
  name: 'Hero',
  components: {
    Icon,
  },
  props: {
    video: {
      type: Object,
      required: true,
    },
    isLive: Boolean,
    default: false,
  },
  data() {
    return {
      playIcon: mdiPlayOutline,
      liveIcon: mdiRecord,
      formattedViewCount: numeral(this.video.attributes.viewCount).format(
        '0.0a'
      ),
      formattedLikeCount: numeral(this.video.attributes.likeCount).format(
        '0.0a'
      ),
      formattedPublishDate: moment(this.video.attributes.publishedAt).format(
        'LL'
      ),
      formattedDuration:
        this.video.attributes.duration >= 3600
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
              .format('mm:ss'),
    }
  },
  methods: {
    openVideoModal() {
      BigPicture({
        // element from which animation starts (required)
        el: this.$refs.hero,
        // youtube ID
        ytSrc: this.video.attributes.youtubeID,
        // use youtube-nocookie
        ytNoCookie: false,
        // set custom dimensions for embeds / videos
        dimensions: [1920, 1080],
        // show or hide default loading indicator
        noLoader: true,
      })
    },
  },
}
</script>

<style lang="scss">
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
          $white 0,
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
        rgba(24, 26, 27, 1) 0%,
        rgba(24, 26, 27, 0.1) 50%,
        rgba(24, 26, 27, 0.1) 100%
      );
      @media (min-width: 768px) {
        background-image: linear-gradient(
          to right,
          rgba(24, 26, 27, 1) 0%,
          rgba(24, 26, 27, 0.8) 50%,
          rgba(24, 26, 27, 0.1) 100%
        );
      }
    }
  }
}
@keyframes blink-icon {
  0% {
    opacity: 0.1;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.1;
  }
}
.liveChip__icon {
  animation-name: blink-icon;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
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
