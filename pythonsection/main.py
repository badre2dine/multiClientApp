from flask import Flask,jsonify
import flask 
import threading
import time
import tensorflow as tf


from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/gett',methods=['GET', 'POST'])
@cross_origin()
def hello_world():
    print()
    data=flask.request.get_json()
    sparse_tensor = tf.sparse.SparseTensor(indices=data['indices'],
                                       values=data['values'],
                                       dense_shape=[5, 5])
    print(tf.sparse.reduce_sum(sparse_tensor,axis=0)+tf.sparse.reduce_sum(sparse_tensor,axis=1))


    return flask.request.get_json()



print("sda")
app.run(debug=True)