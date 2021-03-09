<template>
  <v-layout>
    <v-flex>
      <v-row align="center" justify="center">
        <v-col class="d-flex" cols="12" sm="6">
          <h1 class="headline mt-5 font-weight-light">Search</h1>
          <v-spacer />
        </v-col>
      </v-row>
      <br />
      <v-row align="center" justify="center">
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            v-model="select"
            :items="items"
            item-text="state"
            label="Search By"
            persistent-hint
            return-object
            outlined
          ></v-select>
        </v-col>
        <br />
      </v-row>
      <v-form v-model="valid" @submit.prevent>
        <v-row v-if="select" align="center" justify="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              v-if="select.state == 'Name'"
              id="name"
              v-model="name"
              label="Enter The Name"
              placeholder="N/A"
              outlined
            ></v-text-field>
            <v-text-field
              v-if="select.state == 'Email'"
              id="email"
              v-model="email"
              label="Enter The Email"
              placeholder="N/A"
              outlined
            ></v-text-field>
            <v-text-field
              v-if="select.state == 'PAN Card'"
              id="pan"
              v-model="pan"
              label="Enter The PAN Info"
              placeholder="N/A"
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-row v-if="select" align="center" justify="center">
        <v-col class="d-flex" cols="12" sm="6">
          <v-spacer />
          <v-btn
            class="mr-3"
            color="black white--text"
            large
            :disabled="!valid"
            @click="reset"
            >Reset</v-btn
          >
          <v-btn
            color="black white--text"
            large
            :disabled="!valid"
            @click="called"
            >Search</v-btn
          >
        </v-col>
      </v-row>
      <br />

      <div v-if="!searchVal">
        <h3 class="mt-5 font-weight-light">
          Searching ...
        </h3>
      </div>

      <v-card v-if="results">
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
          :items="results"
          :search="search"
          @click:row="handleClick"
        >
          <template v-slot:item.contact_detail.mobile="{ item }">
            {{ formno(item.contact_detail.mobile) }}
          </template>
          <template v-slot:item.kyc_identity_detail.pan_number="{ item }">
            {{ formpan(item.kyc_identity_detail.pan_number) }}
          </template>
          <template v-slot:item.created_at="{ item }">
            {{ convertDate(item.created_at) }}
          </template>
          <template v-slot:item.updated_at="{ item }">
            {{ convertDate1(item.updated_at) }}
          </template>
          <template v-slot:item.lastLogin="{ item }">
            {{ convertDate2(item.lastLogin) }}
          </template>
          <template v-slot:item.kycCompleted="{ item }">
            <v-chip :color="getColor(item.kycCompleted)" dark>{{
              pill(item.kycCompleted)
            }}</v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint eqeqeq: 0 */
export default {
  data() {
    return {
      searchVal: true,
      valid: true,
      select: null,
      items: [{ state: 'Name' }, { state: 'Email' }, { state: 'PAN Card' }],
      value: null,
      name: null,
      email: null,
      pan: null,
      nameRules: [(v) => !!v || 'Name is required'],
      emailRules: [
        // (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      panRules: [(v) => !!v || 'PAN is required'],
      results: null,
      search: '',
      selected: [],
      headers: [
        { text: 'Name', value: 'firstName' },
        { text: 'Mobile Number', value: 'mobile' },
        { text: 'PAN Number', value: 'panCard' },
        { text: 'Date Created', value: 'registeredOn' },
        { text: 'Last Updated', value: 'profileUpdatedOn' },
        { text: 'Last Login', value: 'lastLogin' },
        { text: 'KYC Completed', value: 'kycCompleted' },
      ],
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {},
    async called() {
      this.searchVal = false
      try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$post('/userSearch/getUserDetails', {
          name: this.name,
          pan: this.pan,
          email: this.email,
        })
        this.results = result
        this.searchVal = true
        this.name = null
        this.pan = null
        this.email = null
      } catch (e) {
        this.error = e.response.data.message
        console.log(e)
      }
    },
    handleClick(value) {
      // console.log(JSON.stringify(value))
      const values = value
      this.$store.commit('sessionStorage/setInfo', value)
      this.$router.push({ name: 'profile', params: { values } })
    },
    formno(value) {
      const reg = /.{1,7}/
      const phone = value.toString().replace(reg, (m) => '*'.repeat(m.length))
      if (value == null) {
        return 'N/A'
      } else {
        return phone
      }
    },
    formpan(value) {
      const first = value.substr(0, 5)
      const reg = /(?<=.{2})([0-9a-zA-Z])/gm
      const pan = first.toString().replace(reg, (m) => '*'.repeat(m.length))

      const sec = value.substr(5, 9)
      const reg1 = /.{3}/
      const pan2 = sec.toString().replace(reg1, (m) => '*'.repeat(m.length))
      if (value == null) {
        return 'N/A'
      } else {
        return pan + pan2
      }
    },
    convertDate(value) {
      function pad(s) {
        return s < 10 ? '0' + s : s
      }
      const d = new Date(value)
      if (value == null) {
        return 'N/A'
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
        return 'N/A'
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
        return 'N/A'
      } else {
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
          '-'
        )
      }
    },
    pill(value) {
      if (value == true) {
        return 'Yes'
      } else if (value == null) {
        return 'N/A'
      } else {
        return 'No'
      }
    },
    getColor(kycCompleted) {
      if (kycCompleted == true) {
        return 'green'
      } else if (kycCompleted == false) {
        return 'red'
      }
    },
    reset() {
      this.name = ''
      this.email = ''
      this.pan = ''
      this.results = null
      this.select = null
    },
  },
}
</script>
