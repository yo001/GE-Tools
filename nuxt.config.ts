// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  app: {
    head: {
      title: 'GE-Tools',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    baseURL: process.env.NODE_ENV === 'production' ? '/GE-Tools/' : '/',
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
})
