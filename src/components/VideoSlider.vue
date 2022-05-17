<template>
  <div class="my-10">
    <div class="slider__header flex gap-x-4 items-center mb-4 <sm:px-6 px-10">
      <div class="slider__text">
        <h2 class="text-2xl font-bold text-text dark:text-dark_text_lighten">
          {{
            $route.path.startsWith('/video/')
              ? `Related Videos`
              : playlist.attributes.title
          }}
        </h2>
      </div>
      <g-link
        v-if="!$route.path.startsWith('/video/')"
        :to="`/playlist/${playlist.attributes.slug}`"
        class="text-sm text-accent text-opacity-80 pt-1 carousel__header__moreLink hover:dark:text-accent_lighten font-medium"
      >
        View All
      </g-link>
    </div>
    <p
      v-if="!$route.path.startsWith('/video/')"
      class="text-sm <sm:px-6 px-10 mb-6 text-text_lighten dark:text-dark_text opacity-80"
    >
      {{ playlist.attributes.description }}
    </p>
    <div class="slider__wrapper w-full overflow-hidden relative">
      <button
        id="btn-left"
        class="slider__nav slider__nav--left"
        aria-label="Previous"
        type="button"
        :disabled="disableLeftButton"
        @click="scrollLeft"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            d="M17.9 23.2L6.1 12 17.9.8"
          />
        </svg>
      </button>
      <button
        id="btn-right"
        class="slider__nav slider__nav--right"
        aria-label="Next"
        type="button"
        :disabled="disableRightButton"
        @click="scrollRight"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            d="M6.1 23.2L17.9 12 6.1.8"
          />
        </svg>
      </button>
      <div
        ref="sliderContent"
        class="slider__content px-2.5rem overflow-x-scroll flex gap-x-2 scroll-smooth scrollbar-hide snap snap-proximity snap-x <sm:snap-pl-1.5rem snap-pl-2.5rem relative"
      >
        <div class="absolute left-0 invisible" ref="start">.</div>
        <VideoCard
          v-for="video in playlist.attributes.videos.data"
          :key="video.id"
          :video="video"
        />
        <div ref="end">
          <VideoCard
            v-if="!$route.path.startsWith('/video/')"
            :video="{ moreLink: `/playlist/${playlist.attributes.slug}` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoCard from '@/components/VideoCard.vue'
export default {
  name: 'VideoSlider',
  props: {
    playlist: { type: Object, required: true },
  },
  components: {
    VideoCard,
  },
  data() {
    return {
      disableLeftButton: true,
      disableRightButton: false,
    }
  },
  methods: {
    scrollLeft() {
      this.$refs.sliderContent.scrollTo({
        left: this.$refs.sliderContent.scrollLeft - 500,
        behavior: 'smooth',
      })
    },
    scrollRight() {
      this.$refs.sliderContent.scrollTo({
        left: this.$refs.sliderContent.scrollLeft + 500,
        behavior: 'smooth',
      })
    },
    toggleLeftButton(entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && this.disableLeftButton) {
          this.disableLeftButton = false
        } else if (entry.isIntersecting && !this.disableLeftButton) {
          this.disableLeftButton = true
        }
      })
    },
    toggleRightButton(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.disableRightButton) {
          this.disableRightButton = true
        } else if (!entry.isIntersecting && this.disableRightButton) {
          this.disableRightButton = false
        }
      })
    },
  },
  mounted() {
    const leftButtonObserver = new IntersectionObserver(this.toggleLeftButton)
    leftButtonObserver.observe(this.$refs.start)
    const rightButtonObserver = new IntersectionObserver(this.toggleRightButton)
    rightButtonObserver.observe(this.$refs.end)
  },
}
</script>

<style lang="scss" scoped>
.slider__nav {
  position: absolute;
  top: 0;
  height: calc(33vw * 9 / 16);
  z-index: 1;
  width: 30px;
  padding: 0;
  margin: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  outline: 0;
  transition: opacity 0.25s ease, background-color 0.25s ease;

  @media (max-width: ($breakpoint-md - 1)) {
    display: none;
  }

  @media (min-width: $breakpoint-md) {
    width: 40px;
    height: calc(30vw * 9 / 16);
  }
  @media (min-width: $breakpoint-lg) {
    height: calc(20vw * 9 / 16);
  }

  @media (min-width: $breakpoint-xl) {
    height: calc(16vw * 9 / 16);
    width: 50px;
  }

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.75);
  }

  &[disabled] {
    cursor: default;
    opacity: 0;
  }
}

.slider__nav--left {
  left: 0;
}

.slider__nav--right {
  right: 0;
}
</style>
