import axios from 'axios'
import POSTS from '@/assets/const/postsConst'

const posts = {
  namespaced: true,
  state: {
    posts: [],
    loadingPosts: false
  },
  getters: {
    getPosts: (state) => state.posts,
    getLoadingPosts: (state) => state.loadingPosts
  },
  mutations: {
    setPosts (state, value) {
      state.posts = value
    },
    setLoadingPosts (state, value) {
      state.loadingPosts = value
    }
  },
  actions: {
    /**
     * Download posts from API
     * @param {string} url
     */
    async downloadPosts ({ commit }, url) {
      if (!url || typeof url !== 'string') return

      commit('setLoadingPosts', true)

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

      commit('setLoadingPosts', false)
    }
  }
}

export default posts
