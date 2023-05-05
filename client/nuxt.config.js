export default {
  // buildModules: [
  //   '@nuxtjs/tailwindcss'
  // ],
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss'
  ],
  // css: [
  //   '@/assets/css/main.css'
  // ],
  // postcss: {
  //   postcssOptions: {
  //     plugins: {
  //       tailwindcss: {},
  //       autoprefixer: {}
  //     }
  //   }
  // },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.API_URL
      }
    }
  }
}
