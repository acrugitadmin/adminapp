<template>
  <v-layout>
    <v-flex>
      <subPartners class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import subPartners from '@/components/subPartners'

export default {
  components: {
    subPartners,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>