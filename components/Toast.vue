<template>
  <Transition name="slide-fade">
    <div
      v-if="show"
      class="toast p-3 shadow-xl rounded-sm fixed w-auto right-8 top-8 text-base text-white z-20"
      :class="`${className} ${type == 'error' ? 'bg-red-900' : ''} ${
        type == 'success' ? 'bg-theme_bg' : ''
      }`"
    >
      {{ message }}
    </div>
  </Transition>
</template>

<script>
  export default {
    name: 'Toast',
    props: {
      type: String,
      className: String,
      message: String,
      show: Boolean,
    },
  }
</script>

<style lang="scss" scoped></style>
