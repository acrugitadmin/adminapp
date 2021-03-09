<template>
  <v-layout>
    <v-flex>
      <Sms class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Sms from '@/components/Sms'

export default {
  components: {
    Sms,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>
