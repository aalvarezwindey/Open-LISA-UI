from pysondb import db
from Open_LISA_SDK import SDK


class ConnectionProtocol:
    SDK_INSTANCE = None
    TCP_CONNECTION_PROTOCOL = "TCP"
    SERIAL_CONNECTION_PROTOCOL = "SERIAL"
    SUPPORTED_CONNECTION_PROTOCOLS = [
        TCP_CONNECTION_PROTOCOL, SERIAL_CONNECTION_PROTOCOL]

    def __init__(self):
        self._db = db.getDb("app/data/connection_protocol.json")

        self._CONNECTION_PROTOCOL_SINGLETON_ID = 1
        self.__refresh_in_memory_configuration()

    def get_current_connection_protocol(self):
        return self._configuration["current_protocol"]

    def update_connection_protocol(self, new_protocol):
        self._configuration["current_protocol"] = new_protocol
        self._db.updateById(
            pk=self._CONNECTION_PROTOCOL_SINGLETON_ID, new_data=self._configuration)
        self.__refresh_in_memory_configuration()
        return self._configuration["current_protocol"]

    def get_configurations(self):
        return self._configuration["configurations"]

    def check_connection(self, configurations=None, update_connection=False):
        if configurations:
            self._configuration["configurations"] = configurations
            self._db.updateById(
                pk=self._CONNECTION_PROTOCOL_SINGLETON_ID, new_data=self._configuration)
            self.__refresh_in_memory_configuration()
        # NOTE: if the SDK could be retrieved the connection was established
        return self.get_open_lisa_SDK_instance_connected(
            update_connection=update_connection)

    def get_open_lisa_SDK_instance_connected(self, sdk_log_level="DEBUG", update_connection=False) -> SDK:
        if update_connection or not ConnectionProtocol.SDK_INSTANCE:
            try:
                if ConnectionProtocol.SDK_INSTANCE:
                    ConnectionProtocol.SDK_INSTANCE.disconnect()
                sdk = SDK(log_level=sdk_log_level)
                curr_protocol = self._configuration["current_protocol"]
                if curr_protocol == ConnectionProtocol.TCP_CONNECTION_PROTOCOL:
                    sdk.connect_through_TCP(
                        host=self._configuration["configurations"][ConnectionProtocol.TCP_CONNECTION_PROTOCOL]["host"],
                        port=self._configuration["configurations"][ConnectionProtocol.TCP_CONNECTION_PROTOCOL]["port"]
                    )
                elif curr_protocol == ConnectionProtocol.SERIAL_CONNECTION_PROTOCOL:
                    sdk.connect_through_RS232(
                        baudrate=self._configuration["configurations"][
                            ConnectionProtocol.SERIAL_CONNECTION_PROTOCOL]["baudrate"],
                        port=self._configuration["configurations"][ConnectionProtocol.SERIAL_CONNECTION_PROTOCOL]["port"]
                    )
                ConnectionProtocol.SDK_INSTANCE = sdk
            except Exception as e:
                ConnectionProtocol.SDK_INSTANCE = None
                raise e

        return ConnectionProtocol.SDK_INSTANCE

    def __refresh_in_memory_configuration(self):
        self._configuration = self._db.getById(
            pk=self._CONNECTION_PROTOCOL_SINGLETON_ID)
