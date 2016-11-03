from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI', 'SQLALCHEMY_COMMIT_ON_TEARDOWN'] = 'mysql://root:hunter2@localhost/Parkit'
db = SQLAlchemy(app)



class Account(db.Model):
        __tablename__ = 'Accounts'
        accountId = db.Column(db.Integer, primary_key=True, nullable=False)
        username = db.Column(db.String(80), unique=True,nullable=False)
        password = db.Column(db.String(80), unique=True,nullable=False)
        first_name = db.Column(db.String(80), nullable=False)
        last_name = db.Column(db.String(80), nullable=False)
        favorite_lot = db.Column(db.String(80))

        def __init__(self, accountId, username, password, first_name, last_name, favorite_lot):
                self.accountId = accountId
                self.username = username
                self.password = password
                self.first_name = first_name
                self.last_name = last_name
                self.favorite_lot = favorite_lot

class Lots(db.Model):
        __tablename__ = 'Lots'
        lots_name = db.Column(db.String(80), primary_key=True, nullable=False)
        latitude = db.Column(db.Float, nullable=False)
        longitude = db.Column(db.Float, nullable=False)
        spots = db.Column(db.Integer, nullable=False)
        spots_taken = db.Column(db.Integer, nullable=False)

        def __init__(self, lots_name, latitude, longitude, spots, spots_taken):
                self.lots_name = lots_name
                self.latitude = latitude
                self.longitude = longitude
                self.spots = spots
                self.spots_taken = spots_taken


def createLotInfo():
	binkley = Lots('Binkley', 32.8407707,  -96.7826080, 100, 50)

	airline = Lots('Airline', 32.8463058 ,  -96.7834326, 100, 50)

	law = Lots('Law', 32.8469162,  -96.7862244, 100, 50)

	moody = Lots('Moody', 32.8414574 ,  -96.7812195, 100, 50)

	mustang = Lots('Mustang', 32.8397369,  -96.7798080, 100, 50)

	theta_lot = Lots('Theta Lot', 32.8459015 ,  -96.7803574, 100, 50)

	commuter_lot = Lots('Commuter Lot', 32.8447151,  -96.7811737, 100, 50)


	db.create_all()

	db.session.add(binkley)
	db.session.add(airline)
	db.session.add(law)
	db.session.add(moody)
	db.session.add(mustang)
	db.session.add(theta_lot)
	db.session.add(commuter_lot)

