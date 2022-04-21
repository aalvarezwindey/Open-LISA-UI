from crypt import methods
import json
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)

# TODO: specify this from ENV variables
FRONTEND_ORIGIN = "http://localhost:3000"
cors = CORS(app, resources={r"*": {"origins": FRONTEND_ORIGIN}})


@app.route("/instruments", methods=['GET'])
def get_all_instruments():
    with open('mock_data/instruments.json') as f:
        data = json.load(f)
        return jsonify(data)


@app.route("/instruments", methods=['POST'])
def create_instrument():
    payload = request.get_json()
    with open('mock_data/instruments.json') as f:
        instruments = json.load(f)

    with open('mock_data/instruments.json', 'w') as f:
        payload['id'] = len(instruments) + 1
        instruments.append(payload)
        f.write(json.dumps(instruments, indent=4, sort_keys=True))
        return ('', 201)


@app.route("/physical-address/detected", methods=['GET'])
def get_detected_physical_addresses():
    with open('mock_data/detected_physical_addresses.json') as f:
        data = json.load(f)
        return jsonify(data)


if __name__ == "__main__":
    app.run()
