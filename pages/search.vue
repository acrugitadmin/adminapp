<template>
  <v-layout>
    <v-flex>
      <Search class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Search from '@/components/Search'

export default {
  components: {
    Search,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>
