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
    <!-- <div v-else>
      <VideoSlider
        v-for="playlist in searchResults"
        :key="`search-playlist-${playlist.id}`"
        :playlist="playlist"
        class="videoSlider"
      />
    </div> -->
    <Transition v-if="isLoading" name="fade">
      <VideoSliderSkeleton />
    </Transition>
    <div v-if="isLoading" class="min-h-400px"></div>
    <div class="invisible" ref="loadMore">.</div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const client = useStrapiClient()
  const loadMore = ref<null | HTMLElement>(null)
  const pageNumber = ref(1)
  const totalPages = ref(0)
  const isLoading = ref(true)
  const searchResults = ref<Array<Playlist>>([])
  const searchQuery = computed(() => route.query.q)

  watch(searchQuery, async (currentValue, oldValue) => {
    pageNumber.value = 1
    if (currentValue && currentValue.length > 2) {
      searchResults.value.splice(0, searchResults.value.length)
      isLoading.value = true
      await loadResults(pageNumber.value, 10)
    }
  })

  const loadResults = async (page: number, size: number) => {
    // const resp: any = await $fetch(
    //   `${config.public.strapi.url}/api/playlists?filters[title][$containsi]=${route.query.q}&pagination[page]=${page}&pagination[pageSize]=${size}&fields[0]=title&fields[1]=slug&fields[2]=description&populate[videos][fields][0]=title&populate[videos][fields][1]=slug&populate[videos][fields][2]=description&populate[videos][fields][3]=thumbnailURL&populate[videos][fields][3]=youtubeID&populate[videos][fields][4]=eventDate&populate[videos][fields][5]=viewCount&populate[videos][fields][6]=duration`
    // )

    const resp: any = await client(`/playlists`, {
      params: {
        filters: {
          title: {
            $containsi: route.query.q,
          },
        },
        fields: ['title', 'description', 'slug'],
        populate: {
          videos: {
            fields: [
              'title',
              'slug',
              'description',
              'youtubeID',
              'eventDate',
              'viewCount',
              'duration',
            ],
            populate: ['coverImage'],
          },
        },
        pagination: {
          page: page,
          pageSize: size,
        },
      },
    })

    if (resp.data.length > 0) {
      let oldIds = new Set(searchResults.value.map((d: Playlist) => d.id))
      let set = [
        ...searchResults.value,
        ...resp.data.filter((d: Playlist) => !oldIds.has(d.id)),
      ]
      searchResults.value.splice(0, searchResults.value.length)
      searchResults.value.push(...set)
    }
    totalPages.value = resp.meta.pagination.pageCount
    pageNumber.value++
    isLoading.value = false
  }

  const handleIntersection = (
    entries: Array<IntersectionObserverEntry>,
    observer: IntersectionObserver
  ) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && pageNumber <= totalPages) {
        isLoading.value = true
        await loadResults(pageNumber.value, 10)
      }
      if (pageNumber.value > totalPages.value) observer.disconnect()
    })
  }

  onMounted(async () => {
    isLoading.value = true
    await loadResults(pageNumber.value, 10)
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '100px',
      threshold: 0,
    })
    loadMore.value && observer.observe(loadMore.value)
  })
</script>

<style lang="scss" scoped></style>
