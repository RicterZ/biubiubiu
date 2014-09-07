window.onload = function(){

    if (localStorage.getItem("biu_status") == "null")
        localStorage.setItem("biu_status", 1);

    chrome.tabs.query({}, function(tabs) {
        if (localStorage.getItem("biu_status") == 1) 
            for (var i=0; i<tabs.length; i++) {
                console.log('tab id: ' + tabs[i].id);
                chrome.tabs.sendMessage(tabs[i].id, {"type": "start"});
            };
    })

    chrome.tabs.onUpdated.addListener(function (tab, changeInfo) {
        if (localStorage.getItem("biu_status") == 1) {
            chrome.tabs.sendMessage(tab, {"type": "start"});
        }
    });

    chrome.tabs.onRemoved.addListener(function (tab) {
        if (localStorage.getItem("biu_status") == 1) 
            chrome.tabs.sendMessage(tab, {"type": "close"});
    });

}