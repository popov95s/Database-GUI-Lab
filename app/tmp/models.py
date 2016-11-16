from flask import current_app, request
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from werkzeug.security import generate_password_hash, check_password_hash
from . import db

class Lot(db.Model):
    __tablename__ = 'Lots'
    lot_name = db.Column(db.String(80), primary_key=True, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    spots = db.Column(db.Integer, nullable=False)
    spots_taken = db.Column(db.Integer, nullable=False)

    def __init__(self, lot_name, latitude, longitude, spots, spots_taken):
        self.lot_name = lot_name
        self.latitude = latitude
        self.longitude = longitude
        self.spots = spots
        self.spots_taken = spots_taken
    
class User(db.Model):
    __tablename__ = 'Users'
    user_id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False) 
    favorite_lot = db.Column(db.String(80))
    confirmed = db.Column(db.Boolean, default=False)

    def __init__(self, user_id, username, password_hash, email, first_name,
            last_name, favorite_lot):
        self.user_id = user_id
        self.username = username
        self.password_hash = generate_password_hash(password_hash)
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.favorite_lot = favorite_lot

    def generate_auth_token(self, expiration=3600):
        s = Serializer(current_app.config['SECRET_KEY'], expiration)
        return s.dumps({'Authorization': self.user_id})

    def confirm_auth_token(self, token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except:
            return False
        if data.get('Authorization') != self.user_id:
            return False
        self.confirmed = True
        db.session.add(self)
        return True

    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute.')

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
