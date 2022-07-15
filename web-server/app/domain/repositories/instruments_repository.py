import os
from pysondb import db
from ..settings import ConnectionProtocol


class InstrumentRepository():
    def __init__(self):
        self._images_DB = db.getDb("app/data/instruments_images.json")
        self._static_files_base_url = os.environ["STATIC_FILES_URL"]
        self._default_img_name = "none.png"
        self._default_img_url = self._static_files_base_url + self._default_img_name

    def get_all(self):
        conn_protocol = ConnectionProtocol()
        sdk = conn_protocol.get_open_lisa_SDK_instance_connected()
        instruments = sdk.get_instruments(response_format="PYTHON")
        images_dict = self.__get_instruments_images_dict()

        for instrument in instruments:
            self.__add_image_to_instrument_dict(instrument, images_dict)

        return self.__stringify_instruments_ids(instruments)

    def get_by_id(self, id):
        conn_protocol = ConnectionProtocol()
        sdk = conn_protocol.get_open_lisa_SDK_instance_connected()
        instrument = sdk.get_instrument(
            instrument_id=id, response_format="PYTHON")
        images_dict = self.__get_instruments_images_dict()
        self.__add_image_to_instrument_dict(instrument, images_dict)
        return self.__stringify_instrument_id(instrument)

    def create_instrument(self, new_instrument):
        conn_protocol = ConnectionProtocol()
        sdk = conn_protocol.get_open_lisa_SDK_instance_connected()
        new_image_file_name = new_instrument["image"]
        new_image_url = self._static_files_base_url + new_image_file_name
        del new_instrument["image"]  # image should not be sent to server
        created_instrument = sdk.create_instrument(
            new_instrument, response_format="PYTHON")
        self.__add_image(created_instrument["id"], new_image_file_name)
        created_instrument["image"] = new_image_url
        created_instrument["id"] = str(created_instrument["id"])
        return self.__stringify_instrument_id(created_instrument)

    def update_instrument(self, id, payload):
        conn_protocol = ConnectionProtocol()
        sdk = conn_protocol.get_open_lisa_SDK_instance_connected()
        new_image_file_name = payload["image"]
        new_image_url = self._static_files_base_url + new_image_file_name
        del payload["image"]  # image should not be sent to server
        updated_instrument = sdk.update_instrument(
            instrument_id=id, updated_instrument=payload, response_format="PYTHON")
        self.__update_instrument_image(id, new_image_file_name)
        updated_instrument["image"] = new_image_url
        return self.__stringify_instrument_id(updated_instrument)

    def delete_instrument(self, id):
        conn_protocol = ConnectionProtocol()
        sdk = conn_protocol.get_open_lisa_SDK_instance_connected()
        deleted_instrument = sdk.delete_instrument(
            instrument_id=id, response_format="PYTHON")
        self.__delete_instrument_image(id)
        return self.__stringify_instrument_id(deleted_instrument)

    def __update_instrument_image(self, instrument_id, image_file_name):
        self._images_DB.updateByQuery(
            {"instrument_id": instrument_id}, {"image_file_name": image_file_name})

    def __delete_instrument_image(self, instrument_id):
        img = self._images_DB.getByQuery({"instrument_id": instrument_id})[0]
        return self._images_DB.deleteById(pk=img["id"])

    def __get_instruments_images_dict(self):
        images_list = self._images_DB.getAll()
        return {img["instrument_id"]: img for img in images_list}

    def __add_image_to_instrument_dict(self, instrument, images_dict):
        instrument_id = instrument["id"]
        if instrument_id in images_dict:
            instrument["image"] = self._static_files_base_url + \
                images_dict[instrument_id]["image_file_name"]
        else:
            instrument["image"] = self._default_img_url
            self.__add_image(instrument_id, self._default_img_name)

    def __add_image(self, instrument_id, img_file_name):
        self._images_DB.add({
            "instrument_id": instrument_id,
            "image_file_name": img_file_name
        })

    # This functions are necessary because the big int gets rounded when sent over the network to the browser
    def __stringify_instruments_ids(self, instruments):
        return [self.__stringify_instrument_id(i) for i in instruments]

    def __stringify_instrument_id(self, instrument):
        instrument["id"] = str(instrument["id"])
        return instrument
