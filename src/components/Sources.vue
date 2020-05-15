<template>
	<v-container class="mb-12">
		<div class="row">
			<div
				class="col-12 col-sm-6 col-md-4"
				v-for="(item, index) in providers"
				:key="index"
			>
				<v-card flat hover shaped color="secondary">
					<div class="d-flex flex-no-wrap justify-space-between">
						<div>
							<v-card-title
								class="headline"
								style="wordBreak: normal"
								v-text="item.name"
							></v-card-title>
							<v-card-subtitle v-text="item.category"></v-card-subtitle>
							<v-card-actions class="pt-0">
								<v-btn icon @click="show = !show">
									<v-icon>{{
										show ? "mdi-chevron-up" : "mdi-chevron-down"
									}}</v-icon>
								</v-btn>
							</v-card-actions>
						</div>

						<v-avatar class="ma-3" size="80" tile>
							<v-img
								:src="
									item.logo
										? item.logo
										: 'https://cdn.pixabay.com/photo/2013/07/12/19/16/newspaper-154444_1280.png'
								"
							></v-img>
						</v-avatar>
					</div>

					<v-expand-transition>
						<div v-show="show">
							<v-divider></v-divider>

							<v-card-text style="wordBreak: normal">
								{{ item.description }}
							</v-card-text>
						</div>
					</v-expand-transition>
				</v-card>
			</div>
		</div>
	</v-container>
</template>

<script>
import nuesProviders from "../sources";

export default {
	name: "Sources",

	data: () => ({
		loading: false,
		providers: nuesProviders,
		show: false,
	}),

	beforeMount() {},

	methods: {},
};
</script>
