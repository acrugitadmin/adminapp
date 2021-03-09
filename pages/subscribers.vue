<template>
  <v-layout>
    <v-flex>
      <Subscribers class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Subscribers from '@/components/Subscribers'

export default {
  components: {
    Subscribers,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>