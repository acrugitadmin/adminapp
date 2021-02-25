<template>
  <v-layout>
    <v-flex>
      <SingleInvite class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import SingleInvite from '@/components/SingleInvite'

export default {
  components: {
    SingleInvite,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>
