import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  components: true,
  head: {
    titleTemplate: 'Acru',
    title: 'Acru',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  /*
   ** Plugins to load before mounting the App
   */
  server: {
    port: 3000,
  },

  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    // '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    'nuxt-helmet',
    '@dansmaculotte/nuxt-security',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'cookie-universal-nuxt',
    'nuxt-vuex-localstorage',
    '@nuxt/http'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxyHeaders: false,
    credentials: false,
    // baseURL: 'https://devstg.acru.in',
    // baseURL: 'https://admin-api.acru.in',
    baseURL: process.env.BASE_URL,
    // baseURL: 'http://localhost:3000',
    headers: {
      common: {
        Accept: 'application/json, */*, text/plain',
      },
    },
  },
  env: {
    baseurlenv: process.env.BASE_URL,
    baselink: process.env.LINK_URL,
    logolink: process.env.LOGO_URL,
    webapplink: process.env.WEBAPP_URL
  },
  http: {
    // proxyHeaders: false
    baseURL: 'https://api.acru.in/common',
  },
  // auth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: { url: '/user/authenticate', method: 'post' },
  //         logout: false
  //       },
  //       tokenRequired: false,
  //       tokenType: false
  //     }
  //   },
  //   redirect: {
  //     login: '/?login',
  //     logout: '/',
  //     user: '/profile',
  //     callback: '/'
  //   }
  // },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#30302f',
          // primary: '#00bcd4',
          secondary: '#009688',
          accent: '#ffc107',
          error: '#f44336',
          warning: '#ff9800',
          info: '#b8b7b6',
          success: '#4caf50',
          black: '#30302f',
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  css: [
    '~/assets/main.css'
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { },
  },
}
