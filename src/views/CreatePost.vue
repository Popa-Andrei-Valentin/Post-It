<template>
  <v-container>
    <v-col>
      <v-btn color="blue" @click="goBack">
        <v-icon start icon="mdi-arrow-left" />
        Back
      </v-btn>
    </v-col>
  </v-container>
</template>

<script>
import router from '@/router'

export default {
  data: function () {
    return {}
  },
  methods: {
    goBack () {
      router.go(-1)
    }
  }
}
</script>
