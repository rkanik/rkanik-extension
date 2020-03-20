console.log(chrome)
chrome.runtime.onInstalled.addListener(res => {
   console.log("onInstalled", res)
   console.log(chrome)
   chrome.storage.sync.set({ color: '#3aa757' }, function () {
      console.log("The color is green.");
   });
   chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
      chrome.declarativeContent.onPageChanged.addRules([{
         conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'developer.chrome.com' },
         })
         ],
         actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
   });
});