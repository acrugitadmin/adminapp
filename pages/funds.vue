<template>
  <v-layout>
    <v-flex>
      <Funds class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Funds from '@/components/Funds'

export default {
  components: {
    Funds,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>
