<template>
  <v-layout>
    <v-flex>
      <Partner class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Partner from '@/components/Partner'

export default {
  components: {
    Partner,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>