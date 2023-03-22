<template>
  <div class="mb-8">
    <div class="px-10 my-4">
      <TextSkeleton class="w-60vw md:w-30vw" />
    </div>
    <div class="w-full overflow-hidden">
      <div
        class="mt-4 px-2.5rem overflow-x-scroll flex gap-x-2 scroll-smooth scrollbar-hide snap snap-proximity snap-x snap-pl-2.5rem"
      >
        <CardSkeleton v-for="i in 5" :key="i" />
      </div>
    </div>
  </div>
</template>

<script>
import CardSkeleton from '@/components/CardSkeleton.vue'
import TextSkeleton from '@/components/TextSkeleton.vue'
export default {
  name: 'VideoSliderSkeleton',
  components: {
    TextSkeleton,
    CardSkeleton,
  },
}
</script>
