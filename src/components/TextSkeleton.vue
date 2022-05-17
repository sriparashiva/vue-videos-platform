<template>
  <div class="textSkeleton flex flex-col w-full">
    <h2 class="textSkeleton__intro skeleton h-6 mr-18 rounded"></h2>
    <p class="textSkeleton__title skeleton mt-2 h-3 mr-3 rounded"></p>
  </div>
</template>

<style lang="scss">
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
