// app/stores/favorites.ts
import { defineStore } from 'pinia'

export const useFavorites = defineStore('favorites', {
	state: () => ({
		items: [] as any[],
	}),

	getters: {
		isFavorite: (state) => (id: string) => {
			return state.items.some((item) => item.id === id)
		},
	},

	actions: {
		toggleFavorite(launch: any) {
			const exists = this.items.find((item) => item.id === launch.id)
			if (exists) {
				this.items = this.items.filter((item) => item.id !== launch.id)
			} else {
				this.items.push(launch)
			}
		},
	},
})
