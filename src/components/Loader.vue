<template>
  <div class="Loader mx-auto"></div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$Loader-size: 3rem;
$Loader-offset: 0.3rem;
$Loader-timing: ease-in-out;

.Loader {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: $Loader-size;
  margin-top: calc($Loader-size / 2);
  margin-bottom: calc($Loader-size / 2);
  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    animation-duration: 1.8s;
    animation-iteration-count: infinite;
    animation-timing-function: $Loader-timing;
    filter: drop-shadow(0 0 calc($Loader-offset / 2.25) rgba($accent, 0.75));
  }
  &:before {
    width: 100%;
    padding-bottom: 100%;
    box-shadow: inset 0 0 0 $Loader-offset $accent;
    animation-name: pulsA;
  }
  &:after {
    width: calc(100% - #{$Loader-offset}* 2);
    padding-bottom: calc(100% - #{$Loader-offset}* 2);
    box-shadow: 0 0 0 0 $accent;
    animation-name: pulsB;
  }
}

@keyframes pulsA {
  0% {
    box-shadow: inset 0 0 0 $Loader-offset $accent;
    opacity: 1;
  }
  50%,
  100% {
    box-shadow: inset 0 0 0 0 $primary;
    opacity: 0;
  }
}

@keyframes pulsB {
  0%,
  50% {
    box-shadow: 0 0 0 0 $primary;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 $Loader-offset $accent;
    opacity: 1;
  }
}
</style>
