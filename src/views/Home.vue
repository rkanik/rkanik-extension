<template>
	<div class="home">
		<perfect-scrollbar>
			<flex-box cols="2" gap="1">
				<tool v-for="tool in tools" :key="tool.name" :tool="tool" class="pointer"></tool>
			</flex-box>
		</perfect-scrollbar>
	</div>
</template>

<script>
import Tool from '../components/Tool.vue'
export default {
	name: 'home',
	path: '/',
	components: {
		tool: Tool
	},
	data: () => ({
		tools: [
			{
				name: 'Extensions',
				icon: 'chrome',
				to: '/extensions'
			},
			{
				name: 'Themes',
				icon: 'feather',
				to: '/themes'
			}
		]
	}),
}
</script>

<style lang='scss' scoped>
	.home {
	}
</style>