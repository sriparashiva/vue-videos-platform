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

<script setup lang="ts">
  const route = useRoute()
  const client = useStrapiClient()
  const loadMore = ref<null | HTMLElement>(null)
  const pageNumber = ref(1)
  const totalPages = ref(0)
  const isLoading = ref(true)
  const searchResults = ref<Array<Video>>([])
  const searchQuery = computed(() => route.query.q)
  watch(searchQuery, async (currentValue, oldValue) => {
    pageNumber.value = 1
    if (currentValue && currentValue.length > 2) {
      searchResults.value.splice(0, searchResults.value.length)
      isLoading.value = true
      await loadResults(pageNumber.value, 20)
    }
  })

  const loadResults = async (page: number, size: number) => {
    // const resp: any = await $fetch(
    //   `${config.public.strapi.url}/api/videos?filters[title][$containsi]=${route.query.q}&pagination[page]=${page}&pagination[pageSize]=${size}`
    // )
    const resp: any = await client(`/videos`, {
      params: {
        filters: {
          title: {
            $containsi: route.query.q,
          },
        },
        populate: ['coverImage'],
        pagination: {
          page: page,
          pageSize: size,
        },
      },
    })

    if (resp.data.length > 0) {
      let oldIds = new Set(searchResults.value.map((d: Video) => d.id))
      let set = [
        ...searchResults.value,
        ...resp.data.filter((d: Video) => !oldIds.has(d.id)),
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
        await loadResults(pageNumber.value, 20)
      }
      if (pageNumber.value > totalPages.value) observer.disconnect()
    })
  }

  onMounted(async () => {
    isLoading.value = true
    await loadResults(pageNumber.value, 20)
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '100px',
      threshold: 0,
    })
    loadMore.value && observer.observe(loadMore.value)
  })
</script>
