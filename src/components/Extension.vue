<template>
	<el-card
		class="extension-card shadow-1"
		:body-style="{ padding: expanded ? '20px' : '10px' }"
		:class="{ expanded }"
	>
		<el-row :gutter="16" :class="{ 'mb-4': expanded }">
			<el-col :span="3">
				<el-image
					class="extension-card--image"
					v-if="ext.icons.length"
					:src="getIcon(ext.icons)"
				></el-image>
			</el-col>
			<el-col :span="16">
				<h3 class="extension-card--name">
					{{ ext.name }}
					<span class="extension-card--version">{{ ext.version }}</span>
				</h3>
				<p v-if="expanded" class="extension-card--desc">
					{{ ext.description }}
				</p>
			</el-col>
			<el-col :span="5">
				<flex-box justifyEnd>
					<rk-switch
						size="small"
						v-model="ext.enabled"
						@change="(v) => $emit('change', { id: ext.id, value: v })"
					/>
				</flex-box>
			</el-col>
		</el-row>
		<el-button
			plain
			size="mini"
			type="danger"
			v-if="expanded"
			@click="$emit('delete', ext.id)"
			>Delete</el-button
		>
	</el-card>
</template>

<script>
import Switch from './custom/Switch.vue'
export default {
	name: 'extension',
	components: {
		'rk-switch': Switch
	},
	props: {
		ext: {
			type: Object,
			required: true
		},
		expanded: Boolean
	},
	methods: {
		getIcon(icons) {
			let icon = icons.find(i => i.size === 48)
			return icon ? icon.url : icons[0].url
		},
	},
}
</script>

<style lang='scss' scoped>
	.extension-card {
		margin-bottom: 0.8rem;
		background-color: var(--bg-secondary);
		border: none;
		&--image {
			height: 1.8rem;
			width: 1.8rem;
		}
		&--name {
			color: var(--text-primary);
			font-size: 1.2em;
			text-transform: capitalize;
			margin-bottom: 0.25rem;
		}
		&--desc,
		&--version {
			color: var(--text-secondary);
		}
		&--version {
			font-size: 0.7em !important;
		}
		&.expanded {
			.extension-card--name {
				margin-bottom: 0;
			}
		}
	}
</style>