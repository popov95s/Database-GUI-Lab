from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import os
from Model import Account, Lots, db, app, createLotInfo

createLotInfo()


if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True)
