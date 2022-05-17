const axios = require('axios')

export default {
  created() {
    // Wait for store to check for authentication by watching the authChecked flag
    this.unwatch = this.$store.watch(
      (state, getters) => getters.authChecked,
      (newValue, oldValue) => {
        // If authentication check is complete and user is logged in, redirect to account page
        if (newValue && this.$store.getters.loggedIn) {
          this.$router.push('/account')
        }
      }
    )
  },
  beforeDestroy() {
    // Stop watching on component destroy
    this.unwatch()
  },
}
