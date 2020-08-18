
const keys = {
    WEBSITES: "WEBSITES",
    THEME: "THEME"
}

const get = key => new Promise(resolve => {
    key
        ? chrome.storage.sync.get(key, storage => {
            if (storage && storage[key]) resolve(storage[key])
            else resolve(undefined)
        })
        : chrome.storage.sync.get(storage => resolve(storage))
})

const set = (key, value) => new Promise(resolve => {
    console.log("SET", key, value)
    chrome.storage.sync.set({ [key]: value })
    resolve("OK")
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
    keys, get, set, clear, onChanged
}