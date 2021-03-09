<template>
  <v-layout>
    <v-flex>
      <Listofpartnerssuperdis class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Listofpartnerssuperdis from '@/components/Listofpartnerssuperdis'

export default {
  components: {
    Listofpartnerssuperdis,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>