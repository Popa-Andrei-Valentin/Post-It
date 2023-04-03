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
    <!-- Action Section  -->
    <v-row class="fill-height" v-if="!getPost.error">
      <v-col align="center">
        <v-btn color="green" class="ma-2" @click="openEdit(getPost)"
          >Edit</v-btn
        >
        <v-btn color="red" class="ma-2">Delete</v-btn>
      </v-col>
    </v-row>
    <!-- Overlay Section (for editing post) -->
    <overlay-comp
      :overlay="overlay"
      :post="getPost"
      @closeOverlay="overlay = false"
    />
    <!-- Comments Section -->
    <v-row v-if="!getPost.error">
      <h4>Comments</h4>
    </v-row>
    <v-row v-if="!getPost.error">
      <v-card
        class="overflow-auto"
        max-height="400"
        max-width="100%"
        v-if="!getLoadingComments"
      >
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
      <v-progress-linear indeterminate :height="9" v-else />
    </v-row>
  </v-container>
</template>

<script>
import router from '@/router'
import { mapActions, mapGetters } from 'vuex'
import URL from '@/assets/const/urlConst'
import OverlayComp from '@/components/OverlayComp.vue'

export default {
  name: 'PostView',
  components: {
    OverlayComp
  },
  data: function () {
    return {
      currentId: null,
      overlay: false
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
    this.overlay = false
  },

  computed: {
    ...mapGetters({
      getPost: 'posts/getCurrentPost',
      getComments: 'comments/getComments',
      getLoadingComments: 'comments/getLoadingComments'
    })
  },

  methods: {
    ...mapActions({
      setPost: 'posts/findPost',
      downloadComments: 'comments/downloadComments'
    }),
    goBack () {
      router.go(-1)
    },
    openEdit (value) {
      if (value.error) return (this.overlay = false)
      this.overlay = true
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
