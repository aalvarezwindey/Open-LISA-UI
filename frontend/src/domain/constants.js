export const NONE_IMAGE_FILE_NAME = 'none.png';

export const INSTRUMENT_FIELD_NAMES = {
  BRAND: 'brand',
  MODEL: 'model',
  TYPE: 'type',
  PHYSICAL_ADDRESS: 'physicalAddress',
  DETECTED_PHYSICAL_ADDRESS: 'detectedPhysicalAddress',
  DESCRIPTION: 'description',
  IMAGE: 'image',
};

export const INSTRUMENT_TYPES = {
  SCPI: 'SCPI',
  CLIB: 'CLIB',
};

export const SCPI_COMMAND_FIELD_NAMES = {
  NAME: 'name',
  COMMAND: 'command',
  DESCRIPTION: 'description',
  PARAMS: 'params',
  RETURN: 'return',
};

export const NEW_DIRECTORY_FIELD_NAMES = {
  DIRECTORY: 'directory',
};

export const FILESYSTEM_ACTIONS = {
  DELETE: 'delete',
  UPLOAD_FILE: 'upload_file',
  CREATE_DIRECTORY: 'create_directory',
};

export const FILESYSTEM_SUPPORTED_DIRECTORIES = {
  CLIBS: 'clibs',
  EXPERIMENTS: 'sandbox',
  DATABASE: 'database',
};

export const COMMAND_PARAM_VALUE_TYPES = [
  {
    label: 'int',
    value: 'INT',
    example: 1,
  },
  {
    label: 'float',
    value: 'FLOAT',
    example: 1.5,
  },
  {
    label: 'string',
    value: 'STRING',
    example: 'A',
  },
];

export const COMMAND_RETURN_VALUE_TYPES = [
  {
    label: 'void',
    value: 'VOID',
  },
  {
    label: 'float',
    value: 'FLOAT',
  },
  {
    label: 'string',
    value: 'STRING',
  },
  {
    label: 'int',
    value: 'INT',
  },
  {
    label: 'bytes',
    value: 'BYTES',
  },
];

export const SUPPORTED_LANGUAGES = {
  ENGLISH: 'en',
  SPANISH: 'es',
};

export const ERRORS = {
  UNAVAILABLE_OPEN_LISA_SERVER: {
    CODE: 'SERVICE_UNAVAILABLE',
    STATUS: 503,
  },
};
