from flask import current_app, request
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from werkzeug.security import generate_password_hash, check_password_hash
from app import db

class Lot(db.Model):
    __tablename__ = 'Lots'
    lot_name = db.Column(db.String(80), primary_key=True, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    spots = db.Column(db.Integer, nullable=False)
    spots_taken = db.Column(db.Integer, nullable=False)

    def __init__(self, **kwargs):
        super(Lot, self).__init__(**kwargs)

    def __repr__(self):
        return '<Lot %r>' % self.lot_name

class ParkingInfo(db.Model):
    __tablename__ = "ParkingInfo"
    parking_id = db.Column(db.Integer, primary_key=True, autoincrement=True,  nullable=False)
    parking_user_id = db.Column(db.Integer, db.ForeignKey('User.user_id'))
    lot = db.Column(db.String(80), nullable=False)
    floor = db.Column(db.Integer, nullable=False)

    def __init__(self, parking_id, parking_user_id, lot, floor):
	self.parking_id = parking_id
	self.parking_user_id = parking_user_id
	self.lot = lot
	self.floor = floor

    def __repr__(self):
        return '<ParkingID %r>' % self.parking_id

class User(db.Model):
    __tablename__ = 'Users'
    user_id = db.Column(db.Integer, primary_key=True, nullable=False)
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

    def generate_auth_token(self, expiration=3600):
            s = Serializer(current_app.config['SECRET_KEY'], expires_in=expiration)
            return s.dumps({"Authorization": self.user_id})
    
    @staticmethod
    def verify_auth_token(token):
            s = Serializer(current_app.config['SECRET_KEY'])
            try:
                data = s.loads(token)
            except:
                return None
            return User.query.get(data['Authorization'])
    
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
