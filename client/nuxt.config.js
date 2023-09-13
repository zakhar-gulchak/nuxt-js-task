export default {
  publicRuntimeConfig: {
    baseUrl: process.env.API_URL || 'http://localhost:4000/graphql'
  },
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss'
  ],
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-config.js'
    }
  }
}
