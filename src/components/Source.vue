<template>
	<div>
		<div class="d-flex flex-no-wrap justify-space-between">
			<div>
				<v-card-title
					class="headline"
					style="wordBreak: normal"
					v-text="name"
				></v-card-title>
				<v-card-subtitle v-text="category"></v-card-subtitle>
				<v-card-actions class="pt-0">
					<v-btn icon @click.stop.prevent="show = !show">
						<v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
					</v-btn>
				</v-card-actions>
			</div>

			<v-avatar class="ma-3" size="80" tile>
				<v-img
					:src="
						logo
							? logo
							: 'https://cdn.pixabay.com/photo/2013/07/12/19/16/newspaper-154444_1280.png'
					"
				></v-img>
			</v-avatar>
		</div>

		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>

				<v-card-text style="wordBreak: normal">
					{{ description }}
				</v-card-text>
			</div>
		</v-expand-transition>
	</div>
</template>

<script>
export default {
	name: "Source",
	props: {
		name: String,
		category: String,
		logo: String,
		description: String,
	},

	data: () => ({
		loading: false,
		show: false,
	}),

	beforeMount() {},

	methods: {},
};
</script>
