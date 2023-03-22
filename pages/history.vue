<template>
  <div
    class="mx-6 md:mx-10 mb-6 md:mb-10 mt-6 md:mt-8"
    v-if="loginStore.getLoggedIn && !loader"
  >
    <NuxtLink
      class="goBack flex items-center text-base gap-0 mb-8"
      to="/account"
      aria-label="Return to account page"
    >
      <Icon :icon="backIcon" class="w-7" />
      Go Back
    </NuxtLink>
    <div v-if="watchHistory.length > 0">
      <div v-for="(item, index) in watchHistory" :key="index" class="mb-8">
        <div
          class="text-xl font-bold my-4 text-text dark:text-dark_text border-b-1 border-accent_darken border-opacity-20 pb-2"
          v-if="index === 0 || item.date != watchHistory[index - 1].date"
        >
          {{ item.date }}
        </div>
        <VideoListItem :video="{ id: item.video.id, attributes: item.video }" />
      </div>
    </div>
    <div
      v-else
      class="text-base flex justify-center items-center w-full h-full"
    >
      No videos watched
    </div>
  </div>
  <div v-else class="flex justify-center items-center w-full h-screen">
    <Loader />
  </div>
</template>

<script setup lang="ts">
  import { useLoginStore } from '~~/stores/login'
  import { mdiChevronLeft as backIcon } from '@mdi/js'

  useHead({
    title: `Watch History - Nithyananda TV`,
  })

  definePageMeta({
    middleware: 'auth',
  })

  const loginStore = useLoginStore()
  const client = useStrapiClient()
  const watchHistory = ref<Array<any>>([])
  const loader = ref(true)
  const router = useRouter()
  onMounted(async () => {
    // Fetch user watch history
    try {
      const resp: any = await client(`/users-permissions/watch-history`, {
        headers: {
          Authorization: `Bearer ${loginStore.getJwt}`,
        },
      })

      const watchHistoryTemp = resp.map((item: any) => {
        let utcTimestamp = new Date(item.timestamp).toUTCString()
        item.date = new Date(utcTimestamp).toDateString()
        item.video.coverImage = {
          data: {
            attributes: {
              url: item.video.coverImage.url,
              formats: item.video.coverImage.formats
                ? item.video.coverImage.formats
                : null,
            },
          },
        }
        return item
      })
      watchHistory.value = watchHistoryTemp
      loader.value = false
    } catch (err) {
      router.push('/account')
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
