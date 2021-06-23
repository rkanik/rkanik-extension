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
				<el-input
					v-if="filter.action"
					size="mini"
					placeholder="Filter"
					v-model="filter.keyword"
				></el-input>
				<feather
					v-if="!filter.action"
					@click="filter.action = true"
					type="search"
					size="18"
				></feather>
				<feather
					v-else
					@click="handleCloseFilter"
					class="ml-2"
					type="x"
					size="18"
				></feather>
				<feather
					size="18"
					class="ml-2"
					type="minimize-2"
					v-if="maximized"
					@click="maximized = !maximized"
				></feather>
				<feather
					v-else
					size="18"
					class="ml-2"
					type="maximize-2"
					@click="maximized = !maximized"
				></feather>
				<feather size="20" :type="layoutType" @click="changeLayoutType" />
			</flex-box>
		</flex-box>
		<perfect-scrollbar class="scrollbar">
			<div v-if="layoutType === 'grid'">
				<extension
					:ext="ext"
					:key="ext.id"
					:expanded="maximized"
					v-for="ext in filtertedExtensions"
					@change="handleChange"
					@delete="handleDelete"
					class="extension-card"
				/>
			</div>
			<div class="bg-gray-500 text-white p-4" v-else>
				<flex-box :key="ext.id" v-for="ext in filtertedExtensions">
					<el-image
						class="extension-card--image"
						v-if="ext.icons.length"
						:src="getIcon(ext.icons)"
					></el-image>
				</flex-box>
			</div>
		</perfect-scrollbar>
	</div>
</template>

<script>
import * as $chrome from '../chrome'
import Extension from '../components/Extension.vue'
import _tabs from '../chrome/_tabs'
import FlexBox from '../components/utils/FlexBox.vue'
export default {
	name: 'extensions',
	components: {
		'extension': Extension,
		FlexBox
	},
	data: () => ({
		maximized: false,

		// String
		sortBy: 'none',
		layoutType: 'grid',

		// Arrays
		extensions: [],
		sortByTypes: [
			{ label: 'None' },
			{ label: 'Name' },
			{ label: 'Enabled' },
			{ label: 'Disabled' },
		],

		filter: {
			action: false,
			keyword: ''
		}
	}),
	created() {
		this.loadExtensions()
	},
	methods: {
		changeLayoutType() {
			this.layoutType = this.layoutType === 'grid' ? 'list' : 'grid'
		},
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
		sortByIcon() {
			// return this.sortBy === 'enabled'?'chevrons-up'?this.sortBy === 'disabled'
		},
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
	.extensions {
		position: relative;
		height: calc(100% - 64px);
	}
	.header {
		min-height: 2rem;
		h2 {
			font-size: 1.5em;
			font-weight: normal;
		}
	}
	.scrollbar {
		height: calc(100% - 48px);
		margin-right: -12px;
		padding-right: 12px;
	}

	.extension-card:last-child {
		margin-bottom: 0;
	}
</style>