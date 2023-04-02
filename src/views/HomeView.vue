<template>
  <post-list :list="getPosts" />
</template>

<script>
import postList from '../components/PostList'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeView',

  components: {
    postList
  },
  computed: {
    ...mapGetters({
      getPosts: 'posts/getPosts'
    })
  }
}
</script>
