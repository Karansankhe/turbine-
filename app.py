from flask import Flask, request, jsonify
import pickle
import numpy as np
from pymongo import MongoClient
from flask_cors import CORS

# Load the saved model
model = pickle.load(open('final_model.pkl', 'rb'))

# MongoDB Atlas connection URI
uri = "mongodb+srv://sankhe00009:0P5mFPmZhOqb5ibo@cluster0.p0bo7cg.mongodb.net/promini?retryWrites=true&w=majority"

# Connect to MongoDB Atlas
client = MongoClient(uri)
db = client.promini  # Connect to the 'promini' database
collection = db['user_data']  # Collection name where data will be stored

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS

# Define a route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Get data from POST request
    data = request.get_json(force=True)

    # Convert data into numpy array
    input_features = np.array(list(data.values())).reshape(1, -1)

    # Make prediction
    prediction = model.predict(input_features)

    # Store input data in MongoDB Atlas
    collection.insert_one(data)

    # Return result as JSON
    output = {'turbine_status_prediction': int(prediction[0])}
    return jsonify(output)

# Run the Flask app
if __name__ == '__main__':
    app.run(port=5000, debug=True)
