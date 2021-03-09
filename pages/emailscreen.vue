<template>

    <v-app id="inspire">
        <v-content>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
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
                            @click="navtologin"
                              max-width="200"
                              src="https://www.acru.in/wp-content/uploads/2019/10/logo_blk_1298x488.png"
                            ></v-img>
                          </v-row> 
                          <v-row >
                            <v-col class="" cols="12" sm="6">
                              <h1 class="headline mt-5 font-weight-light">Forgot Password</h1>
                            </v-col>
                          </v-row>
              
                                     
                                          <h4 class="mb-2 textColor">Enter The Email Address Associated With Your Account. <span class="starcolor">*</span></h4></h4>
                                              <v-text-field
                                                v-model="form.email"
                                                :rules="rules"
                                                placeholder="Please Enter The Email ID"
                                                outlined
                                              ></v-text-field>
                                              
                               
                      </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
              color="black white--text"
              large
              :disabled="!valid"
              @click="sendemail"
              >Submit</v-btn
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
            <h1 class="headline mt-5 font-weight-light">Reset Password</h1>
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
                            <h4 class="mb-2 textColor">Email <span class="starcolor">*</span></h4></h4>
                                <v-text-field
                                  v-model="form.email"
                                  :rules="rules"
                                  placeholder="Please Enter The Email ID"
                                  outlined
                                ></v-text-field>
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
              @click="sendemail"
              >Submit</v-btn
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

      data() {
        return {
            snackbar: false,
            text: '',
            color: '',
            valid: true,
            form: {
                email: null,
               
            },
            valid: true,
            loaded: true,
            rules: [
            (v) => !!v || 'Email is required',
            (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
            ],
           

        }
      },
      mounted() {
          this.check()

      },
      methods: {
          check() {
              
          },
        
        async sendemail() {

            try {
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        const result = await this.$axios.$post('/admin/user/reset/password', {
          email: this.form.email,
          
        })
        this.snackbar = true
        this.color = 'success'
        this.text = 'Link Successfully Sent To The Email'
      } catch (error) {
        this.snackbar = true
        this.color = 'red'
        this.text = error.response.data.message
      }

        },
        navtologin() {
          this.$router.push('/loginadmin')
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