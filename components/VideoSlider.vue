<template>
  <div class="my-10">
    <div class="slider__header flex gap-x-4 items-center mb-4 <sm:px-6 px-10">
      <div class="slider__text">
        <h2
          class="text-2xl font-bold text-secondary dark:text-dark_text_lighten"
        >
          {{
            route.path.startsWith('/video/')
              ? `Related Videos`
              : props.playlist.attributes.title
          }}
        </h2>
      </div>
      <NuxtLink
        v-if="!route.path.startsWith('/video/')"
        :to="`/playlist/${props.playlist.attributes.slug}`"
        class="text-sm text-accent dark:text-dark_accent text-opacity-80 dark:text-opacity-100 pt-1 carousel__header__moreLink hover:text-accent_darken hover:dark:text-accent_lighten font-medium"
      >
        View All
      </NuxtLink>
    </div>
    <p
      v-if="!route.path.startsWith('/video/')"
      class="text-sm <sm:px-6 px-10 mb-6 text-text_lighten dark:text-dark_text opacity-806"
    >
      {{ props.playlist.attributes.description }}
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
        class="slider__content px-2.5rem overflow-x-scroll flex gap-x-2 scrollbar-hide scroll-smooth snap snap-proximity snap-x <sm:snap-pl-1.5rem snap-pl-2.5rem relative"
      >
        <div class="absolute left-0 invisible" ref="start">.</div>
        <VideoCard
          v-for="video in props.playlist.attributes.videos.data"
          :key="video.id"
          :video="video"
        />
        <div ref="end">
          <VideoCardMore
            v-if="!route.path.startsWith('/video/')"
            :moreLink="`/playlist/${props.playlist.attributes.slug}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const disableLeftButton = ref(true)
  const disableRightButton = ref(false)
  const sliderContent = ref<null | HTMLElement>(null)
  const start = ref<null | HTMLElement>(null)
  const end = ref<null | HTMLElement>(null)
  const props = defineProps({
    playlist: { type: Object, required: true },
  })

  const scrollLeft = () => {
    sliderContent.value &&
      sliderContent.value.scrollTo({
        left: sliderContent.value.scrollLeft - 500,
        behavior: 'smooth',
      })
  }
  const scrollRight = () => {
    sliderContent.value &&
      sliderContent.value.scrollTo({
        left: sliderContent.value.scrollLeft + 500,
        behavior: 'smooth',
      })
  }
  const toggleLeftButton = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting && disableLeftButton.value) {
        disableLeftButton.value = false
      } else if (entry.isIntersecting && !disableLeftButton.value) {
        disableLeftButton.value = true
      }
    })
  }
  const toggleRightButton = (entries: Array<IntersectionObserverEntry>) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !disableRightButton.value) {
        disableRightButton.value = true
      } else if (!entry.isIntersecting && disableRightButton.value) {
        disableRightButton.value = false
      }
    })
  }

  onMounted(() => {
    const leftButtonObserver = new IntersectionObserver(toggleLeftButton)
    start.value && leftButtonObserver.observe(start.value)
    const rightButtonObserver = new IntersectionObserver(toggleRightButton)
    end.value && rightButtonObserver.observe(end.value)
  })
</script>

<style lang="scss" scoped>
  @import '~/assets/sass/variables.scss';
  .slider__nav {
    position: absolute;
    top: 0;
    height: calc(33vw * 0.542);
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
      height: calc(30vw * 0.542);
    }
    @media (min-width: $breakpoint-lg) {
      height: calc(20vw * 0.542);
    }

    @media (min-width: $breakpoint-xl) {
      height: calc(16vw * 0.542);
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

  // /* Hide scrollbar for Chrome, Safari and Opera */
  // .slider__content::-webkit-scrollbar {
  //   display: none;
  // }

  // /* Hide scrollbar for IE, Edge and Firefox */
  // .slider__content {
  //   -ms-overflow-style: none; /* IE and Edge */
  //   scrollbar-width: none; /* Firefox */
  // }
</style>
