<template>
	<router-link :to="tool.to" tag="div">
		<el-card class="tool-card shadow-1">
			<feather class="tool-card--oicon" :type="tool.icon" size="128"></feather>
			<feather :type="tool.icon" size="20" class="mb-5"></feather>
			<h4 class="tool-card--name">{{tool.name}}</h4>
		</el-card>
	</router-link>
</template>

<script>
export default {
	name: 'tool',
	props: {
		tool: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang='scss' scoped>
	.tool-card {
		border: none;
		margin-bottom: 0.8rem;
		background-color: var(--bg-secondary);
		color: var(--text-primary);
		position: relative;
		&--name {
			font-size: 1.2em;
		}
		&--oicon {
			position: absolute;
			top: -2rem;
			right: -2rem;
			opacity: 0.05;
			transition: transform 5s;
		}
		&:hover {
			.tool-card--oicon {
				transform: scale(2);
			}
		}
	}
</style>