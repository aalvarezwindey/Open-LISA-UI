import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Code, Text, VStack } from '@chakra-ui/react';
import { useFormatMessage } from '../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';
import { CLIB_COMMAND_FIELD_NAMES, COMMAND_PARAM_VALUE_TYPES } from '../../../constants';
import CommandDescriptionInput from '../components/CommandDescriptionInput/CommandDescriptionInput';
import CommandInvocationInput from '../components/CommandInvocationInput/CommandInvocationInput';
import CommandNameInput from '../components/CommandNameInput/CommandNameInput';
import CommandsParametersInput from '../components/CommandParametersInput/CommandsParametersInput';
import CommandReturnInput from '../components/CommandReturnInput/CommandReturnInput';
import { commandInvocationValidator } from '../validators/commandInvocationValidator';
import { commandLibFileNameValidator } from '../validators/commandLibFileNameValidator';
import { commandNameValidator } from '../validators/commandNameValidator';
import CommandLibFileNameInput from './components/CommandLibFileNameInput/CommandLibFileNameInput';

const MAX_COMMAND_PARAMETERS_AMOUNT = 7;

export const CLibCommandFormFileds = [
  {
    name: CLIB_COMMAND_FIELD_NAMES.NAME,
    getError: commandNameValidator,
  },
  {
    name: CLIB_COMMAND_FIELD_NAMES.LIB_FILE_NAME,
    getError: commandLibFileNameValidator,
  },
  {
    name: CLIB_COMMAND_FIELD_NAMES.COMMAND,
    getError: commandInvocationValidator,
  },
  {
    name: CLIB_COMMAND_FIELD_NAMES.DESCRIPTION,
  },
  {
    name: CLIB_COMMAND_FIELD_NAMES.PARAMS,
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
    name: CLIB_COMMAND_FIELD_NAMES.RETURN,
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

const NEW_PARAM = {
  type: 'INT',
  description: '',
};

const generateParamsExamples = (params = [], addQuotesToStrings = false) => {
  return params.map((param) => {
    const paramType = COMMAND_PARAM_VALUE_TYPES.find((type) => type.value === param.type);
    return paramType.value === 'STRING' && addQuotesToStrings
      ? `"${paramType.example}"`
      : paramType.example;
  });
};

export default function CLibCommandForm({ updateField, values, errors }) {
  const commandName = values[CLIB_COMMAND_FIELD_NAMES.NAME];
  const libFunction = values[CLIB_COMMAND_FIELD_NAMES.COMMAND];
  const commandParams = values[CLIB_COMMAND_FIELD_NAMES.PARAMS];

  const [syntaxExample, setSyntaxExample] = useState('');
  const [libExample, setLibExample] = useState('');
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
    if (libFunction) {
      const argumentsText = commandParams.length
        ? generateParamsExamples(commandParams, true).join(', ')
        : '';
      setLibExample(`${libFunction}(${argumentsText})`);
    } else {
      setLibExample('');
    }
  }, [libFunction, commandParams]);

  const updateParamField = (paramField, paramIndex, newValue) => {
    const newParams = [...values[CLIB_COMMAND_FIELD_NAMES.PARAMS]];
    newParams[paramIndex][paramField] = newValue;
    updateField(CLIB_COMMAND_FIELD_NAMES.PARAMS)(newParams);
  };
  const onParamValueTypeChange = (paramIndex, newParamValueType) => {
    updateParamField('type', paramIndex, newParamValueType);
  };

  const onParamDescriptionChange = (paramIndex, newDescription) => {
    updateParamField('description', paramIndex, newDescription);
  };

  const updateCommandValue = (commandValue) => {
    updateField(CLIB_COMMAND_FIELD_NAMES.COMMAND)(commandValue);
  };

  const onCommandReturnValueTypeChange = (newValueType) => {
    const prev = {
      ...values[CLIB_COMMAND_FIELD_NAMES.RETURN],
    };
    updateField(CLIB_COMMAND_FIELD_NAMES.RETURN)({ ...prev, type: newValueType });
  };
  const onCommandReturnDescriptionChange = (newDescription) => {
    const prev = {
      ...values[CLIB_COMMAND_FIELD_NAMES.RETURN],
    };
    updateField(CLIB_COMMAND_FIELD_NAMES.RETURN)({ ...prev, description: newDescription });
  };

  const handleOnAddParameter = () => {
    const currentParams = values[CLIB_COMMAND_FIELD_NAMES.PARAMS];
    if (currentParams.length >= MAX_COMMAND_PARAMETERS_AMOUNT) return;
    updateField(CLIB_COMMAND_FIELD_NAMES.PARAMS)([
      ...currentParams,
      { ...NEW_PARAM, position: currentParams.length + 1 },
    ]);
  };

  const handleOnRemoveParameter = () => {
    const currentParams = values[CLIB_COMMAND_FIELD_NAMES.PARAMS];
    if (!currentParams.length) return;
    const removedLast = currentParams.slice(0, -1);
    updateField(CLIB_COMMAND_FIELD_NAMES.PARAMS)([...removedLast]);
  };

  return (
    <form>
      <VStack spacing={6} align="start">
        <CommandNameInput
          name={CLIB_COMMAND_FIELD_NAMES.NAME}
          value={values[CLIB_COMMAND_FIELD_NAMES.NAME]}
          onChange={(newName) => updateField(CLIB_COMMAND_FIELD_NAMES.NAME)(newName)}
          error={errors[CLIB_COMMAND_FIELD_NAMES.NAME]}
        />

        <CommandLibFileNameInput
          name={CLIB_COMMAND_FIELD_NAMES.LIB_FILE_NAME}
          value={values[CLIB_COMMAND_FIELD_NAMES.LIB_FILE_NAME]}
          onChange={(newLib) => updateField(CLIB_COMMAND_FIELD_NAMES.LIB_FILE_NAME)(newLib)}
          error={errors[CLIB_COMMAND_FIELD_NAMES.LIB_FILE_NAME]}
        />

        <CommandInvocationInput
          name={CLIB_COMMAND_FIELD_NAMES.COMMAND}
          label={formatMessage(MESSAGES_KEYS.COMMAND_FORM_INVOCATION_FIELD_LABEL_CLIB)}
          value={values[CLIB_COMMAND_FIELD_NAMES.COMMAND]}
          onChange={(newCommandInvocationValue) => updateCommandValue(newCommandInvocationValue)}
          error={errors[CLIB_COMMAND_FIELD_NAMES.COMMAND]}
          helpText={formatMessage(MESSAGES_KEYS.COMMAND_FORM_INVOCATION_FIELD_HELP_TEXT_CLIB)}
        />

        <CommandDescriptionInput
          name={CLIB_COMMAND_FIELD_NAMES.DESCRIPTION}
          value={values[CLIB_COMMAND_FIELD_NAMES.DESCRIPTION]}
          onChange={(newDesc) => updateField(CLIB_COMMAND_FIELD_NAMES.DESCRIPTION)(newDesc)}
        />

        <CommandsParametersInput
          onAddParameter={handleOnAddParameter}
          onRemoveParameter={handleOnRemoveParameter}
          name={CLIB_COMMAND_FIELD_NAMES.PARAMS}
          params={values[CLIB_COMMAND_FIELD_NAMES.PARAMS]}
          onParamValueTypeChange={(idx, newValue) => onParamValueTypeChange(idx, newValue)}
          onParamDescriptionChange={(idx, newValue) => onParamDescriptionChange(idx, newValue)}
        />

        <CommandReturnInput
          name={CLIB_COMMAND_FIELD_NAMES.RETURN}
          commandReturn={values[CLIB_COMMAND_FIELD_NAMES.RETURN]}
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
          {libExample ? (
            <Text>
              {formatMessage(MESSAGES_KEYS.COMMAND_FORM_CLIB_INVOCATION_EXAMPLE)}{' '}
              <Code>{libExample}</Code>
            </Text>
          ) : null}
        </Box>
      </VStack>
    </form>
  );
}

CLibCommandForm.propTypes = {
  updateField: PropTypes.func.isRequired,
  values: PropTypes.shape(
    CLibCommandFormFileds.reduce(
      (carry, field) => ({
        ...carry,
        [field.name]: field.propTypes || PropTypes.string.isRequired,
      }),
      {},
    ),
  ),
  errors: PropTypes.shape(
    CLibCommandFormFileds.reduce(
      (carry, field) => ({
        ...carry,
        [field.name]: PropTypes.string,
      }),
      {},
    ),
  ),
};
