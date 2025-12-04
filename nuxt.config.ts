import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
	future: { compatibilityVersion: 4 },

	// Modules should appear before their configs
	modules: ['@nuxtjs/apollo', ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }]],

	// Apollo module configuration
	apollo: {
		autoImports: true,
		proxyCookies: true,
		clients: {
			default: {
				httpEndpoint: 'https://spacex-production.up.railway.app/',
			},
		},
	},

	// Vuetify + Vite config
	vite: {
		optimizeDeps: {
			include: ['graphql-tag'],
		},
		plugins: [vuetify()],
	},

	// Required for Vuetify
	build: {
		transpile: ['vuetify'],
	},

	// Auto-imports folder
	imports: {
		dirs: ['./stores'],
	},

	compatibilityDate: '2024-11-11',
})
