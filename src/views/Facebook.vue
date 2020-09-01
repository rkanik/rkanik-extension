<template>
	<div class="facebook">
		<el-button @click="handleClickAutoLike">Auto like</el-button>
	</div>
</template>

<script>
import _tabs from '../chrome/_tabs'
import { sleep } from '../helpers/helpers'
export default {
	name: 'facebook',
	data: () => ({
		autoLike: {
			running: false,
			tabId: null
		}
	}),
	created() {
		_tabs.onUpdate(id => { this.handleOnUpdate(id) })
	},
	methods: {
		async handleOnUpdate(tabId) {
			let tab = await _tabs.get(tabId)
			if (tabId === this.autoLike.tabId && tab.status === 'complete') {
				_tabs.send(tabId, { type: "AUTO_LIKE" });
				!tab.active && _tabs.update(tabId, { active: true })
			}
		},
		async handleClickAutoLike() {
			let facebook = 'https://www.facebook.com/'

			let tabs = await _tabs.query({ url: 'https://*.facebook.com/*' })
			if (tabs.length) {
				console.log('query -> ', tabs[0]);
				let tab = tabs[0]

				await _tabs.update(tab.id, { active: true })
				await sleep(3, 's')
				_tabs.send(tab.id, { type: "AUTO_LIKE" });
			}

			// chrome.tabs.query({ url: 'https://*.facebook.com/*' }, async tabs => {
			// 	console.log('query 2 -> ', tabs);
			// 	if (tabs.length) {
			// 		console.log('query -> ', tabs[0]);
			// 		let tab = tabs[0]

			// 		let getTab = await _tabs.get(tab.id)
			// 		console.log('gettab', getTab);
			// this.autoLike.tabId = tab.id
			// if (tab.url !== facebook) {
			// 	chrome.tabs.update(tab.id, { url: facebook })
			// } else {
			// 	chrome.tabs.sendMessage(tab.id, { type: "AUTO_LIKE" });
			// 	!tab.active && chrome.tabs.update(tab.id, { active: true })
			// }
		}
		// else {
		// 	chrome.tabs.create({ active: false, url: facebook }, tab => {
		// 		this.autoLike.tabId = tab.id
		// 	})
		// }
		//})
		//},
	},
}
</script>

<style lang='scss' scoped>
	.facebook {
	}
</style>