<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>Post It?</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',

  data: function () {
    return {}
  },
  methods: {
    ...mapActions({
      downloadPosts: 'posts/downloadPosts'
    })
  },
  beforeMount () {
    this.downloadPosts('https://jsonplaceholder.typicode.com/posts')
  }
}
</script>
