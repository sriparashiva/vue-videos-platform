<template>
  <div>
    <HeroSkeleton v-if="!heroLoaded" />
    <Hero v-else :video="featuredVideo" />
    <VideoSlider
      v-for="playlist in featuredPlaylists"
      :key="playlist.id"
      :playlist="playlist"
    />
  </div>
</template>

<script setup lang="ts">
  import { useApiStore } from '~~/stores/api'

  const apiStore = useApiStore()
  const featuredVideo = ref({})
  const heroLoaded = ref(false)
  const featuredPlaylists = ref<null | Array<Playlist>>([])

  const client = useStrapiClient()

  if (apiStore.getFeaturedPlaylists.length == 0) {
    const playlists: any = await client<Playlist>('/playlists/with-videos', {
      params: {
        filters: {
          isFeatured: {
            $eq: true,
          },
        },
        sort: ['updatedAt:desc'],
      },
    })
    featuredPlaylists.value = playlists.data
    apiStore.featuredPlaylists = playlists.data
  } else {
    featuredPlaylists.value = apiStore.getFeaturedPlaylists
  }

  if (Object.keys(apiStore.getFeaturedVideo).length === 0) {
    const fetchedFeaturedVideo: any = await client<Video>('/videos/random', {
      params: {
        filters: {
          isFeatured: {
            $eq: true,
          },
        },
      },
    })
    featuredVideo.value = fetchedFeaturedVideo.data
    heroLoaded.value = true
    apiStore.featuredVideo = fetchedFeaturedVideo.data
  } else {
    featuredVideo.value = apiStore.getFeaturedVideo
    heroLoaded.value = true
  }
</script>

<style scoped></style>
