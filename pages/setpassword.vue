<template>

    <v-app id="inspire">
        <v-content>
          <v-container class="fill-height" fluid>
            <v-row v-if="!emailuser" align="center" justify="center">
              <v-col class="d-flex" cols="12" sm="6">
                <h1 class="headline mt-5 font-weight-light">Your Link Has Expired!</h1>
                <v-spacer />
              </v-col>
            </v-row>

            <v-row v-if="emailuser" align="center" justify="center">
              <v-col cols="12" sm="8" md="5">
                <v-card>
                  <v-card-text>
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
                            <v-img
                              max-width="200"
                              src="https://www.acru.in/wp-content/uploads/2019/10/logo_blk_1298x488.png"
                            ></v-img>
                          </v-row> 
                          <v-row >
                            <v-col class="" cols="12" sm="12">
                                <h1 class="headline mt-5 font-weight-light">Set Your Password</h1>
                                <h2 class="headline mt-5 font-weight-light">User Email - {{checknull(emailuser)}}</h2>
                            </v-col>
                          </v-row>
              
                                     
                          <h4 class="mb-2 textColor">New Password <span class="starcolor">*</span></h4></h4>
                          <v-text-field
                            v-model="form.newpassword"
                            :rules="rules"
                            type="password"
                            @input="checkifsamenew($event)"
                            placeholder="Please Enter New Password"
                            outlined
                          ></v-text-field>

                          <h4 class="mb-2 textColor">Confirm Password <span class="starcolor">*</span></h4></h4>
                        <v-text-field
                          v-model="form.confirmpassword"
                          :rules="rules"
                          placeholder="Please Re-enter New Password"
                          type="password"
                          @input="checkifsame($event)"
                          outlined
                        ></v-text-field>
                        <p class="starcolor " v-if="showmsg">New Password And Confirm Password Should Be The Same</p>
                        <p>**A minimum of 8-15 characters password with an uppercase and lowercase letters, number and special character is required.</p>


                                              
                               
                      </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
              color="black white--text"
              large
              :disabled="!valid"
              @click="setpassword"
              >Set Password</v-btn
            >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
    
            <v-snackbar v-model="snackbar" :color="color" top>
              {{ text }}
            </v-snackbar>
          </v-container>
        </v-content>
      </v-app>








    <!-- <v-layout>
      <v-flex>
        <v-row align="center" justify="center">
            <v-img
              max-width="200"
              src="https://www.acru.in/wp-content/uploads/2019/10/logo_blk_1298x488.png"
            ></v-img>
          </v-row>
        <v-row align="center" justify="center">
          <v-col class="" cols="12" sm="6">
            <h1 class="headline mt-5 font-weight-light">Setup A Password</h1>
            <h2 class="headline mt-5 font-weight-light">User Email - {{checknull(emailuser)}}</h2>
          </v-col>
        </v-row>
        

        <br />
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
                            <h4 class="mb-2 textColor">New Password <span class="starcolor">*</span></h4></h4>
                                <v-text-field
                                  v-model="form.newpassword"
                                  :rules="rules"
                                  placeholder="Please Enter The New Password"
                                  outlined
                                ></v-text-field>
                                </v-col>
                                </v-row>

               <v-row align="center" justify="center">
                    <v-col class="paddingTop" cols="12" sm="6">
                    <h4 class="mb-2 textColor">Confirm Password <span class="starcolor">*</span></h4></h4>
                        <v-text-field
                          v-model="form.confirmpassword"
                          :rules="rules"
                          placeholder="Please Re-enter The New Password"
                          @input="checkifsame($event)"
                          outlined
                        ></v-text-field>
                        <p class="starcolor " v-if="showmsg">Should Be Same As New Password</p>
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
              @click="setpassword"
              >Set Password</v-btn
            >
          </v-col>
        </v-row>
  
        <v-snackbar v-model="snackbar" :color="color" top>
          {{ text }}
        </v-snackbar>
  
  
      </v-flex>
    </v-layout> -->
  </template>

  <script>
    /* eslint eqeqeq: 0 */
    export default {
        layout: 'login',

        async asyncData ({ store, $axios }) {
      const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const product = urlParams.get('token')
          try{
        const email = await $axios.get(
          '/admin/user/get/' + product
        );
        store.commit('sessionStorage/emailExists', email.data.email_id)
        store.commit('sessionStorage/emailToken', product)
        
        const useremail = email
              
        }catch(error){
            store.commit('sessionStorage/emailExists', null)
            store.commit('sessionStorage/emailToken', null)
            

        }

    },
      data() {
        return {
            snackbar: false,
            text: '',
            color: '',
            valid: true,
            form: {
                oldpassword: null,
                newpassword: null,
                confirmpassword: null
            },
            valid: true,
            loaded: true,
            rules: [
                (v) => !!v || 'This field is required',
            ],
            showmsg: false,
            emailuser: null,
            noval: false,
            showmsgcon: false

        }
      },
      mounted() {
          this.check()

      },
      methods: {
          check() {
              if(this.$store.state.sessionStorage.email_exists == null) {
                  
                  this.emailuser = null
              }else{
                  this.emailuser = this.$store.state.sessionStorage.email_exists
              }
            // const queryString = window.location.search;
            // const urlParams = new URLSearchParams(queryString);
            // const product = urlParams.get('id')
            // console.log(product)
          },

          checkifsamenew(val) {
            if(this.form.confirmpassword != null){
            if (this.form.newpassword != this.form.confirmpassword){
                this.valid = false
                this.showmsg = true
            }else{
                this.valid = true
                this.showmsg = false
                return val
            }
          }else{

          }
          },
        checkifsame(val) {
            if (this.form.confirmpassword != this.form.newpassword){
                this.valid = false
                this.showmsg = true
            }else{
                this.valid = true
                this.showmsg = false
                return val
            }
        },
        async setpassword() {

            try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$post('/admin/user/reset', {
          token: this.$store.state.sessionStorage.email_token,
          email: this.emailuser,
          password: this.form.confirmpassword,
          
        })
        this.snackbar = true
        this.color = 'success'
        this.text = 'Password Updated Successfully'
        setTimeout(() => this.$router.push('/loginadmin'), 3000);
        // this.$router.push('/loginadmin')
      } catch (error) {
        this.noval = true
        this.snackbar = true
        this.color = 'red'
        this.text = error.response.data.message
      }

        },
        checknull(val) {
            if(val == null) {
                return 'User Not Found'
            }else{
                return val
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