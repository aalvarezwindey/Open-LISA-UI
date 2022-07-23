export const URI = {
  INSTRUMENTS: '/instruments',
  INSTRUMENTS_IMAGES: '/instruments/images',
  DETECTED_PHYSICAL_ADDRESSES: '/physical-addresses/detected',
  INSTRUMENT_BY_ID: '/instruments/:instrumentId',
  INSTRUMENT_COMMANDS: '/instruments/:instrumentId/commands',
  CONNECTION_PROTOCOL: '/settings/connection-protocol',
  CHECK_SERVER_CONNECTION: '/settings/connection-protocol/health-check',
  FILES: '/files',
  DELETE_FILE: '/files?file_path={}',
  DIRECTORIES: '/directories',
  GET_DIRECTORY: '/directories?directory={}',
  DELETE_DIRECTORY: '/directories?directory_path={}',
};
