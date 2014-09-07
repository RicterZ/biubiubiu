var ctrl_dict = {0: 'close', 1: 'start'},
    status = localStorage.getItem("biu_status");

if (status == "null") {
    status = 1;
    start();
}
$('#controller').text(ctrl_dict[status==1?0:1]);


function send(data, id) {
    chrome.tabs.query({}, function(tabs) {
        for (var i=0; i<tabs.length; i++) {
            if (id != undefined) {
                if (tabs[i].id == id) 
                    chrome.tabs.sendMessage(tabs[i].id, data);
            } else {
                chrome.tabs.sendMessage(tabs[i].id, data);
            }
        }
    });
}


function start() {
    console.log('biu started');
    send(1);
    localStorage.setItem("biu_status", 1);
    $('#controller').text({"type": ctrl_dict[0]});
}


function close() { 
    console.log('biu closed');
    send(0);
    localStorage.setItem("biu_status", 0);
    $('#controller').text({"type": ctrl_dict[1]});
}


$('#controller').click(function() {
    status = localStorage.getItem("biu_status");
    if (status == 1) {
        close();
    } else {
        start();
    }
})


$('#send').click(function() {
    chrome.tabs.getSelected(null, function(tab) {
        var text = $('#biu_text').val();
        if (!text) return;
        send({"type": 'send', 'data': text}, tab.id);
        //chrome.tabs.sendMessage(tab.id, {"type": ctrl_dict[1]});
        //chrome.tabs.sendMessage(tab.id, {"type": "send", "data": "test data"});
    })
})

