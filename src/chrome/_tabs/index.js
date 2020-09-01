const get = id => new Promise(res => {
    chrome.tabs.get(id, tab => { res(tab) })
})

const query = options => new Promise(res => {
    chrome.tabs.query(options, tabs => { res(tabs) })
})

const create = options => new Promise(res => {
    chrome.tabs.create(options, tab => { res(tab) })
})

const update = (id, data, cb) => new Promise(res => {
    chrome.tabs.update(id, data, res => { cb & cb(res) })
})

const onUpdate = cb => {
    chrome.tabs.onUpdated.addListener((id, info) => { cb(id, info) })
}

const send = (id, message, cb) => {
    chrome.tabs.sendMessage(id, message, res => { cb && cb(res) });
}

export default { get, query, create, send, update, onUpdate }