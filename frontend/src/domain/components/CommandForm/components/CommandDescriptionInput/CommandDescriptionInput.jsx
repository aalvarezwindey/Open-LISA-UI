import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { useFormatMessage } from '../../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../../i18n/messages/keys';

function CommandDescriptionInput({ name, value, onChange }) {
  const formatMessage = useFormatMessage();
  return (
    <FormControl>
      <FormLabel htmlFor={name}>
        {formatMessage(MESSAGES_KEYS.COMMAND_FORM_DESCRIPTION_FIELD_LABEL)}
      </FormLabel>
      <Textarea
        placeholder={formatMessage(MESSAGES_KEYS.COMMAND_FORM_DESCRIPTION_FIELD_PLACEHOLDER)}
        value={value}
        id={name}
        onChange={(e) => onChange(e.target.value)}
      />
    </FormControl>
  );
}

CommandDescriptionInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CommandDescriptionInput;
