export default {
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
