<template>
  <v-layout>
    <v-flex>
      <h1 class="headline mb-5 mt-5 font-weight-light">SMS Reader</h1>
      <v-col>
        <v-textarea
          id="sms"
          v-model="sms"
          solo
          name="input-7-4"
          val
          placeholder="SMS"
        ></v-textarea>
      </v-col>
      <v-col v-if="allowsms == true">
        <v-spacer />
        <v-btn
          class="black white--text float-right"
          right
          @click="updateCalled()"
          >Save</v-btn
        >
      </v-col>

      <v-snackbar v-model="snackbar" :color="color" top>
        {{ text }}
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint eqeqeq: 0 */
export default {
  data() {
    return {
      test: null,
      snackbar: false,
      text: '',
      color: '',
      sms: null,
      allowsms: null
    }
  },

  mounted() {
    this.check()
  },
  methods: {
    async check() {
      this.allowsms = true


      // this.allowsms = this.$store.state.sessionStorage.rbac[22].access
      try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$get('/admin/dashboard/regexp/get')
        this.$store.commit('sessionStorage/setSms', result[0].id)
        this.sms = result[0].sms_expression
        this.test = result
      } catch (e) {
        console.log(e)
      }
    },
    async updateCalled() {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$post('/admin/dashboard/regexp/update', {
          expression: this.sms,
          _id: this.$store.state.sessionStorage.sms,
          config,
        })
        this.test = result
        this.sms = ''
        this.snackbar = true
        this.text = 'Successfully Updated SMS Reader'
        this.color = 'green'
        this.check()
      } catch (error) {
        const status = parseInt(error.response && error.response.status)
        if (status == 404) {
          this.snackbar = true
          this.text = 'Something Went Wrong, Try Again Later'
          this.color = 'red'
        }
        console.log(error)
      }
    },
  },
}
</script>
