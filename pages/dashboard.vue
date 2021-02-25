<template>
  <v-layout>
    <v-flex>
      <Dashboard class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Dashboard from '@/components/Dashboard'

export default {
  components: {
    Dashboard,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>
