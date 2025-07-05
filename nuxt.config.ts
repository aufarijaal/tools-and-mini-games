// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  modules: ['@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      'DM Sans': [400, 500, 600, 700]
    },
    display: 'swap'
  }
})
