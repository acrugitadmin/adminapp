<template>
  <v-layout>
    <v-flex>
      <v-row align="center" justify="center">
        <v-col class="d-flex" cols="12" sm="6">
          <h1 class="headline mt-5 font-weight-light">Bulk Invite</h1>
          <v-spacer />
        </v-col>
      </v-row>
      <br />
      <br />
      <v-form v-model="valid">
        <v-row align="center" justify="center">
        <v-col class="paddingTop" cols="12" sm="6">
            <v-file-input
            v-model="file"
            ref="file"
            id="file"
            :rules="drules"
            accept=".csv"
            placeholder="Select CSV"
          ></v-file-input>
          <!-- <v-row class="margintopneg">
            <v-col class="" cols="12" sm="6">
            <v-container fluid>
                <v-checkbox v-model="sms" label="Send SMS"></v-checkbox>
            </v-container>
            </v-col>
          </v-row> -->
          
            <!-- <v-form method="get" action=".csv"><h5 class="mt-2 padb" style="cursor: pointer;"><u><a href="http://admin-api.acru.in/uploads/csvformat/bulk.csv" target="_blank">Sample CSV Template</a></u></h5></v-form> -->

            </v-col>
            </v-row>
      </v-form>
      
        <v-row class="margintopneg" justify="center">
          <v-col class="" cols="12" sm="6">
            <v-form method="get" action=".csv"><h5 class="mt-2 padb" style="cursor: pointer;"><u><a :href="bulksample" target="_blank">Sample CSV Template</a></u></h5></v-form>
              <v-checkbox v-model="sms" label="Send SMS"></v-checkbox>
              <v-checkbox v-if="assistedmodeallowed" v-model="checkbox2" label="Assisted Mode"></v-checkbox>
          </v-col>
        </v-row>
      <v-row align="center" justify="center">
        <v-col class="d-flex" cols="12" sm="6">
          <v-spacer />
          <v-btn
            color="black white--text"
            large
            :disabled="!valid"
            @click="fileupload()"
            >Submit</v-btn
          >
        </v-col>
      </v-row>

      <br />
      <br />

      <h3 v-if="values" class=" mb-5 mt-5 font-weight-light">
        Invited Users
      </h3>

      <v-card v-if="values">
      <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="values"
                :search="search"
                class="elevation-1"
              >
              <template v-slot:item.request_status="{ item }">
                {{ capitalizeFirstLetter(item.request_status) }}
              </template>
               <template v-slot:item.email="{ item }">
                 {{ emailc(item.email) }}
               </template>
                <template v-slot:item.action="{ item }">
                <v-btn
                v-if="item.request_status == 'REJECTED'"
                color="black white--text"
                  style="cursor: pointer;"
                  small
                  @click="resend(item)"
                >Re-send
                </v-btn>
              </template>
              </v-data-table>
            </v-card>

      <v-snackbar v-model="snackbar" :color="color" top>
        {{ text }}
      </v-snackbar>

      <v-layout row justify-center>
        <v-dialog v-model="dialog" max-width="600">
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout>
                    <h1 class=" font-weight-light mt-10">Resend Invitation?</h1>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            text
            @click="dialog = false"
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

      <v-layout row justify-center>
        <v-dialog v-model="dialog2" max-width="1400">
          <v-card>
          <v-card-title>
          Uploaded Data
          </v-card-title>
          <v-card-text>
          <h3 v-if="items" class=" mb-5 mt-5 font-weight-light">
        Successfully Invited Users: {{valid_users}}
      </h3>

      <h3 v-if="items" class=" mb-5 mt-5 font-weight-light">
        Rejected Users: {{invalid}}
      </h3></v-card-text>
            <v-card-text>
              
                <div v-if="!items">
                 <h3 class="mt-5 font-weight-light">
                   Loading...
                   </h3>
                </div>

                <v-card v-if="items">
              <v-card-title>

          <v-text-field
            v-model="search2"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
              <v-data-table
                v-model="selected2"
                :headers="headers2"
                :items="items"
                :search="search2"
                class="elevation-1"
                :single-select="singleSelect"
                item-key="mobile"
                @input="call"
              >
              <template v-slot:item.email="{ item }">
                {{ emailc(item.email) }}
              </template>
              <template v-slot:item.request_status="{ item }">
                {{ capitalizeFirstLetter(item.request_status) }}
              </template>
              <template v-slot:item.rejection_reason="{ item }">
                {{ emailc(item.rejection_reason) }}
              </template>
               
              </v-data-table>
            </v-card>
                
            </v-card-text>
            <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green"
            text
            @click="confirm()"
          >
            CONFIRM
          </v-btn>
          <v-btn
            color="warning"
            text
            @click="cancel()"
          >
            CANCEL
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
      values: null,
      users: null,
      show: false,
      singleSelect: false,
      valid: false,
      name: null,
      phone: null,
      file: null,
      formdata: new FormData(),
      dialog: false,
      dialog2: false,
      batch_number: null,

      items: null,
      items2: null,
      snackbar: false,
      text: '',
      color: '',
      valid_users: null,
      invalid: null,
      drules: [
        (v) => !!v || 'This section is required',
      ],

      search: '',
      selected: [],
      headers: [
        { text: 'First Name', value: 'firstname', class: 'size' },
        { text: 'Last Name', value: 'lastname', class: 'size' },
        { text: 'Phone Number', value: 'mobile', class: 'size' },
        { text: 'Email', value: 'email', class: 'size' },
        { text: 'Status', value: 'request_status', class: 'size' },
      ],
      search2: '',
      selected2: [],
      headers2: [
        { text: 'First Name', value: 'firstname', class: 'size' },
        { text: 'Last Name', value: 'lastname', class: 'size' },
        { text: 'Phone Number', value: 'mobile', class: 'size' },
        { text: 'Email', value: 'email', class: 'size' },
        { text: 'Status', value: 'request_status', class: 'size' },
        { text: 'Comments', value: 'rejection_reason', class: 'size' },
      ],
      sms: false,
      checkbox2: false,
      assistedmodeallowed: false,
      envlogo: process.env.logolink,
      bulksample: process.env.logolink + '/uploads/csvformat/bulk.csv'
    }
  },
  mounted() {
    this.check()
  },
  methods: {
      called() {

      },
      check() {
      if(this.$store.state.sessionStorage.data.assistance_allowed == true) {
        this.assistedmodeallowed = true
      }else {
        this.assistedmodeallowed = false
      }
    },
      async fileupload() {
        this.valid = false
        this.values = null
      this.formdata.append('bulkinvitees', this.file)
      this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        this.$axios.setHeader('Content-Type', 'multipart/form-data')
    try {
      const result = await this.$axios.$post(
          '/admin/partner/bulkinvite/' + this.$store.state.sessionStorage.partner_code, this.formdata
        )
        // this.snackbar = true
        // this.text = 'Successfully Uploaded CSV'
        // this.color = 'green'
        this.items = result.data
        this.batch_number = result.batch_number
        this.valid_users = result.valid_count
        this.invalid = result.invalid_count
        this.dialog2 = true
        this.file = null
        this.formdata = new FormData()
    } catch(error){
        this.snackbar = true
        this.text = error.response.data.message
        this.color = 'red'
        this.file = null
        this.formdata = new FormData()
    }

  },
      checkStatus(value) {
        if (value = 'not sent') {
          this.show = true
        } else {
          this.show = false
        }
      },
      emailc(val) {
        if (val == null || val == '') {
          return '---'
        } else {
          return val
        }
      },
      resend(value) {
        this.dialog = true
      },
      call() {
        this.users = JSON.stringify(this.selected2)
      },
      async confirm() {
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
            data: this.users,
            batch_number: this.batch_number,
            partner_code: this.$store.state.sessionStorage.partner_code,
            confirmation: 'CONFIRM',
            send_sms: this.sms,
            partner_assisted: this.checkbox2
          }
        )
        this.values = result.data
        this.snackbar = true
        this.text = result.message
        this.color = 'success'
        this.sms = false
        this.checkbox2 = false
      } catch (error) {
        this.snackbar = true
        this.text = error.response.data.message
        this.color = 'red'
      }
      this.dialog2 = false

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
            data: this.items,
            batch_number: this.items.batch_number,
            partner_code: this.$store.state.sessionStorage.partner_code,
            confirmation: 'CANCEL',
            send_sms: this.sms,
            partner_assisted: this.checkbox2
          }
        )
        this.snackbar = true
        this.text = result.message
        this.color = 'success'
        this.file = null
        this.sms = false
        this.checkbox2 = false
        // setTimeout(function(){ location.reload(); }, 1000);
      } catch (error) {
        this.snackbar = true
        this.text = error.response.data.message
        this.color = 'red'
      }
      this.dialog2 = false

}, 
 capitalizeFirstLetter(string) {
      if (string != null) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
      } else {
        return '--'
      }
    },
    checkfile() {
      if (this.file == null) {
      } else {
      }

    }
  },
}
</script>

<style>
  .margintopneg {
    margin-top: -30px;
    margin-bottom: -30px;
  }
.paddingTop {
    margin-top: -20px;
}
.size {
  font-size: 15px !important;
}
</style>
