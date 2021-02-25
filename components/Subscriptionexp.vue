<template>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <h1 class="headline mt-5 font-weight-light">List Of Users Whose Subscription Has Expired</h1>
          </v-col>
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
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :footer-props="{ 'items-per-page-options': [10, 200, -1] }"
            class="elevation-1"
            :loading="isLoading"
                >
                <template v-slot:item.first_name="{ item }">
                  {{ item.first_name}} {{ item.last_name}}
                </template>
                <template v-slot:item.is_active="{ item }">
                  {{ checktype(item.is_active)}}
                </template>
                <template v-slot:item.mobile="{ item }">
                  {{ checkifnull(item.mobile)}}
                </template>
                <template v-slot:item.user_role="{ item }">
                  {{ capitalizeFirstLetter(item.user_role)}}
                </template>
                <template v-slot:item.edit="{ item }">
                    <v-tooltip left>
                      <template v-slot:activator="{ on }">
                        <v-icon
                          style="cursor: pointer;"
                          v-on="on"
                          @click="edituser(item)"
                        >
                        mdi-cloud-download
                        </v-icon>
                      </template>
                      <span>Edit</span>
                    </v-tooltip>
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
    export default {
      data() {
        return {
            isLoading: false,
      values: [{"id":109,"email_id":"prashanth.232@gmail.com","user_role":"admin","partner_id":null,"date_added":"2021-02-09T07:42:39.206Z","is_active":true,"is_primary_user":false,"is_password_reset":true,"first_name":"Prashanth","last_name":"Kumar","mobile":"9980668008","address":"","token":null}],
      valid: false,  
      page: 0,
      pageCount: 0,
      itemsPerPage: 10,
        search: '',
        customfilter: 'TRUE',
      selected: [],
      headers: [
        { text: 'Name', value: 'first_name', class: 'size', sortable: false },
        { text: 'Mobile Number', value: 'mobile', class: 'size', sortable: false },
        { text: 'Email', value: 'email_id', class: 'size', sortable: false },
        { text: 'Role', value: 'user_role', class: 'size', sortable: false },
        { text: 'User Status', value: 'is_active', class: 'size', sortable: false },
        { text: 'Edit', value: 'edit', class: 'size', sortable: false },
      ],
      datapresent: true,
      nodata: false,
      checkbox: false,
      loaded: true,
      snackbar: false,
            text: '',
            color: '',
            allowedit: null
            
            }
        },
        mounted() {
            this.check()
        },
        methods: {
            async check() {
              this.allowedit = this.$store.state.sessionStorage.rbac.editUser
                this.loaded = true
                try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$get('/admin/users/access/user/get/true')
        this.values = result
        this.datapresent = false
      } catch (e) {
        console.log(e)
        this.nodata = true
        this.items = true
      }
            },
            edituser(val) {
                console.log(val)
                if (this.allowedit == false) { 
        this.snackbar = true
        this.text = 'Sorry, You Do Not Have Permission To View This'
        this.color = 'red'
      } else { 
                if(val.user_role == 'superadmin') {
                  this.snackbar = true
                  this.color = 'red'
                  this.text = 'Can Not Edit For Superadmin'
                }else{
                this.$store.commit('sessionStorage/editUser', val)
                this.$router.push({ path: '/edituser' })
                }
              }
            },
            checktype(val) {
              if(val == true){
                return 'Active'
              }else{
                return 'Inactive'
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
            async filterval() {
              this.loaded = false
              if(this.checkbox == true){
                try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$get('/admin/users/access/user/get/ALL')
        this.values = result
        this.loaded = true
        this.datapresent = false
      } catch (e) {
        console.log(e)
        this.loaded = true
        this.nodata = true
        this.items = true
      }
              }else{
                try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$get('/admin/users/access/user/get/true')
        this.values = result
        this.loaded = true
        this.datapresent = false
      } catch (e) {
        console.log(e)
        this.loaded = true
        this.nodata = true
        this.items = true
      }
              }
            }
            

        }
    }
</script>

<style>
  .size {
    font-size: 15px !important;
  }
  </style>
  