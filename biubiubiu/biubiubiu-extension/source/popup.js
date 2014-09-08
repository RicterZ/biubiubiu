var ctrl_dict = {0: 'close', 1: 'start'},
    button_text = {0: '点窝开始ww', 1: '关闭咱QAQ'}
    status = localStorage.getItem("biu_status");

$('#controller').text(button_text[status==1?0:1]);

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
    send({"type": ctrl_dict[1]});
    localStorage.setItem("biu_status", 1);
    $('#controller').text(button_text[0]);
}


function close() { 
    console.log('biu closed');
    send({"type": ctrl_dict[0]});
    localStorage.setItem("biu_status", 0);
    $('#controller').text(button_text[1]);
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

