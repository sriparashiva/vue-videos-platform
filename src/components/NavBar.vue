<template>
  <div>
    <nav
      ref="nav"
      class="nav__bar w-screen h-14 fixed left-0 <md:bottom-0 md:(h-screen w-18 top-0) bg-white dark:bg-dark border-r-1 border-warm-gray-600 border-opacity-20 dark:border-opacity-40 md:(flex flex-col gap-y-2) transition z-10"
    >
      <div class="nav__logo <md:hidden bg-hex-fff200 w-full">
        <img
          class="nav__logo mx-auto w-18"
          src="@/assets/images/logo-rect.svg"
        />
      </div>
      <div
        class="nav__menu flex justify-between items-center md:(flex-col justify-center items-start) <md:h-full w-full"
      >
        <button
          class="nav__menu__link nav__toggle flex flex-col gap-y-1 outline-none order-0"
          @click="toggleMenu"
        >
          <Icon :icon="icons.menuIcon" />
          <div class="menu__text text-center font-medium">
            Menu
          </div>
        </button>
        <g-link
          class="nav__menu__link flex flex-col gap-y-1 outline-none <md:order-5 order-1"
          :to="$store.getters.loggedIn ? '/account' : '/login'"
        >
          <img
            v-if="$store.getters.loggedIn"
            :src="$store.getters.user.picture"
            class="w-8 rounded-full"
          />
          <Icon v-else :icon="icons.account" />
          <div class="menu__text text-center font-medium">
            {{ $store.getters.loggedIn ? 'Account' : 'Sign In' }}
          </div>
        </g-link>
        <g-link
          class="nav__menu__link flex flex-col gap-y-1 outline-none <md:order-1 order-2"
          to="/"
        >
          <Icon :icon="icons.home" />
          <div class="menu__text text-center font-medium">
            Home
          </div>
        </g-link>
        <g-link
          class="nav__menu__link  flex flex-col gap-y-1 outline-none <md:order-2 order-3"
          to="/explore"
        >
          <Icon :icon="icons.explore" />
          <div class="menu__text font-medium text-center">
            Explore
          </div>
        </g-link>
        <g-link
          class="nav__menu__link flex flex-col gap-y-1 outline-none <md:order-3 order-4"
          to="/live"
        >
          <div class="live__icon__container relative" ref="liveStatus">
            <svg
              viewBox="2 2 20 20"
              xmlns="http://www.w3.org/2000/svg"
              class="live__icon"
            >
              <path
                d="M6.343 4.938a1 1 0 0 1 0 1.415 8.003 8.003 0 0 0 0 11.317 1 1 0 1 1-1.415 1.414c-3.906-3.906-3.906-10.24 0-14.146a1 1 0 0 1 1.415 0Zm12.731 0c3.906 3.907 3.906 10.24 0 14.146a1 1 0 0 1-1.414-1.414 8.003 8.003 0 0 0 0-11.317 1 1 0 0 1 1.414-1.415ZM9.31 7.812a1 1 0 0 1 0 1.414 3.92 3.92 0 0 0 0 5.544 1 1 0 1 1-1.414 1.414 5.92 5.92 0 0 1 0-8.372 1 1 0 0 1 1.414 0Zm6.959 0a5.92 5.92 0 0 1 0 8.372 1 1 0 0 1-1.415-1.414 3.92 3.92 0 0 0 0-5.544 1 1 0 0 1 1.415-1.414Zm-4.187 2.77a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
              />
            </svg>
          </div>
          <div class="menu__text font-medium text-center">
            Live
          </div>
        </g-link>
        <button
          class="<md:order-4 order-5 nav__menu__link searchButton"
          :class="
            ` ${$store.getters.searchBarStatus ? 'router-link-active' : ''}`
          "
          @click="clickSearch"
        >
          <Icon :icon="icons.search" />
          <div class="menu__text text-center font-medium">
            Search
          </div>
        </button>
      </div>
      <button
        class="darkMode__toggle my-4 mx-auto p-3 transition"
        v-if="menuExpanded"
        @click="toggleDark"
      >
        <Icon
          class="w-5"
          :icon="$store.getters.dark ? icons.lightIcon : icons.darkIcon"
        />
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

<script>
import {
  mdiRecord,
  mdiAccountCircleOutline,
  mdiMagnify,
  mdiCompassOutline,
  mdiHomeMinusOutline,
  mdiMenu,
  mdiWhiteBalanceSunny,
  mdiMoonWaningCrescent,
} from '@mdi/js'
import Icon from '@/components/Icon.vue'
export default {
  name: 'NavBar',
  components: { Icon },
  data() {
    return {
      icons: {
        home: mdiHomeMinusOutline,
        explore: mdiCompassOutline,
        search: mdiMagnify,
        live: mdiRecord,
        account: mdiAccountCircleOutline,
        menuIcon: mdiMenu,
        lightIcon: mdiWhiteBalanceSunny,
        darkIcon: mdiMoonWaningCrescent,
      },
      menuExpanded: false,
    }
  },
  methods: {
    toggleMenu() {
      this.menuExpanded = !this.menuExpanded
      this.$refs.nav.classList.contains('expanded')
        ? this.$refs.nav.classList.remove('expanded')
        : this.$refs.nav.classList.add('expanded')
    },
    clickSearch() {
      this.menuExpanded = false
      this.$refs.nav.classList.remove('expanded')
      if (
        !this.$route.path.includes('search') ||
        !this.$store.getters.searchBarStatus
      ) {
        this.$store.commit('setFromPage', this.$route.path)
        this.$store.commit('toggleSearchBar')
      }
    },
    toggleDark() {
      this.$store.commit('toggleDark')
      document.documentElement.classList.contains('dark')
        ? document.documentElement.classList.remove('dark')
        : document.documentElement.classList.add('dark')
    },
  },
  mounted() {
    if (this.$store.getters.getLiveStatus) {
      this.$refs.liveStatus.classList.add('is-live')
    }
  },
}
</script>

<style lang="scss">
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

      &.active--exact {
        color: $accent;
        background-color: $info;
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
        background-color: $info_darken;
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
    &.active--exact {
      color: $primary;
      background-color: $dark_lighten;
      svg {
        fill: $primary;
      }
    }
    &:hover {
      color: white;
      background: $dark_lighten
        radial-gradient(circle, transparent 1%, $dark_lighten 1%) center/15000%;
      svg {
        fill: $white;
      }
    }
    &:active {
      background-color: $dark_lighten;
      background-size: 100%;
      transition: background 0s;
    }
  }
  .searchButton {
    &.router-link-active {
      color: $primary;
      background-color: $dark_lighten;
      svg {
        fill: $primary;
      }
    }
    &:hover {
      color: white;
      background: $dark_lighten
        radial-gradient(circle, transparent 1%, $dark_lighten 1%) center/15000%;
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

      &.active--exact {
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
@media screen and (max-width: $breakpoint-md) {
  .nav__toggle {
    display: none !important;
  }
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
.live__icon__container {
  &.is-live {
    &::before {
      content: '•';
      font-size: 40px;
      position: absolute;
      color: rgb(211, 40, 40);
      bottom: 0;
      right: 0;
      margin-right: -13px;
      animation-name: blink-icon;
      animation-iteration-count: infinite;
      animation-duration: 1.6s;
      animation-timing-function: ease-in-out;
    }
    @keyframes blink-icon {
      0% {
        opacity: 0.1;
      }

      50% {
        opacity: 1;
      }

      100% {
        opacity: 0.1;
      }
    }
  }
}
svg.liveChip__icon {
  width: 10px;
  height: 10px;
}
</style>
