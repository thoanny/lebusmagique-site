// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.scss'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    hooks: {
        'pages:extend'(pages) {
            pages.push({
                name: 'pageOrPost',
                path: '/:catchall(.*)',
                file: '/pages/content.vue'
            })
        }
    },
    modules: ['@nuxtjs/apollo'],
    apollo: {
        clients: {
            default: {
                httpEndpoint: 'https://content.lebusmagique.fr/graphql'
            }
        },
    },
})
