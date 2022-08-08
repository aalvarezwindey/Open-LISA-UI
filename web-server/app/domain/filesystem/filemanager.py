import os
from ..settings import ConnectionProtocol

ROOT_FOLDER_SANDBOX = 'sandbox'
ROOT_FOLDER_CLIBS = 'clibs'
ROOT_FOLDER_DATABASE = 'database'

VALID_ROOT_FOLDERS = [ROOT_FOLDER_SANDBOX,
                      ROOT_FOLDER_CLIBS, ROOT_FOLDER_DATABASE]


class FileManager:
    def __init__(self) -> None:
        self._TMP_FILE_NAME = "tmp"
        pass

    def get_server_directory(self, directory):
        conn_protocol = ConnectionProtocol()
        sdk = conn_protocol.get_open_lisa_SDK_instance_connected()
        assert directory in VALID_ROOT_FOLDERS
        return sdk.get_directory_structure(remote_path=directory)

    def upload_file(self, file_target_path, file_data):
        conn_protocol = ConnectionProtocol()
        sdk = conn_protocol.get_open_lisa_SDK_instance_connected()

        with open(self._TMP_FILE_NAME, "wb") as f:
            f.write(file_data)
        sdk.send_file(self._TMP_FILE_NAME, file_target_name=file_target_path)

        os.remove(self._TMP_FILE_NAME)
        return

    def delete_remote_file(self, file_target_path):
        conn_protocol = ConnectionProtocol()
        sdk = conn_protocol.get_open_lisa_SDK_instance_connected()

        sdk.delete_file(file_path=file_target_path)
        return
