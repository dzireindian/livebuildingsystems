import sqlite3
from flask import g
from flask_cors import CORS, cross_origin
from flask import Flask
import flask

app = Flask(__name__)
cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

DATABASE = 'database.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def query_meter_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    columns = [column[0] for column in cur.description]
    rv = cur.fetchall()
    results = []
    for row in rv:
         results.append(dict(zip(columns, row)))
    cur.close()
    return (results if rv else None) if one else results

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/', methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def hello():
    print("in home route")
    return 'Hello, World!'

@app.route('/meters/', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def meter():
    try:
        meters_list = query_meter_db('select distinct * from meters')
        if meters_list == None:
            raise ValueError('No meters returned')
        response = flask.jsonify({"result":meters_list})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return {"result":str(e)}

@app.route('/meters/<meter_id>', methods=['GET'])
@cross_origin()
def meter_data(meter_id):
    try:
        meters_list = query_meter_db('select * from meter_data where meter_id={0} ORDER BY timestamp DESC'.format(meter_id))
        if meters_list == None:
            raise ValueError('No meter data returned')
        response = flask.jsonify({"result":meters_list})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    except Exception as e:
        return {"result":str(e)}

# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application
    # on the local development server.
    app.run()