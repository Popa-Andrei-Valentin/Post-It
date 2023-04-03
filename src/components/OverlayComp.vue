<template>
  <v-overlay v-if="overlay">
    <v-sheet width="800" class="mx-6 pa-6">
      <v-form fat-fail @submit.prevent v-click-outside="closeOverlay">
        <v-text-field
          :value="getPost.title"
          label="Post Title:"
          :rules="titleRules"
        ></v-text-field>
        <v-spacer />
        <v-textarea
          clearable
          name="input-7-1"
          variant="filled"
          label="Post Content"
          auto-grow
          :value="getPost.body"
          :rules="textBodyRules"
        ></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeOverlay">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
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
          if (value?.length < 120) return true

          return 'Post cannot exceed 120 characters'
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
    }
  }
}
</script>
