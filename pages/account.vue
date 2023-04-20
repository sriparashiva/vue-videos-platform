<template>
  <div class="flex justify-center items-center w-full h-full">
    <div
      class="px-10 py-14 my-16 <md:min-w-screen md:(w-512px) bg-accent_lighten dark:bg-dark_lighten"
    >
      <div v-if="loginStore.getLoggedIn && loginStore.getUser">
        <div class="flex justify-center gap-3 mb-5 items-center">
          <img
            alt="Avatar image"
            :src="loginStore.getUser.picture"
            class="rounded-full w-14"
          />
          <div class="text-2xl font-bold text-text dark:text-dark_text_lighten">
            {{ loginStore.getUser.name }}
          </div>
        </div>
        <NuxtLink
          v-for="action in actions"
          :key="action.url"
          :to="action.url"
          :aria-label="`Open ${action.title}`"
          class="actionButton flex gap-3 items-center justify-center py-4 text-lg"
        >
          <Icon :icon="action.icon" class="w-5" />
          {{ action.title }}
        </NuxtLink>
        <p
          class="separator my-3 text-text dark:text-dark_text opacity-50 text-center overflow-hidden"
        >
          or
        </p>
        <button
          aria-label="Sign out"
          @click="handleSignOut"
          class="signOut w-full flex justify-center items-center gap-2 mt-6 p-3 rounded transition bg-transparent border-accent border-1 border-opacity-40 font-medium"
        >
          <Icon :icon="signOutIcon" class="signOut w-4" />
          Sign Out
        </button>
      </div>
      <Loader v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    mdiLogoutVariant as signOutIcon,
    mdiHistory,
    mdiThumbUpOutline,
  } from '@mdi/js'
  import { useLoginStore } from '~~/stores/login'

  const { logout } = useStrapiAuth()

  useHead({
    title: `My Account - Vox TV`,
  })

  definePageMeta({
    middleware: 'auth',
  })

  const actions = [
    { title: 'Watch History', icon: mdiHistory, url: '/history' },
    { title: 'Liked Videos', icon: mdiThumbUpOutline, url: '/likes' },
  ]

  const loginStore = useLoginStore()
  const router = useRouter()

  const handleSignOut = () => {
    // const sessionCookie = useCookie('Vox_Session')
    // sessionCookie.value = null
    logout()
    loginStore.setLoggedOut()
    loginStore.setAuthChecked(true)
    console.log('Redirecting to login')
    router.push('/login')
  }
</script>

<style lang="scss" scoped>
  .signOut {
    color: $accent;
    transition: 0.2s all ease-in-out;
    svg {
      fill: $accent;
      transition: 0.2s all ease-in-out;
    }
    &:hover {
      color: $secondary;
      border: 1px solid $secondary;
      svg {
        fill: $secondary;
      }
    }
  }
  .dark .signOut {
    color: $accent;
    svg {
      fill: $accent;
    }
    &:hover {
      color: white;
      border: 1px solid white;
      svg {
        fill: white;
      }
    }
  }
  .actionButton {
    transition: 0.2s all ease-in-out;
    color: $text;
    svg {
      transition: 0.2s all ease-in-out;
      fill: $text;
    }
    &:hover {
      color: $secondary;
      svg {
        fill: $secondary;
      }
    }
  }
  .dark .actionButton {
    color: $dark_text;
    svg {
      fill: $dark_text;
    }
    &:hover {
      color: white;
      svg {
        fill: white;
      }
    }
  }
</style>
