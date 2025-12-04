<script setup lang="ts">
const links = [
	{ label: 'Home', to: '/' },
	{ label: 'Launches', to: '/launches' },
	{ label: 'Favorites', to: '/favorites' },
]
</script>

<template>
	<v-app>
		<!-- NAVBAR -->
		<v-app-bar color="primary" dark flat>
			<!-- APP TITLE -->
			<v-app-bar-title class="font-weight-bold">SpaceX App</v-app-bar-title>

			<!-- NAVIGATION LINKS -->
			<v-spacer />

			<v-btn v-for="link in links" :key="link.to" :to="link.to" variant="text" class="text-white">
				{{ link.label }}
			</v-btn>
		</v-app-bar>

		<!-- MAIN CONTENT -->
		<v-main>
			<slot />
		</v-main>

		<!-- FOOTER (optional) -->
		<v-footer color="primary" app class="text-center text-white mt-6">
			<v-col>SpaceX App — {{ new Date().getFullYear() }}</v-col>
		</v-footer>
	</v-app>
</template>

<style scoped>
.v-btn {
	font-size: 15px;
	text-transform: none;
}
</style>
