// initial state
const state = () => ({
  isLive: false,
  livestream: {
    liveID: null,
    liveTitle: '',
    liveThumbnail: '',
  },
})

// getters
const getters = {
  getLiveStatus: (state, getters) => {
    return state.isLive
  },
  getLivestreamDetails: (state, getters) => {
    return state.livestream
  },
}

// mutations
const mutations = {
  setLiveStatus(state, status) {
    state.isLive = status
  },
  setLivestreamDetails(state, livestream) {
    state.livestream = livestream
  },
}

const axios = require('axios')
// actions
const actions = {
  async fetchLivestream({ commit, state }) {
    try {
      const { data: livestream } = await axios.get(
        `${process.env.GRIDSOME_STRAPI_URL}/api/livestream?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GRIDSOME_STRAPI_TOKEN}`,
          },
        }
      )
      commit('setLiveStatus', livestream.data.attributes.isLive)
      commit('setLivestreamDetails', {
        liveID: livestream.data.attributes.youtubeID,
        liveTitle: livestream.data.attributes.title,
        liveThumbnail:
          process.env.GRIDSOME_STRAPI_URL +
          livestream.data.attributes.featuredImage.data.attributes.url,
      })
    } catch (err) {
      console.log(err)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
