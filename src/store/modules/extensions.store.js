import { loadExtensions } from '../../chrome'

const initialState = {
    extensions: []
}

const state = { ...initialState }

const getters = {
    $extensions: ({ extensions }) => extensions
}

const mutations = {
    setExtState(state, payload) {
        Object.keys(payload).forEach(key => { state[key] = payload[key] })
    }
}

const actions = {
    getExtensions({ commit }) {
        loadExtensions().then(extensions => {
            commit('setExtState', { extensions })
        })
    }
}

export default {
    namespaced: true,
    state, getters, mutations, actions
}