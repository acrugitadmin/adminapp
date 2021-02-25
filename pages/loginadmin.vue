<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-overlay
          v-if="!loaded"
        >
        <div class="text-center">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div></v-overlay>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5">
            <v-card>
              <v-card-text>
                <v-form v-model="valid">
                  <v-row align="center" justify="center">
                    <v-img
                      max-width="200"
                      src="https://www.acru.in/wp-content/uploads/2019/10/logo_blk_1298x488.png"
                    ></v-img>
                  </v-row>
                  <v-text-field
                    v-model="login.email"
                    placeholder="someone@example.com"
                    outlined
                    :rules="emailRules"
                    class="mt-5"
                    label="Email ID"
                    name="email"
                    type="email"
                    @keyup.enter="loginauth"
                  />

                  <v-text-field
                    id="password"
                    v-model="login.password"
                    outlined
                    placeholder="super secret password"
                    :rules="passwordRules"
                    label="Password"
                    name="password"
                    type="password"
                    @keyup.enter="loginauth"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <h3 class="mr-3" @click="navemail" style="text-decoration: underline; cursor: pointer;">Forgot Password</h3>
                <v-btn color="black white--text" large @click="loginauth"
                  >Login &amp; Continue</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-snackbar v-model="snackbar" color="red" top>
          {{ text }}
        </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* eslint eqeqeq: 0 */

import { mapGetters } from 'vuex'

export default {
  layout: 'login',

  async asyncData ({ store, $axios }) {
      console.log('called')
      const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const theme = urlParams.get('partner')
        if (theme == null) {
          store.commit('sessionStorage/setTheme', null)
        } else {
          try{
        const posts = await $axios.get(
          '/admin/user/theme/get/' + theme
        );
        const colorcode = posts.data.theme
        
          store.commit('sessionStorage/setTheme', colorcode)
      
        }catch(error){

        }
        }


    },

  data() {
    return {
      usersList: null,
      user: null,
      valid: true,

      passwordRules: [
        (v) => !!v || 'Password field is required',
      ],
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],

      login: {
        email: '',
        password: '',
      },
      snackbar: false,
      text: '',
      color: '',
      loaded: true
    }
  },
  computed: {
    ...mapGetters('sessionStorage', ['getName']),
  },
  mounted() {
    // window.addEventListener('keyup', (event) => {
    //   if (event.keyCode === 13) {
    //     this.loginauth()
    //   }
    // })
    this.check()
  },
  methods: {
    check() {
      // console.log('mounted')
      // console.log('on login screen', this.$store.state.sessionStorage.loggedIn)
    },
    loginUser() {
      this.valid = false
      const info = { email: this.login.email, password: this.login.password }
      this.$store.dispatch('sessionStorage/userNames')
      this.$store.commit('sessionStorage/updateUser', info)
      if (
        this.login.email == 'superadmin@acru.in' &&
        this.login.password == 'qD2MvA%bcbR;Y7d'
      ) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.snackbar = true
        this.color = 'red'
        this.text = 'incorrect credentials'
        this.valid = true
      }
    },
    async loginauth() {
      this.loaded = false
      try {
        // const token = await this.$auth.loginWith('local', {
        //   data: {
        //     email: this.login.email,
        //     password: this.login.password,
        //   },
        // })
        this.valid = false
        const token = await this.$axios.$post('/admin/user/authenticate', {
          email: this.login.email,
          password: this.login.password,
        })
        this.$store.commit('sessionStorage/updateUser', token)
        this.$router.push('/dashboard')
        this.loaded = true
      } catch (error) {
        this.loaded = true
        this.snackbar = true
          this.text = error.response.data.msg
          this.color = 'red'
        const status = parseInt(error.response && error.response.status)
        if (status == 429) {
          this.snackbar = true
          this.text = error.response.data.msg
          this.color = 'red'
        }
      }
    },
    navemail() {
      this.$router.push('/forgotpassword')
    }
  },
}
</script>
