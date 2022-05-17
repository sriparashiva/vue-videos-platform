export default {
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     // access to component's instance using `vm` .
  //     // this is done because this navigation guard is called before the component is created.
  //     // clear your previously populated search results.
  //     // re-populate search results
  //     vm.initializeSearch()
  //   })
  // },
  created() {
    // Wait for store to check for authentication by watching the authChecked flag
    this.unwatch = this.$store.watch(
      (state, getters) => getters.authChecked,
      (newValue, oldValue) => {
        // If authentication is checked and login status is false, redirect to login page
        if (newValue && !this.$store.getters.loggedIn) {
          this.$router.push('/login')
        }
      }
    )
  },
  beforeDestroy() {
    // Stop watching on component destroy
    this.unwatch()
  },
}
