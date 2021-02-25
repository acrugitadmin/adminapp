<template>
  <v-layout>
    <v-flex>
    
    <v-row v-if="noval" align="center" justify="center">
        <v-col class="d-flex" cols="12" sm="6">
          <h1 class="headline mt-5 font-weight-light">Your Link Has Expired!</h1>
          <v-spacer />
        </v-col>
      </v-row>
      
      <v-row v-if="value" align="center" justify="center">
      <v-col cols="12" sm="8" md="5">

       <v-row align="center" justify="center">
              <v-img
              class="mt-5 mb-8"
              
                      max-width="120"
                      src="https://www.acru.in/wp-content/uploads/2019/10/logo_blk_1298x488.png"
                    ></v-img></v-row>

      <v-card class="cardstyle" >
      <v-card-title><v-row><v-col><v-img
                      max-width="80"
                      :src="logo"
                    ></v-img></v-col>
                    <v-col><div class="floarr">{{partnerId}}</div></v-col></v-row>
                    </v-card-title>
                    
                    <v-card-title style="margin-top: -22px;"><h2>{{partner_name}}</h2>
                    </v-card-title>

                    <v-card-text class="text--primary">
                    <h2 class="font-weight-light">Is Inviting You To Join The Financial Wellness Platform, Please Re-enter Your Phone Number.</h2>
                    <v-form v-model="valid"><h4 class="mt-5 mb-2 textColor">Phone Number</h4>
                    <v-text-field
                      id="phone"
                      type="tel"
                      v-on:keypress="isNumber($event)"
                      maxlength="10"
                      :readonly="read"
                      :rules="phoneRules"
                      v-model="phone"
                      placeholder="Please Enter Phone Number"
                      outlined
                      autofocus
                    ></v-text-field></v-form>

                    <v-card-actions class="justify-center">
                     <a v-if="link" href="https://play.google.com/store/apps/details?id=com.com.acru.solution&hl=en" target="_blank"><v-img
                        class="mt-8"
                        max-width="180"
                        src="/play.png"
                        ></v-img>
                      </a>
    
                    </v-card-actions>

                    </v-card-text>

                  <v-card-actions>
                      
                    <v-spacer />
                    <v-btn color="green white--text" :disabled="!valid" v-if="confirmbtn" large @click="confirm"
                      >Please Confirm</v-btn>
                  </v-card-actions>

              </v-card>
             
                    </v-col>
                  </v-row>

                  <v-snackbar v-model="snackbar" :color="color" top>
        {{ text }}
      </v-snackbar>
      </v-flex>
    </v-layout>
</template>

<script>
export default {
  layout: 'confirmation',

  data() {
    return {
      noval: false,
      confirmbtn: true,
      read: false,
      link: false,
      id: null,
      phone: null,
      partner_phone: null,
      partner_code: null,
      partner_name: null,
      partnerId: null,
      value: null,
      valid: true,
      logo: null,
      phoneRules: [
        (v) => !!v || 'Phone number is required',
        v => (v && v.length == 10) || "This field must be equal to 10 digits"
      ],
      snackbar: false,
      text: '',
      color: '',
    }
  },
  mounted() {
    this.check()
  },
  methods: {
    async check() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const product = urlParams.get('id')
      this.id = JSON.parse(atob(product.split('.')[1]))
      this.$store.commit('sessionStorage/setId', this.id.id)
      this.partner_code = this.$store.state.sessionStorage.partner_id
      try {
        const result = await this.$axios.$get(
          '/admin/user/partnerinfo/' + this.partner_code
        )
        this.value = result
        if( result.partnerData.company_name == null) { 
        this.partner_name = result.partnerData.firstname + ' ' + result.partnerData.lastname
        } else {
          this.partner_name = result.partnerData.company_name
        }
        this.partnerId = result.inviteeData.partner_code
        this.partner_phone = result.inviteeData.mobile
        if (result.partnerData.partner_logo == null) {
          this.logo = '/p.png'
        } else { 
        this.logo = 'https://admin-api.acru.in/uploads/partnerlogo/' + result.partnerData.partner_logo
        }

      } catch (error) {
        this.noval = true
        const status = parseInt(error.response && error.response.status)
          this.snackbar = true
          this.text = error.response.data.message
          this.color = 'red'
      }
    },
    async confirm() {
      if (this.phone == this.partner_phone) {
        // this.snackbar = true
        // this.text = 'Successfuly validated mobile number'
        // this.color = 'green'
        try {
          const result = await this.$axios.$get(
          '/admin/user/confirminvite/' + this.partner_code
        )
        this.values = result
        this.confirmbtn = false
        this.link = true
        this.snackbar = true
        this.text = result.message
        this.color = 'green'
        } catch(error) {
          this.snackbar = true
        this.text = error.response.data.message
        this.color = 'red'
        }
        this.read = true
      } else {
        this.snackbar = true
        this.text = 'Phone number does not match'
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
    },
  }
}

</script>

<style>
.paddingTop {
    margin-top: -20px;
}
.textColor {
  color: #676b68 !important;
}
.link {
  margin-left: 110px;
  color: #2aabdb !important;
}
.leftl {
  margin-left: 195px;
}
.floarr {
  float: right !important;
}
.cardstyle {
  padding-top: 20px; 
  padding-left: 20px; 
  padding-right: 20px; 
  padding-bottom: 20px;
}
</style>