from flask import Flask, request, json
from flask_sqlalchemy import SQLAlchemy
from config import config
from .errors import bad_request, forbidden, unauthorized

app = Flask(__name__)
app.config.from_object(config['default'])
config_name.init_app(app)

# database base object
db = SQLAlchemy()
db.init_app(app)

@app.route('/login', methods=['GET','POST'])
def login():
    content = request.get_json(silent=True)
    if content['username']:
        user = User.query.filter_by(email=content['username']).first()
        if user is not None and user.verify_password(content['password']):
            return generate_auth_token()
        return unauthorized('Invalid username or password.') # 401 unauthorized
    return bad_request('Malformed request.') # 400 bad request

# def create_app(config_name):
#     app = Flask(__name__)
#     app.config.from_object(config[config_name])
#     config_name.init_app(app)
# 
#     db.init_app(app)
# 
#     if not app.debug and not app.config['SSL_DISABLE']:
#         from flask_sslify import SSLify
#         sslify = SSLify(app)
# 
#     return app
