
<template>
    <v-layout>
      <v-flex>
        <v-row class="marnegtopam" align="center" justify="center">
          <v-col class="d-flex" cols="12" sm="6">
              <h2>{{name}} - {{mobile}}</h2> 
          </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col class="d-flex" cols="12" sm="6">
              
          <iframe class="iframeinfo" http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" :src="geturl" frameborder="0"
              ></iframe>
              </v-col></v-row>
      </v-flex>
    </v-layout>
</template>

<script>
/* eslint eqeqeq: 0 */
export default {
  data() {
    return {
        name: this.$store.state.sessionStorage.assistedinfo.name,
        mobile: this.$store.state.sessionStorage.assistedinfo.mobile,
        partner_code: this.$store.state.sessionStorage.assistedinfo.refcode,
        envwebapp: process.env.webapplink,
        geturl: process.env.webapplink + "?id=" + this.$store.state.sessionStorage.assistedinfo.refcode + '&mobile=' + this.$store.state.sessionStorage.assistedinfo.mobile
    }
  },
  mounted() {
    this.check()
  },
  methods: {
    check() {
    }
  }
}
</script>

<style>
    .iframeinfo 
{
    display: block; 
 width: 410px;
 height: 650px;
    top: 150px;
 border: none; 
 /* overflow-y: auto;  */
 overflow-x: hidden;
}
.marnegtopam{
    margin-top: -20px;
}
</style>

