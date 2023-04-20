<template>
  <h1
    class="text-3xl font-bold text-secondary dark:text-dark_text_lighten <sm:px-6 px-10 mt-10"
  >
    Explore Playlists
  </h1>
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
</template>

<script setup lang="ts">
  useHead({
    title: `Explore Videos and Playlists - Vox TV`,
  })

  const playlists = ref<Array<Playlist>>([])

  const client = useStrapiClient()
  const resp: any = await client<Playlist>('/playlists/with-videos')

  playlists.value.push(...resp.data)

  const isLoading = ref(false)
  const allLoaded = ref(false)
  const pageNumber = ref(1)
  const loadMore = ref<null | HTMLElement>(null)

  onMounted(() => {
    const observer = new IntersectionObserver(handleIntersection)
    observer.observe(loadMore.value ? loadMore.value : new HTMLElement())
  })

  const handleIntersection = (
    entries: Array<IntersectionObserverEntry>,
    observer: IntersectionObserver
  ) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting && !allLoaded.value) {
        isLoading.value = true
        await loadPlaylists()
      }
      if (allLoaded.value) observer.disconnect()
    })
  }

  const loadPlaylists = async () => {
    const loadedPlaylists: any = await client<Playlist>(
      `/playlists/with-videos`,
      {
        params: {
          pagination: {
            start: pageNumber.value * 5,
            limit: 5,
          },
        },
      }
    )
    if (loadedPlaylists.data.length > 0) {
      playlists.value.push(...loadedPlaylists.data)
    } else allLoaded.value = true
    pageNumber.value++
    isLoading.value = false
  }
</script>
