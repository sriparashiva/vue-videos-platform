<template>
  <Layout>
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
  </Layout>
</template>

<script>
import SearchVideos from '@/components/SearchVideos.vue'
import SearchPlaylists from '@/components/SearchPlaylists.vue'
// import loadingBar from '@/mixins/LoadingBar.js'
export default {
  name: 'Search',
  components: { SearchVideos, SearchPlaylists },
  // mixins: [loadingBar],
  metaInfo: {
    title: 'Search',
  },
  data() {
    return {
      activeTab: 'videos',
    }
  },
  mounted() {
    if (!this.$store.getters.searchBarStatus)
      this.$store.commit('displaySearchBar')
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('hideSearchBar')
    next()
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // access to component public instance via `vm`
      vm.$store.commit('displaySearchBar')
      // if (from.path != '/search') {
      //   vm.$store.commit('setFromPage', from.path)
      // }
    })
  },
}
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
        radial-gradient(circle, transparent 1%, $dark_lighten 1%) center/15000%;
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
