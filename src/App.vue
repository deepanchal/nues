<template>
	<v-app>
		<v-content>
			<v-toolbar color="blue" dark>
				<v-toolbar-title class="m-auto display-1">Nues</v-toolbar-title>
				<v-spacer></v-spacer>

				<v-btn @click="toggleTheme" icon>
					<v-icon>{{ this.themeIcon }}</v-icon>
				</v-btn>

				<template v-slot:extension>
					<v-tabs
						v-model="tabModel"
						centered
						fixed-tabs
						slider-color="orange"
					>
						<v-tab href="#headlines" active-class="white--text"
							>Headlines</v-tab
						>
						<v-tab href="#sources" active-class="white--text"
							>Sources</v-tab
						>
						<v-tab href="#feed" active-class="white--text"
							>Feed</v-tab
						>
					</v-tabs>
				</template>
			</v-toolbar>

			<v-tabs-items v-model="tabModel">
				<v-tab-item value="headlines">
					<div class="row">
						<div
							class="col-12 col-md-4 col-lg-3"
							v-for="(article, index) in results"
							:key="index"
						>
							<v-card class="mx-auto my-4" width="340" hover>
								<Article
									:mediaImg="
										article.urlToImage !== null
											? article.urlToImage
											: 'https://i.picsum.photos/id/357/200/200.jpg'
									"
									:title="article.title"
									:author="article.author"
									:url="article.url"
									:description="article.description"
								></Article>
							</v-card>
						</div>
					</div>
				</v-tab-item>
				<v-tab-item value="sources">
					<Sources />
				</v-tab-item>
				<v-tab-item value="feed">main feed</v-tab-item>
			</v-tabs-items>

			<v-overlay :value="loading">
				<v-progress-circular
					color="orange"
					width="5"
					indeterminate
					size="72"
				></v-progress-circular>
			</v-overlay>
		</v-content>

		<v-footer absolute class="font-weight-medium">
			<v-col class="text-center" cols="12">
				Made with &hearts; using
				<a href="https://vuetifyjs.com/" target="_blank">Vuetify</a> and
				<a href="https://newsapi.org/" target="_blank">NewsAPI</a>
			</v-col>
		</v-footer>
	</v-app>
</template>

<script>
import Sources from "./components/Sources";
import Article from "./components/Article";

export default {
	name: "App",

	components: {
		Sources,
		Article,
	},

	data: () => ({
		themeIcon: "mdi-white-balance-sunny",
		loading: false,
		tabModel: "popular",
		results: [],
	}),

	beforeMount() {
		this.getHeadlines();
	},

	methods: {
		toggleTheme() {
			if (this.$vuetify.theme.dark === false) {
				this.$vuetify.theme.dark = true;
				this.themeIcon = "mdi-brightness-3";
			} else {
				this.$vuetify.theme.dark = false;
				this.themeIcon = "mdi-white-balance-sunny";
			}
		},

		async getHeadlines() {
			this.loading = true;
			const url = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.VUE_APP_NEWSKEY}&pageSize=100&language=en`;
			try {
				const response = await this.$axios.get(url);
				console.log(response);
				this.results = response.data.articles;
				this.loading = false;
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
