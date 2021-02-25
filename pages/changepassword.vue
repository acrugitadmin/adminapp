<template>
    <v-layout>
      <v-flex>
        <v-row align="center" justify="center">
          <v-col class="d-flex" cols="12" sm="6">
            <h1 class="headline mt-5 font-weight-light">Change Password</h1>
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
                    <h4 class="mb-2 textColor">Current Password <span class="starcolor">*</span></h4></h4>
                        <v-text-field
                          v-model="form.oldpassword"
                          :rules="rules"
                          placeholder="Please Enter The Current Password"
                          outlined
                          type="password"
                          v-on:blur="validateold"
                        ></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row align="center" justify="center">
                            <v-col class="paddingTop" cols="12" sm="6">
                            <h4 class="mb-2 textColor">New Password <span class="starcolor">*</span></h4></h4>
                                <v-text-field
                                  v-model="form.newpassword"
                                  :rules="rules"
                                  min=80 max=18
                                  v-on:keypress="onKeyDown($event)"
                                  placeholder="Please Enter The New Password"
                                  outlined
                                  type="password"
                                  @input="checkifsameold($event)"
                                ></v-text-field>
                                <p class="starcolor " v-if="showmsgold">Should Not Be Same As Current Password</p>
                                <p class="starcolor " v-if="showmsgcon">Should Be Same As Confirm Password Field</p>
                                </v-col>
                                </v-row>

               <v-row align="center" justify="center">
                    <v-col class="paddingTop" cols="12" sm="6">
                    <h4 class="mb-2 textColor">Confirm Password <span class="starcolor">*</span></h4></h4>
                        <v-text-field
                          v-model="form.confirmpassword"
                          :rules="rules"
                          type="password"
                          placeholder="Please Re-enter The New Password"
                          @input="checkifsame($event)"
                          outlined
                        ></v-text-field>
                        <p class="starcolor " v-if="showmsg">Should Be Same As New Password</p>
                        <p>**A minimum of 8-15 characters password with an uppercase and lowercase letters, number and special character is required.</p>
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
              @click="changepassword"
              >Change Password</v-btn
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
            snackbar: false,
            text: '',
            color: '',
            valid: true,
            form: {
                oldpassword: "",
                newpassword: null,
                confirmpassword: null
            },
            valid: true,
            loaded: true,
            rules: [
                (v) => !!v || 'This field is required',
                v => (v && v.length < 18) || "This field must be less than 18 Characters",
            ],
            showmsg: false,
            showmsgold: false,
            showmsgcon: false

        }
      },
      mounted() {
          this.check()

      },
      methods: {
          check() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const product = urlParams.get('id')
            console.log(product)
          },
          checkifsameold(val) {
            if (val == this.form.oldpassword){
                this.showmsgold = true
            }else{
                this.showmsgold = false
                if(this.form.confirmpassword != null) {
                  if(val != this.form.confirmpassword){
                    this.showmsgcon = true
                  }else{
                    this.showmsgcon = false
                  }
                }
            }
          },
        checkifsame(val) {
            if (val != this.form.newpassword){
                this.showmsg = true
                this.valid = false
            }else{
                this.showmsg = false
                this.valid = true
            }
        },
        async changepassword() {
          try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$post('/admin/users/user/password/update', {
          email: this.$store.state.sessionStorage.user_email,
          old_password: this.form.oldpassword,
          new_password: this.form.newpassword
        })
        this.snackbar = true
        this.color = 'success'
        this.text = 'Password Updated Successfully'
        setTimeout(() => this.$router.push('/logout'), 3000);
        // this.$router.push({ path: '/logout' })
        
      } catch (error) {
        this.snackbar = true
        this.color = 'red'
        this.text = error.response.data.message
      }
        },
        async validateold(){
          if(this.form.oldpassword.length == 0) {

          }else{
          try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$post('/admin/users/user/password/validate', {
          email: this.$store.state.sessionStorage.user_email,
          current_password: this.form.oldpassword
        })
        
      } catch (error) {
        this.snackbar = true
        this.color = 'red'
        this.text = error.response.data.message
      }
    }
        },
        onKeyDown(evt){
      if (evt.length > 18) {  
          evt.preventDefault()
          return
        
      }
    }
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
.errormsgtopholding{
          margin-top: -20px;
      }
  </style>