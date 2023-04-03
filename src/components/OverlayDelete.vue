<template>
  <v-overlay v-if="showDeletePopup">
    <v-sheet width="400" class="mx-6 pa-6">
      <v-form fat-fail @submit.prevent v-click-outside="closeOverlay">
        <h4>Are you sure you want to delete ?</h4>
        <v-card-actions>
          <v-btn color="red" variant="text" @click="deletePost"> Yes </v-btn>
          <v-btn color="green" @click="closeOverlay"> No </v-btn>
        </v-card-actions>
      </v-form>
    </v-sheet>
  </v-overlay>
</template>

<script>
export default {
  name: 'OverlayDeleteComp',
  props: {
    showDeletePopup: {
      type: Boolean,
      required: true,
      default: () => false
    }
  },
  methods: {
    closeOverlay () {
      this.$emit('closeOverlay')
    }
  }
}
</script>
