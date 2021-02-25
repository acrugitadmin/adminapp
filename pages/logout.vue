<template>
  <h3>Logging out..</h3>
</template>

<script>
export default {
  layout: 'login',
  mounted() {
    this.check()
  },
  methods: {
    check() {
      if (this.$store.state.sessionStorage.userType == 'partner') {
        // this.$store.commit('sessionStorage/deleteUser', false)
        // this.$router.push({ path: '/login' })
      if(this.$store.state.sessionStorage.theme_id == null) {
      this.$router.push({ path: '/login' })
      }else{
        this.$router.push({ path: '/login?partner=' + this.$store.state.sessionStorage.theme_id })
      }
      this.$store.commit('sessionStorage/deleteUser', false)
      } else {
        this.$store.commit('sessionStorage/deleteUser', false)
        this.$router.push({ path: '/loginadmin' })
      }
    },
  },
}
</script>
