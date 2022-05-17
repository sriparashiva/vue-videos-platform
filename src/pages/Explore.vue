<template>
  <Layout>
    <h1 class="text-3xl font-medium <sm:px-6 px-10 mt-10">Explore Playlists</h1>
    <TransitionGroup name="fade">
      <VideoSlider
        v-for="playlist in playlists"
        :key="`playlist-${playlist.id}`"
        :playlist="playlist"
        class="videoSlider"
      />
    </TransitionGroup>
    <Transition name="fade">
      <div v-show="isLoading" class="my-4">
        <div v-for="i in 3" :key="i" class="mt-10">
          <VideoSliderSkeleton />
        </div>
      </div>
    </Transition>
    <div v-if="isLoading" class="min-h-400px"></div>
    <div class="invisible" ref="loadMore">.</div>
  </Layout>
</template>

<page-query>
query {
  strapi {
    playlists (pagination: {page: 1, pageSize: 10}, sort: ["isFeatured:desc","id:asc"]) {
      data {
        id
        attributes {
          title
          slug
          description
          videos (pagination: {page: 1, pageSize: 10}) {
            data {
              id
              attributes {
                title
                description
                slug
                thumbnailURL
                youtubeID
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
import CardSkeleton from '@/components/CardSkeleton.vue'
import TextSkeleton from '@/components/TextSkeleton.vue'
import VideoSlider from '@/components/VideoSlider.vue'
import VideoSliderSkeleton from '@/components/VideoSliderSkeleton.vue'
import loadingBar from '@/mixins/LoadingBar.js'
export default {
  name: 'Explore',
  metaInfo: {
    title: 'Explore',
  },
  components: { TextSkeleton, CardSkeleton, VideoSlider, VideoSliderSkeleton },
  mixins: [loadingBar],
  data() {
    return {
      playlists: null,
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
          await this.loadPlaylists(this.pageNumber, 10)
        }
        if (this.pageNumber > this.totalPages) observer.disconnect()
      })
    },
    async loadPlaylists(page, pageSize) {
      const { data: loadedPlaylists } = await axios.get(
        `${
          process.env.GRIDSOME_STRAPI_URL
        }/api/playlists?sort[0]=isFeatured%3Adesc&sort[1]=id%3Aasc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&fields[0]=title&fields[1]=slug&fields[2]=description&populate[videos][fields][0]=title&populate[videos][fields][0]=slug&populate[videos][fields][0]=description&populate[videos][fields][0]=thumbnailURL&populate[videos][fields][0]=youtubeID`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GRIDSOME_STRAPI_TOKEN}`,
          },
        }
      )
      this.totalPages = loadedPlaylists.meta.pagination.pageCount
      if (loadedPlaylists.data.length > 0) {
        let oldIds = new Set(this.playlists.map((d) => d.id))
        let set = [
          ...this.playlists,
          ...loadedPlaylists.data.filter((d) => !oldIds.has(d.id)),
        ]
        this.playlists.splice(0, this.playlists.length)
        this.playlists.push(...set)
      }
      this.pageNumber++
      this.isLoading = false
    },
  },
  async mounted() {
    this.playlists = this.$page.strapi.playlists.data
    const observer = new IntersectionObserver(this.handleIntersection)
    observer.observe(this.$refs.loadMore)
  },
}
</script>
