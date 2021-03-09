<template>
    <v-layout>
      <v-flex>
        <v-row align="center" justify="center">
          <v-col class="d-flex" cols="12" sm="6">
            <h1 class="headline mt-5 font-weight-light">{{title}}</h1>
            <v-spacer />
          </v-col>
        </v-row>
        <br />
        <v-form v-model="valid">
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
          <v-row align="center" justify="center">
          <v-col class="paddingTop" cols="12" sm="6">
          <h4 class="mb-2 textColor">First Name <span class="starcolor">*</span></h4></h4>
              <v-text-field
                id="name"
                v-model="form.firstname"
                v-on:keypress="isLetter($event)"
                :rules="namevalidrules"
                placeholder="Please Enter The First Name"
                outlined
              ></v-text-field>
              </v-col>
              </v-row>
              <v-row align="center" justify="center">
          <v-col class="paddingTop" cols="12" sm="6">
          <h4 class="mb-2 textColor">Last Name <span class="starcolor">*</span></h4></h4>
              <v-text-field
                id="lastname"
                v-model="form.lastname"
                v-on:keypress="isLetter($event)"
                :rules="namevalidrules"
                placeholder="Please Enter The Last Name"
                outlined
              ></v-text-field>
              </v-col>
              </v-row>
              <v-row align="center" justify="center">
            <v-col class="paddingTop" cols="12" sm="6">
            <h4 class="mb-2 textColor">Phone Number <span class="starcolor">*</span></h4></h4>
              <v-text-field
                id="phone"
                v-model="form.phone"
                v-on:keypress="isNumber($event)"
                maxlength="10"
                :rules="phoneRules"
                placeholder="Please Enter The Phone Number"
                outlined
              ></v-text-field>
              </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col class="paddingTop" cols="12" sm="6">
                <h4 class="mb-2 textColor">Email <span class="starcolor">*</span></h4></h4>
                  <v-text-field
                    id="email"
                    v-model="form.email"
                    :rules="emailRules"
                    placeholder="Please Enter The Email"
                    outlined
                  ></v-text-field>
                  </v-col>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-col class="paddingTop" cols="12" sm="6">
                    <h4 class="mb-2 textColor">Set Password </h4></h4>
                        <v-text-field
                          id="password"
                          v-model="form.password"
                          placeholder="Please Set A Password"
                          outlined
                          :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="() => (value = !value)"
                          :type="value ? 'password' : 'text'"
                          autocomplete="new-password"
                        ></v-text-field>
                        <p>**A minimum of 8-15 characters password with an uppercase and lowercase letters, number and special character is required.</p>
                        </v-col>
                        </v-row>
                  <v-row align="center" justify="center">
                    <v-col class="paddingTop" cols="12" sm="6">
                    <h4 class="mb-2 textColor">Select Role <span class="starcolor">*</span></h4>
                    <v-select
                    v-model="form.roles"
                    :items="items"
                    :rules="rules"
                    label="Select"
                    return-object
                    outlined
                  ></v-select>
                  </v-col>
                  </v-row>
                  <v-row align="center" justify="center">
                    <v-col class="paddingTop" cols="12" sm="6">
                    <h4 class="mb-2 textColor">Address</h4>
                    <v-textarea
                      id="address"
                      v-model="form.address"
                      placeholder="Please Enter Address"
                      outlined
                    ></v-textarea>
                    </v-col>
                </v-row>
                  <v-row v-if="edit" align="center" justify="center">
                    <v-col class="paddingTop" cols="12" sm="6">
                      <v-radio-group v-model="radioGroup">
                        <v-radio
                          value="activate"
                          label="Activate User"
                        ></v-radio>
                        <v-radio
                          value="deactivate"
                          label="Deactivate User"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                   
                    </v-row>
        </v-form>
        <v-row align="center" justify="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-spacer />
            <v-btn
              color="black white--text"
              large
              :disabled="!valid"
              @click="saveuser"
              >Update User</v-btn
            >
          </v-col>
        </v-row>
  
        <v-snackbar v-model="snackbar" :color="color" top>
          {{ text }}
        </v-snackbar>
  
  
      </v-flex>
    </v-layout>
  </template>

  <script>
    /* eslint eqeqeq: 0 */
    export default {
      data() {
        return {
            valid: true,
            loaded: false,
            form: {
                firstname: null,
                lastname: null,
                phone: null,
                email: null,
                address: null,
                password: null,
                roles: null,
            },
            items: null,
            phoneRules: [
                (v) => !!v || 'Phone number is required',
                v => (v && v.length == 10) || "Phone number must be equal to 10 digits"
            ],
            rules: [
                (v) => !!v || 'This field is required',
            ],
            emailRules: [
                (v) => !!v || 'Email is required',
                (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
            ],
            namevalidrules: [
              (v) => !!v || 'This field is required',
              v => {
                if (v) return /^[a-zA-Z ]*$/.test(v) || 'Name Cannot Contain Numbers Or Special Characters';
                else return true;
              },
            ],
            passwordrules: [
            v => (v && v.length < 18) || "Password can not be more that 18 characters"
            ],
            snackbar: false,
            text: '',
            color: '',
            edit: true,
            radioGroup: 'activate',
            title: 'Edit User',
            userstatus: null,
            value: String,
            }
        },
        mounted() {
            this.check()
        },
        methods: {
            async check() {
                this.loaded = false
                this.$axios.setHeader(
                  'Authorization',
                  'bearer ' + this.$store.state.sessionStorage.token
                )
              try{
                const result = await this.$axios.$get('/admin/users/role/dropdown/get')
                this.loaded = true
                this.items = result[0].role
              }catch(error){
                this.loaded = true
                this.items = []
              }   
                if(this.$store.state.sessionStorage.edit_user == null) {
                }else{
                    this.form.firstname = this.$store.state.sessionStorage.edit_user.first_name
                    this.form.lastname = this.$store.state.sessionStorage.edit_user.last_name
                    this.form.phone = this.$store.state.sessionStorage.edit_user.mobile
                    this.form.email = this.$store.state.sessionStorage.edit_user.email_id
                    if(this.$store.state.sessionStorage.edit_user.user_role == 'admin'){
                      this.form.roles = 'Admin'
                    }else if(this.$store.state.sessionStorage.edit_user.user_role == 'support'){
                      this.form.roles = 'Support'
                    }
                    // this.form.roles = this.$store.state.sessionStorage.edit_user.user_role
                    if(this.$store.state.sessionStorage.edit_user.address == null) {

                    } else{
                    this.form.address = this.$store.state.sessionStorage.edit_user.address
                    }
                    if(this.$store.state.sessionStorage.edit_user.is_active == true) {
                      this.radioGroup = 'activate'
                    }else{
                      this.radioGroup = 'deactivate'
                    }
                    // this.radioGroup
                }
            },
            async saveuser() {
                if(this.radioGroup == 'activate') {
                  this.userstatus = true
                }else{
                  this.userstatus = false
                }
                try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$post('/admin/users/user/update', {
          first_name: this.form.firstname,
          last_name: this.form.lastname,
          mobile: this.form.phone,
          email: this.form.email,
          password: this.form.password,
          address: this.form.address,
          user_role: this.form.roles,
          user_status: this.userstatus,
          id: this.$store.state.sessionStorage.edit_user.id
        })
        this.$router.push({ path: '/userlist' })
        this.snackbar = true
        this.color = 'success'
        this.text = 'User Updated Successfully'
      } catch (error) {
        this.snackbar = true
        this.color = 'red'
        this.text = error.response.data.message
      }


            },

            isLetter(e) {
       let char = String.fromCharCode(e.keyCode); 
        if(/^[a-zA-Z ]*$/.test(char))
          return true; 
        else e.preventDefault();
      },
      isLetter1(e) {
       let char = String.fromCharCode(e.keyCode); 
        if(/^[a-zA-Z\s]+$/.test(char))
          return true; 
        else e.preventDefault();
      },
      isLetter2(e) {
       let char = String.fromCharCode(e.keyCode); 
        if(/^[A-Za-z0-9]+$/.test(char))
          return true; 
        else e.preventDefault();
      },
      isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return evt.preventDefault();
    }
    return evt;
   },

        }
    }
</script>

<style>
    .margintopneg {
      margin-top: -40px;
    }
  .paddingTop {
      margin-top: -20px;
  }
  .textColor {
    color: #676b68 !important;
  }
  .starcolor {
  color: red !important;
}
  </style>