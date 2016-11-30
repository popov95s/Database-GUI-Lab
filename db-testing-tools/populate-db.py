from dbtest import db, User, Lot, ParkingInfo
import uuid

db.drop_all()
db.create_all()

# populate Lots table
binkley = Lot(lot_name='Binkley',latitude=32.8407707,longitude=-96.7826080,spots=100,spots_taken=50)
airline = Lot(lot_name='Airline',latitude=32.8464058,longitude=-96.7834326,spots=100,spots_taken=50)
law = Lot(lot_name='Law',latitude=32.8469162,longitude=-96.7862244,spots=100,spots_taken=50)
moody = Lot(lot_name='Moody',latitude=32.8414574,longitude=-96.7812195,spots=100,spots_taken=50)
mustang = Lot(lot_name='Mustang',latitude=32.8397369,longitude=-96.7798080,spots=100,spots_taken=50)
theta_lot = Lot(lot_name='Theta Lot',latitude=32.8459015,longitude=-96.7803574,spots=100,spots_taken=50)
commuter_lot = Lot(lot_name='Commuter Lot',latitude=32.8447151,longitude=-96.7811737,spots=100,spots_taken=50)

db.session.add(binkley)
db.session.add(airline)
db.session.add(law)
db.session.add(moody)
db.session.add(mustang)
db.session.add(theta_lot)
db.session.add(commuter_lot)

# populate Users table
john = User(user_id=str(uuid.uuid4()),username="john1234",password="hunter2",email="john@web.com",first_name="John",last_name="Doe",favorite_lot="Binkley")
jane = User(user_id=str(uuid.uuid4()),username="jane5678",password="5678",email="jane@web.com",first_name="Jane",last_name="Doe",favorite_lot="Airline")

db.session.add(john)
db.session.add(jane)
db.session.commit()
