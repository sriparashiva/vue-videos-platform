<template>
  <div class="layout">
    <header class="header">
      <NavBar />
      <!-- <UserBar /> -->
    </header>
    <transition name="fade" appear>
      <main class="md:ml-4.5rem min-h-100vh flex flex-col justify-between">
        <slot />
        <Footer />
      </main>
    </transition>
    <transition name="slide">
      <SearchBar v-if="$store.getters.searchBarStatus" />
    </transition>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import UserBar from '@/components/UserBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    NavBar,
    SearchBar,
    Footer,
    UserBar,
  },
}
</script>

<style>
@font-face {
  font-family: 'Balto';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('../assets/fonts/Balto-Bold.woff2') format('woff2');
}
@font-face {
  font-family: 'Balto';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('../assets/fonts/Balto-Medium.woff2') format('woff2');
}
@font-face {
  font-family: 'Balto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('../assets/fonts/Balto-Book.woff2') format('woff2');
}
</style>
