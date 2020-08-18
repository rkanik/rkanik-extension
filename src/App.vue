<template>
	<div id="app">
		<app-bar @theme="handleChangeTheme" :theme="theme" />
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
	</div>
</template>

<script>

// Components
//import Home from './views/Home.vue'
import AppBar from './components/AppBar.vue'
//import Extensions from './components/Extensions.vue'

// Storage
import storage from './storage/chrome.storage'

export default {
	name: 'App',
	components: {
		'app-bar': AppBar,
		//'extensions': Extensions
	},
	data: () => ({
		activeTab: 'themes',
		theme: 'dark'
	}),
	created() {
		this.syncTheme()
	},
	methods: {
		setTheme(theme) {
			let html = document.documentElement
			html.classList.add('theme-transition')
			html.setAttribute('data-theme', theme)
			return html
		},
		async syncTheme() {
			this.theme = await storage.get(storage.keys.THEME)
			this.setTheme(this.theme)
		},
		handleChangeTheme(theme) {
			let html = this.setTheme(theme)
			setTimeout(() => { html.classList.remove('theme-transition') }, 1000)
			storage.set(storage.keys.THEME, theme)
			this.theme = theme
		}
	},
}
</script>
<style lang="scss">
	#app {
		width: 375px;
		height: 600px;
		padding: 1rem;
		overflow: hidden;
	}
	.fade-enter-active,
	.fade-leave-active {
		transition-duration: 0.3s;
		transition-property: opacity;
		transition-timing-function: ease;
	}

	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
</style>