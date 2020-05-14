<template>
	<v-container class="mb-12">
		<div class="row">
			<div
				class="col-12 col-md-4 col-lg-4"
				v-for="(item, index) in providers"
				:key="index"
			>
				<v-card height="200" flat hover shaped color="oange lighten-1">
					<v-card-title class="headline">{{
						item.name
					}}</v-card-title>
					<v-card-subtitle>{{ item.description }}</v-card-subtitle>
				</v-card>
			</div>
		</div>

		<v-overlay :value="loading">
			<v-progress-circular
				color="orange"
				width="5"
				indeterminate
				size="72"
			></v-progress-circular>
		</v-overlay>
	</v-container>
</template>

<script>
export default {
	name: "Sources",

	data: () => ({
		loading: false,
		providers: [],
		unwantedProviders: "al-jazeera-english breitbart-news the-american-conservative bleacher-report ars-technica associated-press nhl-news".split(
			" "
		),
	}),

	beforeMount() {
		this.getSources();
	},

	methods: {
		async getSources() {
			this.loading = true;
			const url = `http://newsapi.org/v2/sources?apiKey=${process.env.VUE_APP_NEWSKEY}&country=us&language=en`;
			try {
				const response = await this.$axios.get(url);
				console.log(response);
				this.providers = response.data.sources;

				this.providers = this.providers.filter((x) => {
					return !this.unwantedProviders.includes(x.id);
				});
				this.loading = false;
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
