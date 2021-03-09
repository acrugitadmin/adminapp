<template>
    <v-layout>
      <v-flex>
        <h1 class="headline mb-5 mt-5 font-weight-light">List Of Subscribers</h1>

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
            :search="search"
            loading-text="Loading... Please wait"
            :headers="headers"
            :items="test"
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
              {{ nameCheck(item.name)}}
            </template>
            <template v-slot:item.partner_name="{ item }">
              {{ nameCheck(item.partner_name)}}
            </template>
            <template v-slot:item.mobile="{ item }">
              {{ formno(item.mobile) }}
            </template>
            <template v-slot:item.pan="{ item }">
              {{ formpan(item.pan) }}
            </template>
            <template v-slot:item.partner_assisted="{ item }">
              {{ pill(item.partner_assisted)}}
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
            <template v-slot:item.kyc_verified="{ item }">
              <div :class="getColor(item.kyc_verified)">{{
                pill(item.kyc_verified)
              }}</div>
            </template>
            <template v-slot:item.info="{ item }">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-icon
                    style="cursor: pointer;"
                    v-on="on"
                    @click="infoCalled(item)"
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
                  <v-layout wrap>
                    <v-flex xs12>
                      <br /><br />
                      <Profile v-if="dialog" class="" />
                    </v-flex>
                  </v-layout>
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
              </v-btn>            <v-card-text>
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
  
        <v-snackbar v-model="snackbar" :color="color" timeout=2000 top>
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
  
    // watch: {
    //   options: {
    //     handler() {
    //       this.getUsers();
    //     },
    //   },
    //   deep: true,
    // },
  
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
        page: 1,
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
  
        name: '',
        email: '',
        dialog: false,
        dialog1: false,
        dialog2: false,
        dialog3: false,
        show: false,
        selectedUser: '',
        search: '',
        singleSelect: true,
        selected: [],
        users: this.$store.state.users,
        headers: [
          { text: 'Name', value: 'name', class: 'size', sortable: false  },
          { text: 'Mobile Number', value: 'mobile', class: 'size', sortable: false  },
          { text: 'PAN Number', value: 'pan', class: 'size', sortable: false  },
          { text: 'Added On', value: 'added_on', class: 'size', sortable: false  },
          { text: 'Last Login', value: 'last_login', class: 'size', sortable: false  },
          { text: 'Expiry Date', value: 'subscription_expiry', class: 'size', sortable: false  },
          { text: 'Partner Name', value: 'partner_name', class: 'size', sortable: false  },
          { text: 'Invite Status', value: 'invite_status', class: 'size', sortable: false  },
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
          { text: 'Mode', value: 'mode', class: 'size', sortable: false  },
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
        linkval: null,
        checkbox: false,
        kycfil: null,
        statusfil: null,
        options: {},
        totalsubscribers: null,
        loaded: false
      }
    },
  
    mounted() {
      this.check()
    },
    methods: {
      async check(store, commit) {

        this.snackbar = true
        this.color = 'success'
        this.text = 'Please Wait While We Fetch Your Request'

        this.$store.commit('sessionStorage/setPartnerCode', null)
      this.$store.commit('sessionStorage/setValueForCall', false)
      
        if (this.$store.state.sessionStorage.partner_code_admin == null) {
          this.linkval = null
        } else {
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
          if(this.$store.state.sessionStorage.call_partner == true) {
            const usersList = await this.$axios.$post('/admin/partner/mysubscribers', {
            offset: 0,
            limit: 0,
            kyc: 'false',
            invite_status: null,
            partner_code: this.$store.state.sessionStorage.partner_code_admin,
            link: this.$store.state.sessionStorage.link
          })
          this.loaded = true
          if (usersList) {
            this.datapresent = false
          } 
          this.test = usersList
          this.info = false
          this.piggy = false
          this.activity = false
          this.port = false
  
  
          this.isLoading = false
  
          } else { 
          const usersList = await this.$axios.$post('/admin/users/getUsers', {
            offset: 0,
            limit: 0,
            kyc: 'false',
            invite_status: null,
            link: this.$store.state.sessionStorage.link
          })
          this.loaded = true
          if (usersList) {
            this.datapresent = false
          } 
          this.test = usersList.result
          this.totalsubscribers = parseInt(usersList.records)
          this.info = false
          this.piggy = false
          this.activity = false
          this.port = false
  
  
          this.isLoading = false
  
          }
          // if (usersList) {
          //   this.datapresent = false
          // } 
          // this.test = usersList
          // this.info = false
          // this.piggy = false
          // this.activity = false
          // this.port = false
  
  
          // this.isLoading = false
  
          // this.$store.commit('sessionStorage/setPartnerCode', null)
          // this.$store.commit('sessionStorage/setValueForCall', false)
          
        } catch (e) {
          this.loaded = true
          this.error = e.response.data.message
          this.datapresent = false
          this.nodata = true
          console.log(e)
        }
        this.linkval = null
        // this.$store.commit('sessionStorage/setLink', null)
        // this.$store.commit('sessionStorage/setPartnerCode', null)
        // this.$store.commit('sessionStorage/setValueForCall', false)
        // this.$store.commit('sessionStorage/setKyc', null)
        // this.$store.commit('sessionStorage/setInvite', null)
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
        if (this.showinfo == false) { 
          this.snackbar = true
          this.text = 'Sorry, You Do Not Have Permission To View This'
          this.color = 'red'
        } else { 
        this.$store.commit('sessionStorage/setItems', val.id)
        this.$store.commit('sessionStorage/setMobile', val.mobile)
        this.dialog = true
        }
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
      },
      portCalled(val) {
        if (this.showportfolio == false) { 
          this.snackbar = true
          this.text = 'Sorry, You Do Not Have Permission To View This'
          this.color = 'red'
        } else { 
        this.$store.commit('sessionStorage/setPort', val)
        this.dialog1 = true
        }
        
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
          // return pan + pan2
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
        } else if (value == ' ') {
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
      },
      async getUsers() {
  
        
                this.loaded = true
                const { page, itemsPerPage } = this.options;
                let pageNumber = page - 1;     
                  if(pageNumber == -1){
                    pageNumber = 0
                    this.page = 0
                  }else{
  
  
                    if(this.$store.state.sessionStorage.call_partner == true) {
            const usersList = await this.$axios.$post('/admin/partner/mysubscribers', {
            offset: 0,
            limit: 5000,
            kyc: 'false',
            invite_status: null,
            partner_code: this.$store.state.sessionStorage.partner_code_admin,
            link: this.$store.state.sessionStorage.link
          })
          if (usersList) {
            this.datapresent = false
          } 
          this.test = usersList
          this.info = false
          this.piggy = false
          this.activity = false
          this.port = false
  
  
          this.isLoading = false
  
          } else { 
          const nextPage = await this.$axios.$post('/admin/users/getUsers', {
            offset: pageNumber * 10,
            limit: 10,
            kyc: 'false',
            invite_status: null,
            link: this.$store.state.sessionStorage.link
          })
          this.test = nextPage.result
          this.totalsubscribers = parseInt(nextPage.records)
          this.isLoading = false
  
          this.info = false
          this.piggy = false
          this.activity = false
          this.port = false
  
  
          this.isLoading = false
  
          }
  
        // try {
        //   this.$axios.setHeader(
        //     'Authorization',
        //     'bearer ' + this.$store.state.sessionStorage.token
        //   )
        //   const nextPage = await this.$axios.$post('/admin/users/getUsers', {
        //     offset: pageNumber * 10,
        //     limit: 10,
        //   })
        //   this.test = nextPage
        //   this.isLoading = false
          
        // } catch (e) {
        //   this.error = e.response.data.message
        //   console.log(e)
        // }
      }
      },

      async globalsearch() {
      if(this.$store.state.sessionStorage.call_partner == true) {
        this.search_code = this.$store.state.sessionStorage.partner_code_admin
      }else{
        this.search_code = '0'
      }
      console.log('called', this.search_code)
      if(this.search.length >= 3) {
        try{
          this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const usersList = await this.$axios.$post('/admin/partner/mysubscribers/search', {
          offset: 0,
          limit: 5000,
          kyc: 'false',
          invite_status: null,
          partner_code: this.search_code,
          link: this.$store.state.sessionStorage.link,
          name: this.search
        })
        this.test = usersList.result
        this.totalsubscribers = parseInt(usersList.records)
      }catch(error){

      }
      }else if(this.search.length < 3){
        this.check()

      }

    },
  
  
    },
  }
  </script>
  
  <style>
    /* .v-data-table-header th {
    white-space: nowrap;
  } */
    .marginrightcancel{
      margin-right: 40px;
    }
  .size {
    font-size: 15px !important;
  }
  </style>
  