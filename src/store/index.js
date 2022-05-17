import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search'
import livestream from './modules/livestream'
import login from './modules/login'
import dark from './modules/dark'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    search,
    livestream,
    login,
    dark,
  },
})
