<template>
  <v-container>
    <!-- Back Button -->
    <v-col>
      <v-btn color="blue" @click="goBack">
        <v-icon start icon="mdi-arrow-left" />
        Back
      </v-btn>
    </v-col>
    <!-- Post Title -->
    <v-row class="fill-height overflow-y-auto">
      <v-col align="center" class="fill-height w-75">
        <h1 class="text-h1">{{ getPost.title }}</h1>
      </v-col>
    </v-row>
    <!-- Post Body/Content -->
    <v-row class="fill-height overflow-y-auto ma-2">
      <v-col align="center" class="fill-height">
        <p class="post-text">
          {{ `"${getPost.body}"` }}
        </p>
      </v-col>
    </v-row>
    <!-- Comments Section -->
    <v-row>
      <h4>Comments</h4>
      <br />
      <v-card class="overflow-auto" max-height="400" max-width="100%">
        <v-list lines="three">
          <v-list-item v-for="comment in getComments" :key="comment.id">
            <v-list-item-content>
              <v-list-item-title>{{ comment.email }}</v-list-item-title>
              <v-list-item-subtitle class="text-wrap">{{
                comment.body
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import router from '@/router'
import { mapActions, mapGetters } from 'vuex'
import URL from '@/assets/const/urlConst'

export default {
  name: 'PostView',

  data: function () {
    return {
      currentId: null
    }
  },

  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.currentId = to.params.id
    })
  },

  async mounted () {
    // Set current Post that will be displayed
    this.setPost(this.currentId)
    await this.downloadComments(URL.COMMENTS(this.currentId))
  },

  computed: {
    ...mapGetters({
      getPost: 'posts/getCurrentPost',
      getComments: 'comments/getComments'
    })
  },

  methods: {
    ...mapActions({
      setPost: 'posts/findPost',
      downloadComments: 'comments/downloadComments'
    }),
    goBack () {
      router.go(-1)
    }
  }
}
</script>

<style scoped>
.post-text {
  max-height: 350px;
  overflow-y: auto;
  font-size: 1.4rem;
}
</style>
