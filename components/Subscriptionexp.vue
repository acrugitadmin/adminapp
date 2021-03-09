<template>
    <v-layout>
      <v-flex>
        <v-row><v-col><h1 class="headline mt-5 font-weight-light">List Of Users Whose Subscription Has Expired</h1></v-col>
          <v-col><div class="float-right ">
            <vue-json-to-csv :json-data="values" csv-title="subscriptionexplist">
            <v-btn
              class="black white--text"
              right
            >Download CSV</v-btn>
            </vue-json-to-csv>
            </div></v-col>
            </v-row>
  
        <div v-if="datapresent">
          <h3 class="mt-5 font-weight-light">
            Loading...
          </h3>
        </div>
        <!-- <div v-if="nodata">
          <h3 class="mt-5 font-weight-light">
            No Data Available Yet...
          </h3>
        </div> -->
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
  
        <v-card v-if="values">
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
                  :items="values"
                  :search='search'
                  :items-per-page="itemsPerPage"
                  :footer-props="{ 'items-per-page-options': [10, 200, -1] }"
                  class="elevation-1"
                  :loading="isLoading"
                  :page.sync="page"
                  @page-count="pageCount = $event"
                >
                <template v-slot:item.firstname="{ item }">
                  {{ item.firstname}} {{ item.lastname}}
                </template>
                <template v-slot:item.subscription_expiry="{ item }">
                  {{ convertDate2(item.subscription_expiry) }}
                </template>
                </v-data-table>
          </v-card>

          <v-snackbar v-model="snackbar" :color="color" top>
            {{ text }}
          </v-snackbar>
        </v-flex>
    </v-layout>
</template>

<script>

import VueJsonToCsv from 'vue-json-to-csv'
import moment from 'moment'

    export default {

      components: {
        VueJsonToCsv,
    },

      data() {
        return {
            isLoading: false,
      values: [],
      valid: false,  
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
        search: '',
        customfilter: 'TRUE',
      selected: [],
      headers: [
        { text: 'Name', value: 'firstname', class: 'size', sortable: false  },
        { text: 'Mobile Number', value: 'mobile', class: 'size', sortable: false  },
        { text: 'Subscription Exp.', value: 'subscription_expiry', class: 'size', sortable: false  },
      ],
      datapresent: true,
      nodata: false,
      checkbox: false,
      loaded: true,
      snackbar: false,
            text: '',
            color: '',
            allowedit: null,
            totalPassengers: 0,
            numberOfPages: 0,
            options: {},
            }
        },

  //       watch: {
  //   options: {
  //     handler() {
  //       this.getUsers();
  //     },
  //   },
  //   deep: true,
  // },


        mounted() {
            this.check()
        },
        methods: {
            async check() {
                this.loaded = true
                try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$post('/admin/partner/user/expired/get/', {
          offset: 0,
          limit: 10000,
          partner_code: 0,
        })
        this.values = result.data
        this.datapresent = false
        this.totalPassengers = parseInt(result.records);
        this.numberOfPages = result.pages;
      } catch (e) {
        console.log(e)
        this.nodata = true
        this.items = true
      }
            },
            async getUsers() {
              console.log('called')
              this.loaded = true
              const { page, itemsPerPage } = this.options;
              let pageNumber = page - 1;
                console.log('page', this.page)
                console.log('page number', pageNumber)
                if(pageNumber == -1){
                  pageNumber = 0
                }
                console.log('new pn', pageNumber)
                try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$post('/admin/partner/user/expired/get/', {
          offset: pageNumber * 10,
          limit: 10,
          partner_code: 0,
        })
        this.values = result.data
        this.datapresent = false
        this.totalPassengers = parseInt(result.records);
        this.numberOfPages = result.pages;
      } catch (e) {
        console.log(e)
        this.nodata = true
        this.items = true
            }
            },
            checktype(val) {
              if(val == true){
                return 'Active'
              }else{
                return 'Inactive'
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
            checkifnull(val) {
              if(val == null){
                return '--'
              }else{
                return val
              }
            },
            capitalizeFirstLetter(string) {
              if (string == null) {
                return '-----'
              } else if (string == ''){
                return '-----'
              } else {
                return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
              }
            },
            

        }
    }
</script>

<style>
  .size {
    font-size: 15px !important;
  }
  </style>
  