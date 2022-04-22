import pkg from './package.json'

export default {
  // https://nuxtjs.org/guide/runtime-config
  publicRuntimeConfig: {
    clientVersion: pkg.version
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ZleceniaApp',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }]
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      nativeUI: true
    },
    manifest: {
      name: 'ZleceniaApp',
      short_name: 'ZleceniaApp',
      description: 'ZleceniaApp',
      lang: 'pl'
    },
    icon: {
      purpose: 'any'
    }
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
          maxAge: 60 * 60 * 24 * 365
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/me', method: 'get' }
        }
      }
    },
    plugins: ['~/plugins/auth.ts']
  },

  router: {
    middleware: ['auth']
  },

  axios: {
    browserBaseURL: process.env.API_BASE_URL,
    credentials: true
  },

  bootstrapVue: {
    icons: true
  },

  sweetalert: {
    confirmButtonColor: '#007bff'
  },

  moment: {
    defaultLocale: 'pl',
    locales: ['pl']
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/custom.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuex-persist.ts', mode: 'client' },
    { src: '~/plugins/vuex-orm-axios.ts', mode: 'client' },
    { src: '~/plugins/enums.ts', mode: 'client' },
    { src: '~/plugins/setup-photo-types.ts', mode: 'client' },
    { src: '~/plugins/lodash.ts', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/moment'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'bootstrap-vue/nuxt',
    'vue-sweetalert2/nuxt'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
