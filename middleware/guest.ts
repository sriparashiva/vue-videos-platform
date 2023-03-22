export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useStrapiUser()
  if (user.value) {
    return navigateTo('/account')
  }
})
