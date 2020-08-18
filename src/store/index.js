import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import Popup from "./modules/popup.store"
import extensions from './modules/extensions.store'

// Using vuex
Vue.use(Vuex)

// Creating and exporting store
export default new Vuex.Store({
    modules: { POPUP: Popup, extensions },
    plugins: []
})
