from flask import Flask, g, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from .errors import forbidden, unauthorized

app = Flask(__name__)
auth = HTTPBasicAuth()

db = SQLAlchemy(app)

from app import models

@app.route('/')
def hello():
    return "<h1 style='color:blue'>Hello There!</h1>"

@app.route('/login', methods=['GET','POST'])
def login():
    return "Success!"

@auth.verify_password
def verify_password(username_or_token, password):
    if username_or_token == '':
        return False
    if password == '':
        g.current_user = User.verify_auth_token(username_or_token)
        g.token_used = True
        return g.current_user is not None
    user = User.query.filter_by(username=username_or_token).first()
    if not user:
        return False
    g.current_user = user
    return user.verify_password(password)

@auth.error_handler
def auth_error():
    return unauthorized('Invalid credentials')

@app.route('/token', methods=['GET'])
@auth.login_required
def get_token():
    if g.token_used:
        return unauthorized('Invalid credentials')
    return jsonify({"Authorization": g.current_user.generate_auth_token()})

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
