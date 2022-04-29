import logging
from crypt import methods
import json
import os
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)

# TODO: specify this from ENV variables
FRONTEND_ORIGIN = "http://localhost:3000"
cors = CORS(app, resources={r"*": {"origins": FRONTEND_ORIGIN}})

STATIC_FILES_URL = "http://localhost:5000/static/"

NOT_FOUND = {
    "code": 'NOT_FOUND',
    "message": "Resource not found"
}


@app.route("/instruments", methods=['GET'])
def get_all_instruments():
    with open('mock_data/instruments.json') as f:
        data = json.load(f)
        return jsonify(data)


@app.route("/instruments/<instrument_id>", methods=['GET'])
def get_instrument_by_id(instrument_id):
    with open('mock_data/instruments.json') as f:
        data = json.load(f)
        match = next((i for i in data if str(
            i["id"]) == str(instrument_id)), None)

        if match:
            return jsonify(match)
        else:
            return (jsonify(NOT_FOUND), 404)


@app.route("/instruments/<instrument_id>", methods=['PUT'])
def update_instrument(instrument_id):
    payload = request.get_json()
    match = False
    with open('mock_data/instruments.json') as f:
        instruments = json.load(f)
        for idx, instrument in enumerate(instruments):
            if str(instrument["id"]) == str(instrument_id):
                match = instrument
                match_idx = idx

    if not match:
        logging.error(
            '[update_instrument][INSTRUMENT_NOT_FOUND] id: {}'.format(instrument_id))
        return (jsonify(NOT_FOUND), 404)

    edited_instrument = payload
    edited_instrument["id"] = instrument_id
    edited_instrument['image'] = "{}{}".format(
        STATIC_FILES_URL, edited_instrument['image'])
    instruments[match_idx] = edited_instrument

    with open('mock_data/instruments.json', 'w') as f:
        f.write(json.dumps(instruments, indent=4, sort_keys=True))
        return (edited_instrument, 200)


@app.route("/instruments/<instrument_id>", methods=['DELETE'])
def delete_instrument(instrument_id):
    match = False
    with open('mock_data/instruments.json') as f:
        instruments = json.load(f)
        for idx, instrument in enumerate(instruments):
            if str(instrument["id"]) == str(instrument_id):
                match = instrument
                match_idx = idx

    if not match:
        logging.error(
            '[delete_instrument][INSTRUMENT_NOT_FOUND] id: {}'.format(instrument_id))
        return (jsonify(NOT_FOUND), 404)

    del instruments[match_idx]

    with open('mock_data/instruments.json', 'w') as f:
        f.write(json.dumps(instruments, indent=4, sort_keys=True))

    return (match, 200)


@ app.route("/instruments", methods=['POST'])
def create_instrument():
    payload = request.get_json()
    with open('mock_data/instruments.json') as f:
        instruments = json.load(f)

    with open('mock_data/instruments.json', 'w') as f:
        payload['id'] = len(instruments) + 1
        payload['image'] = "{}{}".format(
            STATIC_FILES_URL, payload['image'])
        instruments.append(payload)
        f.write(json.dumps(instruments, indent=4, sort_keys=True))
        return ('', 201)


@ app.route("/instruments/images", methods=['GET'])
def get_all_instruments_images():
    images = []
    noneFileName = "none.png"
    fileNames = os.listdir("static")

    # put NONE image first
    if noneFileName in fileNames:
        file = noneFileName
        images.append({
            "fileName": file,
            "url": "{}{}".format(STATIC_FILES_URL, file)
        })

    for file in os.listdir("static"):
        if file == noneFileName:
            continue

        images.append({
            "fileName": file,
            "url": "{}{}".format(STATIC_FILES_URL, file)
        })

    return jsonify(images)


@ app.route("/physical-addresses/detected", methods=['GET'])
def get_detected_physical_addresses():
    with open('mock_data/detected_physical_addresses.json') as f:
        data = json.load(f)
        return jsonify(data)


if __name__ == "__main__":
    app.run()
