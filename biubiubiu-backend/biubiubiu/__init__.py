import tornado.web
from biubiubiu import views


class Application(tornado.web.Application):
    def __init__(self):
        handlers = views.handlers

        settings = dict(
            debug = True,
        )

        tornado.web.Application.__init__(self, handlers=handlers, **settings)
