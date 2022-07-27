import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { useFormatMessage } from '../../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../../i18n/messages/keys';

function CommandNameInput({ name, value, onChange, error }) {
  const formatMessage = useFormatMessage();
  return (
    <FormControl isRequired isInvalid={Boolean(error)}>
      <FormLabel htmlFor={name}>
        {formatMessage(MESSAGES_KEYS.COMMAND_FORM_NAME_FIELD_LABEL)}
      </FormLabel>
      <Input type="text" value={value} id={name} onChange={(e) => onChange(e.target.value)} />
      {error ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : (
        <FormHelperText>
          {formatMessage(MESSAGES_KEYS.COMMAND_FORM_NAME_FIELD_HELP_TEXT)}
        </FormHelperText>
      )}
    </FormControl>
  );
}

CommandNameInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default CommandNameInput;
