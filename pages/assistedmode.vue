<template>
    <v-layout>
      <v-flex>
        <Assistedmode class="mt-5" />
      </v-flex>
    </v-layout>
  </template>
  
  <script>
  import Assistedmode from '@/components/Assistedmode'
  
  export default {
    components: {
        Assistedmode,
    },
    async asyncData() {},
    data() {
      return {}
    },
  }
  </script>