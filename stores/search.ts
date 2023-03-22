import { defineStore } from 'pinia'
export const useSearchStore = defineStore('search', {
  state: () => ({
    showSearchBar: false,
    fromPage: '/',
  }),

  getters: {
    searchBarStatus: (state) => state.showSearchBar,
    fromPageUrl: (state) => state.fromPage,
  },

  actions: {
    toggleSearchBar() {
      this.showSearchBar = !this.showSearchBar
    },
    displaySearchBar() {
      this.showSearchBar = true
    },
    hideSearchBar() {
      this.showSearchBar = false
    },
    clearFromPage() {
      this.fromPage = '/'
    },
    setFromPage(page: string) {
      this.fromPage = page
    },
  },
})
