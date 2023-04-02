import axios from 'axios'
import POSTS from '@/assets/const/postsConst'

const posts = {
  namespaced: true,
  state: {
    posts: [],
    currentPost: [],
    loadingPosts: false
  },
  getters: {
    getPosts: (state) => state.posts,
    getLoadingPosts: (state) => state.loadingPosts,
    getCurrentPost: (state) => state.currentPost
  },
  mutations: {
    setPosts (state, value) {
      state.posts = value
    },
    setLoadingPosts (state, value) {
      state.loadingPosts = value
    },
    setCurrentPost (state, value) {
      state.currentPost = value
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
    },

    async findPost ({ state, commit }, postId) {
      commit('setLoadingPosts', true)

      if (state.posts.length < 1 || isNaN(postId)) {
        commit('setCurrentPost', POSTS.ERROR.NO_FOUND(404))
        commit('setLoadingPosts', false)
        return
      }

      const found = state.posts.find((post) => post.id === Number(postId))
      console.log('found', found)
      if (!found) {
        commit('setCurrentPost', POSTS.ERROR.ERROR.NO_FOUND(404))
        commit('setLoadingPosts', false)
        return
      }

      commit('setCurrentPost', found)

      commit('setLoadingPosts', false)
    }
  }
}

export default posts
