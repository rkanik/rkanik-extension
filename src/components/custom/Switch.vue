<template>
	<div class="custom-switch" :class="size">
		<input
			@change="handleChange"
			:checked="value"
			type="checkbox"
			:id="id"
		/>
		<label :for="id"></label>
	</div>
</template>

<script>
export default {
	name: "Custom-Switch",
	props: ['value', 'size'],
	data: () => ({
		id: Math.random()
			.toString(36)
			.slice(-3)
	}),
	methods: {
		handleChange() {
			this.$emit('input', !this.value)
			this.$emit('change', !this.value)
		}
	}
}
</script>
<style lang="scss" scoped>
	.custom-switch {
		width: max-content;
		input[type="checkbox"] {
			height: 0;
			width: 0;
			visibility: hidden;
			position: absolute;
		}
		label {
			cursor: pointer;
			width: 2.4rem;
			height: 1.2rem;
			background: rgba(#009688, 0.2);
			display: block;
			border-radius: 2rem;
			position: relative;
			&:after {
				content: "";
				position: absolute;
				top: 0.195rem;
				left: 0.195rem;
				width: 0.8rem;
				height: 0.8rem;
				background: #009688;
				border-radius: 50%;
				transition: 0.3s;
			}
		}
		input:checked + label {
			background: #009688;
			&:after {
				background: #ffffff;
				left: calc(100% - 0.195rem);
				transform: translateX(-100%);
			}
		}
		label:active:after {
			width: 1.5rem;
		}
		&.small label {
			width: 1.9rem;
			height: 1rem;
			&:after {
				top: 3px;
				left: 4px;
				width: 10px;
				height: 10px;
			}
		}
	}
</style>