from flask import current_app, request
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from werkzeug.security import generate_password_hash, check_password_hash
from jose import jwt
from app import db
from datetime import datetime, timedelta

class Lot(db.Model):
    __tablename__ = 'Lots'
    lot_name = db.Column(db.String(80), primary_key=True, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    spots = db.Column(db.Integer, nullable=False)
    spots_taken = db.Column(db.Integer, nullable=False)

    def __init__(self, **kwargs):
        super(Lot, self).__init__(**kwargs)

    def to_json(self):

        json_lot = {"lot_name": str(self.lot_name),
                    "latitude": str(self.latitude),
                    "longitude": str(self.longitude),
                    "spots": self.spots,
                    "spots_taken": self.spots_taken}

        return json_lot

    def __repr__(self):
        return '<Lot %r>' % self.lot_name

class MyCarInfo(db.Model):
    __tablename__ = "MyCarInfo"
    car_id = db.Column(db.Integer, primary_key=True, autoincrement=True,  nullable=False)
    parking_id = db.Column(db.String(36), db.ForeignKey('ParkingInfo.parking_id'), nullable=False, unique=True)
    imageURL= db.Column(db.String(255), nullable=False)

    def __init__(self, **kwargs):
	super(MyCarInfo, self).__init__(**kwargs)
    
    def __repr__(self):
	return '<MyCarId %r>' % self.parking_id

class ParkingInfo(db.Model):
    __tablename__ = "ParkingInfo"
    parking_id = db.Column(db.String(36), primary_key=True, nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('Users.user_id'), nullable=False, unique=True)
    lot = db.Column(db.String(80), nullable=False)
    floor = db.Column(db.Integer, nullable=False)
    car_info = db.relationship('MyCarInfo')

    def __init__(self, **kwargs):
        super(ParkingInfo, self).__init__(**kwargs)

    def __repr__(self):
        return '<ParkingID %r>' % self.parking_id

class User(db.Model):
    __tablename__ = 'Users'
    user_id = db.Column(db.String(36), primary_key=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False) 
    favorite_lot = db.Column(db.String(80))
    confirmed = db.Column(db.Boolean, default=False)
    parking_info = db.relationship('ParkingInfo')
    
    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)

    def generate_auth_token(self):
        expiration = datetime.now() + timedelta(hours=1)
        token = jwt.encode({'id': self.user_id, 'exp': expiration}, current_app.config['SECRET_KEY'], algorithm='HS256')
        return token
    
    @staticmethod
    def verify_auth_token(token):
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        except:
            return None
        return User.query.get(data['id'])
       
    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute.')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User %r>' % self.username
