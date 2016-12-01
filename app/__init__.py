from flask import Flask, g, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
from flask_httpauth import HTTPBasicAuth
from .messages import success, bad_request, forbidden, unauthorized
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

@app.route('/checkin', methods=['POST'])
@auth.login_required
def checkin():
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
        return success('Check in successful.')
    return unauthorized('Invalid credentials - no user to check in.')

@app.route('/checkout', methods=['GET','DELETE'])
@auth.login_required
def checkout():
    if g.current_user is not None:
        parking_info = ParkingInfo.query.filter_by(user_id=g.current_user.user_id).first()
        if parking_info is not None:
            db.session.delete(parking_info)
            return success('Check out successful.')
        else:
            return bad_request('User is not checked in.')
    return unauthorized('Invalid credentials - no user to check out.')

# # TODO: figure out sending emails for resetting passwords
# @app.route('/forgotpass', methods=['GET', 'POST'])
# def forgotpass():
#     email_info = request.get_json()
#     try:
#         if email_info['email'] is None:
#             return bad_request('No email provided')
#     except:
#         return bad_request('JSON was unable to be parsed')
#     user = User.query.filter_by(email = email_info['email'])
#     if user is not None:
#         return "password"
#         '''email stuff'''

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
        return jsonify({'Authorization': g.current_user.generate_auth_token()})
    return unauthorized('Incorrect username or password.')

@app.route('/map', methods=['GET'])
@auth.login_required
def map():
    lots = Lot.query.all()
    
    response = {}
    for lot in lots:
        response[str(lot.lot_name)] = str(int(100 * (float(lot.spots_taken) / float(lot.spots))))

    return jsonify(response)

@app.route('/parkinglots', methods=['GET'])
@auth.login_required
def get_lots():
    lots = Lot.query.all()

    response = [lot.to_json() for lot in lots]

    return jsonify(response)

@app.route('/settings', methods=['GET', 'PUT'])
@auth.login_required
def settings():
    if g.current_user is not None:
        if request.method == 'GET':
            response = {"first_name": str(g.current_user.first_name),
                        "last_name": str(g.current_user.last_name),
                        "parkingLot": str(g.current_user.favorite_lot)}
            return jsonify(response)
        elif request.method == 'PUT':
            setting_info = request.get_json()
            try:
                if setting_info['first_name'] is None or \
                   setting_info['last_name'] is None or \
                   setting_info['parkingLot'] is None or \
                   setting_info['password'] is None:
                    return bad_request('Incomplete settings information.')
            except:
                return bad_request('JSON was unable to be parsed.')
            
            g.current_user.first_name = setting_info['first_name']
            g.current_user.last_name = setting_info['last_name']
            g.current_user.favorite_lot = setting_info['parkingLot']
            g.current_user.password = setting_info['password']
            
            try:
                db.session.add(g.current_user)
            except exc.IntegrityError as e:
                db.session.rollback()
                return bad_request('Settings were unable to be updated.')
            return success('Settings updated.')
    return unauthorized('Invalid credentials - no user for which to get settings')

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
        return jsonify({"Authorization": g.current_user.generate_auth_token()})
    return bad_request('Username already exists.')

@app.route('/token', methods=['GET'])
@auth.login_required
def get_token():
    return jsonify({'Authorization': g.current_user.generate_auth_token()})

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

if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
