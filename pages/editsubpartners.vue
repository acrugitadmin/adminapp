<template>
    <v-layout>
      <v-flex>
        <Editsubpartners class="mt-5" />
      </v-flex>
    </v-layout>
  </template>
  
  <script>
  import Editsubpartners from '@/components/Editsubpartners'
  
  export default {
    components: {
        Editsubpartners,
    },
    async asyncData() {},
    data() {
      return {}
    },
  }
  </script>