import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';

export const SERIAL_CONFIGURATION_FIELD_NAMES = {
  BAUDRATE: 'baudrate',
  PORT: 'port',
};

export const SerialConfigurationFormFileds = [
  {
    name: SERIAL_CONFIGURATION_FIELD_NAMES.BAUDRATE,
  },
  {
    name: SERIAL_CONFIGURATION_FIELD_NAMES.PORT,
  },
];

export default function SerialConfigurationForm({ values, updateField, errors }) {
  return (
    <VStack spacing={6} align="start">
      <FormControl isRequired>
        <FormLabel htmlFor={SERIAL_CONFIGURATION_FIELD_NAMES.BAUDRATE}>Baudrate</FormLabel>
        <Input
          type="text"
          value={values[SERIAL_CONFIGURATION_FIELD_NAMES.BAUDRATE]}
          id={SERIAL_CONFIGURATION_FIELD_NAMES.BAUDRATE}
          onChange={(e) => updateField(SERIAL_CONFIGURATION_FIELD_NAMES.BAUDRATE)(e.target.value)}
        />
        {errors[SERIAL_CONFIGURATION_FIELD_NAMES.BAUDRATE] ? (
          <FormErrorMessage>{errors[SERIAL_CONFIGURATION_FIELD_NAMES.BAUDRATE]}</FormErrorMessage>
        ) : null}
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor={SERIAL_CONFIGURATION_FIELD_NAMES.PORT}>Puerto serial</FormLabel>
        <Input
          type="text"
          value={values[SERIAL_CONFIGURATION_FIELD_NAMES.PORT]}
          id={SERIAL_CONFIGURATION_FIELD_NAMES.PORT}
          onChange={(e) => updateField(SERIAL_CONFIGURATION_FIELD_NAMES.PORT)(e.target.value)}
        />
        {errors[SERIAL_CONFIGURATION_FIELD_NAMES.PORT] ? (
          <FormErrorMessage>{errors[SERIAL_CONFIGURATION_FIELD_NAMES.PORT]}</FormErrorMessage>
        ) : null}
      </FormControl>
    </VStack>
  );
}
