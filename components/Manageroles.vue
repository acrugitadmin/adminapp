<template>
  <v-layout>
    <v-flex>
      <h1 class="headline mb-5 mt-5 font-weight-light">Manage Roles</h1>

      <div v-if="!items">
        <h3 class="mt-5 font-weight-light">
          Please Wait While We Fetch The Data...
        </h3>
      </div>

 <v-card v-if="items">
  <v-data-table
      :headers="headers"
      :items="items"
      :hide-default-footer="true"
      class="elevation-1"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :footer-props="{ 'items-per-page-options': [100, 200, -1] }"
      @page-count="pageCount = $event"
    >
      <template v-slot:item.admin="{ item }">
      <v-checkbox v-model="item.admin" :disabled="isdisabled"></v-checkbox>
      </template>
      <template v-slot:item.superadmin="{ item }">
      <v-checkbox v-model="item.superadmin"></v-checkbox>
      </template>
      <template v-slot:item.partner="{ item }">
      <v-checkbox v-model="item.partner"></v-checkbox>
      </template>
      <template v-slot:item.support="{ item }">
      <v-checkbox v-model="item.support"></v-checkbox>
      </template>
    </v-data-table>
  </v-card>

<br />
        <v-col v-if="items">
          <v-spacer />
          <v-btn
            color="black white--text float-right"
            large
            @click="called"
            >Save</v-btn
          >
        </v-col>

        <v-snackbar v-model="snackbar" :color="color" top>
        {{ text }}
      </v-snackbar>

      </v-flex>
    </v-layout>
</template>


<script>
  export default {
    data () {
      return {
          page: 0,
          pageCount: 0,
          itemsPerPage: 100,
          selected: [],
          headers: [
          //   { text: 'Manage', value: 'view', class: 'size'},
          // { text: 'Support', value: 'support', class: 'size' },
          // { text: 'Admin', value: 'admin', class: 'size'},
          // { text: 'Partner', value: 'partner', class: 'size' },
          ],
        items: null,
        color: '',
        snackbar: false,
        text: '',
        isdisabled: false,

      }
    },
    mounted() {
    this.check()
  },
  methods: {
      async check() {

        if (this.$store.state.sessionStorage.userType == 'admin') {
          this.isdisabled = true
        } else {
          this.isdisabled = false
        }
        try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$get('/admin/users/roles/get')
        this.items = result[0].role
        this.headers = result[0].headers

          }catch(error) {
              this.snackbar = true
              this.color = 'red'
              this.text = 'Something went wrong, Try again later'

          }

      },
      async called() {
           try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$post('/admin/users/roles/update', {
            user_role: this.items
        })
              this.snackbar = true
              this.color = 'success'
              this.text = 'Updated user role successfully'
              this.check()
          }catch(error) {
              this.snackbar = true
              this.color = 'red'
              this.text = 'Something went wrong, Try again later'

          }

      }
  }
  }
</script>

<style>
.size {
  /* font-size: 15px !important; */
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-size: 15px !important;

 }
</style>