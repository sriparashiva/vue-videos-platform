export default {
  data() {
    return {
      gsiScriptLoaded: false,
    }
  },
  methods: {
    initializeGsi() {
      if (!window.google || this.gsiScriptLoaded) return
      this.gsiScriptLoaded = true
      window.google.accounts.id.initialize({
        client_id: process.env.GRIDSOME_GOOGLE_CLIENT_ID,
        callback: this.handleGoogleSignIn,
      })
      window.google.accounts.id.renderButton(
        this.$refs.googleButton,
        { theme: 'filled_black', size: 'medium' } // customization attributes
      )
      //   window.google.accounts.id.prompt()
    },
  },
  mounted() {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.onload = this.initializeGsi
    script.async = true
    script.id = 'google-client-script'
    document.querySelector('body')?.appendChild(script)
  },
  beforeUnmount() {
    window.google?.accounts.id.cancel()
    document.getElementById('google-client-script')?.remove()
  },
}
