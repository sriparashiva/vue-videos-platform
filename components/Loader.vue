<template>
  <div class="Loader loader mx-auto"></div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .loader {
    animation: rotate 1.3s infinite;
    height: 50px;
    width: 50px;
  }

  .loader:before,
  .loader:after {
    border-radius: 50%;
    content: '';
    display: block;
    height: 20px;
    width: 20px;
  }
  .loader:before {
    animation: ball1 1.3s infinite;
    background-color: $primary;
    box-shadow: 30px 0 0 #f8b334;
    margin-bottom: 10px;
  }
  .loader:after {
    animation: ball2 1.3s infinite;
    background-color: #f8b334;
    box-shadow: 30px 0 0 #97bf0d;
  }

  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg) scale(0.8);
      -moz-transform: rotate(0deg) scale(0.8);
    }
    50% {
      -webkit-transform: rotate(360deg) scale(1.2);
      -moz-transform: rotate(360deg) scale(1.2);
    }
    100% {
      -webkit-transform: rotate(720deg) scale(0.8);
      -moz-transform: rotate(720deg) scale(0.8);
    }
  }

  @keyframes ball1 {
    0% {
      box-shadow: 30px 0 0 #f8b334;
    }
    50% {
      box-shadow: 0 0 0 #f8b334;
      margin-bottom: 0;
      -webkit-transform: translate(15px, 15px);
      -moz-transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 #f8b334;
      margin-bottom: 10px;
    }
  }

  @keyframes ball2 {
    0% {
      box-shadow: 30px 0 0 $primary;
    }
    50% {
      box-shadow: 0 0 0 $primary;
      margin-top: -20px;
      -webkit-transform: translate(15px, 15px);
      -moz-transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 $primary;
      margin-top: 0;
    }
  }

  // .Loader {
  //   position: relative;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 100%;
  //   max-width: $loadersize;
  //   margin-top: calc($loadersize / 2);
  //   margin-bottom: calc($loadersize / 2);
  //   &:before,
  //   &:after {
  //     content: '';
  //     position: absolute;
  //     border-radius: 50%;
  //     animation-duration: 1.8s;
  //     animation-iteration-count: infinite;
  //     animation-timing-function: $Loader-timing;
  //     filter: drop-shadow(0 0 calc($Loader-offset / 2.25) rgba($accent, 0.75));
  //   }
  //   &:before {
  //     width: 100%;
  //     padding-bottom: 100%;
  //     box-shadow: inset 0 0 0 $Loader-offset $accent;
  //     animation-name: pulsA;
  //   }
  //   &:after {
  //     width: calc(100% - #{$Loader-offset}* 2);
  //     padding-bottom: calc(100% - #{$Loader-offset}* 2);
  //     box-shadow: 0 0 0 0 $accent;
  //     animation-name: pulsB;
  //   }
  // }

  // @keyframes pulsA {
  //   0% {
  //     box-shadow: inset 0 0 0 $Loader-offset $accent;
  //     opacity: 1;
  //   }
  //   50%,
  //   100% {
  //     box-shadow: inset 0 0 0 0 $primary;
  //     opacity: 0;
  //   }
  // }

  // @keyframes pulsB {
  //   0%,
  //   50% {
  //     box-shadow: 0 0 0 0 $primary;
  //     opacity: 0;
  //   }
  //   100% {
  //     box-shadow: 0 0 0 $Loader-offset $accent;
  //     opacity: 1;
  //   }
  // }
</style>
