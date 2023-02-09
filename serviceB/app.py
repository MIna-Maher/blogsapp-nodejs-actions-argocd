##https://flask-restful.readthedocs.io/en/latest/quickstart.html#endpoints
from flask import Flask, render_template, redirect
from flask_restful import Resource, Api
import pandas as pd
#from pymongo import MongoClient
#from urlparse import urlparse
import csv
#mongo_uri = "mongodb://username:" + urlparse.parse.quote("P@$$w0rd124") + "@mina-cluster.p63nb.mongodb.net/?retryWrites=true&w=majority"
#client = MongoClient(mongo_uri)
#db = client['users']
#collection = db['mina-webapp']
d = ""

app = Flask(__name__)
api = Api(app)

class users(Resource):
    
    def get(self):
        df = pd.read_csv('users.csv')
        df.to_csv('users.csv', index=None)
        data = pd.read_csv('users.csv')
        #df = pd.read_csv('users.csv', header = 1)
        #df = pd.read_csv('users.csv', names=['userId', 'name', 'city'])

        d = df.to_dict()
        #return {'hello': 'world'}
         
        return  d , 200, {'ContentType':'application/json'}
    #def post(self):
    #    header = ['userId', 'name', 'city']
    #    csvFile = open('users.csv', 'r')
    #    reader = csv.DictReader(csvFile)
    #    for each in reader:
    #        row = {}
    #        for field in header:
    #            row[field] = each[field]
    #        collection.insert(row)

        
api.add_resource(users, '/users')

@app.route('/')
def hello():
    return redirect("/table", code=302)

@app.route('/table')
def table():
    
     # converting csv to html
    data = pd.read_csv('users.csv')
    return render_template('table.html', tables=[data.to_html()], titles=[''])

if __name__ == '__main__':
    app.run(debug=True, port=int("5000"), host="0.0.0.0")