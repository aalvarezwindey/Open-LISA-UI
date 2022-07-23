import logging
import json
import os
import time
import traceback
from flask import Flask, jsonify, request
from flask_cors import CORS
from app.domain.settings import ConnectionProtocol
from app.domain.repositories.instruments_repository import InstrumentRepository
from app.config.config import load_config
from app.http import errors, mock_responses

env = os.environ["ENV"] if "ENV" in os.environ else "dev"
load_config(env)
app = Flask(__name__)


STATIC_FILES_URL = os.environ["STATIC_FILES_URL"]
FRONTEND_ORIGIN = os.environ["FRONTEND_ORIGIN"]
cors = CORS(app, resources={r"*": {"origins": FRONTEND_ORIGIN}})


# Instruments routes
@app.route("/instruments", methods=['GET'])
def get_all_instruments():
    repo = InstrumentRepository()
    instruments = repo.get_all()
    return (jsonify(instruments), 200)


@ app.route("/instruments", methods=['POST'])
def create_instrument():
    payload = request.get_json()
    try:
        repo = InstrumentRepository()
        created_instrument = repo.create_instrument(payload)
        return jsonify(created_instrument, 201)
    except Exception as e:
        traceback.print_exc()
        logging.error('[create_instrument] error {}'.format(e))
        return errors.BAD_REQUEST(str(e))


@ app.route("/instruments/images", methods=['GET'])
def get_all_instruments_images():
    images = []
    noneFileName = "none.png"
    fileNames = os.listdir("static")

    # put NONE image first
    if noneFileName in fileNames:
        file = noneFileName
        images.append({
            "file_name": file,
            "url": "{}{}".format(STATIC_FILES_URL, file)
        })

    for file in os.listdir("static"):
        if file == noneFileName:
            continue

        images.append({
            "file_name": file,
            "url": "{}{}".format(STATIC_FILES_URL, file)
        })

    return jsonify(images)


# Specific instrument routes
@app.route("/instruments/<instrument_id>", methods=['GET'])
def get_instrument_by_id(instrument_id):
    instrument_id = int(instrument_id)
    try:
        repo = InstrumentRepository()
        instrument = repo.get_by_id(id=instrument_id)
        return jsonify(instrument)
    except Exception as e:
        traceback.print_exc()
        logging.error('[get_instrument_by_id] error {}'.format(e))
        return errors.NOT_FOUND()


@app.route("/instruments/<instrument_id>", methods=['PUT'])
def update_instrument(instrument_id):
    instrument_id = int(instrument_id)
    payload = request.get_json()
    try:
        repo = InstrumentRepository()
        updated_instrument = repo.update_instrument(instrument_id, payload)
        return jsonify(updated_instrument, 200)
    except Exception as e:
        traceback.print_exc()
        logging.error('[update_instrument] error {}'.format(e))
        return errors.BAD_REQUEST(str(e))


@app.route("/instruments/<instrument_id>", methods=['DELETE'])
def delete_instrument(instrument_id):
    instrument_id = int(instrument_id)
    try:
        repo = InstrumentRepository()
        deleted_instrument = repo.delete_instrument(instrument_id)
        return jsonify(deleted_instrument, 200)
    except Exception as e:
        traceback.print_exc()
        logging.error('[delete_instrument] error {}'.format(e))
        return errors.BAD_REQUEST(str(e))


@app.route("/instruments/<instrument_id>/commands", methods=['GET'])
def get_instrument_commands(instrument_id):
    instrument_id = int(instrument_id)
    with open('mock_data/commands.json') as f:
        data = json.load(f)
        match = next((c for c in data if str(
            c["instrumentId"]) == str(instrument_id)), None)

        if match:
            return jsonify(match['commands'])
        else:
            return (jsonify([]), 200)


# Physical Addresses routes
@ app.route("/physical-addresses/detected", methods=['GET'])
def get_detected_physical_addresses():
    with open('mock_data/detected_physical_addresses.json') as f:
        data = json.load(f)
        return jsonify(data)

# Settings routes


@app.route("/settings/connection-protocol", methods=['GET'])
def get_connection_protocol():
    conn_protocol = ConnectionProtocol()
    return jsonify({
        "protocol": conn_protocol.get_current_connection_protocol(),
        "configurations": conn_protocol.get_configurations()
    })


@app.route("/settings/connection-protocol", methods=['PUT'])
def update_connection_protocol():
    payload = request.get_json()
    new_protocol = payload["protocol"]
    if new_protocol in ConnectionProtocol.SUPPORTED_CONNECTION_PROTOCOLS:
        conn_protocol = ConnectionProtocol()
        conn_protocol.update_connection_protocol(new_protocol)
        return jsonify({
            "protocol": conn_protocol.get_current_connection_protocol(),
            "configurations": conn_protocol.get_configurations()
        })
    else:
        traceback.print_exc()
        logging.error(
            '[update_connection_protocol][UNSUPPORTED_CONNECTION_PROTOCOL] protocol: {}'.format(new_protocol))
        return errors.BAD_REQUEST()


@app.route("/settings/connection-protocol/health-check", methods=['POST'])
def connection_protocol_health_check():
    try:
        conn_protocol = ConnectionProtocol()
        conn_protocol.check_connection()
        return ('', 200)
    except Exception as e:
        traceback.print_exc()
        logging.error(
            "[connection_protocol_health_check] error {}".format(str(e)))
        return errors.BAD_REQUEST(msg=str(e))


# Filesystem routes


@app.route("/files", methods=['POST'])
def upload_file():
    try:
        file_path_to_save = request.form["path"]
        file_name = request.form["name"]
        file_size = request.form["size"]
        file_storage = request.files["file"]
        file_bytes = file_storage.read()
        assert int(len(file_bytes)) == int(file_size)
        time.sleep(2)

        # TODO: send file_bytes through SDK

        return ('', 200)
    except Exception as e:
        traceback.print_exc()
        logging.error(
            "[upload_file] error {}".format(str(e)))
        return errors.BAD_REQUEST(msg=str(e))


@app.route("/files", methods=['DELETE'])
def delete_file():
    try:
        file_path = request.args.get('file_path')
        print("this will delete {} file".format(
            file_path))
        time.sleep(2)

        # TODO: delete file through SDK

        return ('', 200)
    except Exception as e:
        traceback.print_exc()
        logging.error(
            "[delete_file] error {}".format(str(e)))
        return errors.BAD_REQUEST(msg=str(e))


SUPPORTED_DIRECTORIES = ["CLIBS", "DATABASE", "EXPERIMENTS"]


@app.route("/directories", methods=['GET'])
def get_directory():
    try:
        directory = request.args.get('directory')
        assert directory in SUPPORTED_DIRECTORIES
        print("this will get the {} folder".format(directory))
        time.sleep(2)

        # TODO: get directory through SDK

        return (jsonify(mock_responses.MOCK_DIR), 200)
    except Exception as e:
        traceback.print_exc()
        logging.error(
            "[get_directoryº] error {}".format(str(e)))
        return errors.BAD_REQUEST(msg=str(e))


@app.route("/directories", methods=['POST'])
def create_directory():
    try:
        payload = request.get_json()
        directory_base_path = payload["base_path"]
        new_directory_name = payload["new_directory_name"]
        print("this will create {} folder".format(
            directory_base_path + new_directory_name))
        time.sleep(2)

        # TODO: create directory through SDK

        return ('', 200)
    except Exception as e:
        traceback.print_exc()
        logging.error(
            "[create_directory] error {}".format(str(e)))
        return errors.BAD_REQUEST(msg=str(e))


@app.route("/directories", methods=['DELETE'])
def delete_directory():
    try:
        directory_path = request.args.get('directory_path')
        print("this will delete {} folder".format(
            directory_path))
        time.sleep(2)

        # TODO: delete file through SDK

        return ('', 200)
    except Exception as e:
        traceback.print_exc()
        logging.error(
            "[delete_directory] error {}".format(str(e)))
        return errors.BAD_REQUEST(msg=str(e))


if __name__ == "__main__":
    app.run()
