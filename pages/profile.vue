<template>
  <v-layout>
    <v-flex>
      <Profile class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import Profile from '@/components/Profile'

export default {
  components: {
    Profile,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>
