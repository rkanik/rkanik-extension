<template>
	<div class="flex-box" :class="classes" @click="$emit('click')">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'flex-box',
	props: {
		direction: String,
		gap: {
			type: String | Number,
			default: 0
		},
		wrap: {
			type: Boolean,
			default: false
		},
		justifyCenter: {
			type: Boolean,
			default: false
		},
		justifyStart: {
			type: Boolean,
			default: false
		},
		justifyEnd: {
			type: Boolean,
			default: false
		},
		justifyBetween: {
			type: Boolean,
			default: false
		},
		alignCenter: {
			type: Boolean,
			default: false
		},
		alignStart: {
			type: Boolean,
			default: false
		},
		alignEnd: {
			type: Boolean,
			default: false
		},
		cols: {
			type: String | Number
		}
	},
	computed: {
		classes() {
			return {
				['flex-' + this.direction]: this.direction,
				'justify-center': this.justifyCenter,
				'justify-start': this.justifyStart,
				'justify-end': this.justifyEnd,
				'justify-between': this.justifyBetween,
				'align-center': this.alignCenter,
				'align-start': this.alignStart,
				'align-end': this.alignEnd,
				['cols-' + this.cols]: this.cols,
				['gap-' + this.gap]: this.gap !== 0,
				'wrap': this.wrap
			}
		}
	},
}
</script>

<style lang='scss' scoped>
	.flex-box {
		display: flex;
		&.wrap {
			flex-wrap: wrap;
		}
	}
	.flex-row {
		flex-direction: row;
	}
	.flex-column {
		flex-direction: column;
	}
	.justify-center {
		justify-content: center;
	}
	.justify-start {
		justify-content: flex-start;
	}
	.justify-end {
		justify-content: flex-end;
	}
	.justify-between {
		justify-content: space-between;
	}
	.align-center {
		align-items: center;
	}
	.align-start {
		align-items: flex-start;
	}
	.align-end {
		align-items: flex-end;
	}
	.cols-2.gap-1 {
		& > div {
			width: 47.67%;
		}
	}
	.gap-1 {
		gap: 1rem;
	}
</style>