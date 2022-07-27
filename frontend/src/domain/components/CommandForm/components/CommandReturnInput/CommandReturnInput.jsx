import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { useFormatMessage } from '../../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../../i18n/messages/keys';
import { COMMAND_RETURN_VALUE_TYPES } from '../../../../constants';

const Label = ({ children }) => (
  <FormLabel
    textTransform="uppercase"
    fontSize={12}
    color="gray.600"
    fontWeight="700"
    letterSpacing="0.05em"
  >
    {children}
  </FormLabel>
);

function CommandReturnInput({
  name,
  commandReturn,
  onCommandReturnValueTypeChange,
  onCommandReturnDescriptionChange,
}) {
  const formatMessage = useFormatMessage();

  return (
    <FormControl>
      <FormLabel htmlFor={name}>
        {formatMessage(MESSAGES_KEYS.COMMAND_FORM_RETURN_FIELD_LABEL)}
      </FormLabel>

      <Flex direction="row" w="100%" gap="64px">
        <Box w="31%">
          <Label fontSize={14}>
            {formatMessage(MESSAGES_KEYS.COMMAND_FORM_RETURN_FIELD_TYPE_LABEL)}
          </Label>
          <Select
            value={commandReturn.type}
            onChange={(e) => onCommandReturnValueTypeChange(e.target.value)}
          >
            {COMMAND_RETURN_VALUE_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Box>
        <Box flexGrow={1}>
          <Label fontSize={14}>
            {formatMessage(MESSAGES_KEYS.COMMAND_FORM_RETURN_FIELD_DESCRIPTION_LABEL)}
          </Label>
          <Input
            type="text"
            value={commandReturn.description}
            placeholder={formatMessage(
              MESSAGES_KEYS.COMMAND_FORM_RETURN_FIELD_DESCRIPTION_PLACEHOLDER,
            )}
            onChange={(e) => onCommandReturnDescriptionChange(e.target.value)}
          />
        </Box>
      </Flex>
    </FormControl>
  );
}

CommandReturnInput.propTypes = {
  commandReturn: PropTypes.shape({
    type: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
};

export default CommandReturnInput;
