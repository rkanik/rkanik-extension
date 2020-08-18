import Vue from 'vue'
import App from '../App.vue'
import store from "../store"
import router from '../router'
import icons from '../icons'

import VueFeather from 'vue-feather';
Vue.use(VueFeather);

// Plugins
import '../plugins/element'

// Components
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import FlexBox from '../components/utils/FlexBox.vue'
import Icon from '../components/utils/Icon.vue'

// Style sheets
import "../assets/scss/popup.scss"
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

// Disabling production tips
Vue.config.productionTip = false

Vue.use(PerfectScrollbar)
Vue.component(FlexBox.name, FlexBox)
Vue.component(Icon.name, Icon)

Vue.prototype.$icons = icons

// Initializing vue
new Vue({
    store, router,
    created() { this.$router.replace('/') },
    render: h => h(App)
}).$mount('#app')
