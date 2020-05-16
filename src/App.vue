<template>
	<v-app>
		<v-content>
			<v-toolbar fixed color="primary" light>
				<v-icon class="pr-3">mdi-newspaper</v-icon>
				<v-toolbar-title class="headline font-weight-medium">
					Nues</v-toolbar-title
				>
				<v-spacer></v-spacer>

				<v-btn @click="toggleTheme" icon>
					<v-icon color="accent">{{ this.themeIcon }}</v-icon>
				</v-btn>

				<template v-slot:extension>
					<v-tabs v-model="tabModel" centered fixed-tabs slider-color="accent">
						<v-tab href="#headlines" active-class="black--text"
							>Headlines</v-tab
						>
						<v-tab href="#sources" active-class="black--text">Sources</v-tab>
						<v-tab href="#feed" active-class="black--text">Feed</v-tab>
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
										:mediaImg="article.urlToImage"
										:title="article.title"
										:author="article.author ? article.author : 'Anonymous'"
										:url="article.url"
										:description="article.description"
										:id="
											article.source.id
												? article.source.id
												: article.source.name.replace('.com', '')
										"
										:date="article.publishedAt"
									/>
								</v-card>
							</div>
						</div>
					</v-container>
				</v-tab-item>

				<v-tab-item value="sources">
					<v-container class="mb-12">
						<div class="row">
							<div
								class="col-12 col-sm-6 col-md-4"
								v-for="(item, index) in providers"
								:key="index"
							>
								<v-card
									outlined
									hover
									class="blue-grey lighten-4"
									@click="(loading = true), getResultsFromSources(item.id)"
								>
									<Source
										:name="item.name"
										:category="item.category"
										:logo="item.logo"
										:description="item.description"
									/>
								</v-card>
							</div>
						</div>
					</v-container>
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
							@keyup.13="
								(loading = true), getSearchResults($event.target.value)
							"
						></v-text-field>

						<div class="row mb-10 mx-auto">
							<div
								class="col-sm-12 col-md-6 col-lg-4 align-self-center"
								v-for="(article, index) in searchResults"
								:key="index"
							>
								<v-card class="my-2 mx-auto" width="400" outlined>
									<Article
										:mediaImg="article.urlToImage"
										:title="article.title"
										:author="article.author ? article.author : 'Anonymous'"
										:url="article.url"
										:description="article.description"
										:id="
											article.source.id
												? article.source.id
												: article.source.name.replace('.com', '')
										"
										:date="article.publishedAt"
									/>
								</v-card>
							</div>
						</div>
					</v-container>
				</v-tab-item>
			</v-tabs-items>

			<!-- Extra features like loaders, Handling error messages, scrollToTop -->
			<v-snackbar v-model="msgBox" color="error" top>
				{{ errMsg }}
				<v-btn color="white" icon @click="msgBox = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-snackbar>

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
					color="accent"
					width="5"
					indeterminate
					size="72"
				></v-progress-circular>
			</v-overlay>
		</v-content>

		<v-footer class="font-weight-medium">
			<v-col class="text-center" cols="12">
				<v-container>
					All product names, logos, and brands are property of their respective
					owners. All company, product and service names used in this website
					are for identificational and educational purposes only. Use of these
					names, logos, and brands does not imply endorsement.
				</v-container>
			</v-col>
			<v-col class="text-center" cols="12">
				Made with &hearts; using
				<a href="https://vuetifyjs.com/" target="_blank">Vuetify</a> and
				<a href="https://newsapi.org/" target="_blank">NewsAPI</a>
			</v-col>
		</v-footer>
	</v-app>
</template>

<script>
import nuesProviders from "./sources";
import Source from "./components/Source";
import Article from "./components/Article";

export default {
	name: "App",

	components: {
		Source,
		Article,
	},

	data: () => ({
		themeIcon: "mdi-brightness-3",
		loading: false,
		fab: false,
		tabModel: "sources",
		msgBox: false,
		errMsg: "Oops, Something went Wrong 😕",
		providers: nuesProviders,
		results: [],
		searchResults: [],
	}),

	beforeMount() {
		this.getHeadlines();
		this.getSearchResults("world");
	},

	methods: {
		buildQueryStr(obj) {
			return Object.keys(obj)
				.map(function(key) {
					return key + "=" + obj[key];
				})
				.join("&");
		},

		async getHeadlines() {
			this.loading = true;

			const queryString = this.buildQueryStr({
				apiKey: process.env.VUE_APP_NEWSKEY,
				language: "en",
				pageSize: 100,
			});

			const url = `https://newsapi.org/v2/top-headlines?${queryString}`;
			try {
				const response = await this.$axios.get(url);
				this.results = response.data.articles;
				this.results = this.results.filter((item) => {
					const condition =
						item.description === null || item.source.id === "buzzfeed";
					return !condition;
				});

				console.log(this.results);
				this.loading = false;
			} catch (error) {
				this.loading = false;
				this.msgBox = true;
				console.error(error);
			}
		},

		async getResultsFromSources(srcID) {
			this.tabModel = "feed";
			const queryString = this.buildQueryStr({
				apiKey: process.env.VUE_APP_NEWSKEY,
				sortBy: "popularity",
				sources: srcID,
				language: "en",
				pageSize: 100,
			});

			const url = `https://newsapi.org/v2/everything?${queryString}`;
			try {
				const response = await this.$axios.get(url);
				this.searchResults = response.data.articles;
				console.log(this.searchResults);
				this.loading = false;
			} catch (error) {
				this.loading = false;
				this.msgBox = true;
				console.error(error);
			}
			this.toTop();
		},

		async getSearchResults(query) {
			const queryString = this.buildQueryStr({
				apiKey: process.env.VUE_APP_NEWSKEY,
				q: `"${query}"`,
				sortBy: "popularity",
				language: "en",
				pageSize: 100,
				excludeDomains: "buzzfeed.com",
			});

			const url = `https://newsapi.org/v2/everything?${queryString}`;
			try {
				const response = await this.$axios.get(url);
				this.searchResults = response.data.articles;
				console.log(this.searchResults);
				this.loading = false;
			} catch (error) {
				this.loading = false;
				this.msgBox = true;
				console.error(error);
			}
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
