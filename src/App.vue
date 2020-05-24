<template>
  <v-app>
    <v-content>
      <!-- Navigation Bar with Tabs -->
      <v-toolbar fixed color="primary" light>
        <v-icon class="pr-3">mdi-newspaper</v-icon>
        <v-toolbar-title class="headline font-weight-medium">Nues</v-toolbar-title>
        <v-spacer></v-spacer>

        <!-- Theme Toggler -->
        <v-btn @click="toggleTheme" icon>
          <v-icon color="accent">{{ this.themeIcon }}</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs v-model="tabModel" centered fixed-tabs slider-color="accent">
            <v-tab href="#headlines" active-class="black--text">Headlines</v-tab>
            <v-tab href="#sources" active-class="black--text">Sources</v-tab>
            <v-tab href="#feed" active-class="black--text">Feed</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <!-- Content for all the tabs -->
      <v-tabs-items v-model="tabModel">
        <v-tab-item value="headlines">
          <v-container>
            <v-row>
              <div
                class="col-12 col-md-6 col-lg-4"
                v-for="(article, index) in results"
                :key="index"
              >
                <!-- Lazy loading article cards to make app fast -->
                <v-lazy
                  :options="{ threshold: 0.5 }"
                  transition="scroll-y-reverse-transition"
                  min-height="350"
                >
                  <v-card class="my-2 mx-auto" width="400" outlined>
                    <Article
                      :mediaImg="article.urlToImage"
                      :title="article.title"
                      :author="article.author"
                      :url="article.url"
                      :description="article.description"
                      :source="article.source"
                      :date="article.publishedAt"
                    />
                  </v-card>
                </v-lazy>
              </div>
            </v-row>
          </v-container>
        </v-tab-item>

        <v-tab-item value="sources">
          <v-container>
            <div class="row">
              <div
                class="col-12 col-sm-6 col-lg-4"
                v-for="(item, index) in providers"
                :key="index"
              >
                <v-lazy
                  :options="{ threshold: 0.5 }"
                  transition="scroll-y-reverse-transition"
                  min-height="100"
                >
                  <v-card
                    outlined
                    hover
                    light
                    class="blue-grey lighten-4"
                    @click="getResultsFromSources(item.id)"
                  >
                    <Source
                      :name="item.name"
                      :category="item.category"
                      :logo="item.logo"
                      :description="item.description"
                    />
                  </v-card>
                </v-lazy>
              </div>
            </div>
          </v-container>
        </v-tab-item>

        <v-tab-item value="feed">
          <v-container>
            <v-row>
              <div class="col-12 col-sm-9 pb-0 pr-sm-0">
                <v-text-field
                  v-model="searchQuery"
                  color="accent"
                  prepend-inner-icon="mdi-magnify"
                  label="Search..."
                  @keyup.13="getSearchResults(searchQuery)"
                  flat
                  solo-inverted
                  clearable
                  hide-details
                ></v-text-field>
              </div>

              <div class="col-12 col-sm-3">
                <v-select
                  color="accent"
                  :items="['Popular', 'Relevant', 'Latest']"
                  v-model="sortBy"
                  :value="sortBy"
                  label="Sort-By"
                  @change="getSearchResults(searchQuery)"
                  flat
                  solo-inverted
                  hide-details
                ></v-select>
              </div>
            </v-row>

            <v-row>
              <div
                class="col-12 col-md-6 col-lg-4"
                v-for="(article, index) in searchResults"
                :key="index"
              >
                <v-lazy
                  :options="{ threshold: 0.5 }"
                  transition="scroll-y-reverse-transition"
                  min-height="350"
                >
                  <v-card class="my-2 mx-auto" width="400" outlined>
                    <Article
                      :mediaImg="article.urlToImage"
                      :title="article.title"
                      :author="article.author"
                      :url="article.url"
                      :description="article.description"
                      :source="article.source"
                      :date="article.publishedAt"
                    />
                  </v-card>
                </v-lazy>
              </div>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-content>

    <!-- Extra features like loaders, Footers, Handling error messages, scrollToTop -->
    <div>
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

      <v-footer class="font-weight-medium">
        <v-col class="text-center ma-0 pa-0" cols="12">
          <v-container>
            All product names, logos, and brands are property of their respective owners.
            All company, product and service names used in this website are for
            identificational / educational purposes only. Use of these names, logos, and
            brands does not imply endorsement.
          </v-container>
        </v-col>
        <v-col class="text-center" cols="12">
          Powered by <a href="https://newsapi.org/" target="_blank">NewsorgAPI</a>
          <br />Made with &hearts; using
          <a href="https://vuetifyjs.com/" target="_blank">Vuetify</a>
        </v-col>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
import nuesProviders from "./sources";
export default {
  name: "App",

  components: {
    Source: () => import("./components/Source"),
    Article: () => import("./components/Article"),
  },

  data: () => ({
    themeIcon: "mdi-brightness-3", // changes the light/dark theme icon
    loading: false, // displays loading animation if true
    fab: false, // displays scrollToTop button
    tabModel: "sources", // Changes tabs
    msgBox: false,
    errMsg: "",
    sortBy: "Latest",
    providers: nuesProviders, // Loads an array of all available souce providers
    results: [], // Stores results for headlines
    searchQuery: "",
    searchResults: [], // Stores results for search query
  }),

  beforeMount() {
    // Load pages with some data at initial load
    this.getHeadlines();
    this.getSearchResults(this.randomize(["world", "tech", "health", "game", "science"]));
  },

  methods: {
    buildQueryStr(obj) {
      return Object.keys(obj)
        .map(function(key) {
          return key + "=" + obj[key];
        })
        .join("&");
    }, // Function to build request url

    async fetcher(url) {
      try {
        this.loading = true;
        this.msgBox = false;
        const response = await this.$axios.get(url);
        this.loading = false;
        if (response.data.totalResults == 0) {
          this.errMsg = "No results found 😕";
          this.msgBox = true;
        }
        return response;
      } catch (err) {
        this.loading = false;
        this.errMsg = "Oops, Something went Wrong 😕";
        this.msgBox = true;
        console.error(err);
        return {};
      }
    },

    async getHeadlines() {
      const queryString = this.buildQueryStr({
        language: "en",
        pageSize: 100,
      });
      const url = `${process.env.VUE_APP_URL}/nuesapi/headlines?${queryString}`;
      const res = await this.fetcher(url);
      this.results = res.data.articles;

      // Filter to remove irrevelant results from headlines
      this.results = this.results.filter((item) => {
        const condition =
          item.description === null ||
          item.source.id === "buzzfeed" ||
          item.source.id === "reddit-r-all";
        return !condition;
      });
    },

    async getResultsFromSources(srcID) {
      this.tabModel = "feed";
      const queryString = this.buildQueryStr({
        sortBy: "popularity",
        sources: srcID,
        language: "en",
        pageSize: 100,
      });

      const url = `${process.env.VUE_APP_URL}/nuesapi/everything?${queryString}`;
      const res = await this.fetcher(url);
      this.searchResults = res.data.articles;
      this.toTop();
    }, // Function to fetch results from specific souce

    async getSearchResults(query) {
      if (!query) return; // Stop execution if query is empty
      const queryString = this.buildQueryStr({
        q: query,
        sortBy: this.translateFilter(this.sortBy),
        language: "en",
        pageSize: 100,
        excludeDomains: "buzzfeed.com",
      });

      const url = `${process.env.VUE_APP_URL}/nuesapi/everything?${queryString}`;
      const res = await this.fetcher(url);
      this.searchResults = res.data.articles;
    }, // Get articles from a search query

    translateFilter(str) {
      if (str == "Latest") return "publishedAt";
      else if (str == "Relevant") return "relevancy";
      else if (str == "Popular") return "popularity";
      else return "relevancy";
    }, // translate the options to pass in API

    randomize(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
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

    reload() {
      window.location.reload();
    },
  },
};
</script>
