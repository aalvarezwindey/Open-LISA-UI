import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { useFormatMessage } from '../../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../../i18n/messages/keys';

function CommandInvocationInput({ name, value, onChange, error, helpText }) {
  const formatMessage = useFormatMessage();
  return (
    <FormControl isRequired isInvalid={Boolean(error)}>
      <FormLabel htmlFor={name}>
        {formatMessage(MESSAGES_KEYS.COMMAND_FORM_INVOCATION_FIELD_LABEL)}
      </FormLabel>
      <Input type="text" value={value} id={name} onChange={(e) => onChange(e.target.value)} />
      {error ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : (
        <FormHelperText>{helpText}</FormHelperText>
      )}
    </FormControl>
  );
}

CommandInvocationInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  helpText: PropTypes.string.isRequired,
};

export default CommandInvocationInput;
