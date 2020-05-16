<template>
	<div>
		<v-img
			class="white--text align-end"
			height="200"
			:src="mediaImg ? mediaImg : this.getRandomImg()"
		>
			<v-chip class="my-2 mx-2">{{ id }}</v-chip>
		</v-img>
		<v-card-title style="wordBreak: normal">{{ title }}</v-card-title>
		<v-card-subtitle class="pb-2" style="wordBreak: normal"
			>{{ author }}
		</v-card-subtitle>

		<v-card-text>
			<div class="overline mb-1">{{ new Date(date).toDateString() }}</div>
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
					View Original<v-icon right>mdi-open-in-new</v-icon>
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
	props: {
		title: String,
		author: String,
		description: String,
		url: String,
		mediaImg: String,
		id: String,
		date: String,
	},

	methods: {
		getRandomImg() {
			const stockImgArr = [
				"https://images.pexels.com/photos/2848021/pexels-photo-2848021.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
				"https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
				"https://images.pexels.com/photos/39396/hourglass-time-hours-sand-39396.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
				"https://images.pexels.com/photos/3030823/pexels-photo-3030823.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
				"https://images.pexels.com/photos/4065894/pexels-photo-4065894.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
				"https://images.pexels.com/photos/2766006/pexels-photo-2766006.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
				"https://images.pexels.com/photos/6061/drink-typography-drinking-book.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
				"https://images.pexels.com/photos/218442/pexels-photo-218442.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
				"https://images.pexels.com/photos/1467/journalism-information-news-newspaper.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
				"https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
			];
			return stockImgArr[Math.floor(Math.random() * stockImgArr.length)];
		},
	},
};
</script>
