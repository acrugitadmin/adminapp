<template>
  <v-layout>
    <v-flex>
    <div v-if="logo">
      <v-row><v-col><h1 class="headline mt-5">Profile Information</h1></v-col>
      <v-col><div class="float-right "><h1 class="headline mt-5" v-if="values">{{values.partner_code}}</h1></div></v-col>
      </v-row>
      <v-col><v-img
        v-if="isprimary"
                      max-width="80"
                      :src="logo"
                    ></v-img></v-col>
      </div>
      <br />
      <br />
      <div v-if="!values">
        <h3 class="mt-5 font-weight-light">
          Loading...
        </h3>
      </div>

      <div v-if="isprimary"><v-row class="negtopmar" v-if="values">
        <v-col>
          <h4 class="mb-2">Name</h4>
          <h3 v-if="!values" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{ namecheck(values) }}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Type</h4>
          <h3 class="font-weight-light mb-3">{{capitalizeFirstLetter(values.business_type)}}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Phone Number</h4>
          <h3 v-if="!values.mobile" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{values.mobile}}</h3>
        </v-col>
        <v-col>
          <h4 class="mb-2">Email</h4>
          <h3 v-if="!values.email" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{values.email}}</h3>
        </v-col>
      </v-row>
      <v-row v-if="values">
        <v-col>
          <h4 class="mb-2">City</h4>
          <h3 v-if="!values.partner_city" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{values.partner_city}}</h3>
        </v-col>
        <div v-if="isprimary"><v-col v-if="values.business_type == 'COMPANY'">
          <v-file-input
            v-model="file"
            ref="file"
            id="file"
            accept=".png, .jpg"
            placeholder="Select Logo"
            label="Partner Logo"
            @change="fileupload()"
          ></v-file-input>
          <small class="space"> **Should be .png, .jpg less than 5MB</small>
        </v-col></div>
        <div v-if="isprimary"><v-col v-if="values.business_type == 'INDIVIDUAL'">
          <v-file-input
            v-model="file"
            ref="file"
            id="file"
            accept=".png, .jpg"
            placeholder="Select Logo"
            label="Partner Photo"
            @change="fileupload()"
          ></v-file-input>
          <small class="space"> **Should be .png, .jpg less than 5MB</small>
        </v-col></div>
        <v-col v-if="!isprimary"></v-col>
        <v-col>
        </v-col>
        <v-col>
        </v-col>
      </v-row>

      <v-row v-if="values">
        <v-col>
          <h2 class="font-weight-light mb-3">Personal Information</h2>
          <h4 class="mb-2">Address</h4>
          <h3 v-if="!values.address" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{userad}}</h3>

         <h4 class="mb-2">Pincode</h4>
          <h3 v-if="!values.pincode" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{values.pincode}}</h3>
        </v-col>

        <v-divider class="mr-4" :inset="inset" vertical></v-divider>

        <v-col>
          <h2 class="font-weight-light mb-3">Partner Information</h2>
          <h4 class="mb-2">Super Distributor</h4>
          <h3 v-if="!values.super_distributor" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{checkdis(values.super_distributor)}}</h3>

          <h4 class="mb-2">Partner Type</h4>
          <h3 v-if="!values.partner_type" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{checkarn(values.partner_type)}}</h3>

          <h4 class="mb-2">ARN Number</h4>
          <h3 v-if="!values.arn_number" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{values.arn_number}}</h3>

          <a :href="link2" target="_blank" class="download" download @click="callfile2()"><h4 class="mb-2">
            ARN Certificate
            <v-icon :color="coloricon2" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
        </v-col>

        <v-divider class="mr-4" :inset="inset" vertical></v-divider>

        <v-col>
          <h2 class="font-weight-light mb-3">KYC Documents</h2>
          <h4 class="mb-2">PAN Number</h4>
          <h3 v-if="!values.pan" class="font-weight-light mb-3">
            -----
          </h3>
          <h3 class="font-weight-light mb-3">{{values.pan}}</h3>

          <div v-if="isprimary"><h4 class="mb-2">GST Number</h4>
          <h3 v-if="!values.partner_gst" class="font-weight-light mb-3">-----</h3>
          <h3 class="font-weight-light mb-3">{{values.partner_gst}}</h3></div>

        <a :href="link" target="_blank" class="download" download @click="callfile()"><h4 class="mb-2">
            Aadhaar
            <v-icon :color="coloricon" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>

          <a :href="link1" target="_blank" class="download" download @click="callfile1()"><h4 class="mb-2">
            PAN Card
            <v-icon :color="coloricon1" class="mb-2" right>mdi-cloud-download</v-icon>
          </h4></a>
        </v-col>
      </v-row></div>









      <div v-if="!isprimary">
        <v-row class="negtopmar" v-if="values">
          <v-col>
            <h4 class="mb-2">Name</h4>
            <h3 v-if="!values" class="font-weight-light mb-3">-----</h3>
            <h3 class="font-weight-light mb-3">{{ namecheck(values) }}</h3>
          </v-col>  
          <v-col>
            <h4 class="mb-2">Type</h4>
            <h3 class="font-weight-light mb-3">{{capitalizeFirstLetter(values.business_type)}}</h3>
          </v-col>   
          <v-col>
            <h4 class="mb-2">Phone Number</h4>
            <h3 v-if="!values.mobile" class="font-weight-light mb-3">-----</h3>
            <h3 class="font-weight-light mb-3">{{values.mobile}}</h3>
          </v-col>
          <v-col>
            <h4 class="mb-2">Email</h4>
            <h3 v-if="!values.email" class="font-weight-light mb-3">-----</h3>
            <h3 class="font-weight-light mb-3">{{values.email}}</h3>
          </v-col>
        </v-row>
        <v-row v-if="values">
          <v-col>
            <h4 class="mb-2">Address</h4>
            <h3 v-if="!values.partner_city" class="font-weight-light mb-3">
              -----
            </h3>
            <h3 class="font-weight-light mb-3">{{userad}}</h3>
          </v-col>
          <v-col></v-col>
          <v-col>
          </v-col>
          <v-col>
          </v-col>
        </v-row>
      </div>

      <v-snackbar v-model="snackbar" :color="color" top>
        {{ text }}
      </v-snackbar>
    </v-flex>
  </v-layout>
</template>




<script>
/* eslint eqeqeq: 0 */
export default {
  async asyncData() {},
  data() {
    return {
      link: null,
      link1: null,
      link2: null,
      values: null,
      name: null,
      userad: null,
      file: null,
      formdata: new FormData(),
      snackbar: false,
      text: '',
      color: '',
      logo_id: null,
      logo: '',
      valid: false,
      err: null,
      err1: null,
      err2: null,
      coloricon: null,
      coloricon1: null,
      coloricon2: null,
      showview: null,
      profileinfo: null,
      personalinfo: null,
      partnerinfo: null,
      inset: false,
      envlogo: process.env.logolink,
      isprimary: true
    }
  },
  mounted() {
    this.check()
  },
  methods: {
    async check() { 
      if(this.$store.state.sessionStorage.data.is_primary_account == true){
        this.isprimary = true
      }else{
        this.isprimary = false
      }

      const rbacrole = this.testrbac
      this.showview = this.$store.state.sessionStorage.rbac.listOfPartnersViewDashboard
      this.profileinfo = this.$store.state.sessionStorage.rbac.partnersInformationKycDocuments
      this.personalinfo = this.$store.state.sessionStorage.rbac.partnersInformationPersonalInformation
      this.partnerinfo = this.$store.state.sessionStorage.rbac.partnersInformationPartnerInformation
      
      // this.showview = this.$store.state.sessionStorage.rbac[42].access
      //   this.profileinfo = this.$store.state.sessionStorage.rbac[43].access
      //   this.personalinfo = this.$store.state.sessionStorage.rbac[44].access
      //   this.partnerinfo = this.$store.state.sessionStorage.rbac[45].access

      this.valid = false  
      this.file = null
      this.formdata = new FormData()  
      this.$axios.setHeader('Content-Type', 'application/json')
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
          '/admin/partner/partnerprofile/' + this.$store.state.sessionStorage.partner_code + '/' + this.$store.state.sessionStorage.data.mobile
        )
        this.values = result.data[0]
        this.userad = result.data[0].address.address
        if (this.values.partner_logo == null) {
          this.logo = 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.clipartbest.com%2Fletter-p-design&psig=AOvVaw2WuaDASvXFI4Yb88cnO2zU&ust=1599669545638000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPCLrsv_2esCFQAAAAAdAAAAABAD'
        } else { 
        this.logo = this.envlogo + '/uploads/partnerlogo/' + this.values.partner_logo
        }

        if (this.values.id_proof == null) {
          this.coloricon = 'grey'
          // this.link = null
        } else {
          // const download = await this.$axios.$get(
          // '/admin/user/download/' + this.values.id_proof
        //)
        this.coloricon = 'green'
          this.link = this.envlogo + this.values.id_proof
        }
        if (this.values.address_proof == null) {
          this.coloricon1 = 'grey'
        } else {
          // const download1 = await this.$axios.$get(
          // '/admin/partner/download/' + this.values.address_proof)
          this.coloricon1 = 'green'
          this.link1 = this.envlogo + this.values.address_proof
        }
        if (this.values.arn_certificate == null) {
          this.coloricon2 = 'grey'
        } else {
          // const download2 = await this.$axios.$get(
          // '/admin/partner/download/' + this.values.arn_certificate)
          this.coloricon2 = 'green'
          this.link2 = this.envlogo + this.values.arn_certificate
        }

      } catch (e) {
        console.log(e)
      }
    },
    callfile() {
      if (this.link == null) {
        this.link = null
      } else {
      this.link = this.envlogo + '/admin/user/download/' + this.values.id_proof
      }
    },
    callfile1() {
      if (this.link1 == null) {
        this.link1 = null
      } else {
        this.link1 = this.envlogo + '/admin/user/download/' + this.values.address_proof
      }
    },
    callfile2() {
      if (this.link2 == null) {
        this.link2 = null
      } else {
        this.link2 = this.envlogo + '/admin/user/download/' + this.values.arn_certificate
      }
    },
    async fileupload() {
      if (this.file == null) {
        this.formdata = new FormData()
        
      } else {
        if (this.file.size >= 6103947) {
        this.snackbar = true
        this.color = 'red'
        this.text = 'Image should be smaller than 5MB'
        this.file = null
        this.formdata = new FormData()
        this.logo_id = null
        this.check()
      } else { 
        this.formdata.append('logo', this.file)
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
          this.$axios.setHeader('Content-Type', 'multipart/form-data')
    try {
      const result = await this.$axios.$post(
          '/admin/partner/imageupload',
          this.formdata
        )
        this.logo_id = result.logoid
        this.valid = true
        this.updateLogo()
    } catch(error){
        console.log(error)
        this.snackbar = true
        this.color = 'red'
        this.text = error
    }
      }
      }
    },
    async updateLogo() {
      if (this.file == null) {
        this.snackbar = true
        this.color = 'red'
        this.text = 'Please Select An Image To Upload'
      } else {
        this.$axios.setHeader('Content-Type', 'application/json')
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
      try {
        // this.$axios.setHeader(
        //   'Authorization',
        //   'bearer ' + this.$store.state.sessionStorage.token
        // )
        const result = await this.$axios.$post(
          '/admin/partner/partnerlogo/update', {
            partner_code: this.$store.state.sessionStorage.partner_code,
            logo: this.logo_id
          }
        )
        this.snackbar = true
        this.color = 'success'
        this.text = result.message
        this.check()
      } catch (e) {
        this.snackbar = true
        this.color = 'red'
        this.text = e.response.data.message
        console.log(e)
      }
      }

    },
    onButtonClick() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
    },
    capitalizeFirstLetter(string) {
      if (string != null) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
      } else {
        return '-----'
      }
    },
    checkarn(val) {
      if (val == 'A') {
        return 'ARN'
      } else {
        return 'Non-ARN'
      }
    },
    namecheck (val) {
      if (val.company_name == null) {
        return val.firstname + ' ' + val.lastname
      } else {
        return val.company_name
      }
    },
    checkdis(val) {
      if(val == 'true') {
        return 'Yes'
      } else {
        return 'No'
      }
    },
    downloadItem() {
      window.location.href = this.envlogo + '/uploads/partnerlogo/' + this.values.id_proof
    }
    
  },
}
</script>

<style>
.v-icon--left {
  margin-right: 8px;
}
.choose_file {
    position: relative;
    display: inline-block;   
    margin-top: 2px;
    background: white
}
.choose_file input[type="file"]{
    -webkit-appearance:none; 
    position:absolute;
    top:0;
    left:0;
    opacity:0;
    width: 100%;
    height: 100%;
}
.pos {
  margin-right: 140px;
}
.space {
  margin-top: -30px !important;
}
.downloads {
  cursor: pointer;
}
.red {
  color: red;
}
.negtopmar{
  margin-top: -40px;
}
</style>
