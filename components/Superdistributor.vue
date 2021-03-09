<template>
  <v-layout>
    <v-flex>
      <h4 v-if="nodata" class="mt-5 font-weight-light">
        No Data Available Yet ...
      </h4>
      <h4 v-if="datapresent" class="mt-5 font-weight-light">
        Loading ...
      </h4>
      <div v-if="loaded">
        <v-row v-if="loaded">
          <v-col v-if="showsuperdis" align="center" justify="center">
            <div style="font-size: 3em; color: #595959;">
              {{partnercount}}
            </div>
            <h5 style="color: #595959;">PARTNERS</h5>
          </v-col>
          <v-divider v-if="showsuperdis" :inset="inset" vertical></v-divider>
          <v-row v-if="showpartner">
          <v-col align="center" justify="center">
            <div style="font-size: 3em; color: #595959;">
              {{subscribercount}}
            </div>
            <h5 style="color: #595959;">
              SUBSCRIBERS
            </h5>
          </v-col>
          </v-row>
          <v-divider v-if="showpartner" :inset="inset" vertical></v-divider>
          <v-row v-if="showinvitation">
          <v-col align="center" justify="center">
            <div style="font-size: 3em; color: #595959;">
              INR {{partnertotal}}
            </div>
            <h5 style="color: #595959;">
              AMOUNT INVESTED
            </h5>
          </v-col>
          </v-row>
        </v-row>
        <br />
        <br />
        <v-divider :inset="inset"></v-divider>
        <br />

        <v-row>
          <v-col v-if="showtopdis">
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
                v-model="selected"
                :headers="headers"
                :items="partners"
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

          <v-col v-if="showtop5partners">
            <v-card-title><h5 align="left">Top 5 Partners By City</h5></v-card-title>

            <div v-if="!city">
              <h3 class="mt-5 font-weight-light">
                Loading...
              </h3>
            </div>

            <v-card v-if="city">
              <v-data-table
                v-model="selected3"
                :headers="headers3"
                :items="city"
                :search="search3"
                class="elevation-1"
                :hide-default-footer="true"
              >
                <template v-slot:item.name="{ item }">
                  {{ capitalizeFirstLetter(item.name) }}
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <br />
      <br />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async asyncData({ $store, axios }) {},

  data() {
    return {
      amountTotal: null,
      totalUser: null,
      kycComplete: null,
      kycPending: null,
      lastMonthCount: null,
      lastWeekCount: null,
      yesterdayCount: null,
      partnercount: null,
      subscribercount: null,
      partnertotal: null,
      partners: null,
      city: null,
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
        { text: 'Name', value: 'city', class: 'size' },
        { text: 'Amount(INR)', value: 'sum', class: 'size' },
      ],
      partner_code: null,
      nodata: null,
      datapresent: true,
      showsuperdis: null,
      showpartner: null,
      showinvitation: null,
      showtopdis: null,
      showtop5partners: null
    }
  },

  mounted() {
    this.check()
  },
  methods: {
    async check() {
      this.showsuperdis = this.$store.state.sessionStorage.rbac.partnerDashboardPartners
      this.showpartner = this.$store.state.sessionStorage.rbac.partnerDashboardSubscribers
      this.showinvitation = this.$store.state.sessionStorage.rbac.partnerDashboardAmountInvested
      this.showtopdis = this.$store.state.sessionStorage.rbac.partnerDashboardTop5Partners
      this.showtop5partners = this.$store.state.sessionStorage.rbac.partnerDashboardTop5PartnersByCity


      // this.showsuperdis = this.$store.state.sessionStorage.rbac[30].access
      // this.showpartner = this.$store.state.sessionStorage.rbac[31].access
      // this.showinvitation = this.$store.state.sessionStorage.rbac[32].access
      // this.showtopdis = this.$store.state.sessionStorage.rbac[33].access
      // this.showtop5partners = this.$store.state.sessionStorage.rbac[34].access

      if (this.$store.state.sessionStorage.partner_code == null) {
        this.partner_code = 0
      } else {
        this.partner_code = this.$store.state.sessionStorage.partner_code
      }
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
        const dash = await this.$axios.$get('/admin/dashboard/get/' + this.partner_code)
        if (dash) {
          this.datapresent = false
        }
        this.funds = dash.data.topFund
        this.states = dash.data.topState
        this.cities = dash.data.topCity
        this.device = dash.data.topDevice
        this.partners = dash.data.subpartnerTopFund
        this.city = dash.data.subpartnerTopCity


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
        this.partnercount = dash.data.data[0].subpartnerCount
        this.subscribercount = dash.data.data[0].subparterSubscriberCount
        this.partnertotal = dash.data.data[0].subparterInvestAmount.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } catch (e) {
        this.error = e
        this.nodata = true
        this.datapresent = false
        console.log(e)
      }
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
      this.$store.commit('sessionStorage/setKyc', true) 
      if (this.$store.state.sessionStorage.userType == 'partner' ) {
        this.$router.push({ path: '/subscribers' })
      } else { 
      this.$router.push({ path: '/' })
      }
    },
    kycfalse() {
      this.$store.commit('sessionStorage/setKyc', false)
      if (this.$store.state.sessionStorage.userType == 'partner' ) {
        this.$router.push({ path: '/subscribers' })
      } else { 
      this.$router.push({ path: '/' })
      }
    },
    invitefalse() {

    },
    inviteTrue() {

    },
    convertAmt(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    capitalizeFirstLetter(string) {
      if (string != null) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
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
