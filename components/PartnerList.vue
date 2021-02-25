<template>
  <v-layout>
    <v-flex>
      <h1 class="headline mb-5 mt-5 font-weight-light">List Of Partners</h1>

      <div v-if="datapresent">
        <h3 class="mt-5 font-weight-light">
          Loading...
        </h3>
      </div>
      <div v-if="nodata">
        <h3 class="mt-5 font-weight-light">
          No Data Available Yet...
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
          :footer-props="{ 'items-per-page-options': [10, 200, -1] }"
          class="elevation-1"
          :loading="isLoading"
          @page-count="pageCount = $event"
              >
              <template v-slot:item.name="{ item }">
            {{ nameCheck(item) }}
          </template>
          <template v-slot:item.assistance_allowed="{ item }">
            {{ checkpartnerassist(item.assistance_allowed)}}
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
          <template v-slot:item.partner_code="{ item }">
          <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-icon
                  style="cursor: pointer;"
                  v-on="on"
                  @click="showdashboard(item)"
                >
                  mdi-apps
                </v-icon>
              </template>
              <span>View Dashboard</span>
            </v-tooltip>
              </template>
          <template v-slot:item.arn_number="{ item }">
            {{ arntype(item.arn_number)}}
          </template>
          <template v-slot:item.super_distributor_name="{ item }">
            {{ superdisname(item.super_distributor_name)}}
          </template>
          <template v-slot:item.subscriber_count="{ item }">
            <div @click="navigatePartner(item)"  style="cursor: pointer;">{{ partnercount(item.subscriber_count)}}</div>
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
        <v-dialog v-model="dialog1" max-width="1200">
          <v-card>
            <v-btn
              
            fab
            icon
            class="float-right mr-2"
            right
            @click="dialog1 = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn></div>
              <v-container>
                <mydashboard v-if="dialog1" class="mt-5" />
              </v-container>
          </v-card>
        </v-dialog>
      </v-layout>

        <v-layout row justify-center>
        <v-dialog v-model="dialog" max-width="1200">
          <v-card>
            <v-btn
              
            fab
            icon
            class="float-right mr-2"
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
      <v-row><v-col><h1 class="headline mt-5">Profile Information</h1></v-col>
        <v-col><div class="float-right "><v-btn
          v-if="showeditpartner"
            color="black white--text"  
            @click="editcalled(detail)"
            >EDIT</v-btn
          ></div></v-col>
        </v-row>
      <br />
      <br />

      <!-- <v-row v-if="dialog">
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
          <h4 class="mb-2">Mobile</h4>
          <h3 v-if="!detail.mobile" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{detail.mobile}}</h3>
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
          <h4 class="mb-2">City</h4>
          <h3 v-if="!detail.partner_city" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{detail.partner_city}}</h3>
        </v-col>
        <v-col v-if="detail.business_type == 'COMPANY'">
          <h4 class="mb-2">Logo Uploaded</h4>
          <h3 class="font-weight-light mb-3">{{check(detail.partner_logo)}}</h3>
        </v-col>
        <v-col v-if="detail.business_type == 'INDIVIDUAL'">
          <h4 class="mb-2">Photo Uploaded</h4>
          <h3 class="font-weight-light mb-3">{{check(detail.partner_logo)}}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Mode</h4>
          <h3 class="font-weight-light mb-3">{{detail.mode}}</h3>
        </v-col>
        <v-col>
        </v-col>
      </v-row>

        <v-row v-if="dialog">
        <v-col v-if="personalinfo == true">
          <h2 class="font-weight-light mb-3">Personal Information</h2>
          <h4 class="mb-2">Address</h4>
          <h3 v-if="!detail.address.address" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{detail.address.address}}</h3>

          <h4 class="mb-2">Pincode</h4>
          <h3 v-if="!detail.pincode" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{detail.pincode}}</h3>

          <h4 class="mb-2">Partner Login Link</h4>
          <h3 v-if="!detail.urlid" class="font-weight-light mb-3">-----</h3>
          <link class="font-weight-light mb-3"> {{envbaselink}}?partner={{detail.urlid}}</link>

        </v-col>


        <v-divider v-if="personalinfo == true" class="mr-4" :inset="inset" vertical></v-divider>

        <v-col v-if="partnerinfo == true">
          <h2 class="font-weight-light mb-3">Partner Information</h2>
          <h4 class="mb-2">Super Distributor</h4>
          <h3 class="font-weight-light mb-3">{{checkdis(detail.super_distributor)}}</h3>

          <h4 class="mb-2">Partner Type</h4>
          <h3 v-if="!detail.partner_type" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{partnerType(detail.partner_type)}}</h3>

          <h4 class="mb-2">Partner Code</h4>
          <h3 v-if="!detail.partner_code" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{detail.partner_code}}</h3>

          <h4 class="mb-2">ARN Number</h4>
          <h3 v-if="!detail.arn_number" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{detail.arn_number}}</h3>

          <a :href="link2" target="_blank" class="download" download><h4 class="mb-2">
            ARN Certificate
            <v-icon :color="coloricon2" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
        </v-col>

        <v-divider v-if="partnerinfo == true" class="mr-4" :inset="inset" vertical></v-divider>

        <v-col v-if="profileinfo == true">
          <h2 class="font-weight-light mb-3">KYC Documents</h2>
          <h4 class="mb-2">PAN Number</h4>
          <h3 v-if="!detail.pan" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{detail.pan}}</h3>

          <h4 class="mb-2">Partner GST</h4>
          <h3 v-if="!detail.partner_gst" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{detail.partner_gst}}</h3>

         <a :href="link" target="_blank" class="download" download ><h4 class="mb-2">
            Aadhaar
            <v-icon :color="coloricon"  class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>

          <a :href="link1" target="_blank" class="download" download><h4 class="mb-2">
            PAN Card
            <v-icon :color="coloricon1" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
        </v-col>
      </v-row> -->


      <v-tabs class="negtoptab" v-model="tab">
        <v-tab  href="#info">Information</v-tab>
        <v-tab  href="#sub">Sub-Partners</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item :key="1" value="info"
        >
          <v-card flat>
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
                <h4 class="mb-2">Mobile</h4>
                <h3 v-if="!detail.mobile" class="font-weight-light mb-3">
                  -----
                </h3>
                <h3 class="font-weight-light mb-3">{{detail.mobile}}</h3>
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
                <h4 class="mb-2">City</h4>
                <h3 v-if="!detail.partner_city" class="font-weight-light mb-3">
                  -----
                </h3>
                <h3 class="font-weight-light mb-3">{{detail.partner_city}}</h3>
              </v-col>
              <v-col v-if="detail.business_type == 'COMPANY'">
                <h4 class="mb-2">Logo Uploaded</h4>
                <h3 class="font-weight-light mb-3">{{check(detail.partner_logo)}}</h3>
              </v-col>
              <v-col v-if="detail.business_type == 'INDIVIDUAL'">
                <h4 class="mb-2">Photo Uploaded</h4>
                <h3 class="font-weight-light mb-3">{{check(detail.partner_logo)}}</h3>
              </v-col>
              <v-col>
                <h4 class="mb-2">Mode</h4>
                <h3 class="font-weight-light mb-3">{{detail.mode}}</h3>
              </v-col>
              <v-col>
              </v-col>
            </v-row>
      
              <v-row v-if="dialog">
              <v-col v-if="personalinfo == true">
                <h2 class="font-weight-light mb-3">Personal Information</h2>
                <h4 class="mb-2">Address</h4>
                <h3 v-if="!detail.address.address" class="font-weight-light mb-3">-----</h3>
                <h3 class="font-weight-light mb-3">{{detail.address.address}}</h3>
      
                <h4 class="mb-2">Pincode</h4>
                <h3 v-if="!detail.pincode" class="font-weight-light mb-3">
                  -----
                </h3>
                <h3 class="font-weight-light mb-3">{{detail.pincode}}</h3>
      
                <h4 class="mb-2">Partner Login Link</h4>
                <h3 v-if="!detail.urlid" class="font-weight-light mb-3">-----</h3>
                <link class="font-weight-light mb-3"> {{envbaselink}}?partner={{detail.urlid}}</link>
      
              </v-col>
      
      
              <v-divider v-if="personalinfo == true" class="mr-4" :inset="inset" vertical></v-divider>
      
              <v-col v-if="partnerinfo == true">
                <h2 class="font-weight-light mb-3">Partner Information</h2>
                <h4 class="mb-2">Super Distributor</h4>
                <h3 class="font-weight-light mb-3">{{checkdis(detail.super_distributor)}}</h3>
      
                <h4 class="mb-2">Partner Type</h4>
                <h3 v-if="!detail.partner_type" class="font-weight-light mb-3">-----</h3>
                <h3 class="font-weight-light mb-3">{{partnerType(detail.partner_type)}}</h3>
      
                <h4 class="mb-2">Partner Code</h4>
                <h3 v-if="!detail.partner_code" class="font-weight-light mb-3">-----</h3>
                <h3 class="font-weight-light mb-3">{{detail.partner_code}}</h3>
      
                <h4 class="mb-2">ARN Number</h4>
                <h3 v-if="!detail.arn_number" class="font-weight-light mb-3">-----</h3>
                <h3 class="font-weight-light mb-3">{{detail.arn_number}}</h3>
      
                <a :href="link2" target="_blank" class="download" download><h4 class="mb-2">
                  ARN Certificate
                  <v-icon :color="coloricon2" class="mb-2" right>mdi-cloud-download</v-icon>
                </h4></a>
              </v-col>
      
              <v-divider v-if="partnerinfo == true" class="mr-4" :inset="inset" vertical></v-divider>
      
              <v-col v-if="profileinfo == true">
                <h2 class="font-weight-light mb-3">KYC Documents</h2>
                <h4 class="mb-2">PAN Number</h4>
                <h3 v-if="!detail.pan" class="font-weight-light mb-3">-----</h3>
                <h3 class="font-weight-light mb-3">{{detail.pan}}</h3>
      
                <h4 class="mb-2">Partner GST</h4>
                <h3 v-if="!detail.partner_gst" class="font-weight-light mb-3">
                  -----
                </h3>
                <h3 class="font-weight-light mb-3">{{detail.partner_gst}}</h3>
      
               <a :href="link" target="_blank" class="download" download ><h4 class="mb-2">
                  Aadhaar
                  <v-icon :color="coloricon"  class="mb-2" right>mdi-cloud-download</v-icon>
                </h4></a>
      
                <a :href="link1" target="_blank" class="download" download><h4 class="mb-2">
                  PAN Card
                  <v-icon :color="coloricon1" class="mb-2" right>mdi-cloud-download</v-icon>
                </h4></a>
              </v-col>
            </v-row>
      
          </v-card>
        </v-tab-item>
        <v-tab-item :key="2" value="sub"
        >
        <div v-if="!showsubpartner">
          <h3 class="mt-5">Sorry, You Do Not Have Permission To View This</h3>
        </div>
          <div v-if="showsubpartner"><v-card flat>
            <subpartnerList v-if="dialog" class="mt-5" />

          </v-card></div>
        </v-tab-item>
      </v-tabs-items>


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

      <v-snackbar v-model="snackbar" :color="color" top>
        {{ text }}
      </v-snackbar>

      </v-flex>
    </v-layout>
</template>

<script>
  import subpartnerList from '@/components/subpartnerList'
/* eslint eqeqeq: 0 */
export default {
  components: {
        subpartnerList,
    },
  
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
      itemsPerPage: 10,
      coloricon: null,
      coloricon1: null,
      coloricon2: null,

        search: '',
      selected: [],
      headers: [],
      err: null,
      err1: null,
      err2: null,
      link: null,
      link1: null,
      link2: null,
      datapresent: true,
      nodata: null,
      snackbar: false,
      text: '',
      color: '',
      datapresent: true,
      nodata: null,
      inset: false,
      showview: null,
      profileinfo: null,
      personalinfo: null,
      partnerinfo: null,
      dialog1: false,
      envbaselink: process.env.baselink,
      envlogo: process.env.logolink,
      tab: 'info',
      showsubpartner: null,
      showeditpartner: null
    }
  },
  mounted() {
    this.called()
  },
  methods: {
      async called() {
        this.showview = this.$store.state.sessionStorage.rbac.listOfPartnersViewDashboard
        this.profileinfo = this.$store.state.sessionStorage.rbac.partnersInformationKycDocuments
        this.personalinfo = this.$store.state.sessionStorage.rbac.partnersInformationPersonalInformation
        this.partnerinfo = this.$store.state.sessionStorage.rbac.partnersInformationPartnerInformation
        this.showsubpartner = this.$store.state.sessionStorage.rbac.partnersInformationSubPartner
        this.showeditpartner = this.$store.state.sessionStorage.rbac.partnersInformationEditPartner

        // this.showview = this.$store.state.sessionStorage.rbac[42].access
        // this.profileinfo = this.$store.state.sessionStorage.rbac[43].access
        // this.personalinfo = this.$store.state.sessionStorage.rbac[44].access
        // this.partnerinfo = this.$store.state.sessionStorage.rbac[45].access

        if (this.$store.state.sessionStorage.data.super_distributor == 'true') {
          this.headers = [
        { text: 'Name', value: 'name', class: 'size', sortable: false },
        { text: 'Type', value: 'business_type', class: 'size', sortable: false },
        { text: 'Partner Type', value: 'partner_type', class: 'size', sortable: false },
        { text: 'ARN Number', value: 'arn_number', class: 'size', sortable: false },
        { text: 'Super Distributor', value: 'super_distributor', class: 'size', sortable: false },
        { text: 'Subscriber Count', value: 'subscriber_count', class: 'size', sortable: false },
        { text: 'Mode', value: 'mode', class: 'size', sortable: false },
        { text: '', value: 'partner_code', class: 'size', sortable: false },
         { text: '', value: 'id', sortable: false },
      ]
        } else {
          this.headers = [
        { text: 'Name', value: 'name', class: 'size', sortable: false },
        { text: 'Type', value: 'business_type', class: 'size', sortable: false },
        { text: 'Partner Type', value: 'partner_type', class: 'size', sortable: false },
        { text: 'ARN Number', value: 'arn_number', class: 'size', sortable: false },
        { text: 'Super Distributor', value: 'super_distributor', class: 'size', sortable: false },
        { text: 'Super Distributor Name', value: 'super_distributor_name', class: 'size', sortable: false },
        { text: 'Mode', value: 'mode', class: 'size', sortable: false },
        { text: 'Partner Count', value: 'partners_count', class: 'size', sortable: false },
        { text: 'Subscriber Count', value: 'subscriber_count', class: 'size', sortable: false },
        { text: '', value: 'partner_code', class: 'size', sortable: false },
         { text: '', value: 'id', sortable: false },
      ]
        }
        try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        if ( this.$store.state.sessionStorage.userType == 'partner') {
          const result = await this.$axios.$get(
          '/admin/partner/get/' + this.$store.state.sessionStorage.partner_code
        )
        this.values = result
        this.isLoading = false
        if (result) {
          this.datapresent = false
        } 
        } else {
        const result = await this.$axios.$get(
          '/admin/partner/get/0'
        )
        this.values = result
        this.isLoading = false
        if (result) {
          this.datapresent = false
        } 
        }

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
        this.$store.commit('sessionStorage/checkifSub', val.partner_code)
        this.tab = 'info'
     this.dialog = true
     this.detail = val
     if (val.id_proof == null) {
       this.coloricon = 'grey'
       this.link = null
        } else {
        //   const download = await this.$axios.$get(
        //   '/admin/partner/download/' + this.values.id_proof
        // )
        this.coloricon = 'green'
          this.link = this.envlogo + '/admin/user/download/' + val.id_proof
        }
        if (val.address_proof == null) {
          this.coloricon1 = 'grey'
          this.link1 = null
        } else {
          // const download1 = await this.$axios.$get(
          // '/admin/partner/download/' + this.values.address_proof)
          this.coloricon1 = 'green'
          this.link1 = this.envlogo + '/admin/user/download/' + val.address_proof
        }
        if (val.arn_certificate == null) {
          this.coloricon2 = 'grey'
          this.link2 = null
        } else {
          // const download2 = await this.$axios.$get(
          // '/admin/partner/download/' + this.values.arn_certificate)
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
    superdisname(val) {
      if (val == null) {
        return '--'
      } else {
        return val
      }
    },
    partnercount(val) {
      if (val == null) {
        return '--'
      } else {
        return val
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
      if (value == 'ARN') {
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
    checkpartnerassist(val) {
      if(val == true) {
        return 'Yes'
      } else if (val == false) {
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
    showdashboard(val) {
      if (this.showview == false) {
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
        this.$store.commit('sessionStorage/setPartnerName', val.name)
      this.$store.commit('sessionStorage/setPartner', val.partner_code)
      // this.$router.push({path: '/mydashboard'})
      // window.open('/mydashboard')
      // window.open('/mypartnerdash/' + val.partner_code)
      this.dialog1 = true
      }
    },
    navigatePartner(val) {
      this.$store.commit('sessionStorage/setLink', 'dash') 
      if (val.subscriber_count == '0') {
        return false
      } else {
        if(this.$store.state.sessionStorage.userType == 'partner') {
          this.$store.commit('sessionStorage/setValueForCall', true)
          this.$store.commit('sessionStorage/setPartnerCode', val.partner_code)
          this.$router.push({ path: '/subscribers' })
        } else { 
      this.$store.commit('sessionStorage/setValueForCall', true)
      this.$store.commit('sessionStorage/setPartnerCode', val.partner_code)
      this.$router.push({ path: '/' })
        }
      }
    },
    editcalled(val) {
      console.log(val)
      this.$store.commit('sessionStorage/editPartner', val)
      this.$router.push({ path: '/editpartner' })
    }
  },
}
</script>

<style>
 
.size {
  font-size: 15px !important;
}
.icon-green {
    color: red;
}
.posbtn {
  position: sticky;
}
div.sticky {
  position: -webkit-sticky;
  position: sticky;
}
.negtoptab{
  margin-top: -20px;
}
</style>
