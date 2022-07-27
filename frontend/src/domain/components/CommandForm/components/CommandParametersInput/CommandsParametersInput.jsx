import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useFormatMessage } from '../../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../../i18n/messages/keys';
import { COMMAND_PARAM_VALUE_TYPES } from '../../../../constants';

function CommandsParametersInput({
  name,
  params,
  onParamValueTypeChange,
  onParamDescriptionChange,
}) {
  const formatMessage = useFormatMessage();
  if (!params.length) return null;

  return (
    <FormControl>
      <FormLabel htmlFor={name}>
        {formatMessage(MESSAGES_KEYS.COMMAND_FORM_PARAMETERS_FIELD_LABEL)}
      </FormLabel>

      <TableContainer>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              <Th pt={0} pl={0} fontSize={12}>
                {formatMessage(MESSAGES_KEYS.COMMAND_FORM_PARAMETERS_FIELD_TYPE_LABEL)}
              </Th>
              <Th pt={0} pr={0} fontSize={12}>
                {formatMessage(MESSAGES_KEYS.COMMAND_FORM_PARAMETERS_FIELD_DESCRIPTION_LABEL)}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {params.map((param, idx) => {
              return (
                <Tr key={idx}>
                  <Td pl={0}>
                    <Select
                      value={param.type}
                      onChange={(e) => onParamValueTypeChange(idx, e.target.value)}
                    >
                      {COMMAND_PARAM_VALUE_TYPES.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </Select>
                  </Td>
                  <Td pr={0}>
                    <Input
                      type="text"
                      value={param.description}
                      placeholder={formatMessage(
                        MESSAGES_KEYS.COMMAND_FORM_PARAMETERS_FIELD_DESCRIPTION_PLACEHOLDER,
                      )}
                      onChange={(e) => onParamDescriptionChange(idx, e.target.value)}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </FormControl>
  );
}

CommandsParametersInput.propTypes = {
  params: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  ),
  name: PropTypes.string.isRequired,
  onParamValueTypeChange: PropTypes.func.isRequired,
  onParamDescriptionChange: PropTypes.func.isRequired,
};

export default CommandsParametersInput;
