<template>
  <v-layout>
    <v-flex>
      <v-row align="center" justify="center">
        <v-col class="d-flex" cols="12" sm="6">
          <h1 class="headline mt-5 font-weight-light">Support</h1>
          <v-spacer />
        </v-col>
      </v-row>
      <div v-if="!vals">
        <h3 class="mt-5 font-weight-light">
          Loading...
        </h3>
      </div>
      <br />
      <br />
      <v-form v-if="vals" v-model="valid">
      <v-row align="center" justify="center">
            <v-col class="paddingTop" cols="12" sm="6">
            <h4 class="mb-2 textColor">Select Type</h4>
            <v-select
            v-model="select"
            :items="items"
            :rules="drules"
            item-text="name"
            label="Select"
            return-object
            outlined
          ></v-select>
          </v-col>
          </v-row>
        <v-row align="center" justify="center">
        <v-col class="paddingTop" cols="12" sm="6">
        <h4 class="mb-2 textColor">Name</h4>
            <v-text-field
              id="name"
              type="text"
              :rules="drules"
              v-model="name"
              placeholder="Please Enter The Name"
              outlined
            ></v-text-field>
            </v-col>
            </v-row>
            <v-row align="center" justify="center">
        <v-col class="paddingTop" cols="12" sm="6">
        <h4 class="mb-2 textColor">Phone Number</h4>
            <v-text-field
              id="mobile"
              type="text"
              maxlength="10"
              :rules="phoneRules"
              v-on:keypress="isNumber($event)"
              v-model="mobile"
              placeholder="Please Enter The Phone Number"
              outlined
            ></v-text-field>
            </v-col>
            </v-row>
            <v-row align="center" justify="center">
        <v-col class="paddingTop" cols="12" sm="6">
        <h4 class="mb-2 textColor">Email</h4>
            <v-text-field
              id="email"
              type="text"
              v-model="email"
              :rules="emailRules"
              placeholder="Please Enter The Email"
              outlined
            ></v-text-field>
            </v-col>
            </v-row>
            <v-row align="center" justify="center">
        <v-col class="paddingTop" cols="12" sm="6">
        <h4 class="mb-2 textColor">Subject</h4>
            <v-text-field
              id="subject"
              :rules="drules"
              type="text"
              v-model="subject"
              placeholder="Please Enter The Subject"
              outlined
            ></v-text-field>
            </v-col>
            </v-row>
            <v-row align="center" justify="center">
          <v-col class="paddingTop" cols="12" sm="6">
          <h4 class="mb-2 textColor">Description</h4>
            <v-textarea
          id="description"
          :rules="drules"
          v-model="description"
          outlined
          placeholder="Enter The Description"
        ></v-textarea>
            </v-col>
            </v-row>

            <v-row align="center" justify="center">
            <v-col class="paddingTop" cols="12" sm="6">
            <h4 class="mb-2 textColor">Select Priority</h4>
            <v-select
            v-model="priority"
            :items="items1"
            :rules="drules"
            item-text="name"
            label="Select"
            return-object
            outlined
          ></v-select>
          </v-col>
          </v-row>

            
      </v-form>
      <v-row v-if="vals" align="center" justify="center">
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

    </v-flex>
  </v-layout>
</template>

<script>
/* eslint eqeqeq: 0 */
export default {
  data() {
    return {
      items: null,
      valid: false,
      name: null,
      mobile: null,
      email: null,
      subject: null,
      description: null,
      priority: null,
      select: null,
      items1: null,
      drules: [
        (v) => !!v || 'This section is required',
      ],
      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      phoneRules: [
        (v) => !!v || 'Phone number is required',
        v => (v && v.length == 10) || "This field must be equal to 10 digits"
      ],
      snackbar: false,
      text: '',
      color: '',
      value: null,
      vals: null
    }
  },
  mounted() {
    this.check() 
  },
  methods: {
    async check() {
      try {
        const result = await this.$axios.$post(
          'https://www.acru.in/wp-json/supportcandy/v1/guestTicketFormFields?secret_key=5f1676b9c3f7a5f1676b9c3f7b'
        )
        this.vals = result
        this.items = result[0].options
        this.items1 = result[6].options
      } catch(error) {
      }
    },
      async called() {
        try {
        // const params = {
	      //   fields_data: {ticket_category: this.select.name, customer_name: this.name, phone_number: this.mobile, customer_email: this.email, ticket_subject: this.subject, ticket_description: this.description, ticket_priority: this.priority.name}
        // }
        const params = {ticket_category: this.select.name, customer_name: this.name, phone_number: this.mobile, customer_email: this.email, ticket_subject: this.subject, ticket_description: this.description, ticket_priority: this.priority.name}
        const value = JSON.stringify(params)
        const result = await this.$axios.$post(
          `https://www.acru.in/wp-json/supportcandy/v1/tickets/addGuestTicket?secret_key=5f1676b9c3f7a5f1676b9c3f7b&fields_data=${value}`
        )
        this.value = result
        this.snackbar = true
        this.color = 'success'
        this.text = 'Your Issue Has Been Reported'
        setTimeout(function(){ location.reload(); }, 2000);
      } catch(error) {
        this.snackbar = true
        this.color = 'red'
        this.text = error

      }

      },
           isLetter(e) {
       let char = String.fromCharCode(e.keyCode); 
        if(/^[A-Za-z]+$/.test(char)) return true; 
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
  },
}
</script>

<style>
.paddingTop {
    margin-top: -20px;
}
.textColor {
  color: #676b68 !important;
}
</style>
