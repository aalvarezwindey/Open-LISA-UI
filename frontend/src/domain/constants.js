export const NONE_IMAGE_FILE_NAME = 'none.png';

export const INSTRUMENT_FIELD_NAMES = {
  BRAND: 'brand',
  MODEL: 'model',
  PHYSICAL_ADDRESS: 'physicalAddress',
  DETECTED_PHYSICAL_ADDRESS: 'detectedPhysicalAddress',
  DESCRIPTION: 'description',
  IMAGE: 'image',
};

export const SCPI_COMMAND_FIELD_NAMES = {
  NAME: 'name',
  COMMAND: 'command',
  TYPE: 'type',
  DESCRIPTION: 'description',
  PARAMS: 'params',
};

export const SCPI_COMMAND_TYPES = [
  {
    label: 'Set',
    value: 'set',
  },
  {
    label: 'Query',
    value: 'query',
  },
  {
    label: 'Query Buffer',
    value: 'query_buffer',
  },
];

export const SCPI_COMMAND_PARAM_VALUE_TYPES = [
  {
    label: 'int',
    value: 'int',
    example: 1,
  },
  {
    label: 'float',
    value: 'float',
    example: 1.5,
  },
  {
    label: 'string',
    value: 'string',
    example: 'A',
  },
];
