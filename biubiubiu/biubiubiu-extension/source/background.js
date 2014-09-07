if (localStorage.getItem("biu_status") == 1) {
    chrome.tabs.query({}, function(tabs) {
        for (var i=0; i<tabs.length; i++) {
            chrome.tabs.sendMessage(tabs[i].id, {"type": "start"});
        }
    });

    chrome.tabs.onUpdated.addListener(function (tab, changeInfo) {
        chrome.tabs.sendMessage(tab, {"type": "start"});
    })

    chrome.tabs.onRemoved.addListener(function (tab) {
        chrome.tabs.sendMessage(tab, {"type": "close"});
    })

    
}


