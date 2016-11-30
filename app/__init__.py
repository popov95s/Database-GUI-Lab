from flask import Flask, g, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from .errors import bad_request, forbidden, unauthorized
import os
import uuid

if os.path.exists('../parkit.env'):
    print "Importing environment from parkit.env..."
    for line in open('../parkit.env'):
        var = line.strip().split('=')
        if len(var) == 2:
            os.environ[var[0]] = var[1]

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://' + \
    os.getenv('MYSQL_USER') + ':' + os.getenv('MYSQL_PASS') + '@' + 'localhost/Parkit'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = \
        r'ac7\x14\xb5L9\x8b\xae<\xd3\xc3\xfe\xa9\x15\x9c\xf9\xd3\xdf\x10\x1b\xc9'

auth = HTTPBasicAuth(scheme='Bearer')

db = SQLAlchemy(app)

from .models import User, Lot, ParkingInfo

@app.route('/')
def hello():
    return "Parkit API"

@app.route('/login', methods=['POST'])
def login():
    login_info = request.get_json()
    try:
        if login_info['username'] is None or login_info['password'] is None:
            return bad_request('No username or password provided.')
    except:
        return bad_request('JSON was unable to be parsed.')
    user = User.query.filter_by(username=login_info['username']).first()
    if user is not None and user.verify_password(login_info['password']):
        g.current_user = user
        return jsonify({'Authorization': g.current_user.generate_auth_token(expiration=3600)})
    return unauthorized('Incorrect username or password.')

# TODO: add a default return value with appropriate HTTP status code 
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    sign_up_info = request.get_json()
    try:
        if sign_up_info['username'] is None or sign_up_info['password'] is None or sign_up_info['email'] is None or sign_up_info['first_name'] is None or sign_up_info['last_name'] is None or sign_up_info['fav_lot'] is None:
            return bad_request('No username or password provided')
    except:
        return bad_request('JSON was unable to be parsed.')
    user = User.query.filter_by(username=sign_up_info['username']).first();
    if user is None:
        user = User(user_id = str(uuid.uuid4()),
                    username = sign_up_info['username'],
                    password = sign_up_info['password'],
                    email = sign_up_info['email'],
                    first_name = sign_up_info['first_name'],
                    last_name = sign_up_info['last_name'],
                    favorite_lot = sign_up_info['fav_lot'])
        db.session.add(user)
        g.current_user = user
        return jsonify({"Authorization": g.current_user.generate_auth_token(expiration=3600)})
    return bad_request('Username already exists.')

# TODO: figure out sending emails for resetting passwords
@app.route('/forgotpass', methods=['GET', 'POST'])
def forgotpass():
    email_info = request.get_json()
    try:
        if email_info['email'] is None:
            return bad_request('No email provided')
    except:
        return bad_request('JSON was unable to be parsed')
    user = User.query.filter_by(email = email_info['email'])
    if user is not None:
        return "password"

# TODO: Coordinate what methods return what errors
@app.route('/checkin', methods=['GET', 'POST'])
def checkin():
    auth_token = request.headers.get('Authorization')	
    checkin_info = request.get_json()
    g.current_user = User.verify_auth_token(auth_token)
    try:
        if g.current_user is not None:
	    lot_parked = checkin_info['parkingLot']
            floor_parked = checkin_info['floor']
            new_checkin = ParkingInfo(parking_user_id = g.current_user.user_id, lot = lot_parked, floor = floor_parked)
            db.session.add(new_checkin)
	    return "Checkin in successful"
    except:
        return bad_request("something idk could be unauthorized")
    return "doesn't work"

# TODO: Not sure if this is the proper/safe way to delete user, figure out how to get rid of auth token, not sure what to return (apiary sucks)
@app.route('/checkout', methods=['POST'])
def checkout():
    checkout_user_token = request.headers.get('Authorization')
    g.current_user = User.verify_auth_token(checkout_user_token)
    user_id1 = g.current_user.user_id
    parking_info = ParkingInfo.query.filter_by(parking_user_id = user_id1).first()
    try:
        if g.current_user is not None:
            db.session.delete(parking_info)
            return "User deleted"
    except:
        return bad_request("Unable to delete")
    return unauthorized("You can't delete this user")

@auth.verify_password
def verify_password(username_or_token, password):
    if username_or_token == '':
        return False
    if password == '' or password is None:
        g.current_user = User.verify_auth_token(username_or_token)
        return g.current_user is not None
    user = User.query.filter_by(username=username_or_token).first()
    if not user:
        return False
    g.current_user = user
    return user.verify_password(password)

@auth.error_handler
def auth_error():
    return unauthorized('Invalid credentials - authentication error.')

@app.route('/token', methods=['GET'])
@auth.login_required
def get_token():
    return jsonify({'Authorization': g.current_user.generate_auth_token(expiration=3600)})

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
