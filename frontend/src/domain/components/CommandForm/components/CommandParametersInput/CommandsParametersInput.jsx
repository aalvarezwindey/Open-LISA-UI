import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
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

const ControlButton = (props) => (
  <Button size="xs" variant="outline" {...props}>
    {props.children}
  </Button>
);

function CommandsParametersInput({
  onAddParameter,
  onRemoveParameter,
  name,
  params,
  onParamValueTypeChange,
  onParamDescriptionChange,
}) {
  const formatMessage = useFormatMessage();
  const isManualControlled = Boolean(onRemoveParameter && onAddParameter);
  if (!isManualControlled && !params.length) return null;

  return (
    <FormControl>
      <FormLabel htmlFor={name}>
        <Box display="flex" w="100%" alignItems="center" gap="20px">
          {formatMessage(MESSAGES_KEYS.COMMAND_FORM_PARAMETERS_FIELD_LABEL)}
          {isManualControlled ? (
            <>
              <ControlButton onClick={onAddParameter}>+</ControlButton>
              <ControlButton onClick={onRemoveParameter}>-</ControlButton>
            </>
          ) : null}
        </Box>
      </FormLabel>

      {params.length > 0 ? (
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
      ) : null}
    </FormControl>
  );
}

CommandsParametersInput.propTypes = {
  onAddParameterManually: PropTypes.func,
  onRemoveParameter: PropTypes.func,
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
