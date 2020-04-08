<template>
	<div id="app">
		<popup />
	</div>
</template>

<script>
// Components
import Popup from "./components/Popup"
// Default export
export default {
	name: 'App',
	components: {
		'popup': Popup
	}
}
</script>
<style lang="scss">
	@import "./assets/scss/inc/_styles.scss";
	@import "./assets/scss/utils/_utils.scss";
</style>