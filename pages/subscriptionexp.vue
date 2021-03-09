<template>
    <v-layout>
      <v-flex>
        <Subscriptionexp class="mt-5" />
      </v-flex>
    </v-layout>
  </template>
  
  <script>
  import Subscriptionexp from '@/components/Subscriptionexp'
  
  export default {
    components: {
        Subscriptionexp,
    },
    async asyncData() {},
    data() {
      return {}
    },
  }
  </script>