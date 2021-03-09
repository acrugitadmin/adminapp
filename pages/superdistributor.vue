<template>
  <v-layout>
    <v-flex>
      <Superdistributor class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Superdistributor from '@/components/Superdistributor'

export default {
  components: {
    Superdistributor,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>