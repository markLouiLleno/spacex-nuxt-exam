import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
	future: { compatibilityVersion: 4 },

	// Tell Nuxt your source directory is inside /app
	srcDir: 'app/',

	// Modules
	modules: ['@nuxtjs/apollo', ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }]],

	// Apollo config
	apollo: {
		autoImports: true,
		proxyCookies: true,
		clients: {
			default: {
				httpEndpoint: 'https://spacex-production.up.railway.app/',
			},
		},
	},

	// Vuetify + Vite
	vite: {
		optimizeDeps: {
			include: ['graphql-tag'],
		},
		plugins: [vuetify()],
	},

	// Vuetify transpile
	build: {
		transpile: ['vuetify'],
	},

	// Auto-imports
	imports: {
		dirs: ['./stores'],
	},

	compatibilityDate: '2024-11-11',
})
