<template>
	<v-app>
		<v-content>
			<v-toolbar color="primary" dark>
				<v-toolbar-title class="headline font-weight-medium"
					>NUES</v-toolbar-title
				>
				<v-spacer></v-spacer>

				<v-btn @click="toggleTheme" icon>
					<v-icon color="accent">{{ this.themeIcon }}</v-icon>
				</v-btn>

				<template v-slot:extension>
					<v-tabs v-model="tabModel" centered fixed-tabs slider-color="accent">
						<v-tab href="#headlines" active-class="white--text"
							>Headlines</v-tab
						>
						<v-tab href="#sources" active-class="white--text">Sources</v-tab>
						<v-tab href="#feed" active-class="white--text">Feed</v-tab>
					</v-tabs>
				</template>
			</v-toolbar>

			<v-tabs-items v-model="tabModel">
				<v-tab-item value="headlines">
					<v-container>
						<div class="row mb-10 mx-auto">
							<div
								class="col-sm-12 col-md-6 col-lg-4 align-self-center"
								v-for="(article, index) in results"
								:key="index"
							>
								<v-card class="my-2 mx-auto" width="400" outlined>
									<Article
										:mediaImg="
											article.urlToImage !== null
												? article.urlToImage
												: 'https://i.picsum.photos/id/357/200/200.jpg'
										"
										:title="article.title"
										:author="
											article.author !== null ? article.author : 'Anonymous'
										"
										:url="article.url"
										:description="article.description"
									/>
								</v-card>
							</div>
						</div>
					</v-container>
				</v-tab-item>

				<v-tab-item value="sources">
					<Sources />
				</v-tab-item>

				<v-tab-item value="feed">
					<v-container>
						<v-text-field
							color="accent"
							prepend-inner-icon="mdi-magnify"
							label="Search Popular Articles"
							solo-inverted
							clearable
							hide-details
							flat
							@keyup.13="getSearchResults($event.target.value)"
						></v-text-field>

						<div class="row mb-10 mx-auto">
							<div
								class="col-sm-12 col-md-6 col-lg-4 align-self-center"
								v-for="(article, index) in searchResults"
								:key="index"
							>
								<v-card class="my-2 mx-auto" width="400" outlined>
									<Article
										:mediaImg="
											article.urlToImage !== null
												? article.urlToImage
												: 'https://i.picsum.photos/id/357/200/200.jpg'
										"
										:title="article.title"
										:author="
											article.author !== null ? article.author : 'Anonymous'
										"
										:url="article.url"
										:description="article.description"
									/>
								</v-card>
							</div>
						</div>
					</v-container>
				</v-tab-item>
			</v-tabs-items>

			<v-btn
				v-scroll="onScroll"
				v-show="fab"
				fab
				fixed
				bottom
				right
				color="primary"
				@click="toTop"
			>
				<v-icon>mdi-chevron-up</v-icon>
			</v-btn>

			<v-overlay :value="loading">
				<v-progress-circular
					color="secondary"
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
		themeIcon: "mdi-brightness-3",
		loading: false,
		fab: false,
		tabModel: "feed",
		results: [],
		searchResults: [],
	}),

	beforeMount() {
		this.getHeadlines();
	},

	methods: {
		async getHeadlines() {
			this.loading = true;

			const urlParams = {
				apiKey: process.env.VUE_APP_NEWSKEY,
				language: "en",
				pageSize: 100,
			};

			const queryString = Object.keys(urlParams)
				.map(function(key) {
					return key + "=" + urlParams[key];
				})
				.join("&");

			const url = `https://newsapi.org/v2/top-headlines?${queryString}`;
			try {
				const response = await this.$axios.get(url);
				this.results = response.data.articles;
				this.filterResults();
				console.log(this.results);
				this.loading = false;
			} catch (error) {
				console.error(error);
			}
		},

		async getSearchResults(query) {
			this.loading = true;

			const urlParams = {
				apiKey: process.env.VUE_APP_NEWSKEY,
				q: query,
				sortBy: "popularity",
				language: "en",
				pageSize: 100,
			};

			const queryString = Object.keys(urlParams)
				.map(function(key) {
					return key + "=" + urlParams[key];
				})
				.join("&");

			const url = `https://newsapi.org/v2/everything?${queryString}`;
			try {
				const response = await this.$axios.get(url);
				this.searchResults = response.data.articles;
				console.log(this.searchResults);
				this.loading = false;
			} catch (error) {
				console.error(error);
			}
		},

		filterResults() {
			this.results = this.results.filter((item) => {
				const condition =
					item.description === null || item.source.id === "buzzfeed";
				return !condition;
			});
		},

		toggleTheme() {
			if (this.$vuetify.theme.dark === false) {
				this.$vuetify.theme.dark = true;
				this.themeIcon = "mdi-white-balance-sunny";
			} else {
				this.$vuetify.theme.dark = false;
				this.themeIcon = "mdi-brightness-3";
			}
		},

		onScroll(e) {
			if (typeof window === "undefined") return;
			const top = window.pageYOffset || e.target.scrollTop || 0;
			this.fab = top > 20;
		},

		toTop() {
			this.$vuetify.goTo(0);
		},
	},
};
</script>
