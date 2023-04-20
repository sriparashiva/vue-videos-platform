<template>
  <div class="gridContainer my-6 px-6 gap-4">
    <div
      class="live__videoframe aspect-video flex-grow-0 flex-shrink-0 w-full mb-6 lg:(w-auto mb-0)"
    >
      <img w-full h-full object-cover src="@/assets/images/vox-og.jpg" alt="" />
    </div>
    <div class="live__chat mb-8 lg:mb-0">
      <Chat />
    </div>
    <div class="metaContainer">
      <div class="video__text flex-grow-1 mt-4 mb-8">
        <div>
          <h1
            class="text-3xl mb-3 font-bold text-secondary dark:text-dark_text_lighten"
          >
            Livestream will be online shortly
          </h1>
          <p class="text-base text-text_lighten dark:text-dark_text opacity-80">
            VOX's livestream will start soon. Till then, please browse our
            catalog of videos and playlists.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import 'lazysizes'
  const { find } = useStrapi()
  const config = useRuntimeConfig()

  useHead({
    title: `Livestream - Vox TV`,
  })
</script>

<style lang="scss" scoped>
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
  @media screen and (min-width: $breakpoint_lg) {
    .gridContainer {
      display: grid;
      grid-template-columns: 6.5fr 3.5fr;
      grid-template-rows: auto auto;
      grid-template-areas:
        ' item1 item2 '
        ' item3 item2 ';
    }
    .live__videoframe {
      grid-area: item1;
    }
    .live__chat {
      grid-area: item2;
    }
    .metaContainer {
      grid-area: item3;
    }
  }
  .videoCard {
    .videoCard__title {
      transition: 0.2s all ease-in-out;
    }
  }
  @media (min-width: $breakpoint-sm) {
    .videoCard {
      min-height: 1px;
      transition: all 0.3s ease-in-out;
      min-width: calc(0.7 * (100vw - 2.5rem));
      max-width: calc(0.7 * (100vw - 2.5rem));
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
</style>
