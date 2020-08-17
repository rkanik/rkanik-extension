import { NOTIFICATION } from '../helpers/defined'
console.log("CHROME-background", chrome)

// chrome.runtime.onInstalled.addListener(res => {
//    console.log("onInstalled", res)
//    console.log(chrome)
//    //chrome.browserAction.setBadgeText("15")
//    chrome.storage.sync.set({ color: '#3aa757' }, function () {
//       console.log("The color is green.");
//    });
//    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//       chrome.declarativeContent.onPageChanged.addRules([{
//          conditions: [new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: 'developer.chrome.com' },
//          })
//          ],
//          actions: [new chrome.declarativeContent.ShowPageAction()]
//       }]);
//    });
// });

// chrome.browserAction.setBadgeText({ text: "15" })

const createNotification = (name, options) => {
    chrome.notifications.create(name, { type: 'basic', ...options }, event => {
        console.log(event);
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("ON MESSAGE :: ", request, sender)

    if (request.type === NOTIFICATION) {
        createNotification(request.name, request.options)
        sendResponse({ message: "DONE" })
    }

});