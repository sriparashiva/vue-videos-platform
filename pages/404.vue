<template>
  <div
    class="overflow-hidden h-screen-50vh lg:h-screen-60vh xl:h-screen-70vh w-full relative"
  >
    <div class="content__404 absolute z-3 top-0 left-0 p-16 lg:(mt-18 ml-10)">
      <h1
        class="text-5rem font-bold mb-3 text-text_darken dark:text-dark_text_lighten"
      >
        404
      </h1>
      <h2 class="text-xl text-2xl mb-3 font-medium">
        Oops, the page you're looking for does not exist.
      </h2>
      <p class="text-sm">You may want to head back to the homepage.</p>
      <NuxtLink
        to="/"
        class="mt-4 bg-accent px-5 py-2 w-max flex justify-center items-center gap-x-1 text-sm transition-colors hover:bg-accent_darken text-white dark:text-white hover:text-white dark:hover:text-white font-medium"
      >
        Return Home
      </NuxtLink>
    </div>
    <div
      class="overlay__404 w-full h-screen-50vh lg:h-screen-60vh xl:h-screen-70vh absolute top-0 right-0 left-0"
    >
      <div
        class="w-full bg-white dark:bg-dark opacity-80 h-screen-50vh lg:h-screen-60vh xl:h-screen-70vh absolute top-0 right-0 left-0"
      ></div>
      <h1
        class="text__404 text-center text-10rem sm:text-16rem lg:text-20rem font-semibold opacity-30"
      >
        404
      </h1>
    </div>

    <canvas ref="canvas" id="C" class="bg__404 w-100% w-100% z-0"></canvas>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        canvas: null,
      }
    },
    methods: {
      resize(C) {
        C.width = window.innerWidth
        C.height = window.innerHeight
      },
    },
    mounted() {
      let C = document.getElementById('C')
      this.canvas = C
      this.resize(C)
      window.addEventListener('resize', this.resize(C))
      let c = C.getContext('2d')
      let w = C.width
      let h = C.height
      let d = c.createImageData(w, h)
      setInterval(() => {
        let i = w * h * 4
        while ((i -= 4)) {
          let s = Math.random() * 255
          let j = 4
          while (j--) d.data[j + i] = j > 2 ? 255 : s
        }
        c.putImageData(d, 0, 0)
      }, 17)
    },
  }
</script>

<style lang="scss" scoped>
  .bg__404 {
    background: #666;
    background: red; /* For browsers that do not support gradients */
    background: -webkit-radial-gradient(#fff, #666); /* Safari 5.1 to 6.0 */
    background: -o-radial-gradient(#fff, #666); /* For Opera 11.6 to 12.0 */
    background: -moz-radial-gradient(#fff, #666); /* For Firefox 3.6 to 15 */
    background: radial-gradient(
      #fff,
      #666
    ); /* Standard syntax (must be last) */
  }
  .overlay__404 {
    background: -moz-radial-gradient(
      center,
      ellipse cover,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 19%,
      rgba(0, 0, 0, 0.9) 100%
    ); /* FF3.6+ */
    background: -webkit-gradient(
      radial,
      center center,
      0px,
      center center,
      100%,
      color-stop(0%, rgba(0, 0, 0, 0)),
      color-stop(19%, rgba(0, 0, 0, 0)),
      color-stop(100%, rgba(0, 0, 0, 0.9))
    ); /* Chrome,Safari4+ */
    background: -webkit-radial-gradient(
      center,
      ellipse cover,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 19%,
      rgba(0, 0, 0, 0.9) 100%
    ); /* Chrome10+,Safari5.1+ */
    background: -o-radial-gradient(
      center,
      ellipse cover,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 19%,
      rgba(0, 0, 0, 0.9) 100%
    ); /* Opera 12+ */
    background: -ms-radial-gradient(
      center,
      ellipse cover,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 19%,
      rgba(0, 0, 0, 0.9) 100%
    ); /* IE10+ */
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 19%,
      rgba(0, 0, 0, 0.9) 100%
    ); /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr = '#00000000', endColorstr = '#e6000000', GradientType = 1); /* IE6-9 fallback on horizontal gradient */
  }
  .text__404 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: transparent;
    text-shadow: 0 0 5px $dark;
  }
</style>
