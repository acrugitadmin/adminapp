<template>
  <v-layout>
    <v-flex>
      <h1 class="headline mb-3">
       Settings
      </h1>

      <br />

      <h4 v-if="!values" class="mt-5 font-weight-light">
        {{ error }}
      </h4>

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
        <v-col> </v-col>
        <v-col> </v-col>
      </v-row>

     <div v-if="showpiggy"> <h1 class="headline">
        Piggybank Details
       </h1>

      <v-row v-if="values">
        <v-col>
          <h4 class="mb-2">Risk Profile</h4>
          <h3 v-if="!values.risk_profile" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{ capitalizeFirstLetter(values.risk_profile) }}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Type</h4>

          <h3 class="font-weight-light mb-3">
            {{ checkFlag(values.piggyBankDetails.credit_type) }}
          </h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Frequency</h4>
          <h3 class="font-weight-light mb-3">
            {{ convText(values.piggyBankDetails) }}
          </h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Invt. On Accumulation Amount (INR)</h4>

          <h3 class="font-weight-light mb-3">
            {{ amountVal(values.piggyBankDetails.invest_on_amount) }}
          </h3>
        </v-col>
      </v-row>
      <v-row v-if="values">
        <v-col>
          <h4 class="mb-2">Default Fund</h4>
          <h3
            v-if="!values.piggyBankDetails.default_scheme"
            class="font-weight-light mb-3"
          >
            -----
          </h3>
          <h3 class="font-weight-light mb-3">
            {{ values.piggyBankDetails.default_scheme }}
          </h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">ISIN</h4>
          <h3
            v-if="!values.piggyBankDetails.default_isin"
            class="font-weight-light mb-3"
          >
            -----
          </h3>
          <h3 class="font-weight-light mb-3">
            {{ values.piggyBankDetails.default_isin }}
          </h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Piggy Bank Balance</h4>
          <h3
            v-if="!values.piggyBankDetails.account_balance"
            class="font-weight-light mb-3"
          >
            -----
          </h3>

          <h3 class="font-weight-light mb-3">
            {{ format(values.piggyBankDetails.account_balance) }}
          </h3>
        </v-col>
        <v-col> </v-col>
      </v-row>
      
    <div><div v-if="!piggy">
        <h3 class="mt-5 font-weight-light">
          No Data Available Yet...
        </h3>
      </div>
      

      <v-card v-if="piggy">
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
          :items="piggy"
          item-key="amc_code"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.date_added="{ item }">
            {{ convertDate(item.date_added) }}
          </template>
          <template v-slot:item.is_fixed="{ item }">
            {{ fixedAmt(item.is_fixed) }}
          </template>
          <template v-slot:item.amount="{ item }">
            {{ amountVal(item.amount) }}
          </template>
          <template v-slot:item.pct_value="{ item }">
            {{ percentage(item.pct_value) }}
          </template>
        </v-data-table>
      </v-card>
      </div>
     </div>

      <div v-if="showflexi"><h1 class="headline mt-5 mb-4">Flexi SIP Details</h1>

      <div v-if="!flexi">
        <h3 class="mt-5 font-weight-light">
          No Data Available Yet...
        </h3>
      </div>
      

      <v-card v-if="flexi">
        <v-card-title>
          <v-text-field
            v-model="search1"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-model="selected1"
          :headers="headersflexi"
          :items="flexi"
          item-key="amc_code"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.folio_number="{ item }">
            {{ emailcheck(item.folio_number) }}
          </template>
          <template v-slot:item.day_of_week="{ item }">
            {{ showval(item) }}
          </template>
        </v-data-table>
      </v-card></div>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint eqeqeq: 0 */
import moment from 'moment'

export default {
  data() {
    return {
      name: null,
      piggy: null,
      load: true,
      values: null,
      error: null,
      search: '',
      selected: [],
      search1: '',
      selected1: [],
      headers: [
        { text: 'Amount(INR)', value: 'amount', class: 'size', sortable: false },
        { text: 'Date Added', value: 'date_added', class: 'size', sortable: false },
        { text: 'Fixed Amount', value: 'is_fixed', class: 'size', sortable: false },
        { text: 'Percentage', value: 'pct_value', class: 'size', sortable: false },
        // { text: 'Piggy Bank Info', value: 'piggy_info', class: 'size' },
      ],
      flexi: null,
      headersflexi: [
        { text: 'Fund Name', value: 'fund_name', class: 'size', sortable: false },
        { text: 'Amount', value: 'amount', class: 'size', sortable: false },
        { text: 'Frequency', value: 'frequency', class: 'size', sortable: false },
        { text: 'Day Of Month/Week', value: 'day_of_week', class: 'size', sortable: false },
        { text: 'Folio Number', value: 'folio_number', class: 'size', sortable: false },
      ],
      showflexi: null,
      showpiggy: null
    }
  },

  mounted() {
    this.check()
  },
  methods: {
    async check() {
      this.showflexi = this.$store.state.sessionStorage.rbac.subscriberSettingsFlexiSipDetails
      this.showpiggy = this.$store.state.sessionStorage.rbac.subscriberSettingsPiggybankDetails
      // const val = this.$router.currentRoute.query.vals
      // const name = this.$router.currentRoute.query.name
      // this.$store.commit('sessionStorage/setPiggy', val)
      // this.$store.commit('sessionStorage/setName', name)
      // this.name = this.$store.state.sessionStorage.pageName
      try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$get(
          '/admin/users/getUserDetails/' + this.$store.state.sessionStorage.piggy
        )
        this.values = result
        this.load = false
        this.flexi = this.values.flexiData

        const piggyVal = await this.$axios.$get(
          '/admin/users/piggybank/' + this.$store.state.sessionStorage.piggy
        )
        this.piggy = piggyVal
      } catch (e) {
        console.log(e)
      }
    },
    convertDate(value) {
      if (value == null) {
        return '-----'
      }
      function pad(s) {
        return s < 10 ? '0' + s : s
      }
      const d = new Date(value)
      if (value == null) {
        return '-----'
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
    amountVal(value) {
      if (value == null) {
        return '--'
      } else {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    },
    fixedAmt(value) {
      if (value == true) {
        return 'Yes'
      } else if (value == false) {
        return 'No'
      } else {
        return '--'
      }
    },
    percentage(value) {
      if (value == null) {
        return '--'
      } else {
        return value
      }
    },
    format(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    convText(value) {
      if (value.credit_type == 'BOTH' || value.credit_type == 'FIXED') {
        return (
          value.credit_frequency.charAt(0).toUpperCase() +
          value.credit_frequency.slice(1).toLowerCase()
        )
      } else {
        return '-----'
      }
    },
    checkFlag(value) {
      if (value == 'BOTH' || value == 'FIXED') {
        return 'Fixed'
      } else if (value == 'PERCENTAGE') {
        return 'Percentage'
      } else {
        return '-----'
      }
    },
    capitalizeFirstLetter(string) {
      if (string != null) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
      } else {
        return '--'
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
    },
    showval(val) {
      if(val.frequency == "WEEKLY") {
        return val.day_of_week
      }else if(val.frequency == "MONTHLY"){
        return val.day_of_month
      }else{
        return '---'
      }
    }
  },
}
</script>

<style>
.size {
  font-size: 15px !important;
}
.negativemargintop{
    margin-top: -30px;
  }
</style>
