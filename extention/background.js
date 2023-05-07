chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tab.url);

});