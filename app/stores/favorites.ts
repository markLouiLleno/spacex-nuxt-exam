// ~/stores/favorites.ts
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
	state: () => ({
		items: [] as any[],
	}),

	getters: {
		isFavorite: (state) => (id: string) => state.items.some((l) => l.id === id),
	},

	actions: {
		toggleFavorite(launch: any) {
			const exists = this.items.find((l) => l.id === launch.id)

			if (exists) {
				this.items = this.items.filter((l) => l.id !== launch.id)
			} else {
				// Save FULL SpaceX API object (includes images)
				this.items.push(JSON.parse(JSON.stringify(launch)))
			}
		},
	},

	persist: {
		key: 'favorites',
		paths: ['items'],
	} as any,
})
