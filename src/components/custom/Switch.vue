<template>
	<div class="custom-switch">
		<input @change="handleChange" :checked="chckd" type="checkbox" :id="id" />
		<label :for="id"></label>
	</div>
</template>

<script>
export default {
	name: "Custom-Switch",
	props: ['checked'],
	data: () => ({
		chckd: false,
		id: Math.random()
			.toString(36)
			.slice(-3)
	}),
	created() {
		this.chckd = this.checked || false
	},
	watch: {
		checked(val) {
			if (this.chckd !== val) this.chckd = val
		}
	},
	methods: {
		handleChange() {
			this.chckd = !this.chckd
			this.$emit('change', this.chckd)
		}
	}
}
</script>
<style lang="scss" scoped>
	.custom-switch {
		input[type="checkbox"] {
			height: 0;
			width: 0;
			visibility: hidden;
		}
		label {
			cursor: pointer;
			width: 2.4rem;
			height: 1.2rem;
			background: #313131;
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
				background: #e0e0e0;
				border-radius: 50%;
				transition: 0.3s;
			}
		}
		input:checked + label {
			background: #0092f3;
			&:after {
				background: #ffffff;
				left: calc(100% - 0.195rem);
				transform: translateX(-100%);
			}
		}
		label:active:after {
			width: 1.5rem;
		}
	}
</style>