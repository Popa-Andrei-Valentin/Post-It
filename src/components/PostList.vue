<template>
  <v-container>
    <v-card v-for="post in list" :key="post.id">
      <v-card-title>{{ post.title }}</v-card-title>
      <v-card-text>{{ post.body }}</v-card-text>
      <v-card-actions v-if="!post.error">
        <v-btn text>Click me</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import POSTS from '../assets/const/postsConst'

export default {
  name: 'postList',
  props: {
    list: {
      type: Array,
      required: true,
      default: () => [POSTS.ERROR.NO_LOAD]
    }
  },
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
