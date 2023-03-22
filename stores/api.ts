import { defineStore } from 'pinia'
export const useApiStore = defineStore('api', {
  state: () => ({
    featuredVideo: {},
    featuredPlaylists: <Array<Playlist>>[],
  }),

  getters: {
    getFeaturedVideo: (state) => state.featuredVideo,
    getFeaturedPlaylists: (state) => state.featuredPlaylists,
  },

  actions: {},
})
