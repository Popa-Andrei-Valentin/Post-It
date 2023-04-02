import axios from 'axios'
import POSTS from '@/assets/const/postsConst'

const posts = {
  namespaced: true,
  state: {
    posts: []
  },
  getters: {
    getPosts: (state) => state.posts
  },
  mutations: {
    setPosts (state, value) {
      state.posts = value
    }
  },
  actions: {
    /**
     * Download posts from API
     * @param {string} url
     */
    async downloadPosts ({ commit }, url) {
      if (!url || typeof url !== 'string') return

      const data = await axios
        .get(url)
        .then((response, err) => {
          if (response.data) return response.data
        })
        .catch((err) => {
          if (err) {
            const postError = POSTS.ERROR.API(err.response.status, err.message)
            return [postError]
          }
        })
      commit('setPosts', data)
    }
  }
}

export default posts
