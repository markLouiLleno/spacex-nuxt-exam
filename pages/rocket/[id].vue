<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useRoute } from 'vue-router'

const route = useRoute()
const rocketId = route.params.id

const GET_ROCKET = gql`
	query GetRocket($id: ID!) {
		rocket(id: $id) {
			name
			description
			first_flight
			height {
				meters
			}
			diameter {
				meters
			}
			mass {
				kg
			}
			stages
		}
	}
`

const { result, loading, error } = useQuery(GET_ROCKET, {
	id: rocketId,
})
</script>

<template>
	<v-container class="py-10">
		<!-- Loading -->
		<v-skeleton-loader v-if="loading" :type="['heading', 'text', 'text', 'text', 'text']" />

		<div v-else-if="error">Error loading rocket details.</div>

		<div v-else>
			<h1 class="text-h4 font-weight-bold mb-4">
				{{ result.rocket.name }}
			</h1>

			<p>
				<strong>Description:</strong>
				{{ result.rocket.description }}
			</p>
			<p>
				<strong>First Flight:</strong>
				{{ result.rocket.first_flight }}
			</p>
			<p>
				<strong>Height:</strong>
				{{ result.rocket.height.meters }} m
			</p>
			<p>
				<strong>Diameter:</strong>
				{{ result.rocket.diameter.meters }} m
			</p>
			<p>
				<strong>Mass:</strong>
				{{ result.rocket.mass.kg }} kg
			</p>
			<p>
				<strong>Stages:</strong>
				{{ result.rocket.stages }}
			</p>

			<v-btn class="mt-6" to="/launches" color="primary">BACK TO LAUNCHES</v-btn>
		</div>
	</v-container>
</template>
