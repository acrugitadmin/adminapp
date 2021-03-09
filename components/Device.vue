<template>
  <v-layout>
    <v-flex>
      <h1 class="headline mb-5 mt-5 font-weight-light">Device Summary</h1>

      <div v-if="!items">
        <h3 class="mt-5 font-weight-light">
          Loading...
        </h3>
      </div>

      <div v-if="nodata">
        <h3 class="mt-5 font-weight-light">
          No Data Available Yet...
        </h3>
      </div>

      <v-expansion-panels>
        <v-expansion-panel
          v-for="item in items"
          :key="item.device_make"
          @click="call(item.device_make)"
        >
          <v-expansion-panel-header>{{
            capitalizeFirstLetter(item.device_make)
          }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div v-if="!itemsList">
              <h3 class="mt-5 font-weight-light">
                No Data Available Yet ...
              </h3>
            </div>

            <v-card v-if="itemsList">
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="itemsList"
                :search="search"
                class="elevation-1"
                :hide-default-footer="true"
              >
              </v-data-table>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint eqeqeq: 0 */
export default {
  data() {
    return {
      test: null,
      items: null,
      itemsList: null,
      search: '',
      selected: [],
      nodata: null,
      headers: [
        { text: 'Device Model', value: 'device_model', class: 'size' },
        { text: 'Count', value: 'count', class: 'size' },
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
        const result = await this.$axios.$get('/admin/dashboard/devicedrilldown/get')
        this.items = result
      } catch (e) {
        console.log(e)
        this.nodata = true
        this.items = true
      }
    },
    call(value) {
      this.itemsList = null
      this.list(value)
    },
    async list(value) {
      try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$post(
          '/admin/dashboard/devicedrilldownlist',
          { deviceMake: value }
        )
        this.itemsList = result
      } catch (e) {
        console.log(e)
      }
    },
    capitalizeFirstLetter(string) {
      if (string == null || string == '') {
        return 'Others'
      } else {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
      }
    },
    checkVal(value) {
      if (value == null || value == '') {
        return 'Others'
      } else {
        return value
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
