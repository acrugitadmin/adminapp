/* eslint eqeqeq: 0 */

export const state = () => ({
  val: null,
  user: null,
  token: null,
  loggedIn: false,
  log: false,
  users: [],
  name: null,
  obj: null,
  test: null,
  state1: null,
  state2: null,
  user_email: null,
  value: null,
  lists: null,
  logs: null,
  userType: null,
  kyc: null,
  act: null,
  piggy: null,
  port: null,
  sms: null,
  rbac: null,
  pageName: null,
  partner_code: null,
  business_type: null,
  data: null,
  firstname: null,
  partner_id: null,
  invite: null,
  mobile: null,
  code: null,
  partner_code_admin: null,
  call_partner: null,
  partnername: null,
  link: null,
  assistedinfo: null,
  user_theme: null,
  edit_user: null,
  edit_partner: null,
  email_exists: null,
  email_token: null,
  theme_id: null,
  edit_subpartner: null,
  partnercode_sub: null,
})

export const mutations = {
  updateUser(state, token) {
    state.loggedIn = true
    state.user_email = token.data.email_id
    state.userType = token.data.role_name
    state.token = token.token
    state.rbac = token.data.role
    state.partner_code = token.data.partner_code
    state.business_type = token.data.business_type
    state.data = token.data
    state.firstname = token.data.firstname
  },
  deleteUser(state, values) {
    state.loggedIn = null
    state.lists = null
    state.log = null
    state.token = null
    state.val = null
    state.act = null
    state.rbac = null
    state.port = null
    state.piggy = null
    state.token = null
    state.user_email = null
    state.kyc = null
    state.partner_code = null
    state.business_type = null
    state.data = null
    state.userType = null
    state.firstname = null
    state.partnercode_sub = null
  },
  setItems(state, val) {
    state.val = val
  },
  setInfo(state, value) {
    state.value = value
  },
  setKyc(state, value) {
    state.kyc = value
  },
  setInvite(state, value) {
    state.invite = value
  },
  setAct(state, val) {
    state.act = val
  },
  setPiggy(state, val) {
    state.piggy = val
  },
  setPort(state, val) {
    state.port = val
  },
  setSms(state, val) {
    state.sms = val
  },
  setName(state, name) {
    state.pageName = name
  },
  setId(state, id) {
    state.partner_id = id
  },
  setMobile(state, mobile) {
    state.mobile = mobile
  },
  setPartner(state, val) {
    state.code = val
  },
  setPartnerCode(state, val) {
    state.partner_code_admin = val
  },
  setValueForCall(state, val) {
    state.call_partner = val
  },
  setPartnerName(state, val) {
    state.partnername = val
  },
  setLink(state, val) {
    state.link = val
  },
  setAssistedinfo(state, val) {
    state.assistedinfo = val
  },
  setTheme(state, value) {
    state.user_theme = value
  },
  editUser(state, value) {
    state.edit_user = value
  },
  editPartner(state, value) {
    state.edit_partner = value
  },
  emailExists(state, value) {
    state.email_exists = value
  },
  emailToken(state, value) {
    state.email_token = value
  },
  setThemeid(state, value) {
    state.theme_id = value
  },
  editsubPartner(state, value) {
    state.edit_subpartner = value
  },
  checkifSub(state, value) {
    state.partnercode_sub = value
  }
}

export const actions = {
  userNames({ commit, $axios, state, userss }) {
    this.$axios.$get('/common/all/users').then((res) => {
      commit('setItems', res)
    })
  },
  logList({ commit, $axios, state }) {
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    today = yyyy + '-' + mm + '-' + dd
    this.$axios.setHeader('Authorization', 'bearer ' + this.token)
    this.$axios.$get('/dashboard/get/' + today).then((res) => {
      commit('setItems', res)
    })
  },
}

export const getters = {
  getName($axios, state, lists) {
    return lists
  },
  getBlogs(state, blogs) {
    return state.blogs
  },
}
