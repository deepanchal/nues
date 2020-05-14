<template>
	<div>
		<v-img class="white--text align-end" height="200" :src="mediaImg">
		</v-img>
		<v-card-title style="wordBreak: normal">{{ title }}</v-card-title>
		<v-card-subtitle style="wordBreak: normal">{{
			author
		}}</v-card-subtitle>

		<v-card-text>
			<div style="wordBreak: normal">{{ description }}</div>
		</v-card-text>

		<v-card-actions>
			<v-btn
				color="light-blue text--accent-4"
				:href="url == undefined ? '' : url"
				target="_blank"
				text
				block
			>
				View article
				<v-icon right>mdi-open-in-new</v-icon>
			</v-btn>
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
	},
};
</script>
