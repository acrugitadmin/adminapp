<template>
  <v-layout>
    <v-flex>
      <Bulk class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Bulk from '@/components/Bulk'

export default {
  components: {
    Bulk,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>