<template>
  <v-container>
    <v-col>
      <v-btn color="blue" @click="goToHome">
        <v-icon start icon="mdi-arrow-left" />
        Back
      </v-btn>
    </v-col>

    <v-row class="fill-height overflow-y-auto">
      <v-col align="center" class="fill-height"><h1>test</h1></v-col>
    </v-row>

    <v-row class="fill-height overflow-y-auto ma-2">
      <v-col align="start" class="fill-height">
        <p>Test test</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '@/router'

export default {
  name: 'PostView',

  methods: {
    goToHome () {
      router.push('/')
    }
  }
}
</script>
