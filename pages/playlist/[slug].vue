<template>
  <div>
    <div class="playlist__header px-6 sm:px-10 pt-10 pb-8">
      <h1 class="text-4xl font-medium mb-3">
        {{ playlist.attributes.title }}
      </h1>
      <p class="text-base">
        {{ playlist.attributes.description }}
      </p>
    </div>
    <div
      class="playlist__content px-6 sm:px-10 pb-10 pt-4 flex flex-wrap gap-x-2 gap-y-5 mb-16 pb-16"
    >
      <VideoCard v-for="video in videos" :key="video.id" :video="video" />
      <CardSkeleton v-show="isLoading" v-for="i in 5" :key="i" />
    </div>
    <div v-if="isLoading" class="min-h-400px"></div>
    <div class="invisible" ref="loadMore">.</div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const config = useRuntimeConfig()
  const client = useStrapiClient()
  const playlist: Playlist = await getPlaylist(route.params.slug.toString())
  const videos = ref<null | Array<Video>>(
    playlist.attributes.videos ? playlist.attributes.videos.data : null
  )

  useHead({
    title: `${playlist.attributes.title} - Vox TV`,
    meta: [
      {
        name: 'description',
        content: playlist.attributes.description.substring(0, 160),
      },
      {
        name: 'og:title',
        content: `${playlist.attributes.title} - Vox TV`,
      },
      {
        name: 'og:description',
        content: playlist.attributes.description.substring(0, 160),
      },
    ],
  })

  const isLoading = ref(false)
  const pageNumber = ref(2)
  const totalPages = ref(4)
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
      if (entry.isIntersecting && pageNumber.value <= totalPages.value) {
        isLoading.value = true
        await loadVideos(pageNumber.value, 20)
      }
      if (pageNumber.value > totalPages.value) observer.disconnect()
    })
  }

  const loadVideos = async (page: number, pageSize: number) => {
    const loadedVideos: any = await client(
      `${config.public.strapi.url}/api/videos`,
      {
        params: {
          filters: {
            playlists: {
              slug: {
                $eq: playlist.attributes.slug,
              },
            },
          },
          populate: ['coverImage'],
          pagination: {
            page: page,
            pageSize: pageSize,
          },
        },
      }
    )

    totalPages.value = loadedVideos.meta.pagination.pageCount
    if (loadedVideos.data.length > 0 && videos.value) {
      let oldIds = new Set(videos.value.map((d) => d.id))
      let set = [
        ...videos.value,
        ...loadedVideos.data.filter((d: Video) => !oldIds.has(d.id)),
      ]
      videos.value.splice(0, videos.value.length)
      videos.value.push(...set)
    }
    isLoading.value = false
    pageNumber.value++
  }
</script>

<style lang="scss">
  @media screen and (max-width: 852px) {
    .playlist__content .videoCard {
      // display: flex !important;
      max-width: 100% !important;
      display: grid !important;
      grid-template-columns: 4fr 6fr !important;
      grid-column-gap: 1rem !important;

      // .videoThumbnail__container {
      //   flex: 0 0 40%;
      // }
      // .videoCard__title {
      //   flex: 1 0 60%;
      // }
    }
  }
  @media screen and (max-width: 450px) {
    .playlist__content .videoCard {
      .videoCard__title {
        margin-top: 0 !important;
        font-size: 12px;
        line-height: 1.3em;
      }
      .videoCard__meta > div {
        display: none;
      }
    }
  }
</style>
