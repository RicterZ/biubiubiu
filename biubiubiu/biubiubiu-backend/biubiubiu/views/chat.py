from biubiubiu.base import BaseSocketHandler


class BiuSocketHandler(BaseSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        self.session.id = str(id(self))
        self.session.url = self.get_argument('url', None)
        print 'Request: %s - %s' % (self.session.id, self.session.url)
        self.clients.add(self)

    def on_close(self):
        print 'Close: %s - %s' % (self.session.id, self.session.url)
        self.clients.remove(self)

    def on_message(self, message):
        #print 'Recv: %s' % message
        self.send_message({'text': message}, self.session.url)
