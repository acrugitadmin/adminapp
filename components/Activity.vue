<template>
  <v-layout>
    <v-flex>
      <h1 class="headline">
        Activity Log
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
        <v-col> </v-col>
        <v-col> </v-col>
      </v-row>

      <div v-if="!activity">
        <h3 class="mt-5 font-weight-light">
          No Data Available Yet...
        </h3>
      </div>

      <v-card v-if="activity">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="activity"
          class="elevation-1"
        >
          <template v-slot:item.activity="{ item }">
            {{ capitalizeFirstLetter(item.activity) }}
          </template>
          <template v-slot:item.date_added="{ item }">
            {{ convertDate(item.date_added) }}
          </template>
          <template v-slot:item.details="{ item }">
            {{ convertTime(item.date_added) }}
          </template>
          <template v-slot:item.details.activityType="{ item }">
            {{ convText(item.details) }}
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
      values: null,
      name: null,
      activity: null,
      selected: [],
      headers: [
        { text: 'Activity', value: 'activity', class: 'size', sortable: false },
        { text: 'Date', value: 'date_added', class: 'size', sortable: false },
        { text: 'Time', value: 'details', class: 'size', sortable: false },
        { text: 'Details', value: 'details.message', class: 'size', sortable: false },
      ],
    }
  },

  mounted() {
    this.check()
  },
  methods: {
    async check() {
      
      try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )

        const result = await this.$axios.$get(
          '/admin/users/getUserDetails/' + this.$store.state.sessionStorage.act
        )
        this.values = result

        const activityLog = await this.$axios.$get(
          '/admin/dashboard/activity/get/' + this.$store.state.sessionStorage.act
        )
        this.activity = activityLog

      } catch (e) {
        console.log(e)
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
        // return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
        //   '-'
        // )
        
        var str = value
        var res = str.replace("T", " ").replace("Z","").replace(" ", "T");

        var n = res.toLocaleString()
        return moment(n).format('DD-MM-YYYY');
      }
    },
    convText(value) {
      if (value == null) {
        return '--'
      } else {
        const resp = value.activityType.replace(/_/g," ");
        return resp.charAt(0).toUpperCase() + resp.slice(1).toLowerCase()
      }
    },
    convtType(value) {
      return '--'
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
        // let hours = now.getHours()

        // let minutes = now.getMinutes()
        // const ampm = hours >= 12 ? 'PM' : 'AM'
        // hours = hours % 12
        // if (hours < 10) {
        //   hours = '0' + hours
        // }
        // hours = hours || 12 
        // minutes = minutes < 10 ? '0' + minutes : minutes
        // const strTime = hours + ':' + minutes + ' ' + ampm
        // return strTime

        // var n = now.toLocaleString('en-US', { timeZone: 'UTC' });
        // var datearray = n.split("/");
        // var n = now.toLocaleString('en-US', { timeZone: 'UTC' });
        return now.toLocaleTimeString('en-US', {timeZone: 'UTC', hour: '2-digit', minute: '2-digit'})
        
      }
    },
    conv(value) {
      if (value == 'true') {
        return 'Yes'
      } else if (value == null) {
        return '--'
      } else {
        return 'No'
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
.negativemargintop{
    margin-top: -30px;
  }
</style>
