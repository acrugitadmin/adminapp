<template>
  <v-layout>
    <v-flex>
      <Logs class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Logs from '@/components/Logs'

export default {
  components: {
    Logs,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>
