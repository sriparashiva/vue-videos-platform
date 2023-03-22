<template>
  <div>
    <nav
      ref="nav"
      class="nav__bar w-screen h-14 fixed left-0 <md:bottom-0 md:(h-screen w-18 top-0) bg-white dark:bg-dark_lighten border-r-1 border-t-1 border-warm-gray-600 border-opacity-20 dark:border-opacity-40 md:(flex flex-col) transition z-10"
    >
      <NuxtLink to="/" class="bg-primary w-full py-1">
        <img
          class="nav__logo <md:hidden mx-auto w-18"
          src="@/assets/images/logo-rect.svg"
        />
      </NuxtLink>
      <div
        class="nav__menu flex justify-between items-center md:(flex-col justify-center items-start) <md:h-full w-full"
      >
        <button
          class="nav__menu__link nav__toggle flex flex-col gap-y-1 outline-none"
          @click="toggleMenu"
        >
          <Icon :icon="menuIcon" />
          <div class="menu__text text-center font-medium">Menu</div>
        </button>
        <ClientOnly>
          <NuxtLink
            class="nav__menu__link nav__account flex flex-col gap-y-0 gap-x-0 outline-none"
            :to="loginStore.getLoggedIn ? '/account' : '/login'"
          >
            <img
              v-if="loginStore.getLoggedIn && loginStore.getUser"
              :src="loginStore.getUser.picture"
              class="w-6 rounded-full"
            />
            <Icon v-else :icon="accountIcon" />
            <div class="menu__text text-center font-medium">
              {{ loginStore.getLoggedIn ? 'Account' : 'Sign In' }}
            </div>
          </NuxtLink>
        </ClientOnly>
        <NuxtLink
          class="nav__menu__link flex flex-col gap-y-1 outline-none"
          to="/"
        >
          <Icon :icon="homeIcon" />
          <div class="menu__text text-center font-medium">Home</div>
        </NuxtLink>
        <NuxtLink
          class="nav__menu__link flex flex-col gap-y-1 outline-none"
          to="/explore"
        >
          <Icon :icon="exploreIcon" />
          <div class="menu__text font-medium text-center">Explore</div>
        </NuxtLink>
        <button
          class="nav__menu__link searchButton"
          :class="` ${searchStore.searchBarStatus ? 'router-link-active' : ''}`"
          @click="clickSearch"
        >
          <Icon :icon="searchIcon" />
          <div class="menu__text text-center font-medium">Search</div>
        </button>
      </div>
      <button
        class="darkMode__toggle my-4 mx-auto p-3 transition"
        v-if="menuExpanded"
        @click="toggleDark"
      >
        <Icon class="w-5" :icon="themeStore.dark ? lightIcon : darkIcon" />
      </button>
    </nav>
    <Transition name="fade">
      <div
        @click="toggleMenu"
        v-if="menuExpanded"
        class="nav__shadow z-1"
      ></div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import {
    mdiAccountCircleOutline as accountIcon,
    mdiMagnify as searchIcon,
    mdiCompassOutline as exploreIcon,
    mdiHomeOutline as homeIcon,
    mdiMenu as menuIcon,
    mdiWhiteBalanceSunny as lightIcon,
    mdiMoonWaningCrescent as darkIcon,
  } from '@mdi/js'
  import Icon from '@/components/Icon.vue'
  import { useLoginStore } from '~~/stores/login'
  import { useSearchStore } from '~~/stores/search'
  import { useThemeStore } from '~~/stores/theme'
  const loginStore = useLoginStore()
  const searchStore = useSearchStore()
  const themeStore = useThemeStore()
  const route = useRoute()

  const menuExpanded = ref(false)
  const nav = ref<null | HTMLElement>(null)

  const toggleMenu = () => {
    menuExpanded.value = !menuExpanded.value
    if (nav.value) {
      nav.value.classList.contains('expanded')
        ? nav.value.classList.remove('expanded')
        : nav.value.classList.add('expanded')
    }
  }

  const clickSearch = () => {
    menuExpanded.value = false
    nav.value && nav.value.classList.remove('expanded')
    if (!route.path.includes('search') || !searchStore.searchBarStatus) {
      searchStore.toggleSearchBar()
    }
  }
  const toggleDark = () => {
    themeStore.toggleTheme()
  }
</script>

<style lang="scss">
  // @import '~/assets/sass/variables.scss';
  .nav__bar {
    z-index: 20;
    transition: 0.2s width cubic-bezier(0.19, 1, 0.22, 1);
    .nav__menu {
      .nav__menu__link {
        height: 100%;
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $text_lighten;
        transition: 0.2s all ease-in-out;

        .menu__text {
          font-size: 9px;
          display: none;
        }

        @media screen and (min-width: $breakpoint-md) {
          padding: 1.5rem 0;
        }

        // icon size and animation
        svg {
          fill: $text_lighten;
          height: 1.5rem;
          width: 1.5rem;
          // margin: 0 auto;
          transition: all 0.3s ease-in-out;
        }

        &.router-link-exact-active {
          color: $accent;
          background-color: $accent_lighten;
          .menu__text {
            display: block;
          }
          svg {
            fill: $accent;
          }
        }

        // ripple animation
        background-position: center;
        transition: background 0.8s;
        &:hover {
          background: $accent_lighten
            radial-gradient(circle, transparent 1%, $accent_lighten 1%)
            center/15000%;
        }
        &:active {
          background-color: $accent;
          background-size: 100%;
          transition: background 0s;
        }

        &:hover {
          color: $accent_darken;
          svg {
            fill: $accent_darken;
            transform: scale(1.03);
          }
        }
      }
    }
  }
  .dark .nav__bar {
    .nav__menu__link {
      svg {
        fill: $text_dark;
      }
      transition: 0.2s all ease-in-out;
      &.router-link-exact-active {
        color: $primary;
        background-color: $dark;
        svg {
          fill: $primary;
        }
      }
      &:hover {
        color: white;
        background: $dark radial-gradient(circle, transparent 1%, $dark 1%)
          center/15000%;
        svg {
          fill: $white;
        }
      }
      &:active {
        background-color: $secondary;
        background-size: 100%;
        transition: background 0s;
      }
    }
    .searchButton {
      &.router-link-active {
        color: $primary;
        background-color: $dark;
        svg {
          fill: $primary;
        }
      }
      &:hover {
        color: white;
        background: $dark radial-gradient(circle, transparent 1%, $dark 1%)
          center/15000%;
        svg {
          fill: $white;
        }
      }
    }
  }
  .searchButton {
    &.router-link-active {
      color: $accent;
      background-color: $info;
      svg {
        fill: $accent;
      }
    }
  }
  .nav__bar.expanded {
    width: 300px;
    .nav__menu {
      .nav__menu__link {
        height: 100%;
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-flow: row nowrap;
        column-gap: 1.25rem;
        padding: 1rem 1.5rem;
        .menu__text {
          font-size: 16px;
          display: block;
          font-weight: 500;
        }

        &.router-link-exact-active {
          .menu__text {
            display: block;
          }
        }
      }
    }
  }
  nav.expanded ~ .nav__shadow,
  .search__shadow {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #00000099;
  }

  .darkMode__toggle {
    svg {
      fill: $accent;
      transition: 0.2s all ease-in-out;
    }
    &:hover {
      svg {
        fill: $accent_darken;
      }
    }
  }
  .dark .darkMode__toggle {
    &:hover {
      svg {
        fill: $primary;
      }
    }
  }

  @media (max-width: $breakpoint-md) {
    .nav__account {
      display: none !important;
    }
    .nav__bar {
      &.expanded {
        height: 100vh;
        top: 0;
        flex-flow: column nowrap;
        .nav__logo {
          display: block;
          margin-bottom: 2rem;
        }
        .nav__menu {
          flex-flow: column nowrap;
          justify-content: flex-start;
          height: auto;
          .nav__menu__link {
            flex: 0 0 auto;
          }
        }
        .darkMode__toggle {
          width: 100%;
          svg {
            margin: 0 auto;
          }
        }
        .nav__account {
          display: flex !important;
        }
      }
    }
  }
</style>
