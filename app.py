import os
from flask import Flask, request, jsonify
import pickle
import numpy as np
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Load the saved model
model = pickle.load(open('final_model.pkl', 'rb'))

# Get MongoDB URI from environment variable
uri = os.getenv("MONGO_URI")

# Connect to MongoDB Atlas
client = MongoClient(uri)
db = client.promini  # Connect to the 'promini' database
collection = db['user_data']

# Initialize Flask application
app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    input_features = np.array(list(data.values())).reshape(1, -1)
    prediction = model.predict(input_features)
    collection.insert_one(data)
    output = {'turbine_status_prediction': int(prediction[0])}
    return jsonify(output)

if __name__ == '__main__':
    app.run(port=5000, debug=True)

