<template>
  <v-layout>
    <v-flex>
      <h1 class="headline">Profile Information</h1>
      <br />
      <br />
      <h4 v-if="!values" class="mt-5 font-weight-light">{{ error }}</h4>

      <div v-if="!values">
        <h3 class="mt-5 font-weight-light">Loading...</h3>
      </div>

      <v-row class="negativemargintop" v-if="values">
        <v-col>
          <h4 class="mb-2 black--text">First Name</h4>
          <h3 v-if="!values.firstname" class="font-weight-light mb-3">---</h3>
          <h3 class="font-weight-light black--text mb-3">{{ values.firstname }}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2 black--text">Last Name</h4>
          <h3 v-if="!values.lastname" class="font-weight-light mb-3">---</h3>
          <h3 class="font-weight-light black--text mb-3">{{ values.lastname }}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2 black--text">Mobile No.</h4>
          <h3 v-if="!values.mobile" class="font-weight-light mb-3">---</h3>
          <h3 class="font-weight-light black--text mb-3">{{ values.mobile }}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2 black--text">Email</h4>
          <h3 class="font-weight-light black--text mb-3">{{ emailcheck(values.email) }}</h3>
        </v-col>
      </v-row>
      <v-row v-if="values">
        <v-col>
          <h4 class="mb-2 black--text">City</h4>
          <h3 v-if="!values.address.city_name" class="font-weight-light mb-3">---</h3>
          <h3 class="font-weight-light black--text mb-3">{{ values.address.city_name }}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2 black--text">Country</h4>
          <h3 v-if="!values.kycDetails.country" class="font-weight-light mb-3">
            ---
          </h3>
          <h3 class="font-weight-light black--text mb-3">{{ countryval(values.kycDetails.country) }}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2" style="cursor: pointer;" @click.stop="dialog = true">
            <u>Device Info</u>
          </h4>
        </v-col>
        <v-col>
        <v-btn
        v-if="showrekyc == true"
          class="black white--text"
          small
          @click="allowrekyc()"
          >Re-Initiate KYC</v-btn
        >
        </v-col>
      </v-row>

      <v-row v-if="values">
        <v-col v-if="showpersonal == true">
          <h2 class="font-weight-light mb-3">Personal Information</h2>
          <h4 class="mb-2 black--text">Father's Name</h4>
          <h3
            v-if="!values.kycDetails.fathers_name"
            class="font-weight-light mb-3"
          >
            ---
          </h3>
          <h3 class="font-weight-light black--text mb-3">
            {{ values.kycDetails.fathers_name }}
          </h3>

          <h4 class="mb-2 black--text">Mother's Name</h4>
          <h3
            v-if="!values.kycDetails.mothers_name"
            class="font-weight-light mb-3"
          >
            ---
          </h3>
          <h3 class="font-weight-light black--text mb-3">
            {{ values.kycDetails.mothers_name }}
          </h3>

          <h4 class="mb-2 black--text">Gender</h4>
          <h3 class="font-weight-light black--text mb-3">
            {{ capitalizeFirstLetter(values.gender) }}
          </h3>

          <h4 class="mb-2 black--text">Date Of Birth</h4>

          <h3 class="font-weight-light black--text mb-3">{{ convertDate(values.dob) }}</h3>

          <h4 class="mb-2 black--text">City Of Birth</h4>
          
          <h3 class="font-weight-light black--text mb-3">
            {{ capitalizeFirstLetter(values.address.city_name) }}
          </h3>

          <h4 class="mb-2 black--text">Pincode</h4>
          
          <h3 class="font-weight-light black--text mb-3">
            {{checkvalifnull(values.address.pincode)}}
          </h3>

          <h4 class="mb-2 black--text">Marital Status</h4>
          
          <h3 class="font-weight-light black--text mb-3">
            {{ capitalizeFirstLetter(values.kycDetails.marital_status) }}
          </h3>

          <h4 v-if="values.kycDetails.marital_status == 'MARRIED'" class="mb-2 black--text">Spouse Name</h4>
          
          <h3 v-if="values.kycDetails.marital_status == 'MARRIED'" class="font-weight-light black--text mb-3">
            {{ capitalizeFirstLetter(values.kycDetails.spouse_name) }}
          </h3>

          <h4 class="mb-2 black--text">Education</h4>
          
          <h3 class="font-weight-light black--text mb-3">
            {{ capitalizeFirstLetter(values.education) }}
          </h3>

          <h4 class="mb-2 black--text">Occupation</h4>
          
          <h3 class="font-weight-light black--text mb-3">
            {{ capitalizeFirstLetter(values.occupation_type) }}
          </h3>

          <h4 class="mb-2 black--text">Source Of Income</h4>
          
          <h3 class="font-weight-light black--text mb-3">
            {{checkvalifnull(values.kycDetails.wealth_source)}}
          </h3>

          <h4 class="mb-2 black--text">Gross Income</h4>
          
          <h3 class="font-weight-light black--text mb-3">
            {{checkvalifnull(values.kycDetails.gross_income)}}
          </h3>

          <h4 class="mb-2 black--text">Nationality</h4>
          
          <h3 class="font-weight-light black--text mb-3">
            {{checknationality(values.kycDetails.country)}}
          </h3>

          <h4 class="mb-2 black--text">Address</h4>
          <h3 class="font-weight-light black--text mb-3">
            {{ capitalizeFirstLetter(values.address.line1) }} {{ values.address.line2 }} {{ values.address.line3 }}
          </h3>
        </v-col>

        <v-divider v-if="showpersonal == true" class="mr-4" :inset="inset" vertical></v-divider>

        <v-col v-if="showkycdocs == true">
          <h2 class="font-weight-light mb-3">KYC Documents</h2>
          <h4 class="mb-2 black--text">PAN No.</h4>
          <h3 v-if="!values.pan" class="font-weight-light mb-3">---</h3>
          <h3 class="font-weight-light black--text mb-3">{{ values.pan }}</h3>

          <h4 class="mb-2 black--text">PAN Verified</h4>
          <h3 v-if="!yesPan" class="font-weight-light mb-3">---</h3>
          <h3 class="font-weight-light black--text mb-3">{{ yesPan }}</h3>

          <h4 class="mb-2 black--text">
            Aadhaar No.
          </h4>
          <h3
            v-if="!values.aadhar"
            class="font-weight-light mb-3"
          >
            ---
          </h3>
          <h3 class="font-weight-light mb-3">
            {{ values.aadhar }}
          </h3>

          <h4 class="mb-2 black--text">Proof Type</h4>
          
          <h3 class="font-weight-light black--text mb-3">
            {{ checkvalifnullrep(values.kycDetails.proof_type) }}
          </h3>

          <h4 class="mb-2 black--text">Proof Number</h4>
          
          <h3 class="font-weight-light black--text mb-3">
            {{ checkvalifnull(values.kycDetails.proof_number) }}
          </h3>

          <h4 class="mb-2 black--text">Proof Issue Date</h4>
          
          <h3 class="font-weight-light black--text mb-3">
            {{ convertDate(values.kycDetails.proof_issue_date) }}
          </h3>

          <h4 v-if="values.kycDetails.proof_type != 'VOTER_ID'" class="mb-2 black--text">Proof Expiry Date</h4>
          
          <h3 v-if="values.kycDetails.proof_type != 'VOTER_ID'" class="font-weight-light black--text mb-3">
            {{ convertDate(values.kycDetails.proof_expiry_date) }}
          </h3>

          <a :href="banklink" target="_blank" class="download" download ><h4 class="mb-2">
            Bank Account Proof
            <v-icon :color="coloriconbank" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
          <h3 v-if="values.fileData.bank_acc_proof == ''" class="font-weight-light mb-3 negmartop">No</h3>
          <h3 v-if="values.fileData.bank_acc_proof != ''" class="font-weight-light black--text mb-3 negmartop">Yes</h3>

          <a :href="photolink" target="_blank" class="download" download ><h4 class="mb-2 negmartop">
            Photo
            <v-icon :color="coloriconphoto" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
          <h3 v-if="values.fileData.photo == ''" class="font-weight-light mb-3 negmartop">No</h3>
          <h3 v-if="values.fileData.photo != ''" class="font-weight-light black--text mb-3 negmartop">Yes</h3>

          <a :href="backlink" target="_blank" class="download" download ><h4 class="mb-2 negmartop">
            Address Proof (Back Page)
            <v-icon :color="coloriconback" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
          <h3 v-if="values.fileData.poi_back == ''" class="font-weight-light mb-3 negmartop">No</h3>
          <h3 v-if="values.fileData.poi_back != ''" class="font-weight-light black--text mb-3 negmartop">Yes</h3>

          <a :href="frontlink" target="_blank" class="download" download ><h4 class="mb-2 negmartop">
            Address Proof (Front Page)
            <v-icon :color="coloriconfront" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
          <h3 v-if="values.fileData.poi_front == ''" class="font-weight-light mb-3 negmartop">No</h3>
          <h3 v-if="values.fileData.poi_front != ''" class="font-weight-light black--text mb-3 negmartop">Yes</h3>

          <a :href="panlink" target="_blank" class="download" download><h4 class="mb-2 negmartop">
            PAN
            <v-icon :color="coloriconpan" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
          <h3 v-if="values.fileData.poi_pan == ''" class="font-weight-light mb-3 negmartop">No</h3>
          <h3 v-if="values.fileData.poi_pan != ''" class="font-weight-light black--text mb-3 negmartop">Yes</h3>

          <a :href="selfsignlink" target="_blank" class="download" download ><h4 class="mb-2 negmartop">
            Self Signed Signature
            <v-icon :color="coloriconselfsign" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
          <h3 v-if="values.fileData.self_sign == ''" class="font-weight-light mb-3 negmartop">No</h3>
          <h3 v-if="values.fileData.self_sign != ''" class="font-weight-light black--text mb-3 negmartop">Yes</h3>

          <!-- <a :href="selfvideolink" target="_blank" class="download" download @click="callfileselfvideo(values)"><h4 class="mb-2">
            Selfie Video Proof
            <v-icon :color="coloriconselfvideo" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
          <h3 v-if="values.fileData.selfie_video == ''" class="font-weight-light mb-3">No</h3>
          <h3 v-if="values.fileData.selfie_video != ''" class="font-weight-light black--text mb-3">Yes</h3> -->

          <h4 class="mb-2 black--text">KYC Approved</h4>
          <h3 v-if="yesAdhaar == null" class="font-weight-light mb-3">---</h3>
          <h3 class="font-weight-light black--text mb-3">{{ yesAdhaar }}</h3>
          <h3 v-if="values.kyc_reason" class="mb-3">Rejected Reason:</h3>
          <div v-if="values.kyc_reason"><div v-for="reason in values.kyc_reason.details_verbose"><h3 class="red--text font-weight-light mb-3">{{reason.reason}}</h3></div></div>

          <!-- <h4 class="mb-2">KYC Expiry</h4>
          <h3 class="font-weight-light black--text mb-3">
            {{ convertDate(values.kycDetails.proof_expiry_date) }}
          </h3> -->

          <h4 class="mb-2 black--text">Nominee Data</h4>
          <h3 v-if="!nomineepresent">---</h3>
          <div v-if="nomineelength == 3 || nomineelength == 2 || nomineelength == 1"><h4 class=" black--text mb-3">
            Nominee 1
          </h4>
          <h3 class="font-weight-light mb-3 black--text">Name: {{values.nomineeData[0].nominee_name}}</h3>
          <h3 class="font-weight-light mb-3 black--text">Date Of Birth: {{convertDate(values.nomineeData[0].nominee_dob)}}</h3>
          <h3 class="font-weight-light mb-3 black--text">Relationship: {{values.nomineeData[0].nominee_relationship}}</h3>
          <h3 class="font-weight-light mb-3 black--text">Allocation %: {{values.nomineeData[0].percentage}}</h3>
          <div v-if="values.nomineeData[0].minor_nominee">
            <h3 class="font-weight-light mb-3 black--text">Guardian Name: {{values.nomineeData[0].guardian_name}}</h3>
            <h3 class="font-weight-light mb-3 black--text">Guardian Relationship: {{values.nomineeData[0].guardian_relationship}}</h3>
          </div></div>

          <div v-if="nomineelength == 3 || nomineelength == 2"><h4 class=" black--text mb-3">
            Nominee 2
          </h4>
          <h3 class="font-weight-light mb-3 black--text">Name: {{values.nomineeData[1].nominee_name}}</h3>
          <h3 class="font-weight-light mb-3 black--text">Date Of Birth: {{convertDate(values.nomineeData[1].nominee_dob)}}</h3>
          <h3 class="font-weight-light mb-3 black--text">Relationship: {{values.nomineeData[1].nominee_relationship}}</h3>
          <h3 class="font-weight-light mb-3 black--text">Allocation %: {{values.nomineeData[1].percentage}}</h3>
          <div v-if="values.nomineeData[1].minor_nominee">
            <h3 class="font-weight-light mb-3 black--text">Guardian Name: {{values.nomineeData[1].guardian_name}}</h3>
            <h3 class="font-weight-light mb-3 black--text">Guardian Relationship: {{values.nomineeData[1].guardian_relationship}}</h3>
          </div></div>

          <div v-if="nomineelength == 3"><h4 class=" black--text mb-3">
            Nominee 3
          </h4>
          <h3 class="font-weight-light mb-3 black--text">Name: {{values.nomineeData[2].nominee_name}}</h3>
          <h3 class="font-weight-light mb-3 black--text">Date Of Birth: {{convertDate(values.nomineeData[2].nominee_dob)}}</h3>
          <h3 class="font-weight-light mb-3 black--text">Relationship: {{values.nomineeData[2].nominee_relationship}}</h3>
          <h3 class="font-weight-light mb-3 black--text">Allocation %: {{values.nomineeData[2].percentage}}</h3>
          <div v-if="values.nomineeData[2].minor_nominee">
            <h3 class="font-weight-light mb-3 black--text">Guardian Name: {{values.nomineeData[2].guardian_name}}</h3>
            <h3 class="font-weight-light mb-3 black--text">Guardian Relationship: {{values.nomineeData[2].guardian_relationship}}</h3>
          </div></div>


          
         
        </v-col>

        <v-divider v-if="showkycdocs == true" class="mr-4" :inset="inset" vertical></v-divider>

        <v-col v-if="showbankdetails == true">
          <h2 class="font-weight-light mb-3">Bank Account Information</h2>
          <h4 class="mb-2 black--text">Account Holder Name</h4>
          <h3
            v-if="!values.accountDetails.accholders_name"
            class="font-weight-light mb-3"
          >
            ---
          </h3>
          <h3 class="font-weight-light black--text mb-3">
            {{ values.accountDetails.accholders_name }}
          </h3>

          <h4 class="mb-2 black--text">Account Number</h4>
          <h3
            v-if="!values.accountDetails.acc_number"
            class="font-weight-light mb-3"
          >
            ---
          </h3>
          <h3 class="font-weight-light black--text mb-3">
            {{ values.accountDetails.acc_number }}
          </h3>

          <h4 class="mb-2 black--text">Account Type</h4>
          <h3 class="font-weight-light black--text mb-3">
            {{ capitalizeFirstLetter(values.accountDetails.acc_type) }}
          </h3>

          <h4 class="mb-2 black--text">Bank Name</h4>
          <h3 class="font-weight-light black--text mb-3">
            {{ capitalizeFirstLetter(values.accountDetails.bank_name) }}
          </h3>

          <h4 class="mb-2 black--text">Branch</h4>
          <h3 class="font-weight-light black--text mb-3">
            {{ capitalizeFirstLetter(values.accountDetails.branch_name) }}
          </h3>

          <h4 class="mb-2 black--text">IFSC</h4>
          <h3
            v-if="!values.accountDetails.ifsc_code"
            class="font-weight-light mb-3"
          >
            ---
          </h3>
          <h3 class="font-weight-light black--text mb-3">
            {{ values.accountDetails.ifsc_code }}
          </h3>

          <h4 class="mb-2 black--text">UPI</h4>
          <h3
            v-if="!values.upi"
            class="font-weight-light mb-3"
          >
            ---
          </h3>
          <h3 class="font-weight-light black--text mb-3">
            {{ values.upi }}
          </h3>
        </v-col>
      </v-row>

      <v-layout row justify-center>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Device Info</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <div v-if="!device">
                      <h3 class="mt-5 font-weight-light">
                        No Devices Available
                      </h3>
                    </div>
                    <v-card v-if="device">
                      <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="device"
                        :search="search"
                        class="elevation-1"
                        :hide-default-footer="true"
                      ></v-data-table>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="black white--text" text @click="dialog = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>

      <v-layout row justify-center>
        <v-dialog v-model="dialog2" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">KYC Documents</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <div>
                      <h3 class="mt-5 font-weight-light">
                        No Documents Available
                      </h3>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="black white--text" text @click="dialog2 = false"
                >Close</v-btn
              >
            </v-card-actions>
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
/* eslint eqeqeq: 0 */
import moment from 'moment'

export default {
  async asyncData() {},
  data() {
    return {
      values: null,
      showrekyc: null,

      tab: null,
      inset: false,
      tab1: null,
      dialog: false,
      dialog2: false,
      dialog3: false,
      yesAdhaar: null,
      yesPan: null,
      yesId: null,
      yesRiskP: null,
      dateob: null,
      orders: null,
      holdings: null,
      fundId: null,
      fundName: null,
      fundIsin: null,
      error: null,
      vid:
        'https://image.freepik.com/free-photo/white-blur-abstract-background_36051-246.jpg',
      holdingsTotal: null,
      nomineeCheck: false,
      nom1: false,
      nom2: false,
      nome3: false,
      vidEmpty: null,
      search: '',
      selected: [],
      headers: [
        { text: 'Name', value: 'deviceModel_Name' },
        { text: 'Version', value: 'deviceAndroidVersion' },
      ],
      device: null,
      snackbar: false,
      text: '',
      color: '',
      rekycval: null,
      userType: null,
      showpersonal: null,
      showkycdocs: null,
      showbankdetails: null,
      showrekyc: null,
      coloriconbank: null,
      banklink: null,
      coloriconphoto: null,
      photolink: null,
      coloriconback: null,
      backlink: null,
      coloriconfront: null,
      frontlink: null,
      coloriconpan: null,
      panlink: null,
      coloriconselfsign: null,
      selfsignlink: null,
      coloriconselfvideo: null,
      selfvideolink: null,
      envbase: process.env.baseurlenv,
      nomineepresent: null,
      nomineelength: null,
      envlogo: process.env.logolink
    }
  },
  mounted() {
    this.check()
  },
  methods: {
    async check() {
      this.showpersonal = this.$store.state.sessionStorage.rbac.subscriberProfileInfoPersonInformation
      this.showkycdocs = this.$store.state.sessionStorage.rbac.subscriberProfileInfoKycDocument
      this.showbankdetails = this.$store.state.sessionStorage.rbac.subscriberProfileInfoBankAccountInfo
      this.showrekyc = this.$store.state.sessionStorage.rbac.subscriberProfileInfoReinitiateKyc


      // this.showpersonal = this.$store.state.sessionStorage.rbac[10].access
      // this.showkycdocs = this.$store.state.sessionStorage.rbac[11].access
      // this.showbankdetails = this.$store.state.sessionStorage.rbac[12].access
      this.userType = this.$store.state.sessionStorage.userType
      // this.showrekyc = this.$store.state.sessionStorage.rbac[28].access
      // const val = this.$router.currentRoute.query.vals
      // this.$store.commit('sessionStorage/setItems', val)
      try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$get(
          '/admin/users/getUserDetails/' + this.$store.state.sessionStorage.val
        )
        this.values = result
        this.device = this.values.device_info
        if (this.values.kyc_verified == true) {
          this.yesAdhaar = 'Yes'
          this.rekyc = true
        } else {
          this.yesAdhaar = 'No'
          this.rekyc = false
        }
        if (this.values.pan_verified == true) {
          this.yesPan = 'Yes'
        } else {
          this.yesPan = 'No'
        }
        if (this.values.kycDetails.identity_proof == 'true') {
          this.yesId = 'Yes'
        } else {
          this.yesId = 'No'
        }
        if(this.values.fileData.bank_acc_proof == null || this.values.fileData.bank_acc_proof == '') {
          this.coloriconbank = 'grey'
          this.banklink = null
        }else{
          this.coloriconbank = 'green'
          this.banklink = this.envbase + '/' + 'customer/auth/file/' + this.values.mobile + '/' + this.values.address.user_id + '/' + 'BANK_ACC_PROOF' + '/' + this.values.fileData.bank_acc_proof
        }
        if(this.values.fileData.photo == null || this.values.fileData.photo == '') {
          this.coloriconphoto = 'grey'
          this.photolink = null
        }else{
          this.coloriconphoto = 'green'
          this.photolink = this.envbase + '/' + 'customer/auth/file/' + this.values.mobile + '/' + this.values.address.user_id + '/' + 'PHOTO' + '/' + this.values.fileData.photo
        }
        if(this.values.fileData.poi_back == null || this.values.fileData.poi_back == '') {
          this.coloriconback = 'grey'
          this.backlink = null
        }else{
          this.coloriconback = 'green'
          this.backlink = this.envbase + '/' + 'customer/auth/file/' + this.values.mobile + '/' + this.values.address.user_id + '/' + 'POI_BACK' + '/' + this.values.fileData.poi_back
        }
        if(this.values.fileData.poi_front == null || this.values.fileData.poi_front == '') {
          this.coloriconfront = 'grey'
          this.frontlink = null
        }else{
          this.coloriconfront = 'green'
          this.frontlink = this.envbase + '/' + 'customer/auth/file/' + this.values.mobile + '/' + this.values.address.user_id + '/' + 'POI_FRONT' + '/' + this.values.fileData.poi_front
        }
        if(this.values.fileData.poi_pan == null || this.values.fileData.poi_pan == '') {
          this.coloriconpan = 'grey'
          this.panlink = null
        }else{
          this.coloriconpan = 'green'
          this.panlink = this.envbase + '/' + 'customer/auth/file/' + this.values.mobile + '/' + this.values.address.user_id + '/' + 'POI_PAN' + '/' + this.values.fileData.poi_pan
        }
        if(this.values.fileData.self_sign == null || this.values.fileData.self_sign == '') {
          this.coloriconselfsign = 'grey'
          this.selfsignlink = null
        }else{
          this.coloriconselfsign = 'green'
          this.selfsignlink = this.envbase + '/' + 'customer/auth/file/' + this.values.mobile + '/' + this.values.address.user_id + '/' + 'SELF_SIGN' + '/' + this.values.fileData.self_sign
        }
        if(this.values.fileData.selfie_video == null || this.values.fileData.selfie_video == '') {
          this.coloriconselfvideo = 'grey'
          this.selfvideolink = null
        }else{
          this.coloriconselfvideo = 'green'
          this.selfvideolink = this.envbase + '/' + 'customer/auth/file/' + this.values.mobile + '/' + this.values.address.user_id + '/' + 'SELFIE_VIDEO' + '/' + this.values.fileData.selfie_video
        }
        if(this.values.nomineeData.length == 0) {
          this.nomineepresent = false
        }else {
          this.nomineepresent = true
          this.nomineelength = this.values.nomineeData.length
        }
      } catch (e) {
        console.log(e)
      }
    },
    open(value) {
      this.dialog3 = true
      this.fundName = value.name
      this.fundId = value.id
      this.fundIsin = value.isin
    },
    val(value) {
      if (value == null) {
        return '---'
      } else {
        return value
      }
    },
    vidioView(url) {
      if (url != '') {
        window.location = url
      } else {
        this.vidEmpty = true
      }
    },
    convertDate(value) {
      if (value == null) {
        return '---'
      } else { 
      function pad(s) {
        return s < 10 ? '0' + s : s
      }
      const d = new Date(value)
      if (value == '') {
        return '---'
      } else {
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
          '-'
        )
        // var str = value
        // var res = str.replace("T", " ").replace("Z","").replace(" ", "T");

        // var n = res.toLocaleString()
        // return moment(n).format('DD-MM-YYYY');
      }
      }
    },
    capitalizeFirstLetter(string) {
      if (string == null) {
        return '---'
      } else if (string == ''){
        return '---'
      } else {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
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
    async allowrekyc() {
      try {
        const result = await this.$axios.$post('/customer/workflow/rekyc' , {
          mobile: this.$store.state.sessionStorage.mobile
        })
        this.snackbar = true
        this.color = 'green'
        this.text = 'Re-Initiated KYC Successfully'
      } catch(error) {
        this.snackbar = true
        this.color = 'red'
        this.text = error.response.data.message
      }

    },

    getyesno(val) {
      if(val == true) {
        return 'Yes'
      }else{
        return 'No'
      }
    },
    async callfilebank(val) {
      if (val == null) {
        this.banklink = null
        } else {
          this.banklink = this.envbase + '/' + 'customer/auth/file/' + val.mobile + '/' + val.address.user_id + '/' + 'BANK_ACC_PROOF' + '/' + val.fileData.bank_acc_proof
        //   try{
        //     this.$axios.setHeader(
        //   'Authorization',
        //   'bearer ' + this.$store.state.sessionStorage.token
        // )
        // const result = await this.$axios.$get(
        //   '/customer/workflow/file/' + val.mobile + '/' + val.address.user_id + '/' + 'BANK_ACC_PROOF' + '/' + val.fileData.bank_acc_proof
        // )
        // this.banklink = result
        // console.log('link', this.backlink)
        //   }catch(error){

        //   }
        }
    },

    async callfilephoto(val) {
      if (val == null) {
        } else {
          this.photolink = this.envbase + '/' + 'customer/auth/file/' + val.mobile + '/' + val.address.user_id + '/' + 'PHOTO' + '/' + val.fileData.photo
      
        }
    },

    async callfileback(val) {
      if (val == null) {
        } else {
          this.backlink = this.envbase + '/' + 'customer/auth/file/' + val.mobile + '/' + val.address.user_id + '/' + 'POI_BACK' + '/' + val.fileData.poi_back
      
        }
    },

    async callfilefront(val) {
      if (val == null) {
        } else {
          this.frontlink = this.envbase + '/' + 'customer/auth/file/' + val.mobile + '/' + val.address.user_id + '/' + 'POI_FRONT' + '/' + val.fileData.poi_front
      
        }
    },

    async callfilepan(val) {
      if (val == null) {
        } else {
          this.panlink = this.envbase + '/' + 'customer/auth/file/' + val.mobile + '/' + val.address.user_id + '/' + 'POI_PAN' + '/' + val.fileData.poi_pan
      
        }
    },

    async callfileself(val) {
      if (val == null) {
        } else {
          this.selfsignlink = this.envbase + '/' + 'customer/auth/file/' + val.mobile + '/' + val.address.user_id + '/' + 'SELF_SIGN' + '/' + val.fileData.self_sign
      
        }
    },

    async callfileselfvideo(val) {
      if (val == null) {
        } else {
          this.selfvideolink = this.envbase + '/' + 'customer/auth/file/' + val.mobile + '/' + val.address.user_id + '/' + 'SELFIE_VIDEO' + '/' + val.fileData.selfie_video
      
        }
    },
    countryval(val) {
      if(val == 'IN') {
        return 'India'
      }else if(val == 'in'){
        return 'India'
      }else{
        return val
      }
    },
    checkvalifnull(val) {
      if(val == null) {
        return '---'
      }else if(val == ""){
        return '---'
      }else{
        return val
      }
    },
    checknationality(val){
      if(val == 'in') {
        return 'India'
      }else if(val == 'IN'){
        return 'India'
      }else{
        return '---'
      }
    },
    checkvalifnullrep(val) {
      if(val == null) {
        return '---'
      }else if(val == "") {
        return '---'
        }else{
        return val.replace("_", " ")
      }
    }

    
  },
}
</script>

<style>
  .negtopmargin{
    margin-top: -18px;
  }
  .negmartop{
    margin-top: -10px;
  }
  .negativemargintop{
    margin-top: -30px;
  }
</style>
