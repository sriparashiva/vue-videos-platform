<template>
  <Layout>
    <div class="gridContainer my-6 px-6 gap-4">
      <div
        class="live__videoframe aspect-video flex-grow-0 flex-shrink-0 <lg:(w-full mb-6)"
      >
        <!-- <iframe
          class="w-full"
          height="100%"
          :src="
            `https://www.youtube.com/embed/live_stream?channel=UCknLrEdhRCp1aegoMqRaCZg?autoplay=1`
          "
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> -->
        <img
          src="@/assets/images/livestream-offline.jpg"
          class="w-full h-full"
        />
      </div>
      <div class="live__chat max-h-80vh <lg:(min-h-50vh mb-8)">
        <Chat />
      </div>
      <div class="metaContainer">
        <div class="video__text flex-grow-1 mt-4 mb-8">
          <h1 class="text-3xl mb-3 font-medium dark:text-dark_text_lighten">
            Vox Livestream
          </h1>
          <p class="text-base text-text_lighten dark:text-dark_text opacity-80">
            Vox TV Livestream: Join the broadcast to get front-row access to
            latest productions, documentaries, latest news, and events from Vox
            Media.
          </p>
        </div>
        <div class="video__watchmore">
          <h2 class="text-2xl font-medium my-3">
            Watch More
          </h2>
          <div class="pt-4 flex flex-wrap gap-x-2 gap-y-5">
            <VideoCard
              v-for="video in $page.strapi.videos.data"
              :key="video.id"
              :video="video"
            />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  strapi {
    videos (filters: {isFeatured: {eq: true}}, sort: "publishedAt:desc", pagination: {page: 1, pageSize: 10}) {
      data {
        id
        attributes {
          title
          slug
          description
          thumbnailURL
          publishedAt
          viewCount
          likeCount
          duration
        }
      }
    }
  }
}
</page-query>

<script>
import 'lazysizes'
// import Hero from '@/components/Hero.vue'
import VideoCard from '@/components/VideoCard.vue'
import Chat from '@/components/Chat.vue'
import loadingBar from '@/mixins/LoadingBar.js'
export default {
  name: 'Live',
  components: {
    VideoCard,
    Chat,
  },
  mixins: [loadingBar],
  data() {
    return {
      websiteDomain: process.env.GRIDSOME_WEBSITE_DOMAIN,
    }
  },
}
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
        rgba(26, 0, 0, 1) 0%,
        rgba(26, 0, 0, 0.1) 50%,
        rgba(26, 0, 0, 0.1) 100%
      );

      @media (min-width: 768px) {
        background-image: linear-gradient(
          to right,
          #1a0000 0,
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
</style>
