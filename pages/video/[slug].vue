<template>
  <div>
    <Hero :video="video" />
    <div class="video__description flex p-10 gap-8 <sm:flex-col">
      <div class="share__bar">
        <img
          class="<sm:hidden video__thumbnail transition-opacity aspect-video flex-grow-0 flex-shrink-1 sm:max-w-30vw h-max mb-4"
          :src="`${config.public.strapi.url}${
            video.attributes.coverImage.data.attributes.formats &&
            video.attributes.coverImage.data.attributes.formats.xsmall
              ? video.attributes.coverImage.data.attributes.formats.xsmall.url
              : video.attributes.coverImage.data.attributes.url
          }
          `"
        />
        <div class="text-lg font-medium mb-2">Share this video:</div>
        <SocialShare :title="video.attributes.title" :url="pageUrl" />
      </div>
      <div class="video__text flex-grow-1">
        <div
          class="video__meta flex justify-between items-center pb-2 border-b-1 border-accent_darken border-opacity-20"
        >
          <div
            class="flex gap-2 items-end text-sm opacity-80 text-text_lighten dark:text-dark_text"
          >
            <p class="videoCard__publishDate">
              {{ formattedPublishDate }}
            </p>
            •
            <p class="videoCard__viewCount">{{ formattedViewCount }} views</p>
          </div>
          <div v-if="loginStore.getLoggedIn" class="video__like">
            <button
              aria-label="Like"
              @click="handleLikeVideo"
              class="like__button flex gap-2 items-center text-text_lighten dark:text-dark_text transition hover:text-accent_darken hover:dark:text-accent hover:opacity-100"
            >
              <Icon
                v-if="videoLiked"
                color="fill-accent_darken"
                class="w-4"
                :icon="likeIcon"
              />
              <Icon v-else class="w-4" :icon="unlikeIcon" />
              <span class="text-sm opacity-80">{{
                videoLiked ? `${formattedLikeCount} Likes` : 'Like this video'
              }}</span>
            </button>
          </div>
        </div>
        <p class="text-sm whitespace-pre-line">
          {{ video.attributes.description }}
        </p>
      </div>
    </div>
    <Transition v-if="loader" name="fade">
      <VideoSliderSkeleton />
    </Transition>
    <div v-else class="video__watchmore">
      <VideoSlider v-if="moreVideos" :playlist="moreVideos" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { formatDistanceToNow, parse } from 'date-fns'
  // import numeral from 'numeral-es6'
  import {
    mdiThumbUp as likeIcon,
    mdiThumbUpOutline as unlikeIcon,
  } from '@mdi/js'
  import numbro from 'numbro'
  import { useLoginStore } from '~~/stores/login'

  const route = useRoute()
  const config = useRuntimeConfig()
  const loginStore = useLoginStore()

  const video: Video = await getVideo(route.params.slug.toString())

  useHead({
    title: `${video.attributes.title} - Vox TV`,
    meta: [
      {
        name: 'description',
        content: video.attributes.description.substring(0, 160),
      },
      {
        name: 'og:title',
        content: `${video.attributes.title} - Vox TV`,
      },
      {
        name: 'og:description',
        content: video.attributes.description.substring(0, 160),
      },
      {
        name: 'og:image',
        content: video.attributes.coverImage.data.attributes.url,
      },
    ],
  })

  const loader = ref(true)

  const pageUrl = `https://${config.public.websiteDomain}${route.path}`

  const formattedViewCount = numbro(Number(video.attributes.viewCount)).format({
    average: true,
    mantissa: 1,
  })

  const formattedLikeCount = video.attributes.likeCount
    ? numbro(Number(video.attributes.likeCount)).format({
        average: true,
        mantissa: 1,
      })
    : ''

  const formattedPublishDate =
    formatDistanceToNow(
      parse(video.attributes.eventDate.toString(), 'yyyy-MM-dd', new Date())
    ) + ' ago'

  const videoLiked = ref(false)

  const client = useStrapiClient()
  const moreVideos = ref<null | Playlist>(null)

  if (
    video.attributes.playlists &&
    video.attributes.playlists.data.length > 0
  ) {
    const relatedPlaylist: any = await client<Playlist>(
      `/playlists/with-videos`,
      {
        params: {
          filters: {
            id: {
              $eq: video.attributes.playlists.data[0].id,
            },
          },
        },
      }
    )

    moreVideos.value = relatedPlaylist.data[0]
    loader.value = false
  } else {
    loader.value = false
  }

  const handleLikeVideo = async () => {
    if (!videoLiked.value) {
      const resp = await useFetch(
        `${config.public.strapi.url}/api/users-permissions/like-video?id=${video.id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${loginStore.getJwt}`,
          },
        }
      )
      videoLiked.value = true
      loginStore.addToLikedVideos(video.id.toString())
    } else {
      const resp = await useFetch(
        `${config.public.strapi.url}/api/users-permissions/unlike-video?id=${video.id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${loginStore.getJwt}`,
          },
        }
      )
      videoLiked.value = false
      loginStore.removeFromLikedVideos(video.id.toString())
    }
  }
</script>

<style scoped lang="scss">
  @media (max-width: 420px) {
    .video__meta {
      flex-flow: column nowrap;
      gap: 1rem;
    }
  }
  .like__button {
    svg {
      transition: 0.2s all ease-in-out;
      fill: $text;
    }
    &:hover {
      svg {
        fill: $accent_darken;
      }
    }
  }
  .dark .like__button {
    svg {
      fill: $dark_text;
    }
    &:hover {
      svg {
        fill: $accent;
      }
    }
  }
</style>
