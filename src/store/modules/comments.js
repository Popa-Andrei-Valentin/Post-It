import axios from 'axios'

const comments = {
  namespaced: true,
  state: {
    comments: [],
    loadingComments: false
  },
  getters: {
    getComments: (state) => state.comments,
    getLoadingComments: (state) => state.loadingComments
  },
  mutations: {
    setComments: (state, value) => {
      state.comments = value
    },
    setLoadingComments: (state, value) => {
      state.loadingComments = value
    }
  },
  actions: {
    async downloadComments ({ commit }, url) {
      if (!url || typeof url !== 'string') return
      commit('setLoadingComments', true)
      const data = await axios
        .get(url)
        .then((response) => {
          if (response.data) return response.data
        })
        .catch((err) => {
          console.log('err', err)
        })
      commit('setComments', data)
      commit('setLoadingComments', false)
    }
  }
}

export default comments
