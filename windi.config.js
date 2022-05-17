import { defineConfig } from 'windicss/helpers'
import scrollSnapPlugin from 'windicss/plugin/scroll-snap'

export default defineConfig({
  darkMode: 'class',
  // prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        theme_bg: '#240909',
        theme_dark: '#1A0000',
        theme_light: '#3A1919',
        theme_lighter: '#502727',
        accent: '#fef08a',
        accent_light: '#fef9c3',
        accent_dark: '#d1af83',
        text_light: '#ffe4e6',
        text_dark: '#d6d3d1',
        primary: '#FFF200',
        accent: '#4E7177',
        accent_darken: '#33555A',
        accent_lighten: '#F1F3F2',
        text: '#4C4E4D',
        text_lighten: '#626262',
        info: '#E9E7E8',
        info_darken: '#b4b4b4',
        dark_info: '#282a2b',
        dark: '#181A1B',
        dark_lighten: '#202223',
        dark_text: '#B7B1A8',
        dark_text_lighten: '#CFC8BE',
        white: '#ffffff',
      },
    },
  },
  plugins: [
    scrollSnapPlugin,
    require('windicss/plugin/aspect-ratio'),
    // ...
  ],
})
