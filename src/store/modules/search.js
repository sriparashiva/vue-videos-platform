// initial state
const state = () => ({
  showSearchBar: false,
  fromPage: '/',
})

// getters
const getters = {
  searchBarStatus: (state, getters) => {
    return state.showSearchBar
  },
  fromPageUrl: (state, getters) => {
    return state.fromPage
  },
}

// mutations
const mutations = {
  toggleSearchBar(state) {
    state.showSearchBar = !state.showSearchBar
  },
  displaySearchBar(state) {
    state.showSearchBar = true
  },
  hideSearchBar(state) {
    state.showSearchBar = false
  },
  clearFromPage(state) {
    state.fromPage = '/'
  },
  setFromPage(state, page) {
    state.fromPage = page
  },
}

// actions
// const actions = {
//   checkout({ commit, state }, products) {
//     const savedCartItems = [...state.items]
//     commit('setCheckoutStatus', null)
//     // empty cart
//     commit('setCartItems', { items: [] })
//     shop.buyProducts(
//       products,
//       () => commit('setCheckoutStatus', 'successful'),
//       () => {
//         commit('setCheckoutStatus', 'failed')
//         // rollback to the cart saved before sending the request
//         commit('setCartItems', { items: savedCartItems })
//       }
//     )
//   },

//   addProductToCart({ state, commit }, product) {
//     commit('setCheckoutStatus', null)
//     if (product.inventory > 0) {
//       const cartItem = state.items.find((item) => item.id === product.id)
//       if (!cartItem) {
//         commit('pushProductToCart', { id: product.id })
//       } else {
//         commit('incrementItemQuantity', cartItem)
//       }
//       // remove 1 item from stock
//       commit(
//         'products/decrementProductInventory',
//         { id: product.id },
//         { root: true }
//       )
//     }
//   },
// }

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
}
