<template>
  <v-container>
    <v-row>
      <v-progress-linear indeterminate :height="9" v-if="loading" />
    </v-row>
    <!-- Renders List of Posts -->
    <v-row
      class="fill-height overflow-y-auto"
      v-if="list.length && !list[0].error"
    >
      <v-col
        lg="4"
        md="6"
        sm="6"
        xs="10"
        cols="6"
        v-for="post in list"
        :key="post.id"
      >
        <v-sheet min-height="125" class="fill-height" color="transparent">
          <v-lazy
            v-model="post.isActive"
            :options="{
              threshold: 0.3
            }"
            class="fill-height"
          >
            <v-card class="fill-height" @click="openPost(post.id)" hover>
              <v-col class="text-sm-left text-center">
                <v-card-title>{{ post.title }}</v-card-title>
                <v-card-text>
                  {{ post.body }}
                </v-card-text>
              </v-col>
            </v-card>
          </v-lazy>
        </v-sheet>
      </v-col>
    </v-row>
    <!-- In case of Error -->
    <v-row justify="center" class="fill-height fill-width pa-4" v-else>
      <v-card color="#f76159" v-for="post in list" :key="post.id">
        <v-card-title>{{ post.title }}</v-card-title>
        <v-card-text>{{ post.body }}</v-card-text>
        <v-card-actions v-if="!post.error">
          <v-btn text>Click me</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import POSTS from '../assets/const/postsConst'
import router from '@/router'

export default {
  name: 'postList',
  props: {
    list: {
      type: Array,
      required: true,
      default: () => [POSTS.ERROR.NO_LOAD]
    },
    loading: {
      type: Boolean,
      default: () => false
    }
  },
  data: function () {
    return {}
  },
  methods: {
    /**
     * Open Post in a new page.
     * @param {number} target
     */
    openPost (target) {
      router.push(`/post/${target}`)
    }
  }
}
</script>
