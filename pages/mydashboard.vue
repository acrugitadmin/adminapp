<template>
  <v-layout>
    <v-flex>
      <Mydashboard class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Mydashboard from '@/components/Mydashboard'

export default {
  layout: 'dashboard',
  components: {
    Mydashboard,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>