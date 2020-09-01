import Vue from 'vue'
import App from '../App.vue'
import store from "../store"
import router from '../router'
import icons from '../icons'

// Chrome
import _storage from '../chrome/_storage'
import { SETTINGS, ROUTE } from '../chrome/_storage/keys'

// Libs
import VueFeather from 'vue-feather';

// Plugins
import '../plugins/element'

// Components
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import FlexBox from '../components/utils/FlexBox.vue'
import Icon from '../components/utils/Icon.vue'
import Switch from '../components/custom/Switch.vue'

// Style sheets
import "../assets/scss/popup.scss"
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

// Disabling production tips
Vue.config.productionTip = false

// Use
Vue.use(PerfectScrollbar)
Vue.use(VueFeather);

// Components
Vue.component(FlexBox.name, FlexBox)
Vue.component(Icon.name, Icon)
Vue.component('rk-switch', Switch)

// Proto
Vue.prototype.$icons = icons

// Initializing vue
new Vue({
    store, router,
    created() { this.syncSettings() },
    methods: {
        async syncSettings() {
            let settings = await _storage.get(SETTINGS)
            if (settings) {
                let nav = settings.find(s => s.title === 'Navigation')
                if (nav) {
                    let rem = nav.blocks.find(b => b.title === 'Remember')
                    if (rem && rem.active) {
                        let route = await _storage.get(ROUTE)
                        this.$router.push(route.path)
                        return
                    }
                }
            }
            this.$route.path !== '/' && this.$router.replace('/')
        },
    },
    watch: {
        '$route'({ name, path }) {
            _storage.set(ROUTE, { name, path })
        }
    },
    render: h => h(App)
}).$mount('#app')
