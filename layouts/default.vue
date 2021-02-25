<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" width="200" fixed color="#f5f5dc" app>
      <v-list nav class="py-0" dense>
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar tile>
            <img src="/profile.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title style="font-size: 12px;">
              {{
              namecheck()
              }}
            </v-list-item-title>
            <v-list-item-subtitle style="font-size: 12px;">
              {{
              email
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="mydash == false" router exact to="/dashboard">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="mydash == true" router exact to="/dashboard">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-apps</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">My Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="superdistributorpannel == true && superDis == 'true'" router exact to="/superdistributor">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-view-grid</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Partner Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item v-if="subscribers == true" router exact to="/">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-account-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Manage Subscribers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="funds == true" router exact to="/funds">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-arrange-bring-forward</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Funds Enabled</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item v-if="sms == true" router exact to="/sms">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-message-reply</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">SMS Reader</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item v-if="showdevicemenu == true" router exact to="/device">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-cellphone-iphone</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Device Summary</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="addpartner == true" router exact to="/partner">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Add Partner</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="listpartners == true" router exact to="/partnerList">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-format-list-bulleted</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">List Of Partners</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="usermanagement == true" router exact to="/manageroles">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-shape-rectangle-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Manage Roles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="showadduser" router exact to="/adduser">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-account-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Add User</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="showlistofusers" router exact to="/userlist">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-format-list-bulleted-type</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">List Of Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item v-if="role == 'superadmin'" router exact to="/subscriptionexp">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-playlist-remove</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Subscription Expired</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <div v-if="role != 'partner'"><v-list-item v-if="showchangepassword" router exact to="/changepassword">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-key-minus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Change Password</v-list-item-title>
          </v-list-item-content>
        </v-list-item></div>
        <v-list-item v-if="single == true" router exact to="/singleInvite">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Single Invite</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="bulk == true" router exact to="/bulk">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-account-multiple-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Bulk Invite</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="mysubscribers == true" router exact to="/subscribers">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-format-indent-increase</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">My Subscribers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="profile == true" router exact to="/myProfile">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">My Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div v-if="isprimary == true"><v-list-item v-if="showmanagesubpartner" router exact to="/subpartnerlist">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-account-multiple-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Sub-Partners</v-list-item-title>
          </v-list-item-content>
        </v-list-item></div>
        <v-list-item v-if="support == true" router exact to="/support">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-shape-rectangle-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Support</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item router exact to="/logout">
          <v-list-item-action style="margin-right: 10px;">
            <v-icon color="#92D050">mdi-arrow-up-bold-box-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="font-size: 14px;">Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app color="white black--text" style="height: 48px;" flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-img
      contain
        max-width="120"
        style="height: 40px;"
        class="mr-2"
        :src="logourl"
      ></v-img>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <v-spacer />
      <v-spacer />
      <small>
        <strong>
          &copy;
          {{ new Date().getFullYear() }} Acrew Tech Solutions Pvt Ltd
        </strong>
      </small>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: 'authenticate',

  data() {
    return {
      email: null,
      role: null,
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'ACRU Admin Portal',
      dashboard: null,
      subscribers: null,
      funds: null,
      sms: null,
      flat: true,
      single: null,
      bulk: null,
      mysubscribers: null,
      profile: null,
      support: null,
      partner_name: false,
      partner_val: null,
      superDis: null,
      usermanagement: null,
      mysubscribers: null,
      singleinvite: null,
      bulkinvite: null,
      addpartner: null,
      listpartners: null,
      superdistributorpannel: null,
      showdevicemenu: null,
      superdistributorpannellist: null,
      checklistofpartners: null,
      mydash: null,
      logourl: 'https://www.acru.in/wp-content/uploads/2019/10/logo_blk_1298x488.png',
      footercolor: '#f5f5dc',
      isprimary: null,
      showadduser: null,
      showlistofusers: null,
      showmanagesubpartner: null,
      showchangepassword: null,
      showadduser: null,
      showlistuser: null,
      logoenv: process.env.logolink
    }
  },
  mounted() {
    this.check()
  },
  methods: {
    check() {

      if(this.$store.state.sessionStorage.user_theme == null) {
        this.showname = false
        this.logourl = 'https://www.acru.in/wp-content/uploads/2019/10/logo_blk_1298x488.png'
      }else{

        if(this.$store.state.sessionStorage.user_theme.logo_url == "") {
          this.logourl = 'https://www.acru.in/wp-content/uploads/2019/10/logo_blk_1298x488.png'
        }else{
          this.logourl = this.logoenv + '/uploads/partnerlogo/' + this.$store.state.sessionStorage.user_theme.logo_url
        }
      }



      this.email = this.$store.state.sessionStorage.user_email
      this.role = this.$store.state.sessionStorage.userType

      this.subscribers = this.$store.state.sessionStorage.rbac.manageSubscribers
      this.funds = this.$store.state.sessionStorage.rbac.fundsEnabled
      this.sms = true
      this.single = this.$store.state.sessionStorage.rbac.singleInvite
      this.bulk = this.$store.state.sessionStorage.rbac.bulkInvite
      this.mysubscribers = this.$store.state.sessionStorage.rbac.mySubscribers
      this.profile = this.$store.state.sessionStorage.rbac.myProfile
      this.support = this.$store.state.sessionStorage.rbac.support
      this.usermanagement = this.$store.state.sessionStorage.rbac.manageRoles
      this.addpartner = this.$store.state.sessionStorage.rbac.addPartner
      this.superdistributorpannel = this.$store.state.sessionStorage.rbac.partnerDashboard
      this.showdevicemenu = this.$store.state.sessionStorage.rbac.deviceSummary
      this.showadduser = this.$store.state.sessionStorage.rbac.addUser
      this.showlistofusers = this.$store.state.sessionStorage.rbac.listOfUsers
      this.showmanagesubpartner = this.$store.state.sessionStorage.rbac.subPartner
      this.showchangepassword = this.$store.state.sessionStorage.rbac.changePassword
      this.showadduser = this.$store.state.sessionStorage.rbac.addUser
      this.showlistofusers = this.$store.state.sessionStorage.rbac.editUser


      // this.subscribers = this.$store.state.sessionStorage.rbac[8].access
      // this.funds = this.$store.state.sessionStorage.rbac[19].access
      // this.sms = this.$store.state.sessionStorage.rbac[21].access
      // this.single = this.$store.state.sessionStorage.rbac[24].access
      // this.bulk = this.$store.state.sessionStorage.rbac[25].access
      // this.mysubscribers = this.$store.state.sessionStorage.rbac[16].access
      // this.profile = this.$store.state.sessionStorage.rbac[26].access
      // this.support = this.$store.state.sessionStorage.rbac[27].access
      // this.usermanagement = this.$store.state.sessionStorage.rbac[23].access
      // this.addpartner = this.$store.state.sessionStorage.rbac[17].access
      // // this.listpartners = this.$store.state.sessionStorage.rbac[18].access
      // this.superdistributorpannel = this.$store.state.sessionStorage.rbac[29].access
      // this.showdevicemenu = this.$store.state.sessionStorage.rbac[40].access

      this.superDis = this.$store.state.sessionStorage.data.super_distributor

      this.isprimary = this.$store.state.sessionStorage.data.is_primary_account

      if (this.role == 'partner') {
        this.mydash = true
        if (this.superDis == 'true') {
          this.listpartners = this.$store.state.sessionStorage.rbac.listOfPartners
        } else {
          this.listpartners = false
        }
      } else {
        this.mydash = false
        this.listpartners = this.$store.state.sessionStorage.rbac.listOfPartners
      }
    },
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    },
    namecheck() {
      if (this.$store.state.sessionStorage.userType == 'partner'){
        if ( this.$store.state.sessionStorage.data.company_name == null) {
          return this.$store.state.sessionStorage.firstname
        } else { 
         return this.$store.state.sessionStorage.data.company_name
        }

      } else {
        return this.$store.state.sessionStorage.data.first_name
      }
    }
  },
}
</script>

<style>
.textColor {
  color: #30302f !important;
}
.v-list-item-title {
  font-size: 12px;
}
</style>
