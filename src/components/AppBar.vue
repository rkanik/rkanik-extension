<template>
	<header class="app-bar">
		<flex-box alignCenter justifyBetween class="w-100">
			<router-link to="/">
				<el-image src="../icons/icon_24.png" fit="cover"></el-image>
			</router-link>
			<flex-box alignCenter>
				<router-link to="/" tag="span" style="height: 20px">
					<feather v-if="notHome" size="20" type="home" class="mr-4"></feather>
				</router-link>
				<feather
					size="20"
					:type="theme === 'light' ? 'sun' : 'moon'"
					@click="$emit('theme', theme === 'light' ? 'dark' : 'light')"
				></feather>
				<feather size="20" type="settings" class="ml-4"></feather>
			</flex-box>
		</flex-box>
	</header>
</template>

<script>
export default {
	name: 'app-bar',
	props: {
		theme: String
	},
	data: () => ({
		darkTheme: false
	}),
	computed: {
		notHome() {
			return this.$route.path !== '/'
		}
	},
	watch: {
		theme: {
			handler(theme) {
				let darkTheme = theme === 'dark' ? true : false
				if (darkTheme !== this.darkTheme) {
					this.darkTheme = darkTheme
				}
			},
			immediate: true
		}
	},
}
</script>

<style lang='scss' scoped>
	.app-bar {
		display: flex;
		justify-content: space-between;
		margin-bottom: 2rem;
	}
</style>