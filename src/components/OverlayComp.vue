<template>
  <v-overlay v-if="overlay">
    <v-sheet width="400" class="mx-6 pa-6">
      <v-form fast-fail @submit.prevent v-click-outside="closeOverlay">
        <v-text-field
          v-model="title"
          label="Post Title:"
          :rules="titleRules"
        ></v-text-field>

        <v-text-field
          v-model="textBody"
          label="Post Content:"
          :rules="textBodyRules"
        ></v-text-field>
        <v-textarea
          clearable
          name="input-7-1"
          variant="filled"
          label="Post Content"
          auto-grow
          v-model="postBody"
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
export default {
  name: 'OverlayComp',
  props: {
    overlay: {
      type: Boolean,
      required: true,
      default: () => false
    },
    postContent: {
      type: String,
      required: true,
      default: () => 'No post could be loaded'
    }
  },

  data: function () {
    return {
      title: '',
      titleRules: [
        (value) => {
          if (value?.length > 3) return true

          return 'First name must be at least 3 characters.'
        }
      ],
      textBody: '123',
      textBodyRules: [
        (value) => {
          if (/[^0-9]/.test(value)) return true

          return 'Last name can not contain digits.'
        }
      ]
    }
  },
  computed: {
    postBody () {
      return this.postContent
    }
  },
  methods: {
    closeOverlay () {
      this.$emit('closeOverlay')
    }
  }
}
</script>
