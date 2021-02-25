<template>
  <v-layout>
    <v-flex>
      <PartnerList class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import PartnerList from '@/components/PartnerList'

export default {
  components: {
    PartnerList,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>