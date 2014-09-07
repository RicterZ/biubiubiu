import json

import tornado.web
import tornado.websocket

from utils import Storage

class BaseSocketHandler(tornado.websocket.WebSocketHandler):
    clients = set()

    def __init__(self, application, request, **kwargs):
        self.session = Storage()
        tornado.websocket.WebSocketHandler.__init__(self,application, request, **kwargs)

    @staticmethod
    def send_message(message, url):
        for client in BaseSocketHandler.clients:
            if client.session.url == url:
                client.write_message(json.dumps(message))

