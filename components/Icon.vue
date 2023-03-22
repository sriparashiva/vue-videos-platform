<template>
  <svg :class="color" viewBox="2 2 20 20">
    <path :d="`${icon}`" />
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: { type: String, required: true },
    color: { type: String, default: 'fill-white' },
  },
}
</script>
