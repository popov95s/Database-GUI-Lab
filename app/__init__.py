from flask import Flask, g, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
from flask_httpauth import HTTPBasicAuth
from .errors import bad_request, forbidden, unauthorized
import os

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

auth = HTTPBasicAuth()

db = SQLAlchemy(app)

from .models import User, Lot, ParkingInfo

@app.route('/')
def hello():
    return "Parkit API"

# TODO: add try/except blocks for the username/password retrieval from JSON
@app.route('/login', methods=['GET','POST'])
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
<<<<<<< HEAD
        return jsonify({'Authorization': g.current_user.generate_auth_token()})
    return unauthorized('Incorrect username or password.')

@app.route('/signup', methods=['POST'])
def signup():
    sign_up_info = request.get_json()
    try:
        if sign_up_info['username'] is None or \
           sign_up_info['password'] is None or \
           sign_up_info['email'] is None or \
           sign_up_info['first_name'] is None or \
           sign_up_info['last_name'] is None or \
           sign_up_info['fav_lot'] is None:
            return bad_request('Incomplete signup information.')
=======
        return jsonify({"Authorization": user.generate_auth_token()})
    return unauthorized('Incorrect username or password.')

# TODO: find a much better way to check if values are none
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    sign_up_info = request.get_json()
    try:
        if sign_up_info['username'] is None or sign_up_info['password'] is None or sign_up_info['email'] is None or sign_up_info['first_name'] is None or sign_up_info['last_name'] is None or sign_up_info['fav_lot'] is None:
            return bad_request('No username or password provided')
>>>>>>> b19abc514f0bb8f7e6fbc7f7b204359f0bb1d5c5
    except:
        return bad_request('JSON was unable to be parsed')
    if(User.query.filter_by(username=sign_up_info['username']).first() is not None):
        return bad_request("Username is already registered")
    else:    
        user = User(username = sign_up_info['username'],
                    password = sign_up_info['password'],
                    email = sign_up_info['email'],
                    first_name = sign_up_info['first_name'],
                    last_name = sign_up_info['last_name'],
                    favorite_lot = sign_up_info['fav_lot'])
        db.session.add(user)
        g.current_user = user
<<<<<<< HEAD
        return jsonify({"Authorization": g.current_user.generate_auth_token()})
    return bad_request('Username already exists.')
=======
        return jsonify({"Authorization": user.generate_auth_token()})
>>>>>>> b19abc514f0bb8f7e6fbc7f7b204359f0bb1d5c5

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
<<<<<<< HEAD
        '''email stuff'''
=======
>>>>>>> b19abc514f0bb8f7e6fbc7f7b204359f0bb1d5c5

@app.route('/checkin', methods=['POST'])
@auth.login_required
def checkin():
<<<<<<< HEAD
    checkin_info = request.get_json()
    try:
        if checkin_info['parking_lot'] is None or checkin_info['floor'] is None:
    		return bad_request('Check in information incomplete.')
    except:
        	return bad_request('JSON was unable to be parsed.')
    if g.current_user is not None:
    	new_checkin = ParkingInfo(parking_id=str(uuid.uuid4()), \
    				  user_id=g.current_user.user_id, \
    				  lot=checkin_info['parking_lot'], \
    				  floor=checkin_info['floor'])
        try:
            db.session.add(new_checkin)
        except exc.IntegrityError as e:
            db.session.rollback()
            return bad_request('User already checked in.')
        return unauthorized('Successful checkin -- just need to fix messages')
    return unauthorized('Invalid credentials - no user to check in.')
=======
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
>>>>>>> b19abc514f0bb8f7e6fbc7f7b204359f0bb1d5c5

@app.route('/checkout', methods=['GET','DELETE'])
@auth.login_required
def checkout():
<<<<<<< HEAD
    if g.current_user is not None:
        parking_info = ParkingInfo.query.filter_by(user_id=g.current_user.user_id).first()
        if parking_info is not None:
            db.session.delete(parking_info)
            return unauthorized('Successfully checked out -- just need to fix messages')
        else:
            return bad_request('User is not checked in.')
    return unauthorized('Invalid credentials - no user to check out.')
=======
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
>>>>>>> b19abc514f0bb8f7e6fbc7f7b204359f0bb1d5c5

@auth.verify_password
def verify_password(username_or_token, password):
    if username_or_token == '':
        return False
    if password == '' or password is None:
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
    return unauthorized('Invalid credentials.')

@app.route('/token', methods=['GET'])
@auth.login_required
def get_token():
<<<<<<< HEAD
    return jsonify({'Authorization': g.current_user.generate_auth_token()})
=======
    if g.token_used:
        return unauthorized('Invalid credentials.')
    return jsonify({"Authorization": g.current_user.generate_auth_token()})
>>>>>>> b19abc514f0bb8f7e6fbc7f7b204359f0bb1d5c5

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
