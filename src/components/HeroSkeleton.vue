<template>
  <div
    ref="hero"
    class="hero h-screen-50vh lg:h-screen-60vh xl:h-screen-70vh flex flex-col md:flex-row bg-white dark:bg-dark justify-between"
  >
    <div class="hero__cover overflow-hidden">
      <div class="w-full h-full">
        <div class="hero__cover__img skeleton w-full h-full" />
      </div>
    </div>
    <div class="hero__text px-10 pt-0 pb-6 flex flex-col justify-center">
      <div class="textSkeleton flex flex-col w-full">
        <h2 class="textSkeleton__intro skeleton h-6 mr-18 mb-3 rounded"></h2>
        <p class="textSkeleton__title skeleton mt-2 h-3 mr-3 rounded"></p>
        <p class="textSkeleton__title skeleton mt-2 h-3 mr-3 rounded"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.hero {
  .hero__cover {
    flex: 0 0 60%;
    @media screen and (min-width: 768px) {
      order: 2;
    }
    position: relative;
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
      content: '';
      background-image: linear-gradient(
        to top,
        rgba(256, 256, 256, 1) 0%,
        rgba(256, 256, 256, 0.1) 50%,
        rgba(256, 256, 256, 0.1) 100%
      );

      @media (min-width: 768px) {
        background-image: linear-gradient(
          to right,
          $white 0,
          transparent 50%,
          transparent 100%
        );
      }
    }
  }
  .hero__text {
    flex: 0 0 40%;
    @media screen and (min-width: 768px) {
      order: 1;
    }
  }
}

.dark .hero {
  .hero__cover {
    &::after {
      background-image: linear-gradient(
        to top,
        rgba(24, 26, 27, 1) 0%,
        rgba(24, 26, 27, 0.1) 50%,
        rgba(24, 26, 27, 0.1) 100%
      );
      @media (min-width: 768px) {
        background-image: linear-gradient(
          to right,
          rgba(24, 26, 27, 1) 0%,
          rgba(24, 26, 27, 0.8) 50%,
          rgba(24, 26, 27, 0.1) 100%
        );
      }
    }
  }
}

// THE LOADING EFFECT
.skeleton {
  background-color: $info_darken;
  // The shine that's going to move across the skeleton:
  background-image: linear-gradient(
    90deg,
    rgba($info_darken, 0),
    rgba(rgb(256, 256, 256), 0.5),
    rgba($info_darken, 0)
  );
  background-size: 80px 100%; // width of the shine
  background-repeat: no-repeat; // No need to repeat the shine effect
  background-position: left -80px top 0; // Place shine on the left side, with offset on the left based on the width of the shine - see background-size
  animation: shine 1.3s ease infinite; // increase animation time to see effect in 'slow-mo'
}

.dark .skeleton {
  background-color: $dark_lighten;
  // The shine that's going to move across the skeleton:
  background-image: linear-gradient(
    90deg,
    rgba(#b4b4b4, 0),
    rgba(rgb(36, 40, 42), 0.5),
    rgba(#b4b4b4, 0)
  );
}

@keyframes shine {
  to {
    // Move shine from left to right, with offset on the right based on the width of the shine - see background-size
    background-position: right -80px top 0;
  }
}
</style>
