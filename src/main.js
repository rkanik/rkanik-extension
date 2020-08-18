import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import router from './router'

import VueFeather from 'vue-feather';
console.log(VueFeather);
Vue.use(VueFeather);

// Plugins
import './plugins/element'

// Components
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import FlexBox from './components/utils/FlexBox.vue'

// Style sheets
import "./assets/scss/popup.scss"
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

// Disabling production tips
Vue.config.productionTip = false

Vue.use(PerfectScrollbar)
Vue.component(FlexBox.name, FlexBox)

// Initializing vue
new Vue({ 
    store, router,
    render: h => h(App) 
}).$mount('#app')
