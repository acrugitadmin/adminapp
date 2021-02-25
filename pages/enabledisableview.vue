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
                submitticket: false,

                roles: null
            }
        },

        mounted() {
            this.check()
        },
        methods: {
            check() {
                this.roles = {
  "login_screen": {
    "isEnable": true,
    "user_login": {
      "isEnabled": true,
      "verify_button": true
    }
  },
  "otp_screen": {
    "isEnable": true,
    "user_otp": {
      "isEnable": true,
      "submit_button": true
    }
  },
  "sign_up_screen": {
    "isEnable": true,
    "sign_up": {
      "isEnabled": true,
      "sign_up_button": true
    }
  },
  "welcome_onboard_screen": {
    "isEnable": true,
    "welcome_onboard": {
      "isEnable": true,
      "invest_now_button": true,
      "invest_later_button": true,
      "confirm_button": true,
      "decline_button": true
    }
  },
  "kyc_verification_screen": {
    "isEnable": true,
    "pan_verification": {
      "isEnable": true,
      "cancel_button": true,
      "next_button": true,
      "continue_button": true
    }
  },
  "kyc_bank_account_verification_screen": {
    "isEnable": true,
    "bank_details": {
      "isEnable": true,
      "next_button": true,
      "previous_button": true
    }
  },
  "kyc_profile_details": {
    "isEnable": true,
    "kyc_profile_details": {
      "isEnable": true,
      "next_button": true,
      "previous_button": true
    }
  },
  "kyc_income_source_details": {
    "isEnable": true,
    "kyc_income_source_details": {
      "isEnable": true,
      "next_button": true,
      "previous_button": true
    }
  },
  "kyc_address_details": {
    "isEnable": true,
    "kyc_address_details": {
      "isEnable": true,
      "next_button": true,
      "previous_button": true
    }
  },
  "kyc_document_details": {
    "isEnable": true,
    "kyc_document_details": {
      "isEnable": true,
      "next_button": true,
      "previous_button": true
    }
  },
  "confirmation_screen_esign": {
    "isEnable": true,
    "e_sign_required": {
      "isEnable": true,
      "proceed_to_esign_button": true
    }
  },
  "confirmation_screen_reject": {
    "isEnable": true,
    "rejected_element": {
      "isEnable": true,
      "update_button": true
    }
  },
  "home_screen": {
    "isEnable": true,
    "portfolio_value_element": {
      "isEnable": true
    },
    "monthly_flexi_sip_element": {
      "isEnable": true,
      "flexi_sip_bell_icon": true
    },
    "piggy_bank_balance_element": {
      "isEnable": true,
      "piggy_bank_bell_icon": true,
      "purchase_button": true,
      "dismiss_button": true
    },
    "risk_profile_element": {
      "isEnable": true
    },
    "invest_more_element": {
      "isEnable": true
    },
    "invest_into_tax_savings_funds_element": {
      "isEnable": true
    },
    "re_initate_kyc": {
      "isEnable": true,
      "re_initate_kyc_button": true
    }
  },
  "save_screen": {
    "isEnable": true,
    "flexi_sip_element": {
      "isEnable": true
    },
    "piggy_bank_element": {
      "isEnable": true
    }
  },
  "flexi_sip_screen": {
    "isEnable": true,
    "setup_flexi_sip": {
      "isEnable": true,
      "setup_a_flexi_sip_button": true
    },
    "list_of_flexi_sip": {
      "isEnable": true,
      "reset_button": true,
      "stop_flexi_sip_button": true
    }
  },
  "setup_a_flexi_screen": {
    "isEnable": true,
    "select_fund": {
      "isEnable": true,
      "select_fund_button": true
    },
    "select_frequency": {
      "isEnable": true,
      "setup_sip_button": true
    }
  },
  "flexi_sip_notification_screen": {
    "isEnable": true,
    "list_of_flexi_sip": {
      "isEnable": true,
      "purchase_button": true,
      "dismiss_button": true,
      "clear_all_notification_button": true
    }
  },
  "piggy_bank_screen": {
    "isEnable": true,
    "piggy_bank_settings": {
      "isEnable": true,
      "settings_button": true
    },
    "piggy_bank_transactions": {
      "isEnable": true
    }
  },
  "piggy_bank_settings_screen": {
    "isEnable": true,
    "change_fund": {
      "isEnable": true,
      "change_fund_button": true
    },
    "select_frequency": {
      "isEnable": true,
      "submit_button": true
    }
  },
  "invest_screen": {
    "isEnable": true,
    "invest_filter": {
      "isEnable": true,
      "apply_filter_button": true
    },
    "list_of_funds": {
      "isEnable": true
    }
  },
  "fund_details_screen": {
    "isEnable": true,
    "fund_graph": {
      "isEnable": true
    },
    "fund_information": {
      "isEnable": true,
      "buy_fund": true
    }
  },
  "buy_fund_screen": {
    "isEnable": true,
    "buy_fund": {
      "isEnable": true,
      "place_order_button": true
    }
  },
  "razor_pay_screen": {
    "isEnable": true,
    "fund_payment": {
      "isEnable": true,
      "pay_using_upi_button": true
    }
  },
  "razor_pay_upi_screen": {
    "isEnable": true,
    "razor_pay_upi_screen": {
      "isEnable": true,
      "pay_button": true
    }
  },
  "confirmation_screen": {
    "isEnable": true,
    "payment_confirmation": {
      "isEnable": true,
      "proceed_button": true
    }
  },
  "menu_bar": {
    "isEnable": true,
    "dashboard_menu": {
      "isEnable": true
    },
    "profile_menu": {
      "isEnable": true
    },
    "view_profile_menu": {
      "isEnable": true
    },
    "manage_nominee_menu": {
      "isEnable": true
    },
    "risk_profile_menu": {
      "isEnable": true
    },
    "holdings_menu": {
      "isEnable": true
    },
    "transaction_history_menu": {
      "isEnable": true
    },
    "settings_menu": {
      "isEnable": true
    },
    "faq_menu": {
      "isEnable": true
    },
    "support_menu": {
      "isEnable": true
    },
    "logout_menu": {
      "isEnable": true
    }
  },
  "profile_screen": {
    "isEnable": true,
    "address_info": {
      "isEnable": true
    },
    "bank_details_info": {
      "isEnable": true
    },
    "kyc_details_info": {
      "isEnable": true
    }
  },
  "manage_nominee_screen": {
    "isEnable": true,
    "add_nominee": {
      "isEnable": true,
      "add_nominee_button": true
    },
    "list_of_nominees": {
      "isEnable": true,
      "update_nominee_button": true
    }
  },
  "add_nominees_screen": {
    "isEnable": true,
    "add_nominees": {
      "isEnable": true,
      "add_nominees2_button": true,
      "add_nominee3_button": true,
      "add_nominees_button": true,
      "delete_nominee2_button": true,
      "delete_nominee3_button": true
    }
  },
  "update_nominees_screen": {
    "isEnable": true,
    "update_nominee": {
      "isEnable": true,
      "add_nominees2_button": true,
      "add_nominee3_button": true,
      "update_nominees_button": true,
      "delete_nominee2_button": true,
      "delete_nominee3_button": true
    }
  },
  "risk_profile_screen": {
    "isEnable": true,
    "risk_profile": {
      "isEnable": true,
      "save_button": true
    }
  },
  "holdings_screen": {
    "isEnable": true,
    "total_holdings": {
      "isEnable": true
    },
    "show_all_holdings_checkbox": {
      "isEnable": true,
      "redeem_button": true,
      "invest_more_button": true,
      "redeem_full_button": true,
      "redeem_partial_button": true,
      "cancel_button": true
    }
  },
  "transaction_history_screen": {
    "isEnable": true,
    "list_of_transactions": {
      "isEnable": true
    }
  },
  "settings_screen": {
    "isEnable": true,
    "disable_notification_element": {
      "isEnable": true
    },
    "disable_fingerprint_pin_element": {
      "isEnable": true
    }
  },
  "faq_screen": {
    "isEnable": true,
    "faq_element": {
      "isEnable": true
    }
  },
  "support_tickets_screen": {
    "isEnable": true,
    "support_tickets": {
      "isEnable": true,
      "create_support_ticket_button": true
    },
    "list_of_tickets": {
      "isEnable": true
    }
  },
  "create_support_ticket_screen": {
    "isEnable": true,
    "create_support": {
      "isEnable": true,
      "submit_button": true
    }
  },
  "tax_savings_funds_screen": {
    "isEnable": true,
    "list_of_tax_saving": {
      "isEnable": true
    }
  },
  "reset_a_flexi_sip": {
    "isEnable": true,
    "reset_flexi_sip": {
      "isEnable": true,
      "reset_sip_button": true
    }
  }
}
  this.port = this.roles.home_screen.portfolio_value_element.isEnable
  this.flexi = this.roles.home_screen.monthly_flexi_sip_element.isEnable
    this.piggybank = this.roles.home_screen.piggy_bank_balance_element.isEnable
    this.invest = this.roles.home_screen.risk_profile_element.isEnable
    this.risk = this.roles.home_screen.invest_more_element.isEnable
    this.taxsaving = this.roles.home_screen.invest_into_tax_savings_funds_element.isEnable
    this.reinitiate = this.roles.home_screen.re_initate_kyc.re_initate_kyc_button

    this.setupflexi = this.roles.flexi_sip_screen.setup_flexi_sip.setup_a_flexi_sip_button
    this.stopflexi = this.roles.flexi_sip_screen.list_of_flexi_sip.stop_flexi_sip_button
    this.resetflexi = this.roles.flexi_sip_screen.list_of_flexi_sip.reset_button

    this.flexisave = this.roles.save_screen.flexi_sip_element.isEnable
    this.piggybanksave = this.roles.save_screen.flexi_sip_element.isEnable

    this.selectfundflexi = this.roles.setup_a_flexi_screen.select_fund.select_fund_button
    this.setupsipflexi = this.roles.setup_a_flexi_screen.select_frequency.setup_sip_button
    this.resetsipflexi = this.roles.reset_a_flexi_sip.reset_flexi_sip.reset_sip_button

    this.purchaseflexi = this.roles.flexi_sip_notification_screen.list_of_flexi_sip.purchase_button
    this.dismissflexi = this.roles.flexi_sip_notification_screen.list_of_flexi_sip.dismiss_button
    this.dismissallflexi = this.roles.flexi_sip_notification_screen.list_of_flexi_sip.clear_all_notification_button

    this.settingspiggybank = this.roles.piggy_bank_screen.piggy_bank_settings.settings_button
    this.changefunspiggybank = this.roles.piggy_bank_settings_screen.change_fund.change_fund_button
    this.submitpiggybank = this.roles.piggy_bank_settings_screen.select_frequency.submit_button

    this.filterinvest = this.roles.invest_screen.invest_filter.apply_filter_button

    this.buyfund = this.roles.fund_details_screen.fund_information.buy_fund

    this.placeorder = this.roles.buy_fund_screen.buy_fund.place_order_button

    this.dashboardmenu = this.roles.menu_bar.dashboard_menu.isEnable
    this.profilemenu = this.roles.menu_bar.profile_menu.isEnable
    this.viewprofilemenu = this.roles.menu_bar.view_profile_menu.isEnable
    this.nomineemenu = this.roles.menu_bar.manage_nominee_menu.isEnable
    this.riskprofilemenu = this.roles.menu_bar.risk_profile_menu.isEnable
    this.holdingsmenu = this.roles.menu_bar.holdings_menu.isEnable
    this.transactionmenu = this.roles.menu_bar.dashboard_menu.isEnable
    this.settingsmenu = this.roles.menu_bar.dashboard_menu.isEnable
    this.faqmenu = this.roles.menu_bar.dashboard_menu.isEnable
    this.supportmenu = this.roles.menu_bar.dashboard_menu.isEnable

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