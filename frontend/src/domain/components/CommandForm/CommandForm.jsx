import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Code,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import format from '../../../utils/string/format';
import {
  SCPI_COMMAND_FIELD_NAMES,
  SCPI_COMMAND_PARAM_VALUE_TYPES,
  SCPI_COMMAND_TYPES,
} from '../../constants';
import SCPICommandTypeInfoTooltip from './components/SCPICommandTypeInfoTooltip';

export const CommandFormFileds = [
  {
    name: SCPI_COMMAND_FIELD_NAMES.NAME,
    getError: () => '',
  },
  {
    name: SCPI_COMMAND_FIELD_NAMES.COMMAND,
    getError: () => '',
  },
  {
    name: SCPI_COMMAND_FIELD_NAMES.TYPE,
    defaultValue: SCPI_COMMAND_TYPES[0].value,
  },
  {
    name: SCPI_COMMAND_FIELD_NAMES.DESCRIPTION,
  },
  {
    name: SCPI_COMMAND_FIELD_NAMES.PARAMS,
    defaultValue: [],
    propTypes: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        description: PropTypes.string,
      }),
    ),
  },
];

const COMMAND_PARAM_PLACEHOLDER = '{}';
const NEW_PARAM = {
  type: 'int',
  description: '',
};

const generateParamsExamples = (params = []) => {
  return params.map((param) => {
    return SCPI_COMMAND_PARAM_VALUE_TYPES.find((type) => type.value === param.type).example;
  });
};

export default function CommandForm({ updateField, values, errors }) {
  const commandName = values[SCPI_COMMAND_FIELD_NAMES.NAME];
  const SCPICommand = values[SCPI_COMMAND_FIELD_NAMES.COMMAND];
  const commandParams = values[SCPI_COMMAND_FIELD_NAMES.PARAMS];

  const [syntaxExample, setSyntaxExample] = useState('');
  const [SCPIExample, setSCPIExample] = useState('');

  useEffect(() => {
    if (commandName) {
      const paramsText = commandParams.length
        ? generateParamsExamples(commandParams).join(' ')
        : '';
      const newSyntaxExample = paramsText ? `${commandName} ${paramsText}` : commandName;
      setSyntaxExample(newSyntaxExample);
    } else {
      setSyntaxExample('');
    }
  }, [commandName, commandParams]);

  useEffect(() => {
    if (SCPICommand) {
      const newSCPIExample = commandParams.length
        ? format(SCPICommand, ...generateParamsExamples(commandParams))
        : SCPICommand;
      setSCPIExample(newSCPIExample);
    } else {
      setSCPIExample('');
    }
  }, [SCPICommand, commandParams]);

  const updateParamField = (paramField, paramIndex, newValue) => {
    const newParams = [...values[SCPI_COMMAND_FIELD_NAMES.PARAMS]];
    newParams[paramIndex][paramField] = newValue;
    updateField(SCPI_COMMAND_FIELD_NAMES.PARAMS)(newParams);
  };
  const onParamValueTypeChange = (paramIndex, newParamValueType) => {
    updateParamField('type', paramIndex, newParamValueType);
  };

  const onParamDescriptionChange = (paramIndex, newDescription) => {
    updateParamField('description', paramIndex, newDescription);
  };

  const updateCommandValue = (commandValue) => {
    updateField(SCPI_COMMAND_FIELD_NAMES.COMMAND)(commandValue);

    // parse command and update params
    const occurrences = (commandValue.match(new RegExp(COMMAND_PARAM_PLACEHOLDER, 'g')) || [])
      .length;

    const currentParams = values[SCPI_COMMAND_FIELD_NAMES.PARAMS];

    // new param
    if (occurrences > currentParams.length) {
      updateField(SCPI_COMMAND_FIELD_NAMES.PARAMS)([
        ...currentParams,
        { ...NEW_PARAM, position: occurrences },
      ]);
    }

    // remove last param
    if (occurrences < currentParams.length) {
      const newParams = [...currentParams];
      newParams.pop();
      updateField(SCPI_COMMAND_FIELD_NAMES.PARAMS)(newParams);
    }

    // nothing to do
  };

  return (
    <form>
      <VStack spacing={6} align="start">
        <FormControl isRequired isInvalid={Boolean(errors[SCPI_COMMAND_FIELD_NAMES.NAME])}>
          <FormLabel htmlFor={SCPI_COMMAND_FIELD_NAMES.NAME}>Nombre</FormLabel>
          <Input
            type="text"
            value={values[SCPI_COMMAND_FIELD_NAMES.NAME]}
            id={SCPI_COMMAND_FIELD_NAMES.NAME}
            onChange={(e) => updateField(SCPI_COMMAND_FIELD_NAMES.NAME)(e.target.value)}
          />
          {errors[SCPI_COMMAND_FIELD_NAMES.NAME] ? (
            <FormErrorMessage>{errors[SCPI_COMMAND_FIELD_NAMES.NAME]}</FormErrorMessage>
          ) : (
            <FormHelperText>
              El nombre del comando será la sintaxis utilizada desde la SDK, no debe contener
              espacios en blanco
            </FormHelperText>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={Boolean(errors[SCPI_COMMAND_FIELD_NAMES.COMMAND])}>
          <FormLabel htmlFor={SCPI_COMMAND_FIELD_NAMES.COMMAND}>Comando</FormLabel>
          <Input
            type="text"
            value={values[SCPI_COMMAND_FIELD_NAMES.COMMAND]}
            id={SCPI_COMMAND_FIELD_NAMES.COMMAND}
            onChange={(e) => updateCommandValue(e.target.value)}
          />
          {errors[SCPI_COMMAND_FIELD_NAMES.COMMAND] ? (
            <FormErrorMessage>{errors[SCPI_COMMAND_FIELD_NAMES.COMMAND]}</FormErrorMessage>
          ) : (
            <FormHelperText>
              {
                'Es el comando que indica el fabricante del instrumento. Utilice {} para indicar parámetros en el comando.'
              }
            </FormHelperText>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={Boolean(errors[SCPI_COMMAND_FIELD_NAMES.TYPE])}>
          <FormLabel htmlFor={SCPI_COMMAND_FIELD_NAMES.TYPE}>
            Tipo de comando <SCPICommandTypeInfoTooltip ml={2} />
          </FormLabel>
          <Select
            value={values[SCPI_COMMAND_FIELD_NAMES.TYPE]}
            id={SCPI_COMMAND_FIELD_NAMES.TYPE}
            onChange={(e) => updateField(SCPI_COMMAND_FIELD_NAMES.TYPE)(e.target.value)}
          >
            {SCPI_COMMAND_TYPES.map(({ label, value }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </Select>
          {errors[SCPI_COMMAND_FIELD_NAMES.TYPE] ? (
            <FormErrorMessage>{errors[SCPI_COMMAND_FIELD_NAMES.TYPE]}</FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl isInvalid={Boolean(errors[SCPI_COMMAND_FIELD_NAMES.DESCRIPTION])}>
          <FormLabel htmlFor={SCPI_COMMAND_FIELD_NAMES.DESCRIPTION}>Descripción</FormLabel>
          <Textarea
            placeholder="Indique qué hace este comando"
            value={values[SCPI_COMMAND_FIELD_NAMES.DESCRIPTION]}
            id={SCPI_COMMAND_FIELD_NAMES.DESCRIPTION}
            onChange={(e) => updateField(SCPI_COMMAND_FIELD_NAMES.DESCRIPTION)(e.target.value)}
          />
        </FormControl>

        {values[SCPI_COMMAND_FIELD_NAMES.PARAMS].length ? (
          <FormControl isInvalid={Boolean(errors[SCPI_COMMAND_FIELD_NAMES.PARAMS])}>
            <FormLabel htmlFor={SCPI_COMMAND_FIELD_NAMES.PARAMS}>Parámetros</FormLabel>

            <TableContainer mt={4}>
              <Table variant="simple" size="lg">
                <Thead>
                  <Tr>
                    <Th fontSize={12}>Tipo de valor</Th>
                    <Th fontSize={12}>Descripción</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {values[SCPI_COMMAND_FIELD_NAMES.PARAMS].map((param, idx) => {
                    return (
                      <Tr key={idx}>
                        <Td>
                          <Select
                            value={param.type}
                            onChange={(e) => onParamValueTypeChange(idx, e.target.value)}
                          >
                            {SCPI_COMMAND_PARAM_VALUE_TYPES.map(({ value, label }) => (
                              <option key={value} value={value}>
                                {label}
                              </option>
                            ))}
                          </Select>
                        </Td>
                        <Td>
                          <Input
                            type="text"
                            value={param.description}
                            placeholder="Indique para qué sirve el parámetro"
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
        ) : null}

        <Box>
          {syntaxExample ? (
            <Text>
              Ejemplo de invocación: <Code>{syntaxExample}</Code>
            </Text>
          ) : null}
          {SCPIExample ? (
            <Text>
              Instrucción que recibiría el instrumento: <Code>{SCPIExample}</Code>
            </Text>
          ) : null}
        </Box>
      </VStack>
    </form>
  );
}

CommandForm.propTypes = {
  updateField: PropTypes.func.isRequired,
  values: PropTypes.shape(
    CommandFormFileds.reduce(
      (carry, field) => ({
        ...carry,
        [field.name]: field.propTypes || PropTypes.string.isRequired,
      }),
      {},
    ),
  ),
  errors: PropTypes.shape(
    CommandFormFileds.reduce(
      (carry, field) => ({
        ...carry,
        [field.name]: PropTypes.string,
      }),
      {},
    ),
  ),
};
