<template>
  <v-container>
    <v-col>
      <v-btn color="blue" @click="goToHome">
        <v-icon start icon="mdi-arrow-left" />
        Back
      </v-btn>
    </v-col>

    <v-row class="fill-height overflow-y-auto">
      <v-col align="center" class="fill-height w-75"
        ><h1>{{ getPost.title }}</h1></v-col
      >
    </v-row>

    <v-row class="fill-height overflow-y-auto ma-2">
      <v-col align="start" class="fill-height">
        <p class="post-text">
          {{ getPost.body }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '@/router'
import { mapActions, mapGetters } from 'vuex'

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

  mounted () {
    // Set current Post that will be displayed
    this.setPost(this.currentId)
  },

  computed: {
    ...mapGetters({
      getPost: 'posts/getCurrentPost'
    })
  },

  methods: {
    ...mapActions({
      setPost: 'posts/findPost'
    }),
    goToHome () {
      router.push('/')
    }
  }
}
</script>
<style scoped>
.post-text {
  max-height: 350px;
  overflow-y: auto;
}
</style>
