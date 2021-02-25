<template>
  <v-layout>
    <v-flex>
      <Portfolio class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Portfolio from '@/components/Portfolio'

export default {
  components: {
    Portfolio,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>
