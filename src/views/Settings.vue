<template>
	<div class="settings">
		<flex-box alignCenter class="mb-4">
			<feather @click="goBack" type="arrow-left" size="20"></feather>
			<h2 class="heading ml-2">Settings</h2>
		</flex-box>
		<flex-box class="settings-search mb-4" alignCenter>
			<feather class="icon" type="search" size="16"></feather>
			<input placeholder="Search settings" v-model="searchKey" />
		</flex-box>

		<perfect-scrollbar v-if="!loading">
			<div class="settings-card" v-for="(setting, index) in filteredSettings" :key="index">
				<flex-box @click="setting.expanded = !setting.expanded">
					<feather class="mt-1" :type="setting.icon" size="22"></feather>
					<div class="content ml-5">
						<h4 class="settings-card--title">{{ setting.title }}</h4>
						<p class="settings-card--desc">{{ setting.desc }}</p>
					</div>
				</flex-box>
				<flex-box>
					<div style="width: 22px;"></div>
					<div class="content ml-5">
						<div v-if="setting.expanded" class="settings-card--blocks pt-4">
							<div v-for="(block, bi) in setting.blocks" :key="bi">
								<flex-box justifyBetween alignCentet class="mb-2">
									<h5>{{ block.title }}</h5>
									<rk-switch size="small" v-model="block.active" />
								</flex-box>
							</div>
						</div>
						<hr class="settings-card--divider" />
					</div>
				</flex-box>
			</div>
		</perfect-scrollbar>
	</div>
</template>

<script>
import _storage from '../chrome/_storage'
import { SETTINGS } from '../chrome/_storage/keys'
export default {
	name: 'settings',
	data: () => ({
		searchKey: '',
		loading: false,
		settings: [
			{
				title: 'Navigation',
				desc: 'Wheather to remember last navigation or not.',
				icon: 'navigation',
				expanded: false,
				blocks: [
					{ title: 'Remember', active: false }
				]
			},
			{
				title: 'Themes',
				desc: 'Change theme setting',
				icon: 'feather',
				expanded: false,
				blocks: [
					{ title: 'Dark theme', active: true }
				]
			}
		]
	}),
	created() { this.syncSettings() },
	computed: {
		filteredSettings() {
			let key = this.searchKey.trim().toLowerCase()
			return key === ''
				? this.settings
				: this.settings.filter(s => {
					return s.title.toLowerCase().includes(key) ||
						s.blocks.some(b => b.title.toLowerCase().includes(key))
				})
		}
	},
	methods: {
		async syncSettings() {
			this.loading = true
			let settings = await _storage.get(SETTINGS)
			if (settings) this.settings = settings
			this.loading = false
		},
		handleChangeSettings(settings) {
			_storage.set(SETTINGS, settings)
		},
		hasHistory() {
			return window.history.length > 2
		},
		goBack() {
			this.hasHistory() ? this.$router.go(-1) : this.$router.push('/')
		}
	},
	watch: {
		settings: {
			deep: true,
			handler(val) {
				this.handleChangeSettings(val)
			}
		}
	}
}
</script>

<style lang='scss' scoped>
	.settings {
		.heading {
			font-weight: normal;
			line-height: 23px;
		}
	}
	.settings-search {
		position: relative;
		height: 2rem;
		background-color: var(--bg-secondary);
		padding: 0 0.5rem;
		border-radius: 0.3rem;
		input {
			width: 100%;
			height: 100%;
			font-size: 13px;
			padding-left: 0.5rem;
			background-color: transparent;
		}
	}
	.settings-card {
		padding: 0.8rem 0.8rem 0 0.8rem;
		margin-bottom: 0.1rem;
		cursor: default;
		.content {
			flex: 1;
		}
		&--title {
			color: var(--text-primary);
			font-size: 1.3em;
			text-transform: capitalize;
			margin-bottom: 0.25rem;
		}
		&--desc {
			color: var(--text-secondary);
		}
		&--divider {
			height: 1px;
			background-color: var(--color-divider);
			margin-top: 0.5rem;
		}
		&:hover {
			background-color: var(--bg-secondary);
		}
		h5 {
			color: var(--text-primary);
			font-size: 1.1em;
			font-weight: normal;
		}
	}
	.settings-card:first-child {
		border-radius: 0.3rem 0.3rem 0 0;
	}
	.settings-card:last-child {
		border-radius: 0 0 0.3rem 0.3rem;
		.settings-card--divider {
			display: none;
		}
	}
</style>