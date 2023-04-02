<template>
  <v-container>
    <v-card v-for="post in getPosts" :key="post.id">
      <v-card-title>{{ post.title }}</v-card-title>
      <v-card-text>{{ post.body }}</v-card-text>
      <v-card-actions>
        <v-btn text>Click me</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'postList',

  data: function () {
    return {}
  },
  computed: {
    ...mapGetters({
      getPosts: 'posts/getPosts'
    })
  }
}
</script>
