<template>
  <v-layout>
    <v-flex>
      <Device class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Device from '@/components/Device'

export default {
  components: {
    Device,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>
