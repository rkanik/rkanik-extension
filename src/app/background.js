import { NOTIFICATION, FB_SEND_MESSAGE, MS } from '../helpers/defined'
import { sleep } from '../helpers/helpers'
import _tabs from '../chrome/_tabs'

// Chrome storage
import _storage from '../chrome/_storage'
import { THEMES } from '../chrome/_storage/keys'

console.log("CHROME :: ", chrome)

const onInstalled = async () => {
    console.log('onInstalled :: ');

    if (!await _storage.has(THEMES)) {
        _storage.set(THEMES, _storage.initialState.THEMES)
    }
}

var scheduler = {
    nextJob: MS.SEC * 3,
    jobs: [
        {
            id: 'some-id',
            type: FB_SEND_MESSAGE,
            url: 'https://facebook.com/messages/t/oniket.prantor.123829',
            message: 'Hello',
            done: false,
            running: false,
            triggerAt: Date.now() + (MS.SEC * 5)
        }
    ]
}

_tabs.onUpdate((tabId, info) => {
    if (info.status === 'complete') {
        let job = scheduler.jobs.find(job => !job.done && job.running && job.tab.id == tabId)
        if (job) {
            _tabs.send(tabId, job, res => {
                console.log('SEND DONE :: ', res);
            })
        }
    }
})

const checkJobsTodo = async () => {
    console.log(':: Check Jobs ::');

    // Finding job index to do
    let jobIndex = scheduler.jobs.findIndex(job => !job.done && !job.running && job.triggerAt <= Date.now())

    // Job found
    if (jobIndex !== -1) {

        // Updating job 
        let job = scheduler.jobs[jobIndex]
        job.running = true

        let tab = await _tabs.create({ active: true, url: job.url })
        console.log('Tab :: ', tab);
        job.tab = { id: tab.id, status: tab.status }
    }

    console.log(scheduler.jobs);

    let sortedJobs = scheduler.jobs
        .filter(job => job.triggerAt > Date.now())
        .sort((a, b) => a.triggerAt - b.triggerAt)
    if (sortedJobs.length) {
        scheduler.nextJob = new Date(sortedJobs[0].triggerAt).getTime() - Date.now()
    }

    await sleep(scheduler.nextJob)
    checkJobsTodo()
}

const createNotification = (name, options) => {
    chrome.notifications.create(name, { type: 'basic', ...options }, event => {
        console.log(event);
    });
}

// Event listeners
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("ON MESSAGE :: ", request, sender)

    if (request.type === NOTIFICATION) {
        createNotification(request.name, request.options)
        sendResponse({ message: "DONE" })
    }

});


chrome.runtime.onConnect.addListener((...args) => {
    console.log('onConnect :: ', ...args);
})

chrome.runtime.onInstalled.addListener(onInstalled)

chrome.runtime.onStartup.addListener((...args) => {
    console.log('onStartup :: ', ...args);
})