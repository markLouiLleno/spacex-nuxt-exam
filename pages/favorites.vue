<script setup lang="ts">
import { ref } from 'vue'
import { useFavoritesStore } from '~/stores/favorites'

const favoritesStore = useFavoritesStore()

const dialog = ref(false)
const selectedLaunch = ref<any>(null)

function openModal(launch: any) {
	selectedLaunch.value = launch
	dialog.value = true
}
</script>

<template>
	<v-container class="py-8">
		<h1 class="text-h4 mb-4">Favorite Launches</h1>

		<v-alert v-if="favoritesStore.items.length === 0" type="info" class="mb-4">No favorites yet.</v-alert>

		<v-btn
			v-if="favoritesStore.items.length > 0"
			color="error"
			class="mb-6"
			@click="favoritesStore.items = []"
		>
			Clear Favorites
		</v-btn>

		<v-row>
			<v-col v-for="fav in favoritesStore.items" :key="fav.id" cols="12" sm="6" md="4">
				<v-card class="rounded-xl" height="460" elevation="6">
					<!-- API image -->
					<v-img
						:src="
							fav.links?.flickr_images?.[0] ||
							'https://via.placeholder.com/400x200?text=No+Image'
						"
						height="200"
						cover
					/>

					<v-card-text class="pa-4">
						<div class="text-h6 font-weight-bold">
							{{ fav.mission_name }}
						</div>

						<div class="text-caption mb-2">
							{{ new Date(fav.launch_date_utc).toLocaleDateString() }}
						</div>

						<div class="text-body-2 truncate">
							<strong>Rocket:</strong>
							{{ fav.rocket?.rocket_name }}
							<br />
							<strong>Site:</strong>
							{{ fav.launch_site?.site_name_long }}
							<br />
							<strong>Details:</strong>
							{{ fav.details || 'No details available' }}
						</div>
					</v-card-text>

					<v-card-actions>
						<v-btn variant="text" color="primary" @click="openModal(fav)">MORE INFO</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>

		<!-- MODAL -->
		<v-dialog v-model="dialog" max-width="600">
			<v-card>
				<v-img
					v-if="selectedLaunch?.links?.flickr_images?.[0]"
					:src="selectedLaunch.links.flickr_images[0]"
					height="250"
					cover
				/>

				<v-card-text>
					<h3>{{ selectedLaunch?.mission_name }}</h3>
					<p>{{ selectedLaunch?.details || 'No details available.' }}</p>
				</v-card-text>

				<v-card-actions>
					<v-btn color="primary" block @click="dialog = false">CLOSE</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<style scoped>
.truncate {
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
}
</style>
