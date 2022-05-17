// initial state
const state = () => ({
  dark: false,
})

// getters
const getters = {
  dark: (state, getters) => {
    return state.dark
  },
}

// mutations
const mutations = {
  toggleDark(state) {
    state.dark = !state.dark
  },
  setDark(state, value) {
    state.dark = value
  },
}

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
}
