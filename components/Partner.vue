<template>
  <v-layout>
    <v-flex>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <h1 class="headline mt-5 font-weight-light">{{title}}</h1>
          <v-spacer />
        </v-col>
      </v-row>


      <v-form v-model="valid">

        <v-row>
          <v-col>
            <h2 class="font-weight-light mb-3">Personal Information</h2>
            <br />

            <v-row>
              <v-col class="paddingTop">
              <h4 class="mb-2 textColor">Select Type <span class="starcolor">*</span></h4>
              <v-select
              v-model="select"
              :items="itemss"
              :rules="drules"
              item-text="state"
              label="Select"
              return-object
              outlined
            ></v-select>
            </v-col>         
            </v-row>
  
          <v-row v-if="select">
          <v-col v-if="select.state == 'INDIVIDUAL'" class="paddingTop">
          <h4 class="mb-2 textColor">First Name <span class="starcolor">*</span></h4>
              <v-text-field
                id="name"
                v-on:keypress="isLetter1($event)"
                :rules="namevalidrules"
                v-model="name"
                placeholder="Please Enter The First Name"
                outlined
              ></v-text-field>
              </v-col>   
              </v-row>
              <v-row v-if="select">
          <v-col v-if="select.state == 'INDIVIDUAL'" class="paddingTop">
          <h4 class="mb-2 textColor">Last Name <span class="starcolor">*</span></h4>
              <v-text-field
                id="lastname"
                v-on:keypress="isLetter1($event)"
                :rules="namevalidrules"
                v-model="lastname"
                placeholder="Please Enter The Last Name"
                outlined
              ></v-text-field>
              </v-col>
              </v-row>
              <v-row v-if="select">
          <v-col v-if="select.state == 'COMPANY'" class="paddingTop">
          <h4 class="mb-2 textColor">Company Name <span class="starcolor">*</span></h4>
              <v-text-field
                id="company"
                :rules="rules"
                v-model="company"
                placeholder="Please Enter The Company Name"
                outlined
              ></v-text-field>
              </v-col>
              </v-row>
            <v-row>
            <v-col class="paddingTop">
            <h4 class="mb-2 textColor">GST Number</h4>
              <v-text-field
                id="gst"
                v-model="gst"
                :rules="gstRules"
                maxlength="15"
                placeholder="Please Enter GST Number"
                outlined 
              ></v-text-field>
              </v-col>
              </v-row>
              <v-row>
            <v-col class="paddingTop">
            <h4 class="mb-2 textColor">Phone Number <span class="starcolor">*</span></h4>
              <v-text-field
                id="phone"
                type="text"
                v-on:keypress="isNumber($event)"
                maxlength="10"
                :rules="phoneRules"
                v-model="phone"
                placeholder="Please Enter Phone Number"
                outlined
              ></v-text-field>
              </v-col>
              </v-row>
            <v-row>
            <v-col class="paddingTop">
            <h4 class="mb-2 textColor">Email <span class="starcolor">*</span></h4>
              <v-text-field
              :rules="emailRules"
                id="email"
                v-model="email"
                placeholder="Please Enter Email ID"
                outlined
              ></v-text-field>
              </v-col>
              </v-row>
            
          </v-col>
  
          <v-divider class="mr-4" :inset="inset" vertical></v-divider>
  
          <v-col>
            <h2 class="font-weight-light mb-3">Partner Information</h2>
            <br />

            <v-row>
              <v-col class="paddingTop">
              <h4 class="mb-2 textColor">Select Partner Type <span class="starcolor">*</span></h4>
              <v-select
              v-model="partnerType"
              :items="items1"
              :rules="drules"
              item-text="state"
              label="Select"
              return-object
              outlined
            ></v-select>
            </v-col>
            </v-row>
            <v-row v-if="partnerType" >
            <v-col v-if="partnerType.state == 'ARN'" class="paddingTop">
            <h4 class="textColor">ARN Number <span class="starcolor">*</span></h4>
              <v-text-field
                id="arn"
                v-model="arn"
                :rules="arnRules"
                type="text"
                placeholder="Please Enter ARN Number"
                outlined 
              ></v-text-field>
              </v-col>
              </v-row>
  
              <v-row class="paddingTop1">
                
                <v-col class="">
                  <v-radio-group v-model="radioGroup">
                    <v-radio
                      value="default"
                      label="Default"
                    ></v-radio>
                    <v-radio
                      value="assisted"
                      label="Assisted Mode"
                    ></v-radio>
                    <v-radio
                      value="extended"
                      label="Extended Mode"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
               
                </v-row>
  
              <v-row class="paddingTop1">
              <v-col class="" >
              <v-container fluid>
                  <v-checkbox v-model="checkbox1" label="Add Partner As Super Distributor"></v-checkbox>
              </v-container>
              </v-col>
              </v-row>
  
              <v-row v-if="!checkbox1">
              <v-col class="paddingTop">
              <h4 class="mb-2 textColor">Select Partner Code Prefix <span class="starcolor">*</span></h4>
              <v-autocomplete
              v-model="prefixType"
              :items="items"
              item-text="name"
              outlined
              label="Enter Partner Code Prefix"
            >
            </v-autocomplete>
            </v-select>
            </v-col>
            </v-row>
  
              <v-row v-if="checkbox1">
              <v-col class="paddingTop">
              <h4 class="mb-2 textColor">Partner Code Prefix <span class="starcolor">*</span></h4>
              <v-text-field
                id="prefix"
                type="text"
                maxlength="3"
                :rules="preRules"
                v-on:keypress="isLetter($event)"
                v-model="prefix"
                placeholder="Please Enter Partner Code Prefix"
                outlined
                @input="checkprefix($event)"
              ></v-text-field>
              </v-col>
          </v-row>
  
  
          <v-row v-if="select">
              <v-col v-if="select.state == 'COMPANY'" class="paddingTop">
              <h4 class=" textColor">Upload Partner Logo</h4>
              <v-file-input
              v-model="file"
              ref="file"
              clearable="true"
              id="file"
              accept=".png, .jpg, .jpeg"
              placeholder="Select Logo"
              @change="fileupload()"
            ></v-file-input>
  
  <small> **Should be .png, .jpg less than 5MB</small>
              </v-col>
              </v-row>
  
              <v-row v-if="select" >
              <v-col v-if="select.state == 'INDIVIDUAL'" class="paddingTop">
              <h4 class=" textColor">Upload Partner Photo</h4>
              <v-file-input
              v-model="file"
              clearable="true" 
              ref="file"
              id="file"
              accept=".png, .jpg, .jpeg"
              placeholder="Select Photo"
              @change="fileupload()"
            ></v-file-input>
  
  <small> **Should be .png, .jpg less than 5MB</small>
              </v-col>
              </v-row>

              <v-row>
                <v-col class="paddingTop mb-4">
                <h4 class="textColor">Upload ARN Certificate</h4>
                <v-file-input
                v-model="arnDoc"
                ref="kyc"
                id="kyc"
                accept=".png, .jpeg, .pdf, .jpg"
                placeholder="Select Document"
                @change="fileuploadarn()"
              ></v-file-input>
                  <small> **Should be .png, .jpg, .pdf less than 5MB</small>
                </v-col>
                </v-row>

                <v-row>
                  <v-col class="paddingTop">
                  <h4 class="mb-2 textColor">Select Subscription Pack <span class="starcolor">*</span></h4>
                  <v-select
                  v-model="package"
                  :items="packs"
                  :rules="drules"
                  item-text="package_name"
                  label="Select"
                  return-object
                  outlined
                ></v-select>
                </v-col>
                </v-row>
            
          </v-col>
  
          <v-divider class="mr-4" :inset="inset" vertical></v-divider>
  
          <v-col>
            <h2 class="font-weight-light mb-3">KYC Documents</h2>
            <br />

            <v-row>
              <v-col class="paddingTop">
              <h4 class="mb-2 textColor">PAN Number <span class="starcolor">*</span></h4>
                <v-text-field
                  id="pan"
                  v-on:keypress="isLetter2($event)"
                  v-model="pan"
                  :rules="panRules"
                  maxlength="10"
                  placeholder="Please Enter PAN Number"
                  outlined 
                ></v-text-field>
                </v-col>
                </v-row>
                <v-row>
                  <v-col class="paddingTop">
                  <h4 class="mb-2 textColor">Address <span class="starcolor">*</span></h4>
                  <v-textarea
                    :rules="[v => !!v || 'This Field is required']"
                    id="address"
                    v-model="address"
                    placeholder="Please Enter Address"
                    outlined
                  ></v-textarea>
                  </v-col>
              </v-row>
      
              <v-row>
                  <v-col class="paddingTop">
                  <h4 class="mb-2 textColor">City <span class="starcolor">*</span></h4>
                  <v-text-field
                    id="city"
                    v-model="city"
                    :rules="rules"
                    placeholder="Please Enter City"
                    outlined
                  ></v-text-field>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col class="paddingTop">
                  <h4 class="mb-2 textColor">State <span class="starcolor">*</span></h4>
                  <v-text-field
                    id="state"
                    v-model="state"
                    :rules="rules"
                    placeholder="Please Enter State"
                    outlined
                  ></v-text-field>
                  </v-col>
              </v-row>
              <v-row>
                  <v-col class="paddingTop">
                  <h4 class="mb-2 textColor">Pincode <span class="starcolor">*</span></h4>
                  <v-text-field
                    id="pin"
                    :rules="pinRules"
                    type="text"
                    maxlength="6"
                    v-on:keypress="isNumber($event)"
                    v-model="pin"
                    placeholder="Please Enter Pincode"
                    outlined
                  ></v-text-field>
                  </v-col>
              </v-row>

            <v-row >
              <v-col class="paddingTop mb-4">
            <h4 class=" textColor">Upload PAN Card <span class="starcolor">*</span></h4>
            <v-file-input
            v-model="panDoc"
            ref="kyc"
            :rules="arnRules"
            id="kyc"
            accept=".png, .jpeg, .pdf, .jpg"
            placeholder="Select Document"
            @change="fileuploadpan()"
          ></v-file-input>
              <small>**Should be .png, .jpg, .pdf less than 5MB</small>
            </v-col>
            </v-row>

            <v-row>
            <v-col class="paddingTop mb-4">
            <h4 class=" textColor">Upload Aadhaar</h4>
            <v-file-input
            v-model="aadhaarDoc"
            ref="kyc"
            id="kyc"
            accept=".png, .jpeg, .pdf, .jpg"
            placeholder="Select Document"
            @change="fileuploadaadhaar()"
          ></v-file-input>
                <small> **Should be .png, .jpg, .pdf less than 5MB</small>
            </v-col>
            </v-row>
            </v-col>
            
        </v-row>

      </v-form>



























      <!-- <v-form v-model="valid">
      <v-row align="center" justify="center">
            <v-col class="paddingTop" cols="12" sm="6">
            <h4 class="mb-2 textColor">Select Type <span class="starcolor">*</span></h4>
            <v-select
            v-model="select"
            :items="itemss"
            :rules="drules"
            item-text="state"
            label="Select"
            return-object
            outlined
          ></v-select>
          </v-col>         
          </v-row>

        <v-row v-if="select" align="center" justify="center">
        <v-col v-if="select.state == 'INDIVIDUAL'" class="paddingTop" cols="12" sm="6">
        <h4 class="mb-2 textColor">First Name <span class="starcolor">*</span></h4>
            <v-text-field
              id="name"
              v-on:keypress="isLetter1($event)"
              :rules="namevalidrules"
              v-model="name"
              placeholder="Please Enter The First Name"
              outlined
            ></v-text-field>
            </v-col>
            <v-col v-if="select.state == 'INDIVIDUAL'" class="paddingTop" cols="12" sm="6">
              <h4 class="mb-2 textColor">Last Name <span class="starcolor">*</span></h4>
                  <v-text-field
                    id="lastname"
                    v-on:keypress="isLetter1($event)"
                    :rules="namevalidrules"
                    v-model="lastname"
                    placeholder="Please Enter The Last Name"
                    outlined
                  ></v-text-field>
                  </v-col>
            </v-row>
            <v-row v-if="select" align="center" justify="center">
        <v-col v-if="select.state == 'INDIVIDUAL'" class="paddingTop" cols="12" sm="6">
        <h4 class="mb-2 textColor">Last Name <span class="starcolor">*</span></h4>
            <v-text-field
              id="lastname"
              v-on:keypress="isLetter1($event)"
              :rules="namevalidrules"
              v-model="lastname"
              placeholder="Please Enter The Last Name"
              outlined
            ></v-text-field>
            </v-col>
            </v-row>
            <v-row v-if="select" align="center" justify="center">
        <v-col v-if="select.state == 'COMPANY'" class="paddingTop" cols="12" sm="6">
        <h4 class="mb-2 textColor">Company Name <span class="starcolor">*</span></h4>
            <v-text-field
              id="company"
              :rules="rules"
              v-model="company"
              placeholder="Please Enter The Company Name"
              outlined
            ></v-text-field>
            </v-col>
            </v-row>
          <v-row align="center" justify="center">
          <v-col class="paddingTop" cols="12" sm="6">
          <h4 class="mb-2 textColor">GST Number</h4>
            <v-text-field
              id="gst"
              v-model="gst"
              :rules="gstRules"
              maxlength="15"
              placeholder="Please Enter GST Number"
              outlined 
            ></v-text-field>
            </v-col>
            </v-row>
            <v-row align="center" justify="center">
          <v-col class="paddingTop" cols="12" sm="6">
          <h4 class="mb-2 textColor">PAN Number <span class="starcolor">*</span></h4>
            <v-text-field
              id="pan"
              v-on:keypress="isLetter2($event)"
              v-model="pan"
              :rules="panRules"
              maxlength="10"
              placeholder="Please Enter PAN Number"
              outlined 
            ></v-text-field>
            </v-col>
            </v-row>
            <v-row align="center" justify="center">
          <v-col class="paddingTop" cols="12" sm="6">
          <h4 class="mb-2 textColor">Phone Number <span class="starcolor">*</span></h4>
            <v-text-field
              id="phone"
              type="text"
              v-on:keypress="isNumber($event)"
              maxlength="10"
              :rules="phoneRules"
              v-model="phone"
              placeholder="Please Enter Phone Number"
              outlined
            ></v-text-field>
            </v-col>
            </v-row>
          <v-row align="center" justify="center">
          <v-col class="paddingTop" cols="12" sm="6">
          <h4 class="mb-2 textColor">Email <span class="starcolor">*</span></h4>
            <v-text-field
            :rules="emailRules"
              id="email"
              v-model="email"
              placeholder="Please Enter Email ID"
              outlined
            ></v-text-field>
            </v-col>
            </v-row>
            <v-row align="center" justify="center">
            <v-col class="paddingTop" cols="12" sm="6">
            <h4 class="mb-2 textColor">Address <span class="starcolor">*</span></h4>
            <v-textarea
              :rules="[v => !!v || 'This Field is required']"
              id="address"
              v-model="address"
              placeholder="Please Enter Address"
              outlined
            ></v-textarea>
            </v-col>
        </v-row>

        <v-row align="center" justify="center">
            <v-col class="paddingTop" cols="12" sm="6">
            <h4 class="mb-2 textColor">City <span class="starcolor">*</span></h4>
            <v-text-field
              id="city"
              v-model="city"
              :rules="rules"
              placeholder="Please Enter City"
              outlined
            ></v-text-field>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col class="paddingTop" cols="12" sm="6">
            <h4 class="mb-2 textColor">State <span class="starcolor">*</span></h4>
            <v-text-field
              id="state"
              v-model="state"
              :rules="rules"
              placeholder="Please Enter State"
              outlined
            ></v-text-field>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col class="paddingTop" cols="12" sm="6">
            <h4 class="mb-2 textColor">Pincode <span class="starcolor">*</span></h4>
            <v-text-field
              id="pin"
              :rules="pinRules"
              type="text"
              maxlength="6"
              v-on:keypress="isNumber($event)"
              v-model="pin"
              placeholder="Please Enter Pincode"
              outlined
            ></v-text-field>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col class="paddingTop" cols="12" sm="6">
            <h4 class="mb-2 textColor">Select Partner Type <span class="starcolor">*</span></h4>
            <v-select
            v-model="partnerType"
            :items="items1"
            :rules="drules"
            item-text="state"
            label="Select"
            return-object
            outlined
          ></v-select>
          </v-col>
          </v-row>
          <v-row v-if="partnerType" align="center" justify="center">
          <v-col v-if="partnerType.state == 'ARN'" class="paddingTop" cols="12" sm="6">
          <h4 class="textColor">ARN Number <span class="starcolor">*</span></h4>
            <v-text-field
              id="arn"
              v-model="arn"
              :rules="arnRules"
              type="text"
              placeholder="Please Enter ARN Number"
              outlined 
            ></v-text-field>
            </v-col>
            </v-row>

            <v-row class="paddingTop1" align="center" justify="center">
              <v-col></v-col>
              <v-col class="" cols="12" sm="6">
                <v-radio-group v-model="radioGroup">
                  <v-radio
                    value="default"
                    label="Default"
                  ></v-radio>
                  <v-radio
                    value="assisted"
                    label="Assisted Mode"
                  ></v-radio>
                  <v-radio
                    value="extended"
                    label="Extended Mode"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col></v-col>
              </v-row>

            <v-row class="paddingTop1" align="center" justify="center">
            <v-col class="" cols="12" sm="6">
            <v-container fluid>
                <v-checkbox v-model="checkbox1" label="Add Partner As Super Distributor"></v-checkbox>
            </v-container>
            </v-col>
            </v-row>

            <v-row v-if="!checkbox1" align="center" justify="center">
            <v-col class="paddingTop" cols="12" sm="6">
            <h4 class="mb-2 textColor">Select Partner Code Prefix <span class="starcolor">*</span></h4>
            <v-autocomplete
            v-model="prefixType"
            :items="items"
            item-text="name"
            outlined
            label="Enter Partner Code Prefix"
          >
          </v-autocomplete>
          </v-select>
          </v-col>
          </v-row>

            <v-row v-if="checkbox1" align="center" justify="center">
            <v-col class="paddingTop" cols="12" sm="6">
            <h4 class="mb-2 textColor">Partner Code Prefix <span class="starcolor">*</span></h4>
            <v-text-field
              id="prefix"
              type="text"
              maxlength="3"
              :rules="preRules"
              v-on:keypress="isLetter($event)"
              v-model="prefix"
              placeholder="Please Enter Partner Code Prefix"
              outlined
              @input="checkprefix($event)"
            ></v-text-field>
            </v-col>
        </v-row>


        <v-row v-if="select" align="center" justify="center">
            <v-col v-if="select.state == 'COMPANY'" class="paddingTop" cols="12" sm="6">
            <h4 class=" textColor">Upload Partner Logo</h4>
            <v-file-input
            v-model="file"
            ref="file"
            id="file"
            accept=".png, .jpg, .jpeg"
            placeholder="Select Logo"
            @change="fileupload()"
          ></v-file-input>

<small> **Should be .png, .jpg less than 5MB</small>
            </v-col>
            </v-row>

            <v-row v-if="select" align="center" justify="center">
            <v-col v-if="select.state == 'INDIVIDUAL'" class="paddingTop" cols="12" sm="6">
            <h4 class=" textColor">Upload Partner Photo</h4>
            <v-file-input
            v-model="file"
            ref="file"
            id="file"
            accept=".png, .jpg, .jpeg"
            placeholder="Select Photo"
            @change="fileupload()"
          ></v-file-input>

<small> **Should be .png, .jpg less than 5MB</small>
            </v-col>
            </v-row>

            <v-row align="center" justify="center">
            <v-col class="paddingTop" cols="12" sm="6">
              <h3 class=" mt-2 mb-5 textColor">Upload KYC Documents</h3>
            </v-col>
            </v-row>

            <v-row align="center" justify="center">
              <v-col class="paddingTop mb-4" cols="12" sm="6">
            <h4 class=" textColor">Upload PAN Card <span class="starcolor">*</span></h4>
            <v-file-input
            v-model="panDoc"
            ref="kyc"
            :rules="arnRules"
            id="kyc"
            accept=".png, .jpeg, .pdf, .jpg"
            placeholder="Select Document"
            @change="fileuploadpan()"
          ></v-file-input>
<small>**Should be .png, .jpg, .pdf less than 5MB</small>
            </v-col>
            </v-row>

            <v-row align="center" justify="center">
            <v-col class="paddingTop mb-4" cols="12" sm="6">
            <h4 class=" textColor">Upload Aadhaar</h4>
            <v-file-input
            v-model="aadhaarDoc"
            ref="kyc"
            id="kyc"
            accept=".png, .jpeg, .pdf, .jpg"
            placeholder="Select Document"
            @change="fileuploadaadhaar()"
          ></v-file-input>
<small> **Should be .png, .jpg, .pdf less than 5MB</small>
            </v-col>
            </v-row>
            <v-row align="center" justify="center">
            <v-col class="paddingTop mb-4" cols="12" sm="6">
            <h4 class="textColor">Upload ARN Certificate</h4>
            <v-file-input
            v-model="arnDoc"
            ref="kyc"
            id="kyc"
            accept=".png, .jpeg, .pdf, .jpg"
            placeholder="Select Document"
            @change="fileuploadarn()"
          ></v-file-input>
<small> **Should be .png, .jpg, .pdf less than 5MB</small>
            </v-col>
            </v-row>

      </v-form> -->
      <br />
      <v-row align="center" justify="center">
        <v-col></v-col>
        <v-col></v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-spacer />
          <v-btn
          :disabled="!valid"
            color="black white--text"
            large
            @click="called"
            >{{btntitle}}</v-btn
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
      search: "",
      aadhaarDoc: null,
      panDoc: null,
      arnDoc: null,
      valid: true,
      select: null,
      items: null,
      items2: [{ state: 'Aadhaar' }, { state: 'PAN' }, { state: 'ID Proof'}],
      itemss: [{ state: 'COMPANY' }, { state: 'INDIVIDUAL' }],
      prefixType: 'Acru-ACR',
      name: null,
      lastname: null,
      gst: null,
      checkbox: false,
      checkbox1: false,
      checkbox2: false,
      phone: null,
      email: null,
      address: null,
      city: null,
      state: null,
      prefix: null,
      pin: null,
      partnerType: null,
      arn: null,
      pan: null,
      logoFile: null,
      file: null,
      kyc: null,
      imgId: null,
      company: null,
      formdata: new FormData(),
      formdata1: new FormData(),
      formdata2: new FormData(),
      formdata3: new FormData(),
      items1: [{ state: 'ARN', value: 'A' }, { state: 'Non-ARN', value: 'N' }],

      emailRules: [
        (v) => !!v || 'Email is required',
        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
      ],
      phoneRules: [
        (v) => !!v || 'Phone number is required',
        v => (v && v.length == 10) || "This field must be equal to 10 digits"
      ],
      panRules: [
        (v) => !!v || 'PAN number is required',
        v => (v && v.length == 10) || "This field must be equal to 10 digits"
      ],
      arnRules: [
        (v) => !!v || 'This field is required',
      ],
      drules: [
        (v) => !!v || 'This section is required',
      ],

      rules: [
        (v) => !!v || 'This field is required',
        v => (v && v.length < 50) || "This field must not be greater than to 50 characters",
        v => (v && v.length < 50) || "This field must be less than 50 Characters"
      ],
      preRules: [
        (v) => !!v || 'This field is required',
        v => (v && v.length == 3) || "Prefix must be equal to 3 Characters"
      ],
      pinRules: [
        (v) => !!v || 'This field is required',
        v => (v && v.length == 6) || "Pincode must be equal to 6 digits"
      ],
      gstRules: [
         v => {
          if (v) return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(v) || 'GST must be valid';
          else return true;
        },
      ],
      namevalidrules: [
      (v) => !!v || 'This field is required',
      v => (v && v.length < 50) || "This field must not be greater than to 50 characters",
      v => {
          if (v) return /^[a-zA-Z ]*$/.test(v) || 'Name Cannot Contain Numbers Or Special Characters';
          else return true;
        },
      ],
      
      snackbar: false,
      text: '',
      color: '',
      logo_id: null,
      aadhaar_id: null,
      pan_id: null,
      arn_id: null,
      logoValid: true,
      aadhaarValid: true,
      panValid: true,
      arnValid: true,
      partprefix: null,
      radioGroup: 'default',
      isassisted: false,
      isextended: false,
      title: 'Add A Partner',
      btntitle: 'Add Partner',
      inset: false,
      package: {id: 1, package_name: "Default Package - Rs. 30.00", price: "30.00"},
      packs: []
    }
  },
  mounted() {
    this.check()
  },
  methods: {
    async check() {
      this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
    try {
      const result = await this.$axios.$get(
          '/admin/partner/partnerprefix/get'
        )
        this.items = result
        
    } catch(error){
        console.log(error)
    }

    try {
      const result = await this.$axios.$post(
          '/admin/partner/packages/get'
        )
        this.packs = result.data
        
    } catch(error){
        console.log(error)
    }

    },
    async fileupload() {
      if (this.file == null) {
        this.formdata = new FormData()
        this.logo_id = null
      } else {
      if (this.file.size >= 6103947) {
        this.file = null
        this.formdata = new FormData()
        this.logo_id = null
        this.snackbar = true
        this.$refs.file.value=null
        this.color = 'red'
        this.text = 'Image should be smaller than 5MB'
      } else { 
        this.formdata.append('logo', this.file)
      this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        this.$axios.setHeader('Content-Type', 'multipart/form-data')
    try {
      const result = await this.$axios.$post(
          '/admin/partner/imageupload',
          this.formdata,
        )
        this.logo_id = result.logoid
        this.snackbar = true
        this.color = 'success'
        this.text = result.message
        this.logoValid = false
    } catch(error){
      this.file == null
        this.snackbar = true
        this.color = 'red'
        this.text = error.response.data.message
    }
      }
      }

  },
  async fileuploadaadhaar() {
    if (this.aadhaarDoc == null) {
        this.formdata1 = new FormData()
        this.aadhaar_id = null
      } else {
      if (this.aadhaarDoc.size >= 6103947) {
        this.snackbar = true
        this.color = 'red'
        this.text = 'File should be smaller than 5MB'
        this.aadhaarDoc = null
        this.formdata1 = new FormData()
        this.aadhaar_id = null
      } else { 
        this.formdata1.append('logo', this.aadhaarDoc)
      this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        this.$axios.setHeader('Content-Type', 'multipart/form-data')
    try {
      const result = await this.$axios.$post(
          '/admin/partner/imageupload',
          this.formdata1
        )
        this.aadhaar_id = result.logoid
        this.snackbar = true
        this.color = 'success'
        this.text = result.message
        this.aadhaarValid = false
    } catch(error){
        console.log(error)
        this.aadhaarDoc == null
        this.snackbar = true
        this.color = 'red'
        this.text = error.response.data.message
    }
      }
      }

  },
    async fileuploadpan() {
      if (this.panDoc == null) {
        // this.snackbar = true
        // this.color = 'red'
        // this.text = 'Please Select A File To Upload'
        this.formdata2 = new FormData()
        this.pan_id = null
      } else {
      if (this.panDoc.size >= 6103947) {
        this.panDoc = null
        this.formdata2 = new FormData()
        this.pan_id = null
        this.snackbar = true
        this.color = 'red'
        this.text = 'File should be smaller than 5MB'
      } else { 
        this.formdata2.append('logo', this.panDoc)
      this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        this.$axios.setHeader('Content-Type', 'multipart/form-data')
    try {
      const result = await this.$axios.$post(
          '/admin/partner/imageupload',
          this.formdata2
        )
        this.pan_id = result.logoid
        this.snackbar = true
        this.color = 'success'
        this.text = result.message
        this.panValid = false
    } catch(error){
        console.log(error)
        this.panDoc == null
        this.snackbar = true
        this.color = 'red'
        this.text = error.response.data.message
    }
      }
      }

  },
    async fileuploadarn() {
      if (this.arnDoc == null) {
        // this.snackbar = true
        // this.color = 'red'
        // this.text = 'Please Select A File To Upload'
        this.formdata3 = new FormData()
        this.arn_id = null
      } else {
      if (this.arnDoc.size >= 6103947) {
        this.arnDoc = null
        this.formdata3 = new FormData()
        this.arn_id = null
        this.snackbar = true
        this.color = 'red'
        this.text = 'File should be smaller than 5MB'
        this.$refs.kyc.reset();
      } else { 
        this.formdata3.append('logo', this.arnDoc)
      // this.$axios.setHeader(
      //     'Authorization',
      //     'bearer ' + this.$store.state.sessionStorage.token
      //   )
      //   this.$axios.setHeader('Content-Type', 'multipart/form-data')
    try {
      this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
        this.$axios.setHeader('Content-Type', 'multipart/form-data')
      const result = await this.$axios.$post(
          '/admin/partner/imageupload',
          this.formdata3
        )
        this.arn_id = result.logoid
        this.snackbar = true
        this.color = 'success'
        this.text = result.message
        this.arnValid = false
    } catch(error){
      this.arnDoc == null
        console.log(error)
        this.snackbar = true
        this.color = 'red'
        this.text = error.response.data.message
    }
      }
      }

  },
     async called() {
        if (this.select.state == 'INDIVIDUAL') {
          this.company = null
        } else {
          this.name = null
          this.lastname = null
        }
       
        if (this.partnerType.value == 'N') {
          this.arn = null
        }
        if (this.checkbox1 == true) {
          this.partprefix = this.prefix
        } else {
          this.partprefix = this.prefixType
        }

        if(this.radioGroup == 'assisted'){
          this.isassisted = true
          this.isextended = false
        }else if(this.radioGroup == 'extended'){
          this.isassisted = false
          this.isextended = true
        }else{
          this.isassisted = false
          this.isextended = false
        }

        this.$axios.setHeader('Content-Type', 'application/json')
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )

        try {
        const result = await this.$axios.$post(
          '/admin/partner/createpartner', {firstname: this.name, lastname: this.lastname, company_name: this.company, business_type: this.select.state, partner_type: this.partnerType.value, partner_prefix: this.partprefix,
          partner_logo: this.logo_id, mobile: this.phone, email: this.email, address: {address: this.address}, partner_city: this.city, partner_state: this.state, pincode: this.pin, arn_number: this.arn, partner_gst: this.gst, id_proof: this.aadhaar_id, address_proof: this.pan_id, arn_certificate: this.arn_id, pan: this.pan, super_distributor: this.checkbox1, assistance_allowed: this.isassisted, extended_partner: this.isextended, package_id: this.package.id}
        )
        this.values = result
        this.snackbar = true
        this.text = this.values.message
        this.color = 'success'
        setTimeout(function(){ location.reload(); }, 2000);
      } catch(error){
        const status = parseInt(error.response && error.response.status)
        this.snackbar = true
          this.text = error.response.data.error
          this.color = 'error'
      }
  },
     isLetter(e) {
       let char = String.fromCharCode(e.keyCode); 
        if(/^[A-Za-z]+$/.test(char))
          return true; 
        else e.preventDefault();
      },
      isLetter1(e) {
       let char = String.fromCharCode(e.keyCode); 
        if(/^[a-zA-Z ]*$/.test(char))
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

    gstinformat(e) {
      e = (e) ? e : window.event;
      var charCode = (e.which) ? e.which : e.keyCode;
        let gstinformat = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(e);  
        if(gstinformat) {  
        // if (/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(charCode)) {    
            return e;    
        } else {    
          return e.preventDefault();
        }  


    //   let regTest = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/.test(g)
    //  if(regTest){
        
    //     return g
    // } else {
    //   g.preventDefault();
    // }
    },
    checkcancel() {
      if (this.file == null) {
        this.formdata = new FormData()
        this.aadhaar_id = null
        this.logoValid = true
      }
    }, 
    checkcancela() {
      if (this.aadhaarDoc == null) {
        this.formdata1 = new FormData()
        this.pan_id = null
        this.aadhaarValid = true
      } 
    },
    checkcancelp() {
      if (this.panDoc == null) {
        this.formdata2 = new FormData()
        this.arn_id = null
        this.panValid = true
      }
    },
    checkcancelc() {
      if (this.arnDoc == null) {
        this.formdata3 = new FormData()
        this.arnValid = true
      }
    },
    getname(val) {
      return val.partner_prefix + ' ' + '-' + ' ' + val.name
    },
    async checkprefix(val) {
      if (val.length >= 3) { 
        this.$axios.setHeader(
          'Authorization',
          'bearer ' + this.$store.state.sessionStorage.token
        )
      try {
        val = val.toUpperCase();
        const result = await this.$axios.$get(
          '/admin/partner/validate/prefix/' + val
        )
        } catch(error) {
          const status = parseInt(error.response && error.response.status)
          if (status == 404) {
          this.snackbar = true
          this.color = 'red'
          this.text = 'Prefix Already Exists'  
          this.prefix = null
          }  
        }
      } else {

      }
    },
    uppercase() {
        this.prefix = this.prefix.toUpperCase();
    }
  }
}
</script>

<style>
.paddingTop {
    margin-top: -20px;
}
.paddingTop1 {
    margin-top: -40px;
}
.textColor {
  color: #676b68 !important;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus
input:-webkit-autofill,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
-webkit-text-fill-color: black !important;
-webkit-box-shadow: 0 0 0px 0px #fff inset!important;
transition: background-color 5000s ease-in-out 0s!important;
}
.starcolor {
  color: red !important;
}
#prefix {
  text-transform: uppercase !important;
}
#pan {
  text-transform: uppercase !important;
}
::-webkit-input-placeholder { /* WebKit browsers */
    text-transform: none;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    text-transform: none;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    text-transform: none;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    text-transform: none;
}
::placeholder { /* Recent browsers */
    text-transform: none;
}

</style>
