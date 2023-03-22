import { defineConfig } from 'windicss/helpers'
// import { defineConfig } from 'vite-plugin-windicss'
import aspectRatioPlugin from 'windicss/plugin/aspect-ratio'
import scrollSnapPlugin from 'windicss/plugin/scroll-snap'

export default defineConfig({
  /* configurations... */
  darkMode: 'class', // or 'media'
  // prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        theme_bg: '#240909',
        theme_dark: '#1A0000',
        theme_light: '#3A1919',
        theme_lighter: '#502727',
        // accent: '#fef08a',
        accent_light: '#fef9c3',
        accent_dark: '#d1af83',
        text_light: '#ffe4e6',
        text_dark: '#d6d3d1',
        // new
        // primary: '#5e2121',
        // accent: '#d1af83',
        // accent_darken: '#B69D7E',
        // accent_lighten: '#F2CE9F',
        // text: '#5F4444',
        // text_lighten: '#5F4E4E',
        // info: '#E9DFDF',
        // info_darken: '#B4A5A5',
        // dark_info: '#2B1B1B',
        // dark: '#400404',
        // dark_lighten: '#3A1919',
        // dark_text: '#EAD5D5',
        // dark_text_lighten: '#F1EDED',
        // white: '#ffffff',
        //new
        primary: '#F2CE9F',
        secondary: '#5E2121',
        accent: '#be9d72',
        accent_darken: '#a48760',
        accent_lighten: '#fbf3e5',
        text: '#4f4444',
        text_lighten: '#635b5b',
        dark_text: '#b6a0a0',
        dark_text_lighten: '#cfbebe',
        white: '#ffffff',
        info: '#e9e7e7',
        info_darken: '#b3abab',
        dark_info: '#342828',
        dark: '#220e0e',
        dark_lighten: '#301818',
      },
    },
  },
  plugins: [
    scrollSnapPlugin,
    aspectRatioPlugin,
    // require('windicss/plugin/aspect-ratio'),
    // ...
  ],
})
