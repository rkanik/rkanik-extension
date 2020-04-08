console.log("CHROME", chrome)
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

// chrome.runtime.onMessage.addListener((msg, sender) => {
//    console.log("chrome.runtime.onMessage.addListener", msg, sender)
//    // First, validate the message's structure.
//    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
//       // Enable the page-action for the requesting tab.
//       //chrome.Bro.show(sender.tab.id);
//    }
// });