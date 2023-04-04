import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create-post',
    name: 'create-post',
    component: function () {
      return import(/* webpackChunkName: "create" */ '../views/CreatePost.vue')
    }
  },
  {
    path: '/post/:id',
    name: 'PostPage',
    props: true,
    component: function () {
      return import(/* webpackChunkName: "postview" */ '../views/PostView.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
