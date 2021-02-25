<template>
  <v-layout>
    <v-flex>
      <h1 class="headline mb-5 mt-5 font-weight-light">List Of Partners</h1>

      <div v-if="!values">
        <h3 class="mt-5 font-weight-light">
          Loading...
        </h3>
      </div>

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
                :search="search"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          :footer-props="{ 'items-per-page-options': [100, 200, -1] }"
          class="elevation-1"
          :loading="isLoading"
          @page-count="pageCount = $event"
              >
              <template v-slot:item.name="{ item }">
            {{ nameCheck(item) }}
          </template>
          <template v-slot:item.id="{ item }">
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
          <template v-slot:item.arn_number="{ item }">
            {{ arntype(item.arn_number)}}
          </template>
          <template v-slot:item.business_type="{ item }">
            {{ capitalizeFirstLetter(item.business_type)}}
          </template>
          <template v-slot:item.super_distributor="{ item }">
            {{ checkdis(item.super_distributor)}}
          </template>

              </v-data-table>
        </v-card>

        <v-layout row justify-center>
        <v-dialog v-model="dialog" style="width: 80%; height: 80%;">
          <v-card>
            <v-btn
              fixed
              fab
              icon
              class="float-right mr-10"
              right
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                  <template>
  <v-layout>
    <v-flex>
      <h1 class="headline mt-5">Profile Information</h1>
      <br />
      <br />

      <v-row v-if="dialog">
        <v-col>
          <h4 class="mb-2">Name</h4>
          <h3 class="font-weight-light mb-3">{{nameCheck(detail)}}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Type</h4>
          <h3 v-if="!detail.business_type" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{capitalizeFirstLetter(detail.business_type)}}</h3>
        </v-col>
       <v-col>
          <h4 class="mb-2">Partner GST</h4>
          <h3 v-if="!detail.partner_gst" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{detail.partner_gst}}</h3>
        </v-col>
         <v-col>
        <h4 class="mb-2">Email</h4>
          <h3 v-if="!detail.email" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{detail.email}}</h3>
        </v-col>
      </v-row>
      <v-row v-if="dialog">
        <v-col>
          <h4 class="mb-2">Mobile</h4>
          <h3 v-if="!detail.mobile" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{detail.mobile}}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Address</h4>
          <h3 v-if="!detail.address.address" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{detail.address.address}}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">City</h4>
          <h3 v-if="!detail.partner_city" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{detail.partner_city}}</h3>
        </v-col>
        <v-col>
        <h4 class="mb-2">Pincode</h4>
          <h3 v-if="!detail.pincode" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{detail.pincode}}</h3>
        </v-col>
      </v-row>
      <v-row v-if="dialog">
        <v-col>
          <h4 class="mb-2">Partner Type</h4>
          <h3 v-if="!detail.partner_type" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{partnerType(detail.partner_type)}}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Partner Code</h4>
          <h3 v-if="!detail.partner_code" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{detail.partner_code}}</h3>
        </v-col>
       <v-col>
          <h4 class="mb-2">ARN Number</h4>
          <h3 v-if="!detail.arn_number" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{detail.arn_number}}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Logo Uploaded</h4>
          <h3 class="font-weight-light mb-3">{{check(detail.partner_logo)}}</h3>
        </v-col>
      </v-row>
      <v-row v-if="dialog">
      <v-col>
          <h4 class="mb-2">PAN Number</h4>
          <h3 v-if="!detail.pan" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{detail.pan}}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Super Distributor</h4>
          <h3 v-if="!detail.super_distributor" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{checkdis(detail.super_distributor)}}</h3>
        </v-col>
        <v-col>
        <a :href="link" target="_blank" class="download" download ><h4 class="mb-2">
            Aadhaar
            <v-icon :color="coloricon"  class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
        </v-col>
        <v-col>
          <a :href="link1" target="_blank" class="download" download><h4 class="mb-2">
            PAN Card
            <v-icon :color="coloricon1" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
        </v-col>
      </v-row>
      <v-row v-if="dialog">
       <v-col>
          <a :href="link2" target="_blank" class="download" download><h4 class="mb-2">
            ARN Certificate
            <v-icon :color="coloricon2" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
        </v-col>
        <v-col> 
        </v-col>
       <v-col>
        </v-col>
        <v-col>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>

      </v-flex>
    </v-layout>
</template>

<script>
/* eslint eqeqeq: 0 */
export default {
  data() {
    return {
      isLoading: true,
      values: null,
      show: false,
      valid: false,
      name: null,
      phone: null,
      dialog: false,
      detail: null,
      page: 0,
      pageCount: 0,
      itemsPerPage: 100,
      coloricon: null,
      coloricon1: null,
      coloricon2: null,

        search: '',
      selected: [],
      headers: [
        { text: 'Name', value: 'name', class: 'size' },
        { text: 'Type', value: 'business_type', class: 'size' },
        { text: 'Mobile', value: 'mobile', class: 'size' },
        { text: 'Email', value: 'email', class: 'size' },
        { text: 'Partner Type', value: 'partner_type', class: 'size' },
        { text: 'ARN Number', value: 'arn_number', class: 'size' },
        { text: 'Super Distributor', value: 'super_distributor', class: 'size' },
         { text: '', value: 'id' },
      ],
      err: null,
      err1: null,
      err2: null,
      link: null,
      link1: null,
      link2: null,
      datapresent: true,
      nodata: null,
      envlogo: process.env.logolink
    }
  },
  mounted() {
    this.called()
  },
  methods: {
      async called() {
        try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )

        const result = await this.$axios.$get(
          '/admin/partner/superdistributors/get/' + this.$store.state.sessionStorage.partner_code
        )
        if (result) {
          this.datapresent = false
        } 
        this.values = result
        this.isLoading = false

      } catch (e) {
        console.log(e)
        this.datapresent = false
        this.nodata = true
      }

      },
      nameCheck(value) {
        if (value == null) {
          return '---'
        } else {
          return value.name
        }
      // if (value.firstname == null) {
      //   return value.company_name
      // } else if (value.company_name == null) {
      //   return value.firstname + ' ' +  value.lastname
      // } 
      // else {
      //   return '---'
      // }
    },
    nameC(value) {
      if (value == null) {
        return ''
      } else {
        return value
      }
    },
    infoCalled(val) {
     if (this.$store.state.sessionStorage.rbac.listOfPartnersInformation == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
     this.dialog = true
     this.detail = val
     if (val.id_proof == null) {
       this.coloricon = 'grey'
       this.link = null
        } else {
        this.coloricon = 'green'
          this.link = this.envlogo + '/admin/user/download/' + val.id_proof
        }
        if (val.address_proof == null) {
          this.coloricon1 = 'grey'
          this.link1 = null
        } else {
          this.coloricon1 = 'green'
          this.link1 = this.envlogo + '/admin/user/download/' + val.address_proof
        }
        if (val.arn_certificate == null) {
          this.coloricon2 = 'grey'
          this.link2 = null
        } else {
          this.coloricon2 = 'green'
          this.link2 = this.envlogo + '/admin/user/download/' + val.arn_certificate
        }
      }
    },
        callfile() {
      if (this.link == null) {
        this.err = true
      }
    },
    callfile1() {
      if (this.link1 == null) {
        this.err1 = true
      }
    },
    callfile2() {
      if (this.link2 == null) {
        this.err2 = true
      }
    },
    Ptype(value) {
      if (value == 'A') {
        return 'ARN'
      } else {
        return 'Non-ARN'
      }
    },
    arntype(value) {
      if (value == null) {
        return '--'
      } else {
        return value
      }
    },
    capitalizeFirstLetter(string) {
      if (string != null) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
      } else {
        return '--'
      }
    },
    partnerType(value) {
      if (value == 'A') {
        return 'ARN'
      } else {
        return 'Non-ARN'
      }
    },
    check(val) {
      if (val == null) {
        return 'No'
      } else {
        return 'Yes'
      }
    },
    checkname(val) {
      if (val.firstname == null) {
        return val.company_name
      } else {
        return val.firstname + ' ' + val.lastname
      }
    },
    checkdis(val) {
      if(val == 'true') {
        return 'Yes'
      } else if (val == 'false') {
        return 'No'
      } else {
        return '--'
      }
    },
    callfile() {
      if (this.link2 == null) {
        this.link = null
      } else {
      this.link = this.envlogo + '/admin/user/download/' + this.val.id_proof
      }
    },
    callfile1() {
      if (this.link1 == null) {
        this.link1 = null
      } else {
        this.link1 = this.envlogo + '/admin/user/download/' + this.val.address_proof
      }
    },
    callfile2() {
      if (this.link2 == null) {
        this.link2 = null
      } else {
        this.link2 = this.envlogo + '/admin/user/download/' + this.val.arn_certificate
      }
    },
  },
}
</script>

<style>
.paddingTop {
    margin-top: -20px;
}
.size {
  font-size: 15px !important;
}
.icon-green {
    color: red;
}
</style>