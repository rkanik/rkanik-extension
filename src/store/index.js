import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import Popup from "./modules/popup.store"

// Using vuex
Vue.use(Vuex)

// Creating and exporting store
export default new Vuex.Store({
   modules: { POPUP: Popup },
   plugins: []
})
