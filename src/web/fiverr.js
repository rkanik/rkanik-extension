import { FIVE_MINUTE, NOTIFICATION } from "../helpers/defined"
import { sleep, ms, miniId } from '../helpers/helpers'

// Global variables
let visible = true

const showNotification = (notifyNo, options) => {
    // Show new message notification
    const notifyOptions = {
        options,
        type: NOTIFICATION,
        name: 'FIVERR-NEW-MESSAGE' + notifyNo
    }
    chrome.runtime.sendMessage(notifyOptions, () => { });
}

const checkForLiveMessage = count => {
    let liveChat = document.getElementById('live-tray')
    if (liveChat && liveChat.children.length) {
        showNotification(count, {
            title: "New Message!!!",
            message: 'You have a new message on fiverr',
            iconUrl: 'https://www.fiverr.com/favicon.ico'
        })
    }
}

let cmInterval = 10 * ms.second
const checkForNewMessage = async () => {

    if (!visible) {
        let messageBtn = document.querySelector('.popover-notifications-drawer button')
        if (messageBtn) { messageBtn.click() }
        await sleep(ms.second)
        messageBtn.click()
    }

    let hasUnread = document.querySelector('.popover-notifications-drawer .unread')
    if (hasUnread) {
        showNotification(miniId(3), {
            title: "New Message!!!",
            message: 'You have a new message on fiverr',
            iconUrl: 'https://www.fiverr.com/favicon.ico'
        })
        cmInterval = 10 * ms.minute
    }
    else cmInterval = 10 * ms.second
    
    await sleep(cmInterval)
    checkForNewMessage()
}

export default async () => {

    console.log("CHROME", chrome, chrome.notifications);

    // Defining a job
    let fiveMinuteTimeout

    // Method will  start the job
    const startFiveMinuteReloader = () => {
        fiveMinuteTimeout = setTimeout(() => { location.reload() }, FIVE_MINUTE);
    }

    // starting reloader when tab is in background
    if (document.hidden) { startFiveMinuteReloader() }

    // Listening on visibilitychange
    document.addEventListener("visibilitychange", () => {

        // starting reloader when tab is in background
        if (document.hidden) {
            visible = false
            startFiveMinuteReloader()
        }
        else visible = true

        // Clearing reloader timeout when tab get focused
        if (!document.hidden && fiveMinuteTimeout) { clearTimeout(fiveMinuteTimeout) }
    });




    checkForNewMessage()


    let counter = 0
    setInterval(() => {
        counter += 1;
        checkForLiveMessage(counter)
    }, 10000);
}
