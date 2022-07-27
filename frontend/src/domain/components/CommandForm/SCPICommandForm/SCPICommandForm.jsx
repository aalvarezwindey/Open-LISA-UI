import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Code, Text, VStack } from '@chakra-ui/react';
import { useFormatMessage } from '../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';
import format from '../../../../utils/string/format';
import { COMMAND_PARAM_VALUE_TYPES, SCPI_COMMAND_FIELD_NAMES } from '../../../constants';
import CommandDescriptionInput from '../components/CommandDescriptionInput/CommandDescriptionInput';
import CommandInvocationInput from '../components/CommandInvocationInput/CommandInvocationInput';
import CommandNameInput from '../components/CommandNameInput/CommandNameInput';
import CommandsParametersInput from '../components/CommandParametersInput/CommandsParametersInput';
import CommandReturnInput from '../components/CommandReturnInput/CommandReturnInput';
import { commandInvocationValidator } from '../validators/commandInvocationValidator';
import { commandNameValidator } from '../validators/commandNameValidator';

export const SCPICommandFormFileds = [
  {
    name: SCPI_COMMAND_FIELD_NAMES.NAME,
    getError: commandNameValidator,
  },
  {
    name: SCPI_COMMAND_FIELD_NAMES.COMMAND,
    getError: commandInvocationValidator,
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
  {
    name: SCPI_COMMAND_FIELD_NAMES.RETURN,
    defaultValue: {
      type: 'VOID',
      description: '',
    },
    propTypes: PropTypes.shape({
      type: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
  },
];

const COMMAND_PARAM_PLACEHOLDER = '{}';
const NEW_PARAM = {
  type: 'INT',
  description: '',
};

const generateParamsExamples = (params = []) => {
  return params.map((param) => {
    return COMMAND_PARAM_VALUE_TYPES.find((type) => type.value === param.type)?.example;
  });
};

export default function SCPICommandForm({ updateField, values, errors }) {
  const commandName = values[SCPI_COMMAND_FIELD_NAMES.NAME];
  const SCPICommand = values[SCPI_COMMAND_FIELD_NAMES.COMMAND];
  const commandParams = values[SCPI_COMMAND_FIELD_NAMES.PARAMS];

  const [syntaxExample, setSyntaxExample] = useState('');
  const [SCPIExample, setSCPIExample] = useState('');
  const formatMessage = useFormatMessage();

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

  const onCommandReturnValueTypeChange = (newValueType) => {
    const prev = {
      ...values[SCPI_COMMAND_FIELD_NAMES.RETURN],
    };
    updateField(SCPI_COMMAND_FIELD_NAMES.RETURN)({ ...prev, type: newValueType });
  };
  const onCommandReturnDescriptionChange = (newDescription) => {
    const prev = {
      ...values[SCPI_COMMAND_FIELD_NAMES.RETURN],
    };
    updateField(SCPI_COMMAND_FIELD_NAMES.RETURN)({ ...prev, description: newDescription });
  };

  return (
    <form>
      <VStack spacing={6} align="start">
        <CommandNameInput
          name={SCPI_COMMAND_FIELD_NAMES.NAME}
          value={values[SCPI_COMMAND_FIELD_NAMES.NAME]}
          onChange={(newName) => updateField(SCPI_COMMAND_FIELD_NAMES.NAME)(newName)}
          error={errors[SCPI_COMMAND_FIELD_NAMES.NAME]}
        />

        <CommandInvocationInput
          name={SCPI_COMMAND_FIELD_NAMES.COMMAND}
          value={values[SCPI_COMMAND_FIELD_NAMES.COMMAND]}
          onChange={(newCommandInvocationValue) => updateCommandValue(newCommandInvocationValue)}
          error={errors[SCPI_COMMAND_FIELD_NAMES.COMMAND]}
          helpText={formatMessage(MESSAGES_KEYS.COMMAND_FORM_INVOCATION_FIELD_HELP_TEXT_SCPI)}
        />

        <CommandDescriptionInput
          name={SCPI_COMMAND_FIELD_NAMES.DESCRIPTION}
          value={values[SCPI_COMMAND_FIELD_NAMES.DESCRIPTION]}
          onChange={(newDesc) => updateField(SCPI_COMMAND_FIELD_NAMES.DESCRIPTION)(newDesc)}
        />

        <CommandsParametersInput
          name={SCPI_COMMAND_FIELD_NAMES.PARAMS}
          params={values[SCPI_COMMAND_FIELD_NAMES.PARAMS]}
          onParamValueTypeChange={(idx, newValue) => onParamValueTypeChange(idx, newValue)}
          onParamDescriptionChange={(idx, newValue) => onParamDescriptionChange(idx, newValue)}
        />

        <CommandReturnInput
          name={SCPI_COMMAND_FIELD_NAMES.RETURN}
          commandReturn={values[SCPI_COMMAND_FIELD_NAMES.RETURN]}
          onCommandReturnValueTypeChange={onCommandReturnValueTypeChange}
          onCommandReturnDescriptionChange={onCommandReturnDescriptionChange}
        />

        <Box>
          {syntaxExample ? (
            <Text>
              {formatMessage(MESSAGES_KEYS.COMMAND_FORM_INVOCATION_EXAMPLE)}{' '}
              <Code>{syntaxExample}</Code>
            </Text>
          ) : null}
          {SCPIExample ? (
            <Text>
              {formatMessage(MESSAGES_KEYS.COMMAND_FORM_SCPI_INVOCATION_EXAMPLE)}{' '}
              <Code>{SCPIExample}</Code>
            </Text>
          ) : null}
        </Box>
      </VStack>
    </form>
  );
}

SCPICommandForm.propTypes = {
  updateField: PropTypes.func.isRequired,
  values: PropTypes.shape(
    SCPICommandFormFileds.reduce(
      (carry, field) => ({
        ...carry,
        [field.name]: field.propTypes || PropTypes.string.isRequired,
      }),
      {},
    ),
  ),
  errors: PropTypes.shape(
    SCPICommandFormFileds.reduce(
      (carry, field) => ({
        ...carry,
        [field.name]: PropTypes.string,
      }),
      {},
    ),
  ),
};
