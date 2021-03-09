<template>
  <v-layout>
    <v-flex>
      <!-- <h1 class="headline mb-5 mt-5 font-weight-light">My Subscribers</h1> -->

      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <h1 class="headline mb-5 mt-5 font-weight-light">My Subscribers</h1>
        </v-col>
        <v-col><div class="float-right "><v-container fluid>
          <v-checkbox v-model="checkbox" @change="filterarray" label="Show Subscriptions Expired"></v-checkbox>
      </v-container></div></v-col>
      </v-row>

      <div v-if="datapresent">
        <h3 class="mt-5 font-weight-light">
          Loading...
        </h3>
      </div>
      <div v-if="nodata">
        <h3 class="mt-5 font-weight-light">
          No Data Available Yet...
        </h3>
      </div>

      <v-col v-if="show">
        <div>
          <v-btn
            class="black white--text float-right"
            right
            @click.stop="dialog = true"
            >Info</v-btn
          >
          <v-btn
            class="black white--text float-right mr-3"
            right
            @click.stop="dialog3 = true"
            >Activity</v-btn
          >
        </div>
        <br />
        <br />
      </v-col>

      <v-card v-if="test">
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
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="test"
          :search="search"
          item-key="_id"
          :single-select="singleSelect"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          :footer-props="{ 'items-per-page-options': [10, -1] }"
          class="elevation-1"
          :loading="isLoading"
          @page-count="pageCount = $event"
          @input="call"
        >
          <template v-slot:item.name="{ item }">
            <div  @click="assistedmodecall(item)" v-bind:style="{ cursor: cursorstyle(item)}" >{{ nameCheck(item.name)}}</div>
          </template>
          <template v-slot:item.mobile="{ item }">
            {{ formno(item.mobile) }}
          </template>
          <template v-slot:item.pan="{ item }">
            {{ formpan(item.pan) }}
          </template>
          <template v-slot:item.added_on="{ item }">
            {{ convertDate2(item.added_on) }}
          </template>
          <template v-slot:item.modified_on="{ item }">
            {{ convertDate1(item.modified_on) }}
          </template>
          <template v-slot:item.last_login="{ item }">
            {{ convertDate2(item.last_login) }}
          </template>
          <template v-slot:item.subscription_expiry="{ item }">
            {{ convertDate2(item.subscription_expiry) }}
          </template>
          <template v-slot:item.mode="{ item }">
            <p v-if="!modeuser">{{item.mode}}</p>
            <v-select
            v-if="modeuser"
            :readonly="checkifsame(item)"
            @change="getotp(item)"
            v-model="item.mode"
            :items="items"
          ></v-select>
          </template>
          <template v-slot:item.kyc_verified="{ item }">
            <div :class="getColor(item.kyc_verified)">{{
              pill(item.kyc_verified)
            }}</div>
          </template>
          <template v-slot:item.action="{ item }">
                <v-btn
                v-if="item.invite == true"
                color="black white--text"
                  style="cursor: pointer;"
                  small
                  :disabled="disable"
                  @click="resend(item)"
                >Re-send
                </v-btn>
              </template>
          <template v-slot:item.info="{ item }">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-icon
                  style="cursor: pointer;"
                  v-on="on"
                  @click="infoCalled(item.id)"
                >
                  mdi-information
                </v-icon>
              </template>
              <span>Information</span>
            </v-tooltip>
          </template>
          <template v-slot:item.port="{ item }">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-icon
                  style="cursor: pointer;"
                  v-on="on"
                  @click="portCalled(item.id)"
                >
                  mdi-account-details
                </v-icon>
              </template>
              <span>Portfolio</span>
            </v-tooltip>
          </template>
          <template v-slot:item.activity="{ item }">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-icon
                  style="cursor: pointer;"
                  v-on="on"
                  @click="actCalled(item.id)"
                >
                  mdi-history
                </v-icon>
              </template>
              <span>Activity</span>
            </v-tooltip>
          </template>
          <template v-slot:item.piggy="{ item }">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-icon
                  style="cursor: pointer;"
                  v-on="on"
                  @click="piggyCalled(item.id)"
                >
                mdi-view-list
                </v-icon>
              </template>
              <span>Settings</span>
            </v-tooltip>
          </template>

        </v-data-table>
      </v-card>

      <v-layout row justify-center>
        <v-dialog v-model="dialog" max-width="1200">
          <v-card>
            <v-btn
              
              fab
              icon
              class="float-right mr-2"
              right
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <br /><br />
                    <Profile v-if="dialog" class="mt-5" />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <v-layout row justify-center>
        <v-dialog v-model="dialog1" max-width="1200">
          <v-card>
            <v-btn
              
            fab
            icon
            class="float-right mr-2"
            right
            @click="dialog1 = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
            <v-card-text>
              <v-container>
                <Portfolio v-if="dialog1" class="mt-5" />
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <v-layout row justify-center>
        <v-dialog v-model="dialog2" max-width="1200">
          <v-card>
            <v-btn
              
            fab
            icon
            class="float-right mr-2"
            right
            @click="dialog2 = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <br />
                    <br />
                    <Activity v-if="dialog2" class="mt-5" />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <v-layout row justify-center>
        <v-dialog v-model="dialog3" max-width="1200">
          <v-card>
            <v-btn
              
            fab
            icon
            class="float-right mr-2"
            right
            @click="dialog3 = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <br /><br />
                    <Piggy v-if="dialog3" class="mt-5" />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <v-layout row justify-center>
        <v-dialog v-model="dialog4" max-width="500">
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
            @click="dialog4 = false"
          >
            Yes
          </v-btn>
          <v-btn
            color="warning"
            text
            @click="dialog4 = false"
          >
            No
          </v-btn>
        </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <v-layout row justify-center>
        <v-dialog v-model="dialog10" max-width="600">
          <v-card>
            <v-card-text class="pt-5">
              <h2 class="mb-3">Enter OTP</h2>
              <v-form v-model="validotp">
                            <v-text-field
                            autofocus
                                v-model="otp"
                                :rules="otpRules"
                                type="text"
                                v-on:keypress="isNumber($event)"
                                maxlength="4"
                                placeholder="Enter OTP"
                                outlined
                            ></v-text-field>
                            <p v-if="invalidotp" class="errorcolor">OTP Does not match</p>
                            </v-form>
                        
              <v-row class="errormsgtopbuy">
                <v-col>
                  <v-btn
                  block
                  class="black mt-0 white--text"
                  variant="dark"
                  :disabled="!validotp"
                  @click="submitotp"
                  >SUBMIT
                          </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                  block
                  @click="cancelotp"
                  class=" darkgreybuy mt-0 black--text"
                         variant="dark"
                  >CANCEL
                          </v-btn>
                </v-col>
            </v-row>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      <v-snackbar v-model="snackbar" :color="color" top>
        {{ text }}
      </v-snackbar>

      <br />
      <br />
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint eqeqeq: 0 */
import { mapGetters } from 'vuex'
import Toast from '@/components/Toast'
import Profile from '@/components/Profile'
import Portfolio from '@/components/Portfolio'
import Activity from '@/components/Activity'
import Piggy from '@/components/Piggy'
import moment from 'moment'

export default {
  props: ['value'],

  computed: {
    ...mapGetters('sessionStorage', ['getName']),
  },

  components: {
    Toast,
    Profile,
    Portfolio,
    Activity,
    Piggy,
  },

  asyncData({ params, store }) {},

  data() {
    return {
      right: true,
      fixed: true,
      flat: true,
      info: false,
      port: false,
      activity: false,
      piggy: false,
      isLoading: true,
      page: 0,
      pageCount: 0,
      itemsPerPage: 10,
      color: '',
      snackbar: false,
      text: '',

      usersnames: null,
      usersList: null,
      userDetails: {
        userName: '',
        userEmail: '',
        userPhone: '',
      },
      item: {
        mode: null
      },

      name: '',
      email: '',
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      show: false,
      selectedUser: '',
      search: '',
      singleSelect: true,
      selected: [],
      users: this.$store.state.users,
      headers: [
        { text: 'Name', value: 'name', class: 'size', sortable: false },
        { text: 'Mobile Number', value: 'mobile', class: 'size', sortable: false },
        { text: 'PAN Number', value: 'pan', class: 'size', sortable: false },
        { text: 'Added On', value: 'added_on', class: 'size', sortable: false  },
        { text: 'Last Login', value: 'last_login', class: 'size', sortable: false },
        { text: 'Expiry Date', value: 'subscription_expiry', class: 'size', sortable: false  },
        {
          text: 'KYC Status',
          value: 'kyc_verified',
          class: 'size',
          sortable: false
        },
        {
          text: 'KYC Stage',
          value: 'kyc_stage',
          class: 'size',
          sortable: false
        },
        { text: 'Invite Status', value: 'invite_status', class: 'size', sortable: false },
        { text: 'Partner Name', value: 'partner_name', class: 'size', sortable: false },
        { text: 'Mode', value: 'mode', class: 'size', width: '12em', sortable: false },
        { text: 'Invite', value: 'action', class: 'size', sortable: false },
        { text: '', value: 'info', sortable: false },
        { text: '', value: 'port', sortable: false },
        { text: '', value: 'activity', sortable: false },
        { text: '', value: 'piggy', sortable: false },

      ],
      test: null,
      load: true,
      texts: null,
      reason: null,
      tests: null,
      lists: null,
      total: null,
      flag: 1,
      showinfo: null,
      showportfolio: null,
      showactivity: null,
      showpiggy: null,
      datapresent: true,
      nodata: null,
      checkcode: null,
      disable: false,
      linkval: null,
      modetype: 'Assisted',
      items: ['Default', 'Assisted', 'Extended'],
      dialog10: false,
      otp: null,
      validotp: true,
      modeuser: true,
      updateuserstatus: false,
      subscriberval: null,
      usermode: null,
      invalidotp: false,
      otpRules: [
        (v) => !!v || 'OTP is required',
        v => (v && v.length == 4) || "This field must be equal to 4 digits"
      ],
      requestid: null,
      checkbox: false
    }
  },

  mounted() {
    this.check()
  },
  methods: {
    async check(store, commit) {
      this.invalidotp = false
      this.modeuser = this.$store.state.sessionStorage.data.assistance_allowed
      if (this.$store.state.sessionStorage.partner_code_admin == null) {
        this.checkcode = this.$store.state.sessionStorage.partner_code
        this.disable = false
        this.linkval = null
      } else {
        this.checkcode = this.$store.state.sessionStorage.partner_code_admin
        this.disable = true
        this.linkval = 'true'
      }
      this.showinfo = this.$store.state.sessionStorage.rbac.subscriberInformation
      this.showportfolio = this.$store.state.sessionStorage.rbac.subscriberPortfolio
      this.showactivity = this.$store.state.sessionStorage.rbac.subscriberActivity
      this.showpiggy = this.$store.state.sessionStorage.rbac.subscriberSettings


      // this.showinfo = this.$store.state.sessionStorage.rbac[9].access
      // this.showportfolio = this.$store.state.sessionStorage.rbac[13].access
      // this.showactivity = this.$store.state.sessionStorage.rbac[14].access
      // this.showpiggy = this.$store.state.sessionStorage.rbac[15].access
      this.$store.commit('sessionStorage/setItems', null)
      this.load = false
      try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const usersList = await this.$axios.$post('/admin/partner/mysubscribers', {
          offset: 0,
          limit: 0,
          kyc: this.$store.state.sessionStorage.kyc,
          partner_code: this.checkcode,
          invite_status: this.$store.state.sessionStorage.invite,
          link: this.$store.state.sessionStorage.link
        })

        this.usermode = usersList.mode
        if (usersList) {
          this.datapresent = false
        } 
        this.test = usersList.result
        this.info = false
        this.piggy = false
        this.activity = false
        this.port = false
        this.isLoading = false
      } catch (e) {
        this.error = e.response.data.message
        this.nodata = true
        this.datapresent = false
        console.log(e)
      }
      this.linkval = null
      this.$store.commit('sessionStorage/setLink', null) 
      this.$store.commit('sessionStorage/setPartnerCode', null)
      this.$store.commit('sessionStorage/setValueForCall', false)
      this.$store.commit('sessionStorage/setKyc', null)
      this.$store.commit('sessionStorage/setInvite', null)
    },
    call() {
      this.selectedUser = JSON.stringify(this.selected)

      if (this.selected[0] != null) {
        this.show = true
        this.userDetails.userName = this.selected[0].firstname
        this.userDetails.userEmail = this.selected[0].email
        this.userDetails.userPhone = this.selected[0].mobile
      } else {
        this.show = false
        this.userDetails.userName = ''
        this.userDetails.userEmail = ''
        this.userDetails.userPhone = ''
      }
    },
    handleClick(value) {
      const values = value
      this.$store.commit('sessionStorage/setInfo', value)
      this.$router.push({ name: 'profile', params: { values } })
    },
    closeDialog() {
      this.dialog = false
      this.dialog1 = false
      this.dialog2 = false
      this.dialog3 = false
    },
    infoCalled(val) {
      if (this.$store.state.sessionStorage.rbac.subscriberInformation == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
      this.$store.commit('sessionStorage/setItems', val)
      this.dialog = true
      }

      // const vals = val
      // const routeData = this.$router.resolve({
      //   path: '/profile',
      //   query: { vals },
      // })
      // window.open(routeData.href, '_blank')
    },
    piggyCalled(val) {
      if (this.$store.state.sessionStorage.rbac.subscriberSettings == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
      this.$store.commit('sessionStorage/setPiggy', val)
      this.dialog3 = true
      }
      // const vals = val._id
      // const name = val.firstName
      // const routeData1 = this.$router.resolve({
      //   path: '/piggy',
      //   query: { vals, name },
      // })
      // window.open(routeData1.href, '_blank')
    },
    portCalled(val) {
      if (this.$store.state.sessionStorage.rbac.subscriberPortfolio == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
      this.$store.commit('sessionStorage/setPort', val)
      this.dialog1 = true
      }
      // const vals = val._id
      // const name = val.firstName
      // const routeData2 = this.$router.resolve({
      //   path: '/portfolio',
      //   query: { vals, name },
      // })
      // window.open(routeData2.href, '_blank')
    },
    actCalled(val) {
      if (this.$store.state.sessionStorage.rbac.subscriberActivity == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
      this.$store.commit('sessionStorage/setAct', val)
      this.dialog2 = true
      }
      // const vals = val._id
      // const name = val.firstName
      // const routeData3 = this.$router.resolve({
      //   path: '/activity',
      //   query: { vals, name },
      // })
      // window.open(routeData3.href, '_blank')
    },
    called() {
      this.snackbar = true
      this.text = 'Successfully Updated User'
      this.color = 'success'
      this.dialog = false
      window.location.reload(true)
    },
    approve() {
      this.snackbar = true
      this.text = 'Successfully Approved User'
      this.color = 'success'
      this.dialog2 = false
      window.location.reload(true)
    },
    reject() {
      this.snackbar = true
      this.text = 'Successfully Rejected User'
      this.color = 'success'
      this.dialog3 = false
      window.location.reload(true)
    },
    logout() {
      this.$store.commit('sessionStorage/deleteUser', null)
      this.$router.push({ path: '/login' })
    },
    async authlogout() {
      await this.$auth.logout()
      this.$router.push({ path: '/login' })
    },
    formno(value) {
      const reg = /.{1,7}/
      const vall = String(value)
      const phone = vall.toString().replace(reg, (m) => '*'.repeat(m.length))
      if (value == null) {
        return '--'
      } else {
        return phone
      }
    },
    formpan(value) {
      const vall = String(value)
      const first = vall.substr(0, 5)
      const reg = first.substring(2, length - 3) + "***";
      // const vall = String(value)
      // const first = vall.substr(0, 5)
      // const reg = /(?<=.{2})([0-9a-zA-Z])/gm
      // const pan = first.toString().replace(reg, (m) => '*'.repeat(m.length))

      const vall2 = String(value)
      const sec = vall2.substr(5, 9)
      const reg1 = /.{3}/
      const pan2 = sec.toString().replace(reg1, (m) => '*'.repeat(m.length))
      if (value == '' || value == null) {
        return '--'
      } else {
        return reg + pan2
      }
    },
    convertDate(value) {
      function pad(s) {
        return s < 10 ? '0' + s : s
      }
      const d = new Date(value)
      if (value == null) {
        return '--'
      } else {
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
          '-'
        )
      }
    },
    convertDate1(value) {
      function pad(s) {
        return s < 10 ? '0' + s : s
      }
      const d = new Date(value)
      if (value == null) {
        return '--'
      } else {
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
          '-'
        )
      }
    },
    convertDate2(value) {
      function pad(s) {
        return s < 10 ? '0' + s : s
      }
      const d = new Date(value)
      if (value == null) {
        return '--'
      } else {
        // return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
        //   '-'
        // )
        var str = value
        var res = str.replace("T", " ").replace("Z","").replace(" ", "T");

        var n = res.toLocaleString()
        return moment(n).format('DD-MM-YYYY');
      }
    },
    nameCheck(value) {
      if (value == null) {
        return '--'
      } else {
        return value
      }
    },
    nameC(value) {
      if (value == null) {
        return ''
      } else {
        return value
      }
    },
    pill(value) {
      if (value == true) {
        return 'Yes'
      } else if (value == null) {
        return '--'
      } else {
        return 'No'
      }
    },
    getColor(kycCompleted) {
      if (kycCompleted == true) {
        return 'green--text'
      } else if (kycCompleted == false) {
        return 'red--text'
      }
    },
    next() {
      this.flag = 0
      this.check()
      // this.getUsers()
    },
    async getUsers() {
      try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const nextPage = await this.$axios.$post('/users/getUsers', {
          offset: this.page + 15,
          limit: 10,
        })
        this.test = nextPage
        this.isLoading = false
        // const prevPage = await await this.$axios.$post('/users/getUsers', {
        //   offset: 1,
        //   limit: 5,
        // })
        // console.log(prevPage)
      } catch (e) {
        this.error = e.response.data.message
        console.log(e)
      }
    },
    async resend(val) {
      try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const nextPage = await this.$axios.$post('/admin/partner/resendinvite', {
          partner_code: this.$store.state.sessionStorage.partner_code,
          mobile: val.mobile,
        })
        this.snackbar = true
        this.color = 'success'
        this.text = 'Succcessfully sent invite'
      } catch (e) {
        console.log(e)
        this.snackbar = true
        this.color = 'red'
        this.text = e.response.data.message
      }
    },
    assistedmodecall(val) {
      if(val.mode != 'Assisted') {
      }else {
        if(val.refcode == this.$store.state.sessionStorage.partner_code){
      this.$store.commit('sessionStorage/setAssistedinfo', val)
      this.$router.push({ path: '/assistedmode' })
        }else{

        }
      }
    },
    async getotp(val) {
      if(val.mode == 'Extended'){
        this.snackbar = true
        this.color = 'red'
        this.text = 'You can not change the mode'
        this.check()
      }else{
        this.subscriberval = val
      if(this.$store.state.sessionStorage.data.assistance_allowed == false) {
        this.snackbar = true
        this.color = 'red'
        this.text = 'You can not change the mode'
      }else{
      try{
              this.$axios.setHeader(
                'Authorization',
                'bearer ' + this.$store.state.sessionStorage.token
                )
                const otp = await this.$axios.$post(
          '/customer/workflow/transaction/otp', {
            mobile: val.mobile,
            partner: val.refcode,
            purpose: "partner_asstd_trans_otp",
            id: val.id
          })
          this.requestid = otp.request_id
          this.dialog10 = true
            }catch(error){
              this.snackbar = true
              this.color = 'red'
              this.text = error.response.data.message
        }
      }

      }
      // this.subscriberval = val
      // if(this.$store.state.sessionStorage.data.assistance_allowed == false) {
      //   this.snackbar = true
      //   this.color = 'red'
      //   this.text = 'You can not change the mode'
      // }else{
      // try{
      //         this.$axios.setHeader(
      //           'Authorization',
      //           'bearer ' + this.$store.state.sessionStorage.token
      //           )
      //           const otp = await this.$axios.$get(
      //     '/customer/workflow/otp/get/' + val.mobile + '/' + val.refcode)
      //     this.dialog10 = true
      //       }catch(error){

      //       }
      // }
    },
    async submitotp() {
      this.validotp = false
      try {
                this.$axios.setHeader(
                'Authorization',
                'bearer ' + this.$store.state.sessionStorage.token
                )
                const result = await this.$axios.$post(
          '/customer/workflow/transaction/otp/authenticate', {
            mobile: this.subscriberval.mobile,
            partner:  this.subscriberval.refcode,
            otp: this.otp,
            request_id: this.requestid
          })
          this.validotp = true
          this.otp = null
          this.dialog10 = false
          this.snackbar = true
        this.color = 'success'
        this.text = 'Successfully Updated Subscriber Mode'
          this.updateuser()
          
        }catch(error) {
          this.validotp = true  
          this.otp = null 
          if(error.response.data.message == "OTP does not match"){
            this.invalidotp = true
            setTimeout(() => this.invalidotp = false, 2000);
          }

        }
    },
    async updateuser() {
      if(this.subscriberval.mode == 'Assisted') {
        this.updateuserstatus = true
      }else if(this.subscriberval.mode == 'Default') {
        this.updateuserstatus = false
      }
      try {
                this.$axios.setHeader(
                'Authorization',
                'bearer ' + this.$store.state.sessionStorage.token
                )
                const result = await this.$axios.$post(
          '/customer/workflow/assisted/user/update', {
            id: this.subscriberval.id,
            mobile: this.subscriberval.mobile,
            partner:  this.subscriberval.refcode,
            status: this.updateuserstatus
          })
          this.dialog10 = false
          
          
        }catch(error) {
          this.validotp = true    

        }
    },
    cancelotp() {
      this.dialog10 = false
      this.check()
    },
    isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return evt.preventDefault();
    }
    return evt;
},

cursorstyle(val) {
  if(val.mode == 'Assisted'){
    if(val.refcode == this.$store.state.sessionStorage.partner_code){
    return 'pointer'
    }else{}
  }else{
    return 'default'
  }
},
checkifsame(val) {
  if(val.refcode == this.$store.state.sessionStorage.partner_code){
    return false
  }else{
    return true
  }
},

filterarray() {
      if(this.checkbox == true) {
        this.test = this.test.filter(function (el) {
  return el.subscription_expired == true
         
});
 
      }else{
        this.check()

      }
    }

  },
}
</script>

<style>
   /* .v-data-table-header th {
  white-space: nowrap;
} */
  .darkgreybuy {
      background-color: #8d8d8d !important;
    }
  .cursorstylec{
    cursor: pointer;
  }
  .cursorstyled{
    cursor: default;
  }
.size {
  font-size: 15px !important;
}
.colwidth {
  width: 200px !important;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
}
.errorcolor {
  font-size: small;
  margin-top: -20px;
  color: red !important;
}
</style>
