export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: '//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
    },
  ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/repository.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // buildModules: [
  //   // https://go.nuxtjs.dev/eslint
  //   '@nuxtjs/eslint-module',
  //   // https://go.nuxtjs.dev/stylelint
  //   '@nuxtjs/stylelint-module',
  //   // https://go.nuxtjs.dev/tailwindcss
  //   '@nuxtjs/tailwindcss',
  // ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios','@nuxtjs/markdownit'],
  markdownit: {
    runtime: true // Support `$md()`
  },
  axios: {
    // baseURL: 'https://conduit.productionready.io/api/',
    baseURL: 'https://api.realworld.io/api/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // loading: {
  //   color: 'blue',
  //   height: '5px'
  // },
}
