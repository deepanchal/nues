<template>
	<div>
		<v-img class="white--text align-end" height="200" :src="mediaImg">
			<v-chip class="my-2 mx-2">{{ id.toUpperCase() }}</v-chip></v-img
		>
		<v-card-title style="wordBreak: normal">{{ title }}</v-card-title>
		<v-card-subtitle style="wordBreak: normal">{{ author }}</v-card-subtitle>

		<v-card-text>
			<div style="wordBreak: normal">{{ description }}</div>
		</v-card-text>

		<v-card-actions class="row py-0">
			<div class="col-12 pt-0">
				<v-btn
					class="primary--text mb-2"
					:href="url == undefined ? '' : url"
					target="_blank"
					outlined
					block
				>
					View article<v-icon right>mdi-open-in-new</v-icon>
				</v-btn>
				<v-btn
					class="secondary--text"
					:href="url == undefined ? '' : url"
					target="_blank"
					outlined
					block
				>
					Read More<v-icon right>mdi-chevron-double-right</v-icon>
				</v-btn>
			</div>
		</v-card-actions>
	</div>
</template>

<script>
export default {
	name: "Article",
	components: {},
	props: {
		title: String,
		author: String,
		description: String,
		url: String,
		mediaImg: String,
		id: String,
	},
};
</script>
