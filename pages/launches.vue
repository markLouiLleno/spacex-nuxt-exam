<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed, ref } from 'vue'
import { useFavoritesStore } from '~/stores/favorites'

const favoritesStore = useFavoritesStore()

const dialog = ref(false)
const selectedLaunch = ref<any>(null)

function openModal(launch: any) {
	selectedLaunch.value = launch
	dialog.value = true
}

// SpaceX GraphQL query
const GET_LAUNCHES = gql`
	query GetLaunches {
		launchesPast(limit: 50) {
			id
			mission_name
			launch_date_utc
			rocket {
				rocket_name
			}
			launch_site {
				site_name_long
			}
			details
			links {
				flickr_images
			}
		}
	}
`

const { result } = useQuery(GET_LAUNCHES)

const { selectedYear, filterByYear } = useLaunchFilters()
const { sortOrder, sortLaunches } = useLaunchSort()

const years = computed(() => {
	if (!result.value?.launchesPast) return []
	return [
		...new Set(result.value.launchesPast.map((l: any) => new Date(l.launch_date_utc).getFullYear())),
	].sort()
})

const filteredAndSortedLaunches = computed(() => {
	if (!result.value?.launchesPast) return []
	return sortLaunches(filterByYear(result.value.launchesPast))
})

// FIXED FAVORITES: save full API object
function addToFavorites(launch: any) {
	favoritesStore.toggleFavorite(JSON.parse(JSON.stringify(launch)))
}
</script>

<template>
	<v-container class="py-8">
		<v-row class="mb-6">
			<v-col cols="12" sm="6" md="3">
				<v-select v-model="selectedYear" label="Filter by Year" :items="years" clearable />
			</v-col>
			<v-col cols="12" sm="6" md="3">
				<v-select v-model="sortOrder" label="Sort by Date" :items="['Ascending', 'Descending']" />
			</v-col>
		</v-row>

		<v-row v-if="filteredAndSortedLaunches.length">
			<v-col v-for="launch in filteredAndSortedLaunches" :key="launch.id" cols="12" sm="6" md="4">
				<v-card class="rounded-xl" height="460" elevation="6">
					<v-img
						:src="
							launch.links?.flickr_images?.[0] ||
							'https://via.placeholder.com/400x200?text=No+Image'
						"
						height="200"
						cover
					/>

					<v-card-text class="pa-4">
						<div class="text-h6 font-weight-bold">{{ launch.mission_name }}</div>

						<div class="text-caption mb-2">
							{{ new Date(launch.launch_date_utc).toLocaleDateString() }}
						</div>

						<div class="text-body-2 truncate">
							<strong>Rocket:</strong>
							{{ launch.rocket?.rocket_name }}
							<br />
							<strong>Site:</strong>
							{{ launch.launch_site?.site_name_long }}
							<br />
							<strong>Details:</strong>
							{{ launch.details || 'No details available' }}
						</div>
					</v-card-text>

					<v-card-actions class="px-4 pb-3 d-flex justify-space-between">
						<v-btn variant="text" color="primary" @click="openModal(launch)">MORE INFO</v-btn>

						<v-btn icon @click="addToFavorites(launch)">
							<v-icon :color="favoritesStore.isFavorite(launch.id) ? 'red' : 'grey'">
								{{ favoritesStore.isFavorite(launch.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
							</v-icon>
						</v-btn>
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
