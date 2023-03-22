<template>
  <div
    class="mx-6 md:mx-10 mb-6 md:mb-10 mt-6 md:mt-8"
    v-if="loginStore.getLoggedIn && !loader"
  >
    <NuxtLink
      aria-label="Return to account page"
      class="goBack flex items-center text-base gap-0 mb-8"
      to="/account"
    >
      <Icon :icon="backIcon" class="w-7" />
      Go Back
    </NuxtLink>
    <div v-if="likedVideos.length > 0">
      <VideoListItem
        v-for="video in likedVideos"
        :key="video.id"
        class="mb-8"
        :video="video"
      />
    </div>
    <div
      v-else
      class="text-base flex justify-center items-center w-full h-full"
    >
      No videos liked
    </div>
  </div>
  <div v-else class="flex justify-center items-center w-full h-screen">
    <Loader />
  </div>
</template>

<script setup lang="ts">
  import { mdiChevronLeft as backIcon } from '@mdi/js'
  import { useLoginStore } from '~~/stores/login'

  useHead({
    title: `Liked Videos - Nithyananda TV`,
  })

  definePageMeta({
    middleware: 'auth',
  })

  const loginStore = useLoginStore()
  const client = useStrapiClient()
  const loader = ref(true)
  const router = useRouter()
  const likedVideos = ref<Array<Video>>([])
  const likedVideoIds = ref<Array<Number>>([])
  try {
    const resp: any = await client(`/users-permissions/liked-videos`, {
      headers: {
        Authorization: `Bearer ${loginStore.getJwt}`,
      },
    })
    likedVideoIds.value = resp
    // loginStore.likedVideos = resp
  } catch (err) {
    console.log(err)
  }

  onMounted(async () => {
    // Fetch user likes
    if (likedVideoIds.value.length > 0) {
      try {
        const resp: any = await client(`/videos`, {
          params: {
            filters: {
              id: {
                $in: likedVideoIds.value,
              },
            },
            populate: ['coverImage'],
          },
        })
        likedVideos.value = resp.data
        loader.value = false
      } catch (err) {
        console.log(err)
        // router.push('/account')
      }
    } else {
      loader.value = false
      likedVideos.value = []
    }
  })
</script>

<style lang="scss" scoped>
  .goBack {
    transition: 0.2s all ease-in-out;
    color: $accent;
    svg {
      transition: 0.2s all ease-in-out;
      fill: $accent;
    }
    &:hover {
      color: $secondary;
      svg {
        fill: $secondary;
      }
    }
  }
  .dark .goBack {
    color: $accent;
    svg {
      fill: $accent;
    }
    &:hover {
      color: white;
      svg {
        fill: white;
      }
    }
  }
</style>
