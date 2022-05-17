import NProgress from 'nprogress'

export default {
  beforeRouteLeave(to, from, next) {
    if (!to.hash && typeof document !== 'undefined') {
      NProgress.start()
      next()
    }
  },
}
