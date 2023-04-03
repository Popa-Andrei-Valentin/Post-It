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
            color="green"
            variant="text"
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-sheet>
  </v-overlay>
</template>

<script>
import { mapGetters } from 'vuex'

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
    ...mapGetters({ getPost: 'posts/getCurrentPost' })
  },
  methods: {
    closeOverlay () {
      this.$emit('closeOverlay')
    },
    textChange (value) {
      if (value === this.getPost.body) this.newText = false
      else this.newText = true
    },
    titleChange (value) {
      if (value === this.getPost.title) this.newTitle = false
      else this.newTitle = true
    }
  }
}
</script>
