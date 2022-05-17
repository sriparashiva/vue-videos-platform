<template>
  <Layout>
    <Hero :video="$page.strapi.videos.data[0]" />
    <div class="video__description flex p-10 gap-8 <sm:flex-col">
      <div class="share__bar">
        <img
          class="<sm:hidden video__thumbnail transition-opacity aspect-video flex-grow-0 flex-shrink-1 sm:max-w-30vw h-max mb-4"
          :src="$page.strapi.videos.data[0].attributes.thumbnailURL"
        />
        <div class="text-lg font-medium mb-2">Share this video:</div>
        <SocialShare
          :title="$page.strapi.videos.data[0].attributes.title"
          :url="pageUrl"
        />
      </div>
      <div class="video__text flex-grow-1">
        <h2 class="text-3xl font-medium mb-5">Description</h2>
        <p class="text-sm">
          {{ $page.strapi.videos.data[0].attributes.description }}
        </p>
      </div>
    </div>
    <Transition v-if="loader" name="fade">
      <VideoSliderSkeleton />
    </Transition>
    <div v-else class="video__watchmore">
      <VideoSlider :playlist="moreVideos" />
    </div>
  </Layout>
</template>

<page-query>
query($slug:String!) {
  strapi {
    videos(filters: {slug: {eq: $slug}}) {
      data {
        attributes {
          title
          slug
          description
          thumbnailURL
          youtubeID
          duration
          likeCount
          viewCount
          publishedAt
          playlists {
            data {
              id
            }
          }
        }
      }
    }
    playlists(filters: {slug: {eq: "popular-videos"}}) {
    data {
      attributes {
        title
        description
        slug
        videos {
          data {
            attributes {
              title
              slug
              thumbnailURL
              duration
              likeCount
              viewCount
              publishedAt
            }
          }
        }
      }
    }
  }
  }
}
</page-query>

<script>
const axios = require('axios')
import Hero from '@/components/Hero.vue'
import VideoSlider from '@/components/VideoSlider.vue'
import CardSkeleton from '@/components/CardSkeleton.vue'
import TextSkeleton from '@/components/TextSkeleton.vue'
import VideoSliderSkeleton from '@/components/VideoSliderSkeleton.vue'
import SocialShare from '@/components/SocialShare.vue'
import loadingBar from '@/mixins/LoadingBar.js'
export default {
  name: 'Video',
  components: {
    Hero,
    VideoSlider,
    CardSkeleton,
    TextSkeleton,
    VideoSliderSkeleton,
    SocialShare,
  },
  mixins: [loadingBar],
  metaInfo() {
    return {
      title: this.$page.strapi.videos.data[0].attributes.title,
      meta: [
        {
          // key: 'description',
          hid: 'description',
          name: 'description',
          content: this.$page.strapi.videos.data[0].attributes.description,
        },
        {
          key: 'og:title',
          hid: 'og:title',
          property: 'og:title',
          content: `${
            this.$page.strapi.videos.data[0].attributes.title
          } - KAILASA's Nithyananda TV`,
        },
        {
          key: 'og:description',
          hid: 'og:description',
          property: 'og:description',
          content: this.$page.strapi.videos.data[0].attributes.description,
        },
        {
          key: 'og:image',
          hid: 'og:image',
          property: 'og:image',
          content: this.$page.strapi.videos.data[0].attributes.thumbnailURL,
        },
      ],
      // etc...
    }
  },
  data() {
    return {
      pageUrl: `https://${process.env.GRIDSOME_WEBSITE_DOMAIN}${
        this.$route.path
      }`,
      loader: true,
      moreVideos: {
        id: 0,
        attributes: {
          title: '',
          description: '',
          slug: '',
          videos: {
            data: [
              {
                id: 0,
                attributes: {
                  title: '',
                  slug: '',
                  description: '',
                  thumbnailURL: '',
                  youtubeID: '',
                },
              },
            ],
          },
        },
      },
    }
  },
  async mounted() {
    if (this.$page.strapi.videos.data[0].attributes.playlists.data.length > 0) {
      const { data: relatedPlaylist } = await axios.get(
        `${process.env.GRIDSOME_STRAPI_URL}/api/playlists/${
          this.$page.strapi.videos.data[0].attributes.playlists.data[0].id
        }?fields[0]=title&fields[1]=slug&fields[2]=description&populate[videos][fields][0]=title&populate[videos][fields][1]=slug&populate[videos][fields][2]=description&populate[videos][fields][3]=thumbnailURL&populate[videos][fields][4]=youtubeID&populate[videos][fields][5]=publishedAt&populate[videos][fields][6]=duration&populate[videos][fields][7]=viewCount&populate[videos][fields][8]=likeCount`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GRIDSOME_STRAPI_TOKEN}`,
          },
        }
      )
      this.moreVideos = relatedPlaylist.data
      this.loader = false
    } else {
      this.moreVideos = this.$page.strapi.playlists.data[0]
      this.loader = false
    }
  },
}
</script>
