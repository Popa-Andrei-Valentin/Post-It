import axios from 'axios'
import POSTS from '@/assets/const/postsConst'
import URL from '@/assets/const/urlConst'

const posts = {
  namespaced: true,
  state: {
    posts: [],
    currentPost: [],
    loadingPosts: false,
    updatingPost: false,
    axiosStatus: null
  },
  getters: {
    getPosts: (state) => state.posts,
    getLoadingPosts: (state) => state.loadingPosts,
    getCurrentPost: (state) => state.currentPost,
    getUpdatingPost: (state) => state.updatingPost,
    getAxiosStatus: (state) => state.axiosStatus
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
    },
    setUpdatingPost (state, value) {
      state.updatingPost = value
    },
    setAxiosStatus (state, value) {
      state.axiosStatus = value
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

      if (!found) {
        commit('setCurrentPost', POSTS.ERROR.ERROR.NO_FOUND(404))
        commit('setLoadingPosts', false)
        return
      }

      commit('setCurrentPost', found)

      commit('setLoadingPosts', false)
    },

    /**
     * Update current selected Post.
     * @returns {object}
     */
    async updateCurrentPost ({ state, commit }, param) {
      if (!state.currentPost || !state.currentPost.id) return 'error'
      commit('setUpdatingPost', true)
      const toSend = {
        id: state.currentPost.id,
        title: param.title,
        body: param.body,
        userId: state.currentPost.userId
      }

      const update = await axios
        .put(URL.SELECT_POST(state.currentPost.id), toSend)
        .then((response) => response)

      if (update.status === 200 && update.data) {
        // Update posts array
        const posts = state.posts
        const index = posts.map((obj) => obj.id).indexOf(state.currentPost.id) // get index of modified Post

        if (index !== -1) {
          posts[index] = update.data
          commit('setPosts', posts)

          // Update current post
          await commit('setCurrentPost', update.data)
          commit('setAxiosStatus', 200)
        }
      }
      commit('setUpdatingPost', false)
    },
    disableAxiosStatus ({ commit }, value) {
      commit('setAxiosStatus', value)
    }
  }
}

export default posts
