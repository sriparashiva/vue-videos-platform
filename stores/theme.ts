import { defineStore } from 'pinia'
export const useThemeStore = defineStore('theme', {
  state: () => ({
    themeStatus: '',
    themePreference: 'unset/light',
  }),

  getters: {
    themePref: (state) => state.themePreference,
    dark: (state) => (state.themeStatus === 'dark' ? true : false),
  },

  actions: {
    initializeTheme() {
      if (localStorage.getItem('Vox_Theme_Preference') == 'dark') {
        this.themePreference = 'dark'
        this.themeStatus = 'dark'
        const htmlRoot = document.documentElement
        if (htmlRoot) htmlRoot.classList.add('dark')
      }
    },
    toggleTheme() {
      const htmlRoot = document.documentElement
      if (this.themeStatus === 'dark') {
        this.themeStatus = 'light'
        localStorage.setItem('Vox_Theme_Preference', 'light')
        if (htmlRoot && htmlRoot.classList.contains('dark'))
          htmlRoot.classList.remove('dark')
      } else {
        this.themeStatus = 'dark'
        localStorage.setItem('Vox_Theme_Preference', 'dark')
        if (htmlRoot && !htmlRoot.classList.contains('dark'))
          htmlRoot.classList.add('dark')
      }
    },
  },
})
