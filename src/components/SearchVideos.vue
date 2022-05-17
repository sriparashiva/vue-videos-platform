<template>
  <div>
    <div
      v-if="!isLoading && searchResults.length == 0"
      class="flex p-18 text-lg justify-center items-center"
    >
      No search results
    </div>
    <div class="px-10 pb-10 pt-4 flex flex-wrap gap-x-2 gap-y-5 mb-16 pb-16">
      <VideoCard
        v-for="video in searchResults"
        :key="`search-video-${video.id}`"
        :video="video"
      />
      <CardSkeleton v-show="isLoading" v-for="i in 4" :key="i" />
    </div>
    <div v-if="isLoading" class="min-h-400px"></div>
    <div class="invisible" ref="loadMore"></div>
  </div>
</template>

<script>
import VideoCard from '@/components/VideoCard.vue'
import CardSkeleton from '@/components/CardSkeleton.vue'
const axios = require('axios')
export default {
  name: 'SearchVideos',
  components: { CardSkeleton, VideoCard },
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
        await this.loadResults(this.pageNumber, 20)
      }
    },
  },
  methods: {
    async loadResults(page, size) {
      const { data } = await axios.get(
        `${
          process.env.GRIDSOME_STRAPI_URL
        }/api/videos?filters[title][$containsi]=${
          this.$route.query.q
        }&pagination[page]=${page}&pagination[pageSize]=${size}`,
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
          await this.loadResults(this.pageNumber, 20)
        }
        // if (this.pageNumber > this.totalPages) observer.disconnect()
      })
    },
  },
  async mounted() {
    this.isLoading = true
    await this.loadResults(this.pageNumber, 20)
    const observer = new IntersectionObserver(this.handleIntersection, {
      rootMargin: '100px',
      threshold: 0,
    })
    observer.observe(this.$refs.loadMore)
  },
}
</script>
