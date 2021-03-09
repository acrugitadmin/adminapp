<template>
  <v-layout>
    <v-flex>
      <br />
      <h1 class="headline">
        Portfolio
      </h1>
      <br />
      <br />

      <div v-if="!values">
        <h3 class="mt-5 font-weight-light">
          Loading...
        </h3>
      </div>

      <v-row class="negativemargintop" v-if="values">
        <v-col>
          <h4 class="mb-2">First Name</h4>
          <h3 v-if="!values.firstname" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{ values.firstname }}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Last Name</h4>
          <h3 v-if="!values.lastname" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{ values.lastname }}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Mobile No.</h4>
          <h3 v-if="!values.mobile" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{ values.mobile }}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Email</h4>
          <h3 class="font-weight-light mb-3">{{ emailcheck(values.email) }}</h3>
        </v-col>
      </v-row>
      <v-row v-if="values">
        <v-col>
          <h4 class="mb-2">City</h4>
          <h3 v-if="!values.address.city_name" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{ values.address.city_name }}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Country</h4>
          <h3 v-if="!values.kycDetails.country" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{ values.kycDetails.country }}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Holdings Total (INR)</h4>
          <h3 class="font-weight-light mb-3">
            {{ convertAmt(holdingsTotalAmt) }}
          </h3>
        </v-col>
        <v-col> </v-col>
      </v-row>

      <h1 class="headline mb-5 mt-5 font-weight-light">
        Holdings
      </h1>

      <div v-if="!holdings">
        <h3 class="mt-5 font-weight-light">
          No Data Available Yet ...
        </h3>
      </div>

      <v-card>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="holding in holdings"
            :key="holding.isin"
            @click="call(holding.isin)"
          >
            <v-expansion-panel-header>
              <div>{{ holding.name }}</div>
            </v-expansion-panel-header>
            <v-row>
              <h5
                style="margin-top: -10px;"
                class="font-weight-light ml-9 mb-2 mr-3"
              >
                <span style="font-weight: bold;">ISIN :</span>
                {{ holding.isin }}
                <span style="font-weight: bold;">Folio No. :</span>
                {{ holding.folio }}
              </h5>
            </v-row>
            <v-expansion-panel-content>
              <div v-if="!holdingsdetail">
                <h3 class="mt-5 font-weight-light">
                  Loading...
                </h3>
              </div>

              <v-card v-if="holdingsdetail">
                <v-data-table
                  v-if="holdingsdetail"
                  v-model="selected1"
                  :headers="headers1"
                  :items="holdingsdetail"
                  class="elevation-0"
                  :hide-default-footer="true"
                >
                  <template v-slot:item._id.fundName="{ item }">
                    {{ capitalizeFirstLetter(item._id.fundName) }}
                  </template>
                </v-data-table>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>

      <br />
      <br />

      <h1 class="headline mb-5 mt-5 font-weight-light">Transaction History</h1>

      <div v-if="!orders">
        <h3 class="mt-5 font-weight-light">
          No Data Available Yet ...
        </h3>
      </div>

      <v-card v-if="orders">
        <v-data-table
          v-model="selected"
          :headers="headers2"
          :items="orders"
          class="elevation-1"
        >
          <template v-slot:item.amount="{ item }">
            {{ convertAmt(item.amount) }}
          </template>
          <template v-slot:item.folio_number="{ item }">
            {{ emailcheck(item.folio_number) }}
          </template>
          <template v-slot:item.investment_date="{ item }">
            {{ convertDate(item.created_at) }}
          </template>
          <template v-slot:item.created_at="{ item }">
            {{ convertTime(item.created_at) }}
          </template>
          <template v-slot:item.type="{ item }">
            {{ convertText(item.type) }}
          </template>
          <template v-slot:item.status="{ item }">
            {{ capitalizeFirstLetter(item.status) }}
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint eqeqeq: 0 */
import moment from 'moment'
export default {
  data() {
    return {
      overlay: false,
      holdingsTotalAmt: null,
      values: null,
      name: null,
      holdings: null,
      orders: null,
      holdingsdetail: null,
      expanded: [],
      selected: [],
      selected1: [],
      singleExpand: true,
      headers: [
        { text: 'Name', value: 'name', class: 'size', sortable: false },
        { text: 'Amount(INR)', value: 'total', class: 'size', sortable: false },
        { text: 'NAV (avg.)', value: 'avgNav', class: 'size', sortable: false },
        { text: 'Units (avg.)', value: 'units', class: 'size', sortable: false },
      ],
      headers1: [
        { text: 'Name', value: 'name', class: 'size', sortable: false },
        { text: 'Amount(INR)', value: 'amount', class: 'size', sortable: false },
        { text: 'NAV', value: 'nav', class: 'size', sortable: false },
        { text: 'Units', value: 'units', class: 'size', sortable: false },
      ],
      headers2: [
        { text: 'Folio number', value: 'folio_number', class: 'size', sortable: false },
        { text: 'Name', value: 'fund_scheme.name', class: 'size', sortable: false },
        { text: 'Amount (INR)', value: 'amount', class: 'size', sortable: false },
        { text: 'Type', value: 'type', class: 'size', sortable: false },
        // { text: 'ID', value: 'id' },
        { text: 'Submitted Date', value: 'investment_date', class: 'size', sortable: false },
        { text: 'Submitted Time', value: 'created_at', class: 'size', sortable: false },
        { text: 'Status', value: 'status', class: 'size', sortable: false },
      ],
    }
  },

  mounted() {
    this.check()
  },
  methods: {
    async check() {
      // const val = this.$router.currentRoute.query.vals
      // const name = this.$router.currentRoute.query.name
      // this.$store.commit('sessionStorage/setPort', val)
      // this.$store.commit('sessionStorage/setName', name)
      // this.name = this.$store.state.sessionStorage.pageName
      this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
      try {
        // this.$axios.setHeader(
        //   'Authorization',
        //   'bearer ' + this.$store.state.sessionStorage.token
        // )

        const result = await this.$axios.$get(
          '/admin/users/getUserDetails/' + this.$store.state.sessionStorage.port
        )
        this.values = result

        // const holdingsVal = await this.$axios.$post(
        //   '/admin/orders/getOrders/holdingsdrilldown',
        //   {
        //     ObjectId: this.$store.state.sessionStorage.port,
        //   }
        // )

        // if (
        //   holdingsVal == null ||
        //   holdingsVal == '' ||
        //   holdingsVal.length == 0
        // ) {
        //   this.holdings = null
        // } else {
        //   this.holdings = holdingsVal
        // }

        // const orderVal = await this.$axios.$post('/admin/orders/getOrders/orders', {
        //   ObjectId: this.$store.state.sessionStorage.port,
        //   size: '20',
        //   direction: 'desc',
        // })
        // if (
        //   orderVal.amc_orders == null ||
        //   orderVal.amc_orders == '' ||
        //   orderVal.amc_orders.length == 0
        // ) {
        //   this.orders = null
        // } else {
        //   this.orders = orderVal.amc_orders
        // }

        // const holdingsTotal = await this.$axios.$post(
        //   '/admin/orders/getOrders/holdingssum',
        //   {
        //     ObjectId: this.$store.state.sessionStorage.port,
        //   }
        // )
        // this.holdingsTotalAmt = holdingsTotal.totalAmt
      } catch (e) {
        console.log(e)
      }
      try{
        const holdingsVal = await this.$axios.$post(
          '/admin/orders/getOrders/holdingsdrilldown',
          {
            ObjectId: this.$store.state.sessionStorage.port,
          }
        )

        if (
          holdingsVal == null ||
          holdingsVal == '' ||
          holdingsVal.length == 0
        ) {
          this.holdings = null
        } else {
          this.holdings = holdingsVal
        }

      }catch(error) {

      }

      try{
        const orderVal = await this.$axios.$post('/admin/orders/getOrders/orders', {
          ObjectId: this.$store.state.sessionStorage.port,
          size: '20',
          direction: 'desc',
        })
        if (
          orderVal.amc_orders == null ||
          orderVal.amc_orders == '' ||
          orderVal.amc_orders.length == 0
        ) {
          this.orders = null
        } else {
          this.orders = orderVal.amc_orders
        }

      }catch(error) {
        
      }

      try{
         const holdingsTotal = await this.$axios.$post(
          '/admin/orders/getOrders/holdingssum',
          {
            ObjectId: this.$store.state.sessionStorage.port,
          }
        )
        this.holdingsTotalAmt = holdingsTotal.totalAmt

      }catch(error) {
        
      }
    },
    call(value) {
      this.holdingsdetail = null
      this.loadDetails(value)
    },
    async loadDetails(value) {
      try {
        const holdingsdetVal = await this.$axios.$post(
          '/admin/orders/getOrders/holdingsdrilldowndetails',
          {
            ObjectId: this.$store.state.sessionStorage.port,
            isin: value,
          }
        )
        this.holdingsdetail = holdingsdetVal
      } catch (e) {
        console.log(e)
      }
    },
    convertDate(value) {
      if (value == null) {
        return '---'
      }
      function pad(s) {
        return s < 10 ? '0' + s : s
      }
      const d = new Date(value)
      if (value == null) {
        return '---'
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
    convertText(value) {
      if (value == null) {
        return '--'
      } else if (value == 'REDEEM_ALL') {
        return 'Redeem All'
      } else if (value == 'ADDITIONAL_PURCHASE') {
        return 'Additional Purchase'
      } else {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
      }
    },
    capitalizeFirstLetter(string) {
      if (string != null) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
      } else {
        return '--'
      }
    },
    convertTime(value) {
      if (value == null) {
        return '--'
      } else {
        const now = new Date(value)
        let hours = now.getHours()

        let minutes = now.getMinutes()
        const ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12 || 12
        if (hours < 10) {
          hours = '0' + hours
        }
        hours = hours || 12 // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes
        const strTime = hours + ':' + minutes + ' ' + ampm
        return strTime
      }
    },
    convertAmt(value) {
      if (value == null) {
        return '--'
      } else {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    },
     emailcheck(val) {
      if (val == "") {
        return '---'
      } else if (val == null) {
        return '---'
      }
     else {
        return val
      }
    }
  },
}
</script>

<style>
.size {
  font-size: 15px !important;
}
/* .v-data-table-header th {
  white-space: nowrap;
} */
.negativemargintop{
    margin-top: -30px;
  }
</style>
