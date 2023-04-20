<template>
  <div
    class="search__tabs mt-18 mb-8 text-lg text-center flex justify-center items-center"
  >
    <div
      class="tab__button py-3 px-10 flex-1"
      :class="activeTab == 'videos' ? 'active' : ''"
      @click="activeTab = 'videos'"
    >
      Videos
    </div>
    <div
      class="tab__button py-3 px-10 flex-1"
      :class="activeTab == 'playlists' ? 'active' : ''"
      @click="activeTab = 'playlists'"
    >
      Playlists
    </div>
  </div>
  <SearchVideos class="tab__videoResults" v-show="activeTab == 'videos'" />
  <SearchPlaylists
    class="tab__playlistResults"
    v-show="activeTab == 'playlists'"
  />
</template>

<script setup lang="ts">
  import { useSearchStore } from '~~/stores/search'

  useHead({
    title: `Search Results - Vox TV`,
  })

  const activeTab = ref('videos')
  const searchStore = useSearchStore()
  const route = useRoute()
  const router = useRouter()
  onMounted(() => {
    if (!searchStore.searchBarStatus) searchStore.displaySearchBar()
  })
  onBeforeRouteLeave(() => {
    searchStore.hideSearchBar()
  })
</script>

<style lang="scss">
  .search__tabs {
    .tab__button {
      cursor: pointer;
      // ripple animation
      background-position: center;
      transition: all 0.3s ease;
      &:hover {
        background: $accent_lighten
          radial-gradient(circle, transparent 1%, $accent_lighten 1%)
          center/15000%;
      }
      position: relative;
      &:after {
        transition: opacity 0.2s ease-in;
        opacity: 0;
        content: '';
        position: absolute;
        height: 2px;
        width: 100%;
        bottom: 0;
        background-color: $accent;
        left: 0;
      }
      &.active {
        background-color: $info;
        &:after {
          opacity: 1;
        }
      }
    }
  }
  .dark .search__tabs {
    .tab__button {
      &:hover {
        background: $dark_lighten
          radial-gradient(circle, transparent 1%, $dark_lighten 1%)
          center/15000%;
      }
      &:after {
        background-color: $accent;
      }
      &.active {
        background-color: $dark_info;
        &:after {
          opacity: 1;
        }
      }
    }
  }
</style>
