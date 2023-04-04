<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1 class="logo" @click="goToHome">Post It?</h1>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center" @click="goToCreate">
        <v-btn color="green">Create post</v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import URL from './assets/const/urlConst'
import router from './router'

export default {
  name: 'App',

  data: function () {
    return {}
  },
  methods: {
    ...mapActions({
      downloadPosts: 'posts/downloadPosts'
    }),
    // Return to home.
    goToHome () {
      if (router.currentRoute.name === 'home') return
      router.push('/')
    },
    goToCreate () {
      if (router.currentRoute.name === 'create-post') return
      router.push('/create-post')
    }
  },
  computed: {
    ...mapGetters({
      getPosts: 'posts/getPosts'
    })
  },
  beforeMount () {
    this.downloadPosts(URL.POSTS)
  }
}
</script>

<style scoped>
.logo {
  cursor: pointer;
}
</style>
