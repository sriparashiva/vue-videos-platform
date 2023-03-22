<template>
  <div class="layout">
    <header class="header">
      <NavBar />
    </header>
    <Transition name="fade" appear>
      <main class="md:ml-4.5rem min-h-100vh flex flex-col justify-between">
        <slot />
        <Footer />
      </main>
    </Transition>
    <Transition name="slide">
      <SearchBar v-if="searchStore.searchBarStatus" class="w-full" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { useSearchStore } from '~~/stores/search'
  const searchStore = useSearchStore()
</script>

<style scoped></style>
