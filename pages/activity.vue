<template>
  <v-layout>
    <v-flex>
      <Activity class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Activity from '@/components/Activity'

export default {
  components: {
    Activity,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>
