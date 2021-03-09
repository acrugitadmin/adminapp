<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
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
                    id="password"
                    v-model="login.phine"
                    outlined
                    placeholder="Enter Phone Number"
                    :rules="phoneRules"
                    label="Phone Number"
                    name="phone"
                    type="text"
                    @keyup.enter="loginauth"
                  />

                  <v-text-field
                  v-if="otpVal"
                    v-model="login.otp"
                    placeholder="Enter the OTP"
                    outlined
                    class="mt-5"
                    label="OTP"
                    name="otp"
                    type="text"
                    @keyup.enter="loginauth"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
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

  data() {
    return {
      usersList: null,
      user: null,
      valid: true,

      phoneRules: [
        (v) =>
          (v && v.length = 10) || 'Phone number must be equal to 10 characters',
        (v) => !!v || 'Phone number field is required',
      ],

      login: {
        otp: '',
        phone: '',
      },
      snackbar: false,
      text: '',
      color: '',
      otpVal: null
    }
  },
  computed: {
    ...mapGetters('sessionStorage', ['getName']),
  },
  mounted() {
  },
  methods: {
    loginauth() {
        otpVal = true
      try {
        
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
