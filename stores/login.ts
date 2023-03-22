import { defineStore } from 'pinia'
export const useLoginStore = defineStore('login', {
  state: () => ({
    loggedIn: false,
    user: <User | null>null,
    jwt: null,
    authChecked: false,
    likedVideos: <Array<number>>[],
  }),

  getters: {
    getLoggedIn: (state) => state.loggedIn,
    getUser: (state) => state.user,
    getJwt: (state) => state.jwt,
    getAuthChecked: (state) => state.authChecked,
    getLikedVideos: (state) => state.likedVideos,
  },

  actions: {
    setLoggedIn(user: any) {
      this.loggedIn = true
      this.jwt = user.jwt
      this.user = user.user
    },
    setLoggedOut() {
      this.loggedIn = false
      this.jwt = null
      this.user = null
    },
    setAuthChecked(status: any) {
      this.authChecked = status
    },
    setLikedVideos(videos: any) {
      this.likedVideos = videos
    },
    addToLikedVideos(video: string) {
      this.likedVideos.push(parseInt(video))
    },
    removeFromLikedVideos(video: string) {
      let index = this.likedVideos.indexOf(parseInt(video))
      if (index !== -1) {
        this.likedVideos.splice(index, 1)
      }
    },
  },
})
