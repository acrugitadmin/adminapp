<template>
    <v-layout>
      <v-flex>

        
              <h1 class="headline mt-5 mb-3 font-weight-light">Role Management</h1>
              <v-spacer />
            

        <v-expansion-panels accordion multiple>
            <v-expansion-panel>
              <v-expansion-panel-header>Dashboard</v-expansion-panel-header>
              <v-expansion-panel-content class="ml-5">
                <v-row><p class=" mt-5 rightspacing pwidth">Portfolio Value</p> <v-checkbox class="" v-model="port"></v-checkbox></v-row>
                <v-divider></v-divider>
                <v-row><p class=" mt-5 rightspacing pwidth">Monthly Flexi SIP Value</p> <v-checkbox class="" v-model="flexi"></v-checkbox></v-row>
                <v-divider></v-divider>
                <v-row><p class=" mt-5 rightspacing pwidth">Piggy Bank Balance</p> <v-checkbox class="" v-model="piggybank"></v-checkbox></v-row>
                <v-divider></v-divider>
                <v-row><p class=" mt-5 rightspacing pwidth">Risk Profile</p> <v-checkbox class="" v-model="risk"></v-checkbox></v-row>
                <v-divider></v-divider>
                <v-row><p class=" mt-5 rightspacing pwidth">Invest More</p> <v-checkbox class="" v-model="invest"></v-checkbox></v-row>
                <v-divider></v-divider>
                <v-row><p class=" mt-5 rightspacing pwidth">Tax Saving Funds</p> <v-checkbox class="" v-model="taxsaving"></v-checkbox></v-row>
                <v-divider></v-divider>
                <v-row><p class=" mt-5 rightspacing pwidth">Re-initiate KYC</p> <v-checkbox class="" v-model="reinitiate"></v-checkbox></v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-header>Save</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Flexi SIP</p> <v-checkbox class="" v-model="flexisave"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Piggy Bank</p> <v-checkbox class="" v-model="piggybanksave"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-header>Flexi SIP</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Set Up Flexi SIP</p> <v-checkbox class="" v-model="setupflexi"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Reset Flexi SIP</p> <v-checkbox class="" v-model="resetflexi"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Stop Flexi SIP</p> <v-checkbox class="" v-model="stopflexi"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Set Up Flexi SIP</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Select A Fund</p> <v-checkbox class="" v-model="selectfundflexi"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Set Up Flexi SIP</p> <v-checkbox class="" v-model="setupsipflexi"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Reset Flexi SIP</p> <v-checkbox class="" v-model="resetsipflexi"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Flexi SIP Notification</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Purchase SIP</p> <v-checkbox class="" v-model="purchaseflexi"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Dismiss SIP Notification</p> <v-checkbox class="" v-model="dismissflexi"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Dismiss All SIP Notifications</p> <v-checkbox class="" v-model="dismissallflexi"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Piggy Bank</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Piggy Bank Settings</p> <v-checkbox class="" v-model="settingspiggybank"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Piggy Bank Settings</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Change Fund</p> <v-checkbox class="" v-model="changefunspiggybank"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Submit Fund</p> <v-checkbox class="" v-model="submitpiggybank"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Invest</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Apply filter</p> <v-checkbox class="" v-model="filterinvest"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Fund Details</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Buy Fund</p> <v-checkbox class="" v-model="buyfund"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Buy Fund</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Place Order</p> <v-checkbox class="" v-model="placeorder"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Menu</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Dashboard</p> <v-checkbox class="" v-model="dashboardmenu"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Profile</p> <v-checkbox class="" v-model="profilemenu"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">View Profile</p> <v-checkbox class="" v-model="viewprofilemenu"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Manage Nominee</p> <v-checkbox class="" v-model="nomineemenu"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Risk Profile</p> <v-checkbox class="" v-model="riskprofilemenu"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Holdings</p> <v-checkbox class="" v-model="holdingsmenu"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Transaction</p> <v-checkbox class="" v-model="transactionmenu"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Settings</p> <v-checkbox class="" v-model="settingsmenu"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">FAQ</p> <v-checkbox class="" v-model="faqmenu"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Support</p> <v-checkbox class="" v-model="supportmenu"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Manage Nominee</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Add Nominee</p> <v-checkbox class="" v-model="addnominee"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Update Nominee</p> <v-checkbox class="" v-model="updatenominee"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Add Nominee</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Add Nominee 2</p> <v-checkbox class="" v-model="addnom2"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Delete Nominee 2</p> <v-checkbox class="" v-model="delnom2"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Add Nominee 3</p> <v-checkbox class="" v-model="addnom3"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Delete Nominee 3</p> <v-checkbox class="" v-model="delnom3"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Add Nominees</p> <v-checkbox class="" v-model="addnominees"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Risk Profile</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Save</p> <v-checkbox class="" v-model="saveriskprofile"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Holdings</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Redeem</p> <v-checkbox class="" v-model="redeem"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Invest More</p> <v-checkbox class="" v-model="investmore"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Redeem Full</p> <v-checkbox class="" v-model="redeemfull"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Redeem Partial</p> <v-checkbox class="" v-model="redeempartial"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Cancel</p> <v-checkbox class="" v-model="cancelholdings"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Settings</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Disable Piggy Bank Notification</p> <v-checkbox class="" v-model="piggybanksetting"></v-checkbox></v-row>
                    <v-divider></v-divider>
                    <v-row><p class=" mt-5 rightspacing pwidth">Disable Flexi SIP Notification</p> <v-checkbox class="" v-model="flexisetting"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Support Tickets</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Create Support Ticket</p> <v-checkbox class="" v-model="createsupportticket"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <v-expansion-panel>
                <v-expansion-panel-header>Create Support Ticket</v-expansion-panel-header>
                <v-expansion-panel-content class="ml-5">
                    <v-row><p class=" mt-5 rightspacing pwidth">Submit</p> <v-checkbox class="" v-model="submitticket"></v-checkbox></v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>



              
          </v-expansion-panels>

          <v-row class="float-right">          
            <v-col class="paddingTop">
              <v-btn
                color="black white--text"
                large
                @click=""
                >Save</v-btn
              >
            </v-col>
          </v-row>
    


      </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                port: false,
                flexi: false,
                piggybank: false,
                invest: false,
                risk: false,
                taxsaving: false,
                reinitiate: false,
                setupflexi: false,
                stopflexi: false,
                resetflexi: false,
                flexisave: false,
                piggybanksave: false,
                selectfundflexi: false,
                setupsipflexi: false,
                resetsipflexi: false,
                purchaseflexi: false,
                dismissflexi: false,
                dismissallflexi: false,
                settingspiggybank: false,
                changefunspiggybank: false,
                submitpiggybank: false,
                filterinvest: false,
                buyfund: false,
                placeorder: false,
                dashboardmenu: false,
                profilemenu: false,
                viewprofilemenu: false,
                nomineemenu: false,
                riskprofilemenu: false,
                holdingsmenu: false,
                transactionmenu: false,
                settingsmenu: false,
                faqmenu: false,
                supportmenu: false,
                addnominee: false,
                updatenominee: false,
                addnom2: false,
                delnom2: false,
                addnom3: false,
                delnom3: false,
                addnominees: false,
                saveriskprofile: false,
                redeem: false,
                investmore: false,
                redeemfull: false,
                redeempartial: false,
                cancelholdings: false,
                piggybanksetting: false,
                flexisetting: false,
                createsupportticket: false,
                submitticket: false
            }
        }
    }
</script>

<style>
    .rightspacing{
        margin-left: 40px;
    }
    .marginspace {
        margin-left: 230px;
    }
    .pwidth{
        width: 480px;
    }
</style>