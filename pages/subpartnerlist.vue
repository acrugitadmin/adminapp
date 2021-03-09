<template>
    <v-layout>
      <v-flex>
        <subpartnerList class="mt-5" />
      </v-flex>
    </v-layout>
  </template>
  
  <script>
  import subpartnerList from '@/components/subpartnerList'
  
  export default {
    components: {
        subpartnerList,
    },
    async asyncData() {},
    data() {
      return {
      }
    },
  }
  </script>