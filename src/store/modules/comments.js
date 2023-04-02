import axios from 'axios'

const comments = {
  namespaced: true,
  state: {
    comments: []
  },
  getters: {
    getComments: (state) => state.comments
  },
  mutations: {
    setComments: (state, value) => {
      state.comments = value
    }
  },
  actions: {
    async downloadComments ({ commit }, url) {
      if (!url || typeof url !== 'string') return

      const data = await axios
        .get(url)
        .then((response) => {
          if (response.data) return response.data
        })
        .catch((err) => {
          console.log('err', err)
        })
      commit('setComments', data)
    }
  }
}

export default comments
