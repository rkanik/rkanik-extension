<template>
	<div class="extensions">
		<flex-box justifyBetween alignCenter class="header mb-4 px-2">
			<h2>
				Extensions
				<feather
					@click="handleClickExternal"
					class="ml-2 mt-1"
					stroke-width="1"
					type="external-link"
					size="16"
				></feather>
			</h2>
			<flex-box alignCenter>
				<el-input v-if="filter.action" size="mini" placeholder="Filter" v-model="filter.keyword"></el-input>
				<feather v-if="!filter.action" @click="filter.action = true" type="search" size="18"></feather>
				<feather v-else @click="handleCloseFilter" class="ml-2" type="x" size="18"></feather>
			</flex-box>
		</flex-box>
		<perfect-scrollbar class="scrollbar">
			<extension
				:ext="ext"
				:key="ext.id"
				v-for="ext in filtertedExtensions"
				@change="handleChange"
				@delete="handleDelete"
				class="extension-card"
			/>
		</perfect-scrollbar>
	</div>
</template>

<script>
import * as $chrome from '../chrome'
import Extension from '../components/Extension.vue'
import _tabs from '../chrome/_tabs'
export default {
	name: 'extensions',
	components: {
		'extension': Extension
	},
	data: () => ({
		extensions: [],
		filter: {
			action: false,
			keyword: ''
		}
	}),
	created() {
		this.loadExtensions()
	},
	methods: {
		async loadExtensions() {
			console.log(chrome);
			try { this.extensions = await $chrome.loadExtensions() }
			catch (error) { console.log(error); }
		},
		handleClickExternal() {
            _tabs.create({ active: true, url: 'chrome://extensions/' })
            
		},
		getIcon(icons) {
			let icon = icons.find(i => i.size === 48)
			return icon ? icon.url : icons[0].url
		},
		handleChange({ id, value }) {
			chrome.management.setEnabled(id, value) 
		},
		handleDelete(id) {
			chrome.management.uninstall(id)
		},
		handleCloseFilter() {
			this.filter = {
				action: false,
				keyword: ''
			}
		}
	},
	computed: {
		filtertedExtensions() {
			let key = this.filter.keyword.trim().toLowerCase()
			return key === ''
				? this.extensions
				: key === 'enabled'
					? this.extensions.filter(e => e.enabled)
					: key === 'disabled'
						? this.extensions.filter(e => !e.enabled)
						: this.extensions.filter(e => {
							return e.name.toLowerCase().includes(key)
						})
		}
	}
}
</script>

<style lang='scss' scoped>
	.header {
		min-height: 2rem;
		h2 {
			font-size: 1.5em;
			font-weight: normal;
		}
	}
	.scrollbar {
		max-height: 400px;
		margin-right: -12px;
		padding-right: 12px;
	}

	.extension-card:last-child {
		margin-bottom: 0;
	}
</style>