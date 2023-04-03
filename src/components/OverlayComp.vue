<template>
  <v-overlay v-if="overlay">
    <v-sheet width="800" class="mx-6 pa-6">
      <v-form fat-fail @submit.prevent v-click-outside="closeOverlay">
        <v-text-field
          :value="getPost.title"
          label="Post Title:"
          @change="titleChange"
          :rules="titleRules"
        ></v-text-field>
        <v-spacer />
        <v-textarea
          clearable
          name="input-7-1"
          variant="filled"
          label="Post Content"
          auto-grow
          @change="textChange"
          :value="getPost.body"
          :rules="textBodyRules"
        ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeOverlay">
            Close
          </v-btn>
          <v-btn
            :disabled="!newText && !newTitle"
            :loading="getUpdatingPost"
            color="green"
            variant="text"
            @click="saveModifications"
          >
            Save
            <v-icon v-if="getAxiosStatus">{{
              getAxiosStatus === 200 ? 'mdi-check' : 'mdi-alert'
            }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-sheet>
  </v-overlay>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'OverlayComp',
  props: {
    overlay: {
      type: Boolean,
      required: true,
      default: () => false
    }
  },

  data: function () {
    return {
      newTitle: false,
      newText: false,
      title: '',
      titleRules: [
        (value) => {
          if (value?.length > 3) return true

          return 'Title must be at least 3 characters.'
        }
      ],
      textBody: '123',
      textBodyRules: [
        (value) => {
          if (value?.length < 250) return true

          return 'Post cannot exceed 250 characters'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      getPost: 'posts/getCurrentPost',
      getUpdatingPost: 'posts/getUpdatingPost',
      getAxiosStatus: 'posts/getAxiosStatus'
    })
  },
  methods: {
    ...mapActions({
      updatePost: 'posts/updateCurrentPost',
      disableAxiosStatus: 'posts/disableAxiosStatus'
    }),
    timeout (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    closeOverlay () {
      this.$emit('closeOverlay')
    },
    textChange (value) {
      if (value === this.getPost.body) this.newText = false
      else this.newText = value
    },
    titleChange (value) {
      if (value === this.getPost.title) this.newTitle = false
      else this.newTitle = value
    },
    async saveModifications () {
      if (!this.newText && !this.newTitle) return console.error('Cannot save')

      const textToSend = this.newText ? this.newText : this.getPost.body
      const titleToSend = this.newTitle ? this.newTitle : this.getPost.title

      await this.updatePost({ title: titleToSend, body: textToSend })

      // To disable button
      if (this.getAxiosStatus === 200) {
        this.newText = false
        this.newBody = false
        // To show ok or alert sign
        await this.timeout(1000)
        this.closeOverlay()
        this.disableAxiosStatus(null)
      }
    }
  }
}
</script>
