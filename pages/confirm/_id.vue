<template>
  <v-layout>
    <v-flex>
    <h1 class="headline mb-5 mt-5">{{partner_name}}</h1>
      <h4 v-if="nodata" class="mt-5 font-weight-light">
        No Data Available Yet ...
      </h4>
      <h4 v-if="datapresent" class="mt-5 font-weight-light">
        Loading ...
      </h4>
      <div v-if="loaded">
        <v-row v-if="loaded">
          <v-col v-if="showtotal == true" align="center" justify="center">
            <div style="font-size: 3em; color: #595959;">
              {{ totalUser }}
            </div>
            <h5 style="color: #595959;">SUBSCRIBERS</h5>
          </v-col>
          <v-divider v-if="showtotal == true" :inset="inset" vertical></v-divider>
          <v-row v-if="showinvested == true">
          <v-col align="center" justify="center">
            <div style="font-size: 3em; color: #595959;">
              INR {{ amountTotal }}
            </div>
            <h5 style="color: #595959;">
              AMOUNT INVESTED
            </h5>
          </v-col>
          </v-row>
          <v-divider v-if="showpending == true" :inset="inset" vertical></v-divider>
          <v-row v-if="showpending == true">
            <v-col align="center" justify="center">
              <div style="font-size: 3em; color: #595959;">
                <v-row align="center" justify="center"
                  ><div
                    style="cursor: pointer;"
                    class="mr-3"
                    @click="kycfalse()"
                  >
                    {{ kycPending }}
                  </div>
                  /
                  <div style="cursor: pointer;" class="ml-2" @click="kycTrue()">
                    {{ kycComplete }}
                  </div></v-row
                >
              </div>
              <h5 style="color: #595959;">
                KYC PENDING / COMPLETED
              </h5>
            </v-col>
          </v-row>
          <v-divider v-if="userType == 'partner'" :inset="inset" vertical></v-divider>
            <v-row v-if="userType == 'partner'">
             <v-col align="center" justify="center">
              <div style="font-size: 3em; color: #595959;">
                <v-row align="center" justify="center"
                  ><div
                    style="cursor: pointer;"
                    class="mr-3"
                    @click="invitefalse()"
                  >
                    {{ invitePending }}
                  </div>
                  /
                  <div style="cursor: pointer;" class="ml-2" @click="inviteTrue()">
                    {{ inviteAccepted }}
                  </div></v-row
                >
              </div>
              <h5 style="color: #595959;">
                SUBSCRIBERS INVITATION PENDING / ACCEPTED
              </h5>
             </v-col>
          </v-row>
        </v-row>
        <br />
        <br />
        <v-divider :inset="inset"></v-divider>
        <br />
        <br />
        <div v-if="userType != 'partner'">
        <v-row v-if="loaded">
          <v-col v-if="superdis == true" align="center" justify="center">
            <div style="font-size: 3em; color: #595959;">
              {{ superdistributor }}
            </div>
            <h5 style="color: #595959;">SUPER DISTRIBUTORS</h5>
          </v-col>
          <v-divider v-if="superdis == true" :inset="inset" vertical></v-divider>
          <v-row v-if="partnerdash == true">
          <v-col align="center" justify="center">
            <div style="font-size: 3em; color: #595959;">
               {{ partnercount }}
            </div>
            <h5 style="color: #595959;">
               PARTNERS
            </h5>
          </v-col>
          </v-row>
          <v-divider v-if="partnerdash == true" :inset="inset" vertical></v-divider>
          <v-row v-if="subscribersinvitation == true">
            <v-col align="center" justify="center">
              <div style="font-size: 3em; color: #595959;">
                <v-row align="center" justify="center"
                  ><div
                    style="cursor: pointer;"
                    class="mr-3"
                    @click="invitefalse()"
                  >
                    {{ invitePending }}
                  </div>
                  /
                  <div style="cursor: pointer;" class="ml-2" @click="inviteTrue()">
                    {{ inviteAccepted }}
                  </div></v-row
                >
              </div>
              <h5 style="color: #595959;">
                SUBSCRIBERS INVITATION PENDING / ACCEPTED
              </h5>
            </v-col>
          </v-row>
        </v-row>
        </v-row>
        <br />
        <br />
        <v-divider :inset="inset"></v-divider>
        <br />
        </div>

        <v-col v-if="showoverview == true" align="center" justify="center">
          <v-card v-if="loaded" class="elevation-0">
            <v-card-title
              ><h5 align="left">REGISTRATION OVERVIEW</h5></v-card-title
            >
            <v-card-text>
              <v-row class="mt-3">
                <v-col>
                  <v-card align="left" class="mx-auto" outlined color="#ebeced">
                    <v-card-text>
                      <div style="font-size: 5em;" class="display-1">
                        {{ yesterdayCount }}
                      </div>
                      <h4 class="mt-2">USERS REGISTERED YESTERDAY</h4>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card align="left" class="mx-auto" outlined color="#ebeced">
                    <v-card-text>
                      <div style="font-size: 5em;" class="display-1">
                        {{ lastWeekCount }}
                      </div>
                      <h4 class="mt-2">USERS REGISTERED LAST WEEK</h4>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card align="left" class="mx-auto" outlined color="#ebeced">
                    <v-card-text>
                      <div style="font-size: 5em;" class="display-1">
                        {{ lastMonthCount }}
                      </div>
                      <h4 class="mt-2">USERS REGISTERED LAST MONTH</h4>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-row>
          <v-col v-if="showtop5fund == true">
            <v-card-title
              ><h5 align="left">Top 5 Funds Invested Into</h5></v-card-title
            >

            <div v-if="!funds">
              <h3 class="mt-5 font-weight-light">
                Loading...
              </h3>
            </div>

            <v-card v-if="funds">
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="funds"
                :search="search"
                class="elevation-1"
                :hide-default-footer="true"
              >
                <template v-slot:item.fund_name="{ item }">
                  {{ capitalizeFirstLetter(item.fund_name) }}
                </template>
                <template v-slot:item.sum="{ item }">
                  {{ convertAmt(item.sum) }}
                </template>
              </v-data-table>
            </v-card>
          </v-col>

          <v-col v-if="showtop5devices == true">
            <v-card-title><h5 align="left">Top 5 Phones</h5></v-card-title>

            <div v-if="!device">
              <h3 class="mt-5 font-weight-light">
                Loading...
              </h3>
            </div>

            <v-card v-if="device">
              <v-data-table
                v-model="selected3"
                :headers="headers3"
                :items="device"
                :search="search3"
                class="elevation-1"
                :hide-default-footer="true"
              >
                <template v-slot:item.device_model="{ item }">
                  {{ capitalizeFirstLetter(item.device_model) }}
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>

        <br />

        <v-row>
          <v-col v-if="showtop5states == true">
            <v-card-title
              ><h5 align="left">Top 5 Investor States</h5></v-card-title
            >

            <div v-if="!states">
              <h3 class="mt-5 font-weight-light">
                Loading...
              </h3>
            </div>

            <v-card v-if="states">
              <v-data-table
                v-model="selected1"
                :headers="headers1"
                :items="states"
                :search="search"
                class="elevation-1"
                :hide-default-footer="true"
              >
                <template v-slot:item.state="{ item }">
                  {{ capitalizeFirstLetter(item.state) }}
                </template>
                <template v-slot:item.sum="{ item }">
                  {{ convertAmt(item.sum) }}
                </template>
              </v-data-table>
            </v-card>
          </v-col>
          <v-col v-if="showtop5cities == true">
            <v-card-title
              ><h5 align="left">Top 5 Investor Cities</h5></v-card-title
            >

            <div v-if="!cities">
              <h3 class="mt-5 font-weight-light">
                Loading...
              </h3>
            </div>

            <v-card v-if="cities">
              <v-data-table
                v-model="selected2"
                :headers="headers2"
                :items="cities"
                :search="search2"
                class="elevation-1"
                :hide-default-footer="true"
              >
                <template v-slot:item.city="{ item }">
                  {{ capitalizeFirstLetter(item.city) }}
                </template>
                <template v-slot:item.sum="{ item }">
                  {{ convertAmt(item.sum) }}
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>

        <br />

                <v-row v-if="userType != 'partner'">
          <v-col v-if="top5dis == true">
            <v-card-title
              ><h5 align="left">Top 5 Super Distributors</h5></v-card-title
            >

            <div v-if="!distributors">
              <h3 class="mt-5 font-weight-light">
                 Loading...
              </h3>
            </div>

            <v-card v-if="distributors">
              <v-data-table
                v-model="selected4"
                :headers="headers4"
                :items="distributors"
                :search="search4"
                class="elevation-1"
                :hide-default-footer="true"
              >
                <template v-slot:item.dashboard_user="{ item }">
                  {{ capitalizeFirstLetter(item.dashboard_user) }}
                </template>
                <template v-slot:item.sum="{ item }">
                  {{ convertAmt(item.sum) }}
                </template>
              </v-data-table>
            </v-card>
          </v-col>
          <v-col v-if="top5partners == true">
            <v-card-title
              ><h5 align="left">Top 5 Partners</h5></v-card-title
            >

            <div v-if="!partners">
              <h3 class="mt-5 font-weight-light">
                Loading...
              </h3>
            </div>

            <v-card v-if="partners">
              <v-data-table
                v-model="selected5"
                :headers="headers5"
                :items="partners"
                :search="search5"
                class="elevation-1"
                :hide-default-footer="true"
              >
                <template v-slot:item.dashboard_user="{ item }">
                  {{ capitalizeFirstLetter(item.dashboard_user) }}
                </template>
                <template v-slot:item.sum="{ item }">
                  {{ convertAmt(item.sum) }}
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <v-snackbar v-model="snackbar" :color="color" top>
        {{ text }}
      </v-snackbar>


    </v-flex>
  </v-layout>
</template>

<script>
export default {


  async asyncData({ $store, axios }) {},

  data() {
    return {
      userType: null,
      amountTotal: null,
      totalUser: null,
      kycComplete: null,
      kycPending: null,
      lastMonthCount: null,
      lastWeekCount: null,
      yesterdayCount: null,
      superdistributor: null,
      partnercount: null,
      invitePending: null,
      inviteAccepted: null,
      inset: false,
      loaded: false,
      funds: null,
      states: null,
      cities: null,
      device: null,
      search: '',
      selected: [],
      headers: [
        { text: 'Name', value: 'fund_name', class: 'size' },
        { text: 'Amount(INR)', value: 'sum', class: 'size' },
      ],
      search1: '',
      selected1: [],
      headers1: [
        { text: 'State', value: 'state', class: 'size' },
        { text: 'Amount(INR)', value: 'sum', class: 'size' },
      ],
      search2: '',
      selected2: [],
      headers2: [
        { text: 'City', value: 'city', class: 'size' },
        { text: 'Amount(INR)', value: 'sum', class: 'size' },
      ],
      search3: '',
      selected3: [],
      headers3: [
        { text: 'Device Model', value: 'device_model', class: 'size' },
        { text: 'Count', value: 'count', class: 'size' },
      ],
      search4: '',
      selected4: [],
      headers4: [
        { text: 'Name', value: 'dashboard_user', class: 'size' },
        { text: 'Amount(INR)', value: 'sum', class: 'size' },
      ],
      search5: '',
      selected5: [],
      headers5: [
        { text: 'Name', value: 'dashboard_user', class: 'size' },
        { text: 'Amount(INR)', value: 'sum', class: 'size' },
      ],
      partner_code: null,
      distributors: null,
      partners: null,
      showtotal: null,
      showinvested: null,
      showpending: null,
      showoverview: null,
      showtop5fund: null,
      showtop5cities: null,
      showtop5states: null,
      showtop5devices: null,
      nodata: null,
      datapresent: true,
      superdis: null,
      partnerdash: null,
      subscribersinvitation: null,
      top5dis: null,
      top5partners: null,
      snackbar: false,
      text: '',
      color: '',
      partner_name: null
    }
  },

  mounted() {
    this.check()
  },
  methods: {
    async check() {
      this.partner_name = this.$store.state.sessionStorage.partnername

      this.showtotal = this.$store.state.sessionStorage.rbac[0].access
      this.showinvested = this.$store.state.sessionStorage.rbac[1].access
      this.showpending = this.$store.state.sessionStorage.rbac[2].access
      this.showoverview = this.$store.state.sessionStorage.rbac[3].access
      this.showtop5fund = this.$store.state.sessionStorage.rbac[4].access
      this.showtop5cities = this.$store.state.sessionStorage.rbac[5].access
      this.showtop5states = this.$store.state.sessionStorage.rbac[6].access
      this.showtop5devices = this.$store.state.sessionStorage.rbac[7].access
      this.superdis = this.$store.state.sessionStorage.rbac[35].access
      this.partnerdash = this.$store.state.sessionStorage.rbac[36].access
      this.subscribersinvitation = this.$store.state.sessionStorage.rbac[37].access
      this.top5dis = this.$store.state.sessionStorage.rbac[38].access
      this.top5partners = this.$store.state.sessionStorage.rbac[39].access
      
      this.userType = 'partner'
    //   if (this.$store.state.sessionStorage.partner_code == null) {
    //     this.partner_code = 0
    //   } else {
    //     this.partner_code = this.$store.state.sessionStorage.partner_code
    //   }
      let today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = today.getFullYear()
      today = yyyy + '-' + mm + '-' + dd
      try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const dash = await this.$axios.$get('/admin/dashboard/get/' + this.$route.params.id)
        if (dash) {
          this.datapresent = false
        }
        this.funds = dash.data.topFund
        this.states = dash.data.topState
        this.cities = dash.data.topCity
        this.device = dash.data.topDevice
        this.distributors = dash.data.topSuperDistributor
        this.partners = dash.data.topDistributor

        this.loaded = true
        this.totalUser = dash.data.data[0].totalUser
        this.amountTotal = dash.data.data[0].sum
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        this.kycComplete = dash.data.data[0].kycComplete
        this.kycPending = dash.data.data[0].kycPending
        this.lastMonthCount = dash.data.data[0].lastMonthCount
        this.lastWeekCount = dash.data.data[0].lastWeekCount
        this.yesterdayCount = dash.data.data[0].yesterdayCount
        this.superdistributor = dash.data.data[0].superdistributorCount
        this.partnercount = dash.data.data[0].totalpartnerCount
        this.invitePending = dash.data.data[0].inviteCount
        this.inviteAccepted = dash.data.data[0].inviteAcceptedCount
      } catch (e) {
        this.error = e.response.data.message
        this.nodata = true
        this.datapresent = false
        console.log(e)
      }
      this.$store.commit('sessionStorage/setPartnerName', null)
      this.$store.commit('sessionStorage/setPartner', null)
    },
    segrigatLablesNValues(array, label) {
      const labels = []
      try {
        for (let i = 0; i < 10; i++) {
          try {
            labels.push(this.truncate(array[i]))
          } catch (e) {}
        }
        return labels
      } catch (e) {
        return labels
      }
    },
    truncate(source) {
      const size = 11
      if (source.length > size) {
        return source.slice(0, size - 1) + '...'
      }
    },
    kycTrue() {
      this.$store.commit('sessionStorage/setKyc', 'true') 
      if (this.$store.state.sessionStorage.userType == 'partner' ) {
        if (this.$store.state.sessionStorage.rbac[16].access == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
        this.$router.push({ path: '/subscribers' })
      }
      } else { 
        if (this.$store.state.sessionStorage.rbac[8].access == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
      this.$router.push({ path: '/' })
      }
      }
    },
    kycfalse() {
      this.$store.commit('sessionStorage/setKyc', 'false')
      if (this.$store.state.sessionStorage.userType == 'partner' ) {
        if (this.$store.state.sessionStorage.rbac[16].access == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
        this.$router.push({ path: '/subscribers' })
      }
      } else { 
        if (this.$store.state.sessionStorage.rbac[8].access == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
      this.$router.push({ path: '/' })
      }
      }
    },
    invitefalse() {
      this.$store.commit('sessionStorage/setInvite', 'false')
      if (this.$store.state.sessionStorage.userType == 'partner' ) {
        if (this.$store.state.sessionStorage.rbac[16].access == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
        this.$router.push({ path: '/subscribers' })
      }
      } else { 
        if (this.$store.state.sessionStorage.rbac[8].access == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
      this.$router.push({ path: '/' })
      }
      }
    },
    inviteTrue() {
      this.$store.commit('sessionStorage/setInvite', 'true') 
      if (this.$store.state.sessionStorage.userType == 'partner' ) {
        if (this.$store.state.sessionStorage.rbac[16].access == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
        this.$router.push({ path: '/subscribers' })
      }
      } else { 
        if (this.$store.state.sessionStorage.rbac[8].access == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
      this.$router.push({ path: '/' })
      }
      }
    },
    convertAmt(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    capitalizeFirstLetter(string) {
      if (string != null) {
        return string
      } else {
        return '--'
      }
    },
  },
}
</script>

<style>
.size {
  font-size: 15px !important;
}
</style>
