<template>
  <div>
    <div
      v-if="!isLoading && searchResults.length == 0"
      class="flex p-18 text-lg justify-center items-center"
    >
      No search results
    </div>
    <TransitionGroup v-else name="fade">
      <VideoSlider
        v-for="playlist in searchResults"
        :key="`search-playlist-${playlist.id}`"
        :playlist="playlist"
        class="videoSlider"
      />
    </TransitionGroup>
    <Transition v-if="isLoading" name="fade">
      <VideoSliderSkeleton />
    </Transition>
    <div v-if="isLoading" class="min-h-400px"></div>
    <div class="invisible" ref="loadMore">.</div>
  </div>
</template>

<script>
const axios = require('axios')
import CardSkeleton from '@/components/CardSkeleton.vue'
import TextSkeleton from '@/components/TextSkeleton.vue'
import VideoSlider from '@/components/VideoSlider.vue'
import VideoSliderSkeleton from '@/components/VideoSliderSkeleton.vue'
export default {
  name: 'SearchPlaylists',
  components: { TextSkeleton, CardSkeleton, VideoSlider, VideoSliderSkeleton },
  data() {
    return {
      pageNumber: 1,
      totalPages: 0,
      isLoading: true,
      searchResults: [],
    }
  },
  computed: {
    searchQuery() {
      return this.$route.query.q
    },
  },
  watch: {
    async searchQuery(newQuery) {
      this.pageNumber = 1
      if (newQuery.length > 2) {
        this.searchResults.splice(0, this.searchResults.length)
        this.isLoading = true
        await this.loadResults(this.pageNumber, 10)
      }
    },
  },
  methods: {
    async loadResults(page, size) {
      const { data } = await axios.get(
        `${
          process.env.GRIDSOME_STRAPI_URL
        }/api/playlists?filters[title][$containsi]=${
          this.$route.query.q
        }&pagination[page]=${page}&pagination[pageSize]=${size}&fields[0]=title&fields[1]=slug&fields[2]=description&populate[videos][fields][0]=title&populate[videos][fields][0]=slug&populate[videos][fields][0]=description&populate[videos][fields][0]=thumbnailURL&populate[videos][fields][0]=youtubeID`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GRIDSOME_STRAPI_TOKEN}`,
          },
        }
      )
      if (data.data.length > 0) {
        let oldIds = new Set(this.searchResults.map((d) => d.id))
        let set = [
          ...this.searchResults,
          ...data.data.filter((d) => !oldIds.has(d.id)),
        ]
        this.searchResults.splice(0, this.searchResults.length)
        this.searchResults.push(...set)
      }
      this.totalPages = data.meta.pagination.pageCount
      this.pageNumber++
      this.isLoading = false
    },
    handleIntersection(entries, observer) {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && this.pageNumber <= this.totalPages) {
          this.isLoading = true
          await this.loadResults(this.pageNumber, 10)
        }
        // if (this.pageNumber > this.totalPages) observer.disconnect()
      })
    },
  },
  async mounted() {
    this.isLoading = true
    await this.loadResults(this.pageNumber, 10)
    const observer = new IntersectionObserver(this.handleIntersection, {
      rootMargin: '100px',
      threshold: 0,
    })
    observer.observe(this.$refs.loadMore)
  },
}
</script>

<style lang="scss" scoped></style>
