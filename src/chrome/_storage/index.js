import { THEMES } from './keys'

const initialState = {
    [THEMES]: [
        { name: 'Google', origin: "https://www.google.com", theme: { dark: true } },
        { name: 'Fiverr', origin: "https://www.fiverr.com", theme: { dark: true } },
        { name: 'Youtube', origin: "https://www.youtube.com", theme: { dark: true } },
        { name: 'Facebook', origin: "https://www.facebook.com", theme: { dark: true } },
        { name: 'Github', origin: "https://www.github.com", theme: { dark: true } },
    ]
}

const state = () => new Promise(resolve => {
    chrome.storage.sync.get(storage => resolve(storage))
})

const get = key => new Promise(resolve => {
    key
        ? chrome.storage.sync.get(key, storage => {
            if (storage && storage[key]) resolve(storage[key])
            else resolve(undefined)
        })
        : chrome.storage.sync.get(storage => resolve(storage))
})

const set = (key, value) => new Promise(resolve => {
    chrome.storage.sync.set({ [key]: value })
    resolve("OK")
})

const has = key => new Promise(async resolve => {
    if (await get(key)) resolve(true)
    else { resolve(false) }
})

const clear = () => new Promise(resolve => {
    chrome.storage.sync.clear(res => {
        resolve(res)
    })
})

const onChanged = (name, callback) => {
    chrome.storage.onChanged.addListener(res => {
        if (res[name]) { callback(res) }
    })
}

export default {
    initialState, state, get, has, set, clear, onChanged
}