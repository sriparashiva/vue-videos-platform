<template>
  <div class="cardSkeleton">
    <div class="cardSkeleton__img aspect-video skeleton"></div>
    <div class="cardSkeleton__body w-full">
      <h2 class="cardSkeleton__title skeleton mt-3 h-4 mr-3 rounded"></h2>
      <p class="cardSkeleton__intro skeleton mt-2 h-4 mr-10 rounded"></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cardSkeleton {
  min-width: calc(0.7 * (100vw - 2.5rem));
  max-width: calc(0.7 * (100vw - 2.5rem));
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
