<template>
  <NuxtLink aria-label="View all videos" :to="props.moreLink">
    <div
      class="moreCard flex justify-center items-center text-lg ml-0.5 bg-accent_lighten dark:bg-dark_lighten font-bold"
    >
      View All
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
  const props = defineProps({
    moreLink: { type: String, required: true },
  })
</script>

<style lang="scss" scoped>
  .moreCard {
    min-height: 1px;
    transition: all 0.3s ease-in-out;
    min-width: calc(0.7 * (100vw - 2.5rem));
    max-width: calc(0.7 * (100vw - 2.5rem));
    scroll-snap-align: start;
    @media screen and (min-width: $breakpoint-sm) {
      min-width: calc(0.4 * (100vw - 2.5rem));
      max-width: calc(0.4 * (100vw - 2.5rem));
    }
    @media screen and (min-width: $breakpoint-md) {
      min-width: calc(0.3 * (100vw - 2.5rem));
      max-width: calc(0.3 * (100vw - 2.5rem));
    }
    @media screen and (min-width: $breakpoint-lg) {
      min-width: calc(0.2 * (100vw - 2.5rem));
      max-width: calc(0.2 * (100vw - 2.5rem));
    }
    @media screen and (min-width: $breakpoint-xl) {
      min-width: calc(0.16 * (100vw - 2.5rem));
      max-width: calc(0.16 * (100vw - 2.5rem));
    }
  }
  .moreCard {
    height: calc(0.7 * (100vw - 2.5rem) * 9 / 16);
    @media (min-width: $breakpoint-md) {
      height: calc(0.3 * (100vw - 2.5rem) * 9 / 16);
    }
    @media (min-width: $breakpoint-lg) {
      height: calc(0.2 * (100vw - 2.5rem) * 9 / 16);
    }

    @media (min-width: $breakpoint-xl) {
      height: calc(0.16 * (100vw - 2.5rem) * 9 / 16);
    }
  }
  .moreCard:hover {
    transform: scale(1.02);
  }
</style>
