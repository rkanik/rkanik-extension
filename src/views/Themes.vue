<template>
	<div class="themes">
		<perfect-scrollbar v-if="loaded">
			<el-card v-for="(theme, index) in websites" :key="index" class="theme-card shadow-1">
				<el-row :gutter="16" class="mb-4">
					<el-col :span="3">
						<rk-icon class="theme-card--icon" :path="$icons[theme.icon]" :color="theme.color" />
					</el-col>
					<el-col :span="16">
						<h3 class="theme-card--name">{{theme.name}}</h3>
						<a :href="theme.url" class="theme-card--desc">{{theme.url}}</a>
					</el-col>
					<el-col :span="5">
						<flex-box justifyEnd>
							<rk-switch size="small" v-model="theme.active" @change="handleChange" />
						</flex-box>
					</el-col>
				</el-row>
			</el-card>
		</perfect-scrollbar>
	</div>
</template>

<script>

// Components
import Switch from "../components/custom/Switch.vue"

// Storage
import storage from "../storage/chrome.storage"
// Storage keys
const { WEBSITES } = storage.keys

export default {
	name: 'themes',
	components: {
		'rk-switch': Switch,
	},
	data: () => ({
		loaded: false,
		websites: [
			{ name: 'Google', url: "https://google.com", active: true, icon: 'google', color: '#DB4437' },
			{ name: 'Fiverr', url: "https://fiverr.com", active: true, icon: 'fiverr', color: '#39C075' },
			{ name: 'Youtube', url: "https://youtube.com", active: true, icon: 'youtube', color: '#F80014' },
			{ name: 'Facebook', url: "https://facebook.com", active: true, icon: 'facebook', color: '#4568B0' },
			{ name: 'Github', url: "https://github.com", active: true, icon: 'github', color: 'primary' },
		]
	}),
	created() {
        this.syncStorage()
        console.log(chrome);
	},
	methods: {
		async syncStorage() {
			let webs = (await storage.get(WEBSITES)) || []
			this.websites.forEach(w => {
				let web = webs.find(web => web.name === w.name)
				w.active = web.active
			})
			this.loaded = true
		},
		async handleChange() {
            let webs = this.websites.map(w => ({ name: w.name, active: w.active }))
			storage.set(WEBSITES, webs)
		}
	},
}
</script>

<style lang='scss' scoped>
	.theme-card {
		margin-bottom: 0.8rem;
		background-color: var(--bg-secondary);
		border: none;
		&--name {
			color: var(--text-primary);
			font-size: 1.2em;
			text-transform: capitalize;
			margin-bottom: 0.25rem;
		}
		&--desc {
			color: var(--color-accent);
		}
	}
</style>