<template>
  <v-overlay v-if="overlay" @click="closeOverlay"></v-overlay>
</template>

<script>
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
    return {}
  },

  methods: {
    closeOverlay () {
      this.$emit('closeOverlay')
    }
  }
}
</script>
