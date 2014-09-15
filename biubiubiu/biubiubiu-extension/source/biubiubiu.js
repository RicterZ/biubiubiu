//global
//window.location.host
//window.location.href

function BiuBiuBiu() {
    this.id_url = window.location.host;
    this.url = 'ws://biu.ricter.me/biubiubiu';
    this.time = 8;

    this.init = function () {
        if (document.getElementById('biu_wrapper')) return;
        this.create_wrapper();
        this.listener();
    };

    this.get_wrapper = function() {
        var biu_wrapper = document.getElementById('biu_wrapper');
        if (!biu_wrapper) biu_wrapper = this.create_wrapper();
        return $(biu_wrapper);
    };

    this.create_wrapper = function () {
        biu_wrapper = document.createElement('div');
        biu_wrapper.id = 'biu_wrapper';
        $('body').append(biu_wrapper);
        return biu_wrapper;
    }

    this.biu = function (text) {
        biu_text = document.createElement('p');
        biu_text.className = 'biu_text';
        biu_text.innerText = text;
        biu_text.style.top = this.get_random_top() + 'px';
        this.get_wrapper().append(biu_text);
        biu_text.style.right = '-' + biu_text.offsetWidth + 'px';

        var offset = document.body.clientWidth + biu_text.offsetWidth + 10;
        var time = document.body.clientWidth / (offset / this.time);

        biu_text.style.cssText += 'transition: all ' + time + 's linear;';
        biu_text.style.cssText += 'transform: translate(' + -offset + 'px, 0);';
    };

    this.get_random_top = function() {
        return Math.random() * ($(window).height() * 0.83);
    };

    this.send_text = function (text) {
        if (!this.ws || this.ws.readyState == this.ws.CLOSED || this.ws.readyState == this.ws.CLOSING) {
            this.listener();
        }
        if (this.ws.readyState == this.ws.OPEN) {
            console.log('[biu] Send: ' + text);
            this.ws.send(text);
        }
    };

    this.listener = function() {
        if (this.ws != undefined) 
            if (this.ws.readyState == this.ws.OPEN) return;
        this.ws = new WebSocket(this.url + '?url=' + this.id_url);
        _this = this;

        this.ws.onmessage = function (event) {
            var text = JSON.parse(event.data).text;
            _this.biu(text);
            console.log('[biu] Recv: ' + text);
        }

        this.ws.onclose = function () {
            console.log('[biu] Reconnecting ...');
            _this.listener();
        }
        console.log('[biu] Connected successfully');
    };

    this.close = function () {
        if (!this.ws) return;
        this.ws.onclose = function (){
            console.log('[biu] Closed without reconnection')
        };
        this.ws.close();
    };
}



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('[biu] Command: ' + request.type);
    if (request.type == 'start') {
        if (!window.biu) {
            biu = new BiuBiuBiu();
            biu.init();
        } else {
            biu.init();
        }
    } else if (request.type == 'close') {
        biu.close()
    } else if (request.type == 'send') {
        biu.send_text(request.data);
    }
}); 

