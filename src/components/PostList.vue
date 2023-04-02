<template>
  <v-container>
    <v-row class="fill-height overflow-y-auto" v-if="list.length">
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
            <v-card class="fill-height" hover>
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
  computed: {}
}
</script>
