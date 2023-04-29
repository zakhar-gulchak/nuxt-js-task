export default {
  modules: ['@nuxtjs/apollo'],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.API_URL
      }
    }
  }
}
