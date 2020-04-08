<template>
	<div id="aiod-popup" :class="theme" class="bg-grey-8 pa-5">
		<header>
			<div class="d-flex">
				<img class="logo" src="https://i.ibb.co/1Kg1L8C/rk-logo-48.png" alt="app-logo" />
				<h5 class="mb-0 ml-3 mt-1">Aoid Dark</h5>
				<div class="spacer" />
				<button class="settings circle bg-grey-6">
					<i class="grey-0 mdi mdi-cog mdi-18px" />
					<div class="settings-context">
						<ul>
							<li>Profile</li>
							<li>Theme</li>
							<li>Help</li>
							<li>About</li>
							<li>Contact</li>
						</ul>
					</div>
				</button>
			</div>
		</header>
		<section id="c-tabs" class="my-5 d-flex mx-10">
			<div
				v-for="(tab, ti) in tabs"
				@click="onClickTabItem(ti)"
				:key="ti"
				:class="tab.active&&'active'"
				class="c-tab w-100 px-5 py-3 pointer ta-c brr grey-5 bg-grey-7 br-grey-8"
			>
				<h6>{{tab.text}}</h6>
			</div>
		</section>
		<section v-if="tabs[0].active" id="themes">
			<ul class="theme-web-list">
				<li
					v-for="(item, index) in websites"
					@click="handleWebsiteClick(index)"
					:key="index"
					class="pointer brb px-6 py-3"
				>
					<div class="d-flex">
						<i :class="item.icon" />
						<h6 class="ml-4 mt-1">{{item.name}}</h6>
						<div class="spacer" />
						<custom-switch class="mt-1" @change="handleWebsiteClick(index)" :checked="item.active" />
					</div>
				</li>
			</ul>
		</section>
		<section v-if="tabs[1].active" id="schedule">
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non delectus vel ab impedit magni dolore assumenda repudiandae culpa eaque perspiciatis perferendis possimus consequuntur officia tenetur quia dolor, quisquam sed accusamus illo minima odio in obcaecati. Numquam iste soluta optio amet alias ea laborum, voluptatem vitae error et hic dolorem doloribus!</p>
		</section>
	</div>
</template>

<script>
// Components
import Switch from "./custom/Switch.vue"
// Storage
import storage from "../storage/chrome.storage"
// Storage keys
const { WEBSITES } = storage.keys

export default {
	name: "Popup",
	components: {
		"custom-switch": Switch
	},
	data: () => ({
		theme: "dark",
		websites: [
			{ name: 'Google', url: "https://google.com", active: true, icon: 'mdi mdi-google' },
			{ name: 'Fiverr', url: "https://fiverr.com", active: true, icon: "mdi mdi-semantic-web" },
			{ name: 'Youtube', url: "https://youtube.com", active: true, icon: "mdi mdi-youtube" },
			{ name: 'Facebook', url: "https://facebook.com", active: true, icon: "mdi mdi-facebook" },
		],
		tabs: [
			{ text: "Theme", active: true },
			{ text: "Schedule", active: false }
		]
	}),
	created() {
		this.syncStorage()
	},
	watch: {
		websites(v) {
			console.log(v)
		}
	},
	methods: {
		async syncStorage() {
			await storage.set(WEBSITES, this.websites)
			this.websites = (await storage.get(WEBSITES)) || []
		},
		async handleWebsiteClick(index) {
			this.websites[index].active = !this.websites[index].active
			let res = await storage.set(WEBSITES, [...this.websites])
			console.log(res)
		},
		onClickTabItem(i) {
			this.tabs = this.tabs.map((tab, ti) => ti == i ? { ...tab, active: true } : { ...tab, active: false })
		}
	}
};
</script>
<style lang="scss">
	#aiod-popup {
		width: 24rem;
		color: #e0e0e0 !important;
		header {
			.logo {
				height: 2.5rem;
			}
		}
		#themes {
			ul.theme-web-list {
				li {
					border-radius: 0.2rem;
					border-color: #353535;
					&:hover,
					&.active {
						background: #353535;
					}
					&:last-child {
						border: none !important;
					}
					i {
						font-size: 1.5em;
					}
				}
			}
		}
		#c-tabs {
			.c-tab {
				&:first-child {
					border-top-left-radius: 2rem;
					border-bottom-left-radius: 2rem;
				}
				&:last-child {
					border: none !important;
					border-top-right-radius: 2rem;
					border-bottom-right-radius: 2rem;
				}
				&.active {
					background-color: teal;
					color: white;
				}
				h6 {
					text-transform: uppercase;
					font-size: 1.15em;
				}
			}
		}
		.settings {
			&:focus-within .settings-context {
				opacity: 1;
				transition: all 0.2s ease-in-out;
			}
			.settings-context {
				position: absolute;
				z-index: 10;
				transform: translate(-40%);
				background-color: teal;
				color: wheat;
				padding: 1rem;
				text-align: left;
				opacity: 0;
			}
		}
	}
</style>