chrome.browserAction.onClicked.addListener(function(tab) {
    var url = tab.url.toString(); 
    var el = document.createElement('a');
    el.href = url;  
    var storeurl = el.host;
    
    if( (tab.status == 'complete') && ( storeurl != 'extensions' ) ) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const port = chrome.tabs.connect(tabs[0].id);
            port.postMessage({ function: 'iconclick' });
            port.onMessage.addListener((response) => {});
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == "datagot"){
        chrome.browserAction.setIcon({path : 'icon_active.png', tabId: sender.tab.id});
        chrome.browserAction.setBadgeText({text: request.options.message, tabId: sender.tab.id});
    }
    sendResponse();
});
