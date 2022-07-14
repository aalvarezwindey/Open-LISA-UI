import React from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';

export const TCP_CONFIGURATION_FIELD_NAMES = {
  HOST: 'host',
  PORT: 'port',
};

export const TCPConfigurationFormFileds = [
  {
    name: TCP_CONFIGURATION_FIELD_NAMES.HOST,
  },
  {
    name: TCP_CONFIGURATION_FIELD_NAMES.PORT,
  },
];

export default function TCPConfigurationForm({ values, updateField, errors }) {
  return (
    <VStack spacing={6} align="start">
      <FormControl isRequired>
        <FormLabel htmlFor={TCP_CONFIGURATION_FIELD_NAMES.HOST}>Host</FormLabel>
        <Input
          type="text"
          value={values[TCP_CONFIGURATION_FIELD_NAMES.HOST]}
          id={TCP_CONFIGURATION_FIELD_NAMES.HOST}
          onChange={(e) => updateField(TCP_CONFIGURATION_FIELD_NAMES.HOST)(e.target.value)}
        />
        {errors[TCP_CONFIGURATION_FIELD_NAMES.HOST] ? (
          <FormErrorMessage>{errors[TCP_CONFIGURATION_FIELD_NAMES.HOST]}</FormErrorMessage>
        ) : null}
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor={TCP_CONFIGURATION_FIELD_NAMES.PORT}>Puerto</FormLabel>
        <Input
          type="text"
          value={values[TCP_CONFIGURATION_FIELD_NAMES.PORT]}
          id={TCP_CONFIGURATION_FIELD_NAMES.PORT}
          onChange={(e) => updateField(TCP_CONFIGURATION_FIELD_NAMES.PORT)(e.target.value)}
        />
        {errors[TCP_CONFIGURATION_FIELD_NAMES.PORT] ? (
          <FormErrorMessage>{errors[TCP_CONFIGURATION_FIELD_NAMES.PORT]}</FormErrorMessage>
        ) : null}
      </FormControl>
    </VStack>
  );
}
