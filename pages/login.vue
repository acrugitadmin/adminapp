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
                <v-form v-model="valid" @submit.prevent>
                  <v-row align="center" justify="center">
                    <v-img
                      max-width="200"
                      :src="logourl"
                    ></v-img>    
                  </v-row>
                  <div class="text-center mt-1" v-if="showname">
                    <h2 class="mb-2">{{partner_name}}</h2>
                    <h2>{{partner_code}}</h2>
                  </div>
                  <v-text-field
                  v-if="show"
                    v-model="login.phone"
                    placeholder="Please Enter Phone Number"
                    outlined
                    maxlength="10"
                    :readonly="read"
                    :rules="phoneRules"
                    class="mt-5 fb-comment-input"
                    label="Phone Number"
                    name="phone"
                    type="text"
                    id="phone"
                    v-on:keypress="isNumber($event)"
                    :autofocus="!otpfocus"
                    @keyup.enter="sendOtp"
                  />

                  <v-text-field
                  :autofocus="otpfocus"
                    v-if="otpGen"
                    id="password"
                    v-model="otp"
                    :rules="otpRules"
                    outlined
                    placeholder="Please Enter OTP"
                    label="OTP"
                    v-on:keypress="isNumber($event)"
                    name="opt"
                    type="text"
                    maxlength="4"
                    @keyup.enter="loginauth"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="black white--text" v-if="generated" :disabled="!valid" large @click="sendOtp"
                  >Request OTP</v-btn
                >
                <v-btn color="black white--text mr-2" v-if="verify" :disabled="!resednvalid" large @click="resend"
                  >Re-send OTP</v-btn
                >
                <v-btn color="black white--text" v-if="verify" :disabled="!valid" large @click="loginauth"
                  >Login &amp; Continue</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-snackbar v-model="snackbar" :color="color" top>
          {{ text }}
        </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
/* eslint eqeqeq: 0 */

export default {
  layout: 'login',

  async asyncData ({ store, $axios }) {
      console.log('called')
      const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const theme = urlParams.get('partner')

        if(store.state.sessionStorage.theme_id == null){
          if (theme == null) {
          store.commit('sessionStorage/setTheme', null)
          store.commit('sessionStorage/setThemeid', null)
        } else {
          store.commit('sessionStorage/setThemeid', theme)
          try{
        const posts = await $axios.get(
          '/admin/user/theme/get/' + theme
        );
        const colorcode = posts.data.theme
        
          store.commit('sessionStorage/setTheme', colorcode)
      
        }catch(error){

        }
        }
        }else{
          store.commit('sessionStorage/setThemeid', store.state.sessionStorage.theme_id)
          try{
        const posts = await $axios.get(
          '/admin/user/theme/get/' + store.state.sessionStorage.theme_id
        );
        const colorcode = posts.data.theme
        
          store.commit('sessionStorage/setTheme', colorcode)
      
        }catch(error){

        }

        }
        // if (theme == null) {
        //   store.commit('sessionStorage/setTheme', null)
        //   store.commit('sessionStorage/setThemeid', null)
        // } else {
        //   store.commit('sessionStorage/setThemeid', theme)
        //   try{
        // const posts = await $axios.get(
        //   '/admin/user/theme/get/' + theme
        // );
        // console.log('api', posts)
        // const colorcode = posts.data.theme
        
        //   store.commit('sessionStorage/setTheme', colorcode)
      
        // }catch(error){

        // }
        // }

    },

  data() {
    return {
      response: null,
      verify: false,
      generated: true,
      otp: '',
      otpGen: false,
      usersList: null,
      user: null,
      valid: true,
      phoneRules: [
        (v) => !!v || 'Phone number is required',
        v => (v && v.length == 10) || "Phone number must be equal to 10 digits"
      ],
      otpRules: [
        (v) => !!v || 'OTP is required',
        v => (v && v.length == 4) || "OTP must be equal to 4 digits"
      ],

      login: {
        phone: '',
      },
      snackbar: false,
      text: '',
      color: '',
      read: false,
      show: true,
      logourl: 'https://www.acru.in/wp-content/uploads/2019/10/logo_blk_1298x488.png',
      partner_name: null,
      partner_code: null,
      showname: false,
      envlogo: process.env.logolink,
      loaded: true,
      resednvalid: true,
      otpfocus: false
    }
  },
  mounted() {
    this.check()
  },
  methods: {
    check() {


      if(this.$store.state.sessionStorage.user_theme == null) {
        this.showname = false
        this.logourl = 'https://www.acru.in/wp-content/uploads/2019/10/logo_blk_1298x488.png'
      }else{

      if(this.$store.state.sessionStorage.user_theme.partner_name == "" && this.$store.state.sessionStorage.user_theme.logo_url == "") {
          this.showname = false
          this.logourl = 'https://www.acru.in/wp-content/uploads/2019/10/logo_blk_1298x488.png'
        }else if(this.$store.state.sessionStorage.user_theme.logo_url == "" && this.$store.state.sessionStorage.user_theme.partner_name != ""){
          this.logourl = 'https://www.acru.in/wp-content/uploads/2019/10/logo_blk_1298x488.png'
          this.showname = true
          this.partner_name = this.$store.state.sessionStorage.user_theme.partner_name
          this.partner_code = this.$store.state.sessionStorage.user_theme.partner_code
        }else if(this.$store.state.sessionStorage.user_theme.logo_url != "" && this.$store.state.sessionStorage.user_theme.partner_name == ""){
          this.logourl = this.envlogo + '/uploads/partnerlogo/' + this.$store.state.sessionStorage.user_theme.logo_url
          this.showname = false
        }else{
          this.showname = true
          this.partner_name = this.$store.state.sessionStorage.user_theme.partner_name
          this.partner_code = this.$store.state.sessionStorage.user_theme.partner_code
          this.logourl = this.envlogo + '/uploads/partnerlogo/' + this.$store.state.sessionStorage.user_theme.logo_url
        }
      }

    },
    async sendOtp() {
       try {
        const result = await this.$axios.$get(
          '/admin/user/otp/get/' + this.login.phone
        )
        this.verify = true
        this.otpGen = true
        this.generated = false
        this.read = true
        this.values = result
      } catch (error) {
        const status = parseInt(error.response && error.response.status)
        if (status == 404) {
          this.otpGen = false
          this.verify = false
          this.snackbar = true
          this.read = false
          this.generated = true
          this.text = error.response.data.message
          this.color = 'red'
        } else {
          this.otpGen = false
          this.verify = false
          this.generated = true
          this.snackbar = true
          this.read = false
          this.text = error.response.data.message
          this.color = 'red'
          
        }
      }
    },
    async loginauth() {
      this.loaded = false

      try {
        const token = await this.$axios.$post(
          '/admin/user/partner/login', {
            mobile: this.login.phone,
            otp: this.otp
          }
        )
        this.$store.commit('sessionStorage/updateUser', token)
        this.$router.push('/dashboard')
        this.loaded = true

      } catch (error) {
        this.otpfocus = true
        this.otp = ''
        this.loaded = true
        const status = parseInt(error.response && error.response.status)
        if (status == 400) {
          this.snackbar = true
          this.text = error.response.data.error.message
          this.color = 'red'
        } else if (status == 429) {
          this.read = false
          this.generated = true
          this.snackbar = true
          this.text = error.response.data.message
          this.color = 'red'
        }
        this.valid = false

      }

    },
    async resend() {
      this.resednvalid = false
      this.loaded = false
       try {
        const result = await this.$axios.$get(
          '/admin/user/otp/resend/' + this.login.phone
        )
        this.values = result
        this.loaded = true
        setTimeout(function(){ this.resednvalid = true }, 30000);

      } catch (error) {
        this.loaded = true
        this.resednvalid = true
        const status = parseInt(error.response && error.response.status)
        this.snackbar = true
          this.text = error.response.data.message
          this.color = 'red'
      }
    },
    isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return evt.preventDefault();
    }
    return evt;
}
  },
}
</script>
