<template>
  <v-layout>
    <v-flex>
      <h1 class="headline mb-5 mt-5 font-weight-light">Funds Enabled</h1>

      <div v-if="!funds">
        <h3 class="mt-5 font-weight-light">
          Loading...
        </h3>
      </div>

      <v-card v-if="funds">
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
          :items="funds"
          item-key="amc_code"
          :search="search"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          :footer-props="{ 'items-per-page-options': [100, 200, -1] }"
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template v-slot:item.is_active="{ item }">
            <v-switch
              :disabled="disableif"
              v-model="item.is_active"
              @change="toggle(item)"
            ></v-switch>
          </template>
        </v-data-table>
      </v-card>

      <v-snackbar v-model="snackbar" color="green" top>
        {{ text }}
      </v-snackbar>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint eqeqeq: 0 */

export default {
  data() {
    return {
      page: 0,
      pageCount: 0,
      itemsPerPage: 100,
      test: null,
      search: '',
      selected: [],
      headers: [
        { text: 'Name', value: 'amc_name', class: 'size' },
        { text: 'AMC Code', value: 'amc_code', class: 'size' },
        { text: 'Enable/Disable Funds', value: 'is_active', class: 'size' },
      ],
      funds: null,
      load: true,
      switch1: false,
      name: null,
      selectedUser: null,
      singleSelect: true,
      select: null,
      state: false,
      snackbar: false,
      text: '',
      color: 'success',
      disableif: false
    }
  },

  mounted() {
    this.check()
  },
  methods: {
    async check() {
      if( this.$store.state.sessionStorage.rbac.fundsEnabledEnableDisable == true) {
        this.disableif = false
      } else {
        this.disableif = true
      }
      try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const fundValue = await this.$axios.$get('/admin/dashboard/amcmaster/get')
        this.funds = fundValue
        this.load = false
      } catch (e) {
        console.log(e)
      }
    },
    call() {
      this.selectedUser = JSON.stringify(this.selected)

      if (this.selected[0] != null) {
        this.name = this.selected[0].name
      } else {
        this.name = ''
      }
    },
    async toggle(value) {
      try {
        if (value.is_active == true) {
          this.state = true
        } else {
          this.state = false
        }
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const amcStatus = await this.$axios.$get(
          '/admin/dashboard/amcmaster/update/' + value.id + '/' + this.state
        )
        this.test = amcStatus
        this.snackbar = true
        this.color = 'green'
        this.text = value.amc_name + ' Has Been Successfully Updated'
        this.check()
      } catch (e) {
        this.snackbar = true
        this.color = 'red'
        this.text = e.response.data.message
        console.log(e)
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
