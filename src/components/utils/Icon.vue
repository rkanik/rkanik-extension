<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		role="presentation"
		class="rk-icon"
		:width="size"
		:height="size"
	>
		<path :d="path" />
	</svg>
</template>

<script>
export default {
	name: 'rk-icon',
	props: {
		path: String,
		size: {
			type: String | Number,
			default: 24
		},
		color: {
			type: String,
			default: 'primary'
		}
	},
	data: () => ({
		mColors: ['primary']
	}),
	mounted() {
		if (this.mColors.includes(this.color)) {
			this.$el.style.fill = `var(--text-${this.color})`
		} else {
			this.$el.style.fill = this.color
		}
	}
}
</script>