<template>
  <v-layout>
    <v-flex>
      <MyProfile class="mt-5" />
    </v-flex>
  </v-layout>
</template>

<script>
import MyProfile from '@/components/MyProfile'

export default {
  components: {
    MyProfile,
  },
  async asyncData() {},
  data() {
    return {}
  },
}
</script>