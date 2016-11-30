#!/parkitenv/bin/python
# from parkit import app
# 
# if __name__ == "__main__":
#     app.run(host='parkitllc.me')

from app import app

if __name__ == "__main__":
    app.run(debug=True)
