export default {
  head: {
    title: 'rest_countries_nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [
    '@/assets/css/app.scss'
  ],
  plugins: [
    {
      src: "@/plugins/axios-accessor",
    },
    {
      src: "@/plugins/axios",
    },
  ],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
  ],
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: 'https://restcountries.com/v2/',
  },
  render: {
    bundleRenderer: {
      runInNewContext: false,
    },
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-private-methods", { loose: true }],
        ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
      ],
    },
  },
}
