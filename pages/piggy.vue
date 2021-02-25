<template>
  <v-layout>
    <v-flex>
      <Piggy class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Piggy from '@/components/Piggy'

export default {
  components: {
    Piggy,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>
