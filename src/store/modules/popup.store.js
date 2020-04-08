
import storage from "../../storage/chrome.storage"

const initialState = {
   currentUser: {
      name: "RK Anik", userName: "RKANIK",
      email: "RK.Anik.773@gmail.com"
   },
   websites: [
      { name: 'Google', url: "https://google.com", theme: "dark", active: true, icon: 'mdi-facebook' },
      { name: 'Fiverr', url: "https://fiverr.com", theme: "dark", active: true, icon: "fab fa-fonticons" },
      { name: 'Youtube', url: "https://youtube.com", theme: "dark", active: true, icon: "mdi-youtube" },
   ]
}

const state = { ...initialState }

const getters = {
   currentUser: state => state.currentUser,
   $websites: state => state.websites
}

const mutations = {
   changeActive: (state, index) => {
      state.websites[index].active = !state.websites[index].active
      set('websites', state.websites)
   }
}

const actions = {

}

export default {
   namespaced: true,
   state, getters, mutations, actions
}