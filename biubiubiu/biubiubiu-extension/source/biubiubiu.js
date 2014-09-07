//global
//window.location.host
//window.location.href

function BiuBiuBiu() {
    this.id_url = window.location.host;
    this.url = 'ws://biu.ricter.me/biubiubiu';

    this.init = function () {
        if (self.ws)
            self.ws.close();
        biu_wrapper = document.createElement('div');
        biu_wrapper.className = 'biu_wrapper';
        $('body').append(biu_wrapper);
        this.biu_wrapper = $(biu_wrapper);
        this.listener();
    };

    this.biu = function (text) {
        biu_text = document.createElement('p');
        biu_text.className = 'biu_text';
        biu_text.style.top = this.get_random_top() + 'px';
        biu_text.innerText = text;
        this.biu_wrapper.append(biu_text);
    };

    this.get_random_top = function() {
        return Math.random() * ($(window).height() * 0.83);
    };

    this.send_text = function (text) {
        if (this.ws)
            this.ws.send(text);
    };

    this.listener = function() {
        this.ws = new WebSocket(this.url + '?url=' + this.id_url);
        this.ws.onmessage = function (event) {
            eval('var data = ' + event.data + ';');
            biu.biu(data.text);
        }
    };

    this.close = function () {
        if (this.ws)
            this.ws.close();
    };
}


biu = new BiuBiuBiu();


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.type);
    if (request.type == 'start') {
        biu.init();
    } else if (request.type == 'close') {
        biu.close()
    } else if (request.type == 'send') {
        biu.send_text(request.data);
    }
}); 

