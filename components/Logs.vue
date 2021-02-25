<template>
  <v-layout>
    <v-flex>
      <h1 class="headline mb-5 mt-5 font-weight-light">LOGS</h1>

      <div v-if="load">
        <h1>Loading...</h1>
      </div>

      <v-card v-if="test">
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
          :items="test"
          :single-select="singleSelect"
          item-key="firstName"
          show-select
          class="elevation-1"
          @input="call"
        >
        </v-data-table>
      </v-card>

      <template>
        <div>
          <Toast :snackbar="snackbar" :color="color" :text="text" />
        </div>
      </template>

      <br />
      <br />
    </v-flex>
  </v-layout>
</template>

<script>
/* eslint eqeqeq: 0 */
import { mapGetters } from 'vuex'
import Toast from '@/components/Toast'

export default {
  props: ['value'],

  computed: {
    ...mapGetters('sessionStorage', ['getBlogs']),
  },

  components: {
    Toast,
  },

  data() {
    return {
      color: '',
      snackbar: false,
      text: '',

      usersnames: null,
      usersList: null,
      userDetails: {
        userName: '',
        userEmail: '',
      },

      name: '',
      email: '',
      dialog: false,
      dialog2: false,
      dialog3: false,
      show: false,
      selectedUser: '',
      search: '',
      singleSelect: true,
      selected: [],
      headers: [
        { text: 'Name', value: 'firstName' },
        { text: 'Email', value: 'email' },
      ],
      test: null,
      load: true,
      texts: null,
      reason: null,
    }
  },

  mounted() {
    this.check()
  },
  methods: {
    check(store, commit) {
      this.$store.dispatch('sessionStorage/logList')
      this.load = false
      this.test = this.$store.state.sessionStorage.logs
    },
    call() {
      this.selectedUser = JSON.stringify(this.selected)

      if (this.selected[0] != null) {
        this.show = true
      } else {
        this.show = false
      }
    },
  },
}
</script>
