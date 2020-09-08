import threading
import time

import flask
import pymongo
import tensorflow as tf
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from bson import ObjectId
import json
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.json_encoder = JSONEncoder
client = pymongo.MongoClient("mongodb+srv://badr:1234@cluster0.e1elo.gcp.mongodb.net/network?retryWrites=true&w=majority")
db = client["network"]
collection=db["network"]

@app.route('/save',methods=['GET', 'POST'])
@cross_origin()
def hello_world():
    data=flask.request.get_json()
   
    collection.insert_one(data)
   

    return flask.request.get_json()




app.run(debug=True)
