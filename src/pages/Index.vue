<template>
  <Layout>
    <HeroSkeleton v-if="!heroLoaded" />
    <Hero v-else :video="featuredVideo" :isLive="isLive" />
    <VideoSlider
      v-for="playlist in $page.strapi.playlists.data"
      :key="playlist.id"
      :playlist="playlist"
    />
    <FloatingPlayer
      v-if="showFloatingPlayer"
      :youtubeID="liveID"
      @closePlayer="closeFloatingPlayer"
    />
  </Layout>
</template>

<page-query>
query {
  strapi {
    playlists (filters: {isFeatured: {eq: true}}, sort: "publishedAt:desc") {
      data {
        id
        attributes {
          title
          slug
          description
          videos (pagination: {page: 1, pageSize: 20}) {
            data {
              id
              attributes {
                title
                description
                slug
                thumbnailURL
                duration
                likeCount
                viewCount
                publishedAt
              }
            }
          }
        }
      }
    }
  }
}
</page-query>

<script>
const axios = require('axios')
import Hero from '@/components/Hero.vue'
import HeroSkeleton from '@/components/HeroSkeleton.vue'
import VideoSlider from '@/components/VideoSlider.vue'
import FloatingPlayer from '@/components/FloatingPlayer.vue'
import SocialShare from '@/components/SocialShare.vue'
import loadingBar from '@/mixins/LoadingBar.js'

export default {
  components: {
    Hero,
    VideoSlider,
    HeroSkeleton,
    FloatingPlayer,
    SocialShare,
  },
  metaInfo: {
    title: 'Livestreams, Events, Discourses of SPH Nithyananda Paramashivam',
  },
  mixins: [loadingBar],
  data() {
    return {
      featuredVideo: null,
      heroLoaded: false,
      isLive: false,
      liveID: null,
      showFloatingPlayer: false,
    }
  },
  methods: {
    closeFloatingPlayer() {
      this.showFloatingPlayer = false
    },
  },
  async mounted() {
    let { data: featuredVideo } = await axios.get(
      `${
        process.env.GRIDSOME_STRAPI_URL
      }/api/videos/random?filters[isFeatured][$eq]=true`
    )
    this.featuredVideo = featuredVideo.data
    this.heroLoaded = true
  },
}
</script>
