import os

class Config:
    MYSQL_DB_PROD = 'Parkit'
    MYSQL_DB_DEV = 'Parkit-dev'
    MYSQL_HOST = 'localhost'
    MYSQL_PASS = os.environ.get('MYSQL_PASS')
    MYSQL_USER = os.environ.get('MYSQL_USER')
    PARKIT_SLOW_DB_QUERY_TIME = 0.5
    SECRET_KEY = \
       r'ac7\x14\xb5L9\x8b\xae<\xd3\xc3\xfe\xa9\x15\x9c\xf9\xd3\xdf\x10\x1b\xc9'
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    SQLALCHEMY_RECORD_QUERIES = True
    SSL_DISABLE = False

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql://' + Config.MYSQL_USER + ':' + \
            Config.MYSQL_PASS + '@' + Config.MYSQL_HOST + r'/' + \
            Config.MYSQL_DB_DEV

class ProductionConfig(Config):

    @classmethod
    def init_app(cls,app):

        Config.init_app(app)

        # log warnings
        import logging
        from logging.handlers import SysLogHandler
        syslog_handler = SysLogHandler()
        syslog_handler.setLevel(logging.WARNING)
        app.logger.addHandler(syslog_handler)

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
