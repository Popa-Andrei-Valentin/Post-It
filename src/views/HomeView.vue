<template>
  <post-list :list="getPosts" :loading="getLoading" />
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
      getPosts: 'posts/getPosts',
      getLoading: 'posts/getLoadingPosts'
    })
  }
}
</script>
