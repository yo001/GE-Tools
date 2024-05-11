// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/GE-Tools/' : '/',
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
})
