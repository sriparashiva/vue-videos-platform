<template>
  <Layout>
    <div class="playlist__header <sm:px-6 px-10 pt-10 pb-8">
      <h1 class="text-4xl font-medium mb-3">
        {{ $page.strapi.playlists.data[0].attributes.title }}
      </h1>
      <p class="text-base">
        {{ $page.strapi.playlists.data[0].attributes.description }}
      </p>
    </div>
    <div
      class="<sm:px-6 px-10 pb-10 pt-4 flex flex-wrap gap-x-2 gap-y-5 mb-16 pb-16"
    >
      <VideoCard v-for="video in videos" :key="video.id" :video="video" />
      <CardSkeleton v-show="isLoading" v-for="i in 5" :key="i" />
    </div>
    <div v-if="isLoading" class="min-h-400px"></div>
    <div class="invisible" ref="loadMore">.</div>
  </Layout>
</template>

<page-query>
query($slug:String!) {
  strapi {
    playlists(filters: {slug: {eq: $slug}}) {
      data {
        attributes {
          title
          description
          slug
          videos(pagination: {page: 1, pageSize: 20}) {
              data {
                  id
                  attributes {
                      title
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
import VideoCard from '@/components/VideoCard.vue'
import CardSkeleton from '@/components/CardSkeleton.vue'
import loadingBar from '@/mixins/LoadingBar.js'
export default {
  name: 'Playlist',
  components: { VideoCard, CardSkeleton },
  mixins: [loadingBar],
  data() {
    return {
      videos: null,
      isLoading: false,
      pageNumber: 2,
      totalPages: 4,
    }
  },
  methods: {
    handleIntersection(entries, observer) {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && this.pageNumber <= this.totalPages) {
          this.isLoading = true
          await this.loadVideos(this.pageNumber, 20)
        }
        if (this.pageNumber > this.totalPages) observer.disconnect()
      })
    },
    async loadVideos(page, pageSize) {
      const { data: loadedVideos } = await axios.get(
        `${
          process.env.GRIDSOME_STRAPI_URL
        }/api/videos?filters[playlists][slug][$eq]=${
          this.$page.strapi.playlists.data[0].attributes.slug
        }&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GRIDSOME_STRAPI_TOKEN}`,
          },
        }
      )
      this.totalPages = loadedVideos.meta.pagination.pageCount
      if (loadedVideos.data.length > 0) {
        let oldIds = new Set(this.videos.map((d) => d.id))
        let set = [
          ...this.videos,
          ...loadedVideos.data.filter((d) => !oldIds.has(d.id)),
        ]
        this.videos.splice(0, this.videos.length)
        this.videos.push(...set)
      }
      this.isLoading = false
      this.pageNumber++
    },
  },
  async mounted() {
    this.videos = this.$page.strapi.playlists.data[0].attributes.videos.data
    const observer = new IntersectionObserver(this.handleIntersection)
    observer.observe(this.$refs.loadMore)
  },
  metaInfo() {
    return {
      title: this.$page.strapi.playlists.data[0].attributes.title,
      meta: [
        {
          name: 'description',
          content: this.$page.strapi.playlists.data[0].attributes.description,
        },
        {
          key: 'og:title',
          hid: 'og:title',
          property: 'og:title',
          content: `${
            this.$page.strapi.playlists.data[0].attributes.title
          } - KAILASA's Nithyananda TV`,
        },
        {
          key: 'og:description',
          hid: 'og:description',
          property: 'og:description',
          content: this.$page.strapi.playlists.data[0].attributes.description,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: $breakpoint-sm) {
  .videoCard {
    // display: flex !important;
    max-width: unset !important;
    display: grid !important;
    grid-template-columns: 4fr 6fr;
    grid-column-gap: 1rem !important;
    // .videoThumbnail__container {
    //   flex: 0 0 40%;
    // }
    // .videoCard__title {
    //   flex: 1 0 60%;
    // }
  }
}
</style>
