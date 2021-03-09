<template>
  <v-layout>
    <v-flex>
      <v-row align="center" justify="center">
        <v-col class="d-flex" cols="12" sm="6">
          <h1 class="headline mt-5 font-weight-light">Single Invite</h1>
          <v-spacer />
        </v-col>
      </v-row>
      <br />
      <br />
      <v-form v-model="valid">
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
        <v-col class="paddingTop" cols="12" sm="6">
        <h4 class="mb-2 textColor">First Name</h4>
            <v-text-field
              id="name"
              v-model="name"
              v-on:keypress="isLetter($event)"
              :rules="namevalidrules"
              placeholder="Please Enter The First Name"
              outlined
            ></v-text-field>
            </v-col>
            </v-row>
            <v-row align="center" justify="center">
        <v-col class="paddingTop" cols="12" sm="6">
        <h4 class="mb-2 textColor">Last Name</h4>
            <v-text-field
              id="lastname"
              v-model="lastname"
              v-on:keypress="isLetter($event)"
              :rules="namevalidrules"
              placeholder="Please Enter The Last Name"
              outlined
            ></v-text-field>
            </v-col>
            </v-row>
            <v-row align="center" justify="center">
          <v-col class="paddingTop" cols="12" sm="6">
          <h4 class="mb-2 textColor">Phone Number</h4>
            <v-text-field
              id="phone"
              v-model="phone"
              v-on:keypress="isNumber($event)"
              maxlength="10"
              :rules="phoneRules"
              placeholder="Please Enter The Phone Number"
              outlined
            ></v-text-field>
            </v-col>
            </v-row>
      </v-form>
      <v-row class="margintopneg" justify="center">
        <v-col class="" cols="12" sm="6">
        <v-container fluid>
            <v-checkbox v-model="sms" label="Send SMS"></v-checkbox>
        </v-container>
        </v-col>
        </v-row>
        <v-row v-if="assistedmodeallowed" class="margintopneg" justify="center">
          <v-col class="" cols="12" sm="6">
          <v-container fluid>
              <v-checkbox v-model="checkbox2" label="Assisted Mode"></v-checkbox>
          </v-container>
          </v-col>
          </v-row>
      <v-row align="center" justify="center">
        <v-col class="d-flex" cols="12" sm="6">
          <v-spacer />
          <v-btn
            color="black white--text"
            large
            :disabled="!valid"
            @click="called"
            >Submit</v-btn
          >
        </v-col>
      </v-row>

      <v-snackbar v-model="snackbar" :color="color" top>
        {{ text }}
      </v-snackbar>

      <v-layout row justify-center>
        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                    <h1 class=" font-weight-light mt-10">Confirm Sending Invite</h1>
              </v-container>
            </v-card-text>
            <v-card-text>
            <v-container grid-list-md>
            <h3 class=" font-weight-light"> {{rejection_reason}} </h3>
             </v-container>
            </v-card-text>
            <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            text
            @click="confirm()"
          >
            Yes
          </v-btn>
          <v-btn
            color="warning"
            text
            @click="dialog = false"
          >
            No
          </v-btn>
        </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

    </v-flex>
  </v-layout>
</template>

<script>
/* eslint eqeqeq: 0 */
export default {
  data() {
    return {
      rejection_reason: null,
      valid: false,
      dialog: false,
      name: null,
      lastname: null,
      phone: null,
      phoneRules: [
        (v) => !!v || 'Phone number is required',
        v => (v && v.length == 10) || "Phone number must be equal to 10 digits"
      ],
      rules: [
        (v) => !!v || 'This field is required',
      ],
      snackbar: false,
      text: '',
      color: '',
      batch_number: null,
      sms: false,
      checkbox2: false,
      assistedmodeallowed: true,
      loaded: true,
      namevalidrules: [
      (v) => !!v || 'This field is required',
      v => {
          if (v) return /^[a-zA-Z ]*$/.test(v) || 'Name Cannot Contain Numbers Or Special Characters';
          else return true;
        },
      ],
    }
  },
  mounted() {
    this.check()
  },
  methods: {
    check() {
      if(this.$store.state.sessionStorage.data.assistance_allowed == true) {
        this.assistedmodeallowed = true
      }else {
        this.assistedmodeallowed = false
      }
    },
      async called() {
        this.$axios.setHeader('Content-Type', 'application/json')
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        try {
        // this.$axios.setHeader(
        //   'Authorization',
        //   'bearer ' + this.$store.state.sessionStorage.token
        // )
        const result = await this.$axios.$post(
          '/admin/partner/singleinvite', {
            firstname: this.name,
            lastname: this.lastname,
            mobile: this.phone,
            partner_code: this.$store.state.sessionStorage.partner_code
          }
        )
        this.values = result
        this.batch_number = result.batch_number
        // this.snackbar = true
        // this.text = 'Successfully Submitted'
        // this.color = 'success'
        // setTimeout(function(){ location.reload(); }, 1000);
        this.dialog = true
        this.rejection_reason = result.data[0].rejection_reason
      } catch (error) {
        this.snackbar = true
        this.text = error.response.data.message
        this.color = 'red'
        const status = parseInt(error.response && error.response.status)
        if (status == 404) {
        this.snackbar = true
        this.text = error.response.data.message
        this.color = 'red'
        }
      }

      },
           isLetter(e) {
       let char = String.fromCharCode(e.keyCode); 
        if(/^[a-zA-Z ]*$/.test(char)) return true; 
        else e.preventDefault();
      },
      isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return evt.preventDefault();
    }
    return evt;
},
  async confirm() {
    this.loaded = false
    this.dialog = false
    this.$axios.setHeader('Content-Type', 'application/json')
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
  try {
        // this.$axios.setHeader(
        //   'Authorization',
        //   'bearer ' + this.$store.state.sessionStorage.token
        // )
        const result = await this.$axios.$post(
          '/admin/partner/inviteconfirm', {
            batch_number: this.batch_number,
            partner_code: this.$store.state.sessionStorage.partner_code,
            confirmation: 'CONFIRM',
            send_sms: this.sms,
            partner_assisted: this.checkbox2
          }
        )
        this.values = result
        this.snackbar = true
        this.text = result.message
        this.color = 'success'
        this.sms = false
        this.checkbox2 = false
        
        setTimeout(function(){ location.reload(); }, 1000);
        this.loaded = true
      } catch (error) {
        this.loaded = true
        this.snackbar = true
        this.text = error
        this.color = 'red'
      }
this.dialog = false

},
   async cancel() {
    this.$axios.setHeader('Content-Type', 'application/json')
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
  try {
        // this.$axios.setHeader(
        //   'Authorization',
        //   'bearer ' + this.$store.state.sessionStorage.token
        // )
        const result = await this.$axios.$post(
          '/admin/partner/inviteconfirm', {
            batch_number: this.batch_number,
            partner_code: this.$store.state.sessionStorage.partner_code,
            confirmation: 'CANCEL',
            send_sms: this.sms,
            partner_assisted: this.checkbox2
            }
        )
        this.values = result
        this.snackbar = true
        this.text = result.message
        this.color = 'success'
        this.sms = false
        this.checkbox2 = false
        // setTimeout(function(){ location.reload(); }, 1000);
      } catch (error) {
        this.snackbar = true
        this.text = error.response
        this.color = 'red'
      }
      this.name = null
      this.lastname = null
      this.phone = null
      this.dialog = false

}
  },
}
</script>

<style>
  .margintopneg {
    margin-top: -40px;
  }
.paddingTop {
    margin-top: -20px;
}
.textColor {
  color: #676b68 !important;
}
</style>
