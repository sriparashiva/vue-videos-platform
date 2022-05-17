// initial state
const state = () => ({
  loggedIn: false,
  user: null,
  jwt: null,
  authChecked: false,
})

// getters
const getters = {
  loggedIn: (state, getters) => {
    return state.loggedIn
  },
  user: (state, getters) => {
    return state.user
  },
  jwt: (state, getters) => {
    return state.jwt
  },
  authChecked: (state, getters) => {
    return state.authChecked
  },
}

// mutations
const mutations = {
  setLoggedIn(state, user) {
    state.loggedIn = true
    state.jwt = user.jwt
    state.user = user.user
  },
  setLoggedOut(state) {
    state.loggedIn = false
    state.jwt = null
    state.user = null
  },
  setAuthChecked(state, status) {
    state.authChecked = status
  },
}

// const axios = require('axios')
// import jwtAuth from '@/mixins/JwtAuth.js'
// actions
const actions = {
  // async checkJwtValidity(jwt) {
  //   try {
  //     const { data: data } = await axios.get(
  //       `${process.env.GRIDSOME_STRAPI_URL}/api/users/me`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${jwt}`,
  //         },
  //       }
  //     )
  //     if (data.error) {
  //       commit('setLoggedOut')
  //     } else {
  //       commit('setLoggedIn', jwt, data)
  //     }
  //   } catch (err) {
  //     commit('setLoggedOut')
  //   }
  // },
  // async getLoginFromCookie({ commit, state }, cookie) {
  //   console.log('mainjs check')
  //   try {
  //     const { data: data } = await axios.get(
  //       `${process.env.GRIDSOME_STRAPI_URL}/api/users/me`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${cookie}`,
  //         },
  //       }
  //     )
  //     console.log('mainjs strapi response')
  //     console.log(data)
  //     if (data.error) {
  //       commit('setLoggedOut')
  //     } else {
  //       commit('setLoggedIn', cookie, data)
  //     }
  //   } catch (err) {
  //     commit('setLoggedOut')
  //   }
  // },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
