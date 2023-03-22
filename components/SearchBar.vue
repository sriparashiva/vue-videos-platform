<template>
  <div
    class="searchBar absolute top-0 py-6 px-10 md:(pl-7rem pr-10) flex justify-between items-center bg-accent_lighten dark:bg-dark_lighten gap-x-2 shadow-md w-full z-10"
  >
    <form autocomplete="off" class="flex-auto" @submit.prevent>
      <input
        type="text"
        id="search"
        ref="input"
        name="search"
        placeholder="Search for a video or playlist..."
        class="bg-transparent outline-none text-text text-opacity-80 dark:text-dark_text placeholder-text_lighten dark:placeholder-dark_text placeholder-opacity-60 w-full"
        v-model.trim="searchQuery"
        @keyup.enter="executeSearch"
      />
    </form>
    <button
      type="button"
      aria-label="Close"
      @click="goBack"
      class="flex-initial"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        class="transition-opacity opacity-60 hover:opacity-100"
      >
        <g
          fill="none"
          stroke="#aaaaaa"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="1.5"
        >
          <path d="M.75.75l13.5 13.5M14.25.75L.75 14.25" />
        </g>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
  import { useSearchStore } from '~~/stores/search'
  const searchStore = useSearchStore()
  const route = useRoute()
  const router = useRouter()
  const searchQuery = ref(route.query.q ? route.query.q : '')
  const input = ref<null | HTMLElement>(null)

  watch(searchQuery, async (currentValue, oldValue) => {
    if (currentValue && currentValue.length > 2) {
      executeSearch()
    }
  })

  const goBack = async () => {
    searchStore.toggleSearchBar()
    if (searchQuery.value.length > 2) await navigateTo(searchStore.fromPage)
    searchQuery.value = ''
  }
  const executeSearch = async () => {
    if (!route.path.includes('search')) searchStore.setFromPage(route.path)
    await navigateTo({ path: '/search', query: { q: searchQuery.value } })
  }
  onMounted(() => {
    input.value && input.value.focus()
  })
</script>
