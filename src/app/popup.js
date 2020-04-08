// importing vue itself
import Vue from 'vue'

// Style sheets
import "../assets/scss/inc/_styles.scss"
import "../assets/scss/utils/_utils.scss"

// Components
import Popup from '../components/Popup.vue'

// Store
import store from "../store"

// Disabling production tips
Vue.config.productionTip = false

// Initializing vue
new Vue({
   store,
   render: h => h(Popup)
}).$mount('#popup')
