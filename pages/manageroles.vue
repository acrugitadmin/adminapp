<template>
  <v-layout>
    <v-flex>
      <Manageroles class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Manageroles from '@/components/Manageroles'

export default {
  components: {
    Manageroles,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>
