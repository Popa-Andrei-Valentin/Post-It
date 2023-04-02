import Vue from 'vue'
import Vuex from 'vuex'

import posts from './modules/posts'
import comments from './modules/comments'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { posts, comments }
})
