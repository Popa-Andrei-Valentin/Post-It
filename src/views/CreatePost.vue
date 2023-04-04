<template>
  <v-container>
    <v-col>
      <v-btn color="blue" @click="goBack">
        <v-icon start icon="mdi-arrow-left" />
        Back
      </v-btn>
    </v-col>
    <v-form fat-fail @submit.prevent>
      <v-text-field
        v-model="title"
        label="Post Title:"
        :rules="titleRules"
        variant="outlined"
      ></v-text-field>
      <v-spacer />
      <v-textarea
        clearable
        name="input-7-1"
        variant="outlined"
        label="Post Content"
        auto-grow
        v-model="textBody"
        :rules="textBodyRules"
      ></v-textarea>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text"> Close </v-btn>
        <v-btn
          :disabled="disableSaveBtn"
          :loading="getUpdatingPost"
          color="green"
          variant="text"
          @click="createPost"
        >
          Save
          <v-icon v-if="getAxiosStatus">{{
            getAxiosStatus === 200 ? 'mdi-check' : 'mdi-alert'
          }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-container>
</template>

<script>
import router from '@/router'
import { mapGetters, mapActions } from 'vuex'

export default {
  data: function () {
    return {
      title: '',
      titleRules: [
        (value) => {
          if (value?.length > 3) return true

          return 'Title must be at least 3 characters.'
        }
      ],
      textBody: '',
      textBodyRules: [
        (value) => {
          if (value?.length < 250 && value?.length > 5) return true

          return 'Post cannot exceed 250 characters and be at least 5 characters long'
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      updatePost: 'posts/updateCurrentPost',
      disableAxiosStatus: 'posts/disableAxiosStatus'
    }),
    goBack () {
      router.go(-1)
    },
    createPost () {
      console.log('creating post !')
    }
  },
  computed: {
    ...mapGetters({
      getPost: 'posts/getCurrentPost',
      getUpdatingPost: 'posts/getUpdatingPost',
      getAxiosStatus: 'posts/getAxiosStatus'
    }),

    disableSaveBtn () {
      return (
        this.textBodyRules[0](this.textBody) !== true ||
        this.titleRules[0](this.title) !== true
      )
    }
  }
}
</script>
