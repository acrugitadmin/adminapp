<template>
    <v-layout>
      <v-flex>
        <editPartner class="mt-5" />
      </v-flex>
    </v-layout>
  </template>
  
  <script>
  import editPartner from '@/components/editPartner'
  
  export default {
    components: {
      editPartner,
    },
    async asyncData() {},
    data() {
      return {}
    },
  }
  </script>