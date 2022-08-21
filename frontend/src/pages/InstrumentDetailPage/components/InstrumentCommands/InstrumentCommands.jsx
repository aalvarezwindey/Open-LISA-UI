import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, useBoolean, useDisclosure } from '@chakra-ui/react';
import BasicModal from '../../../../components/BasicModal/BasicModal';
import NewButton from '../../../../components/Buttons/NewButton/NewButton';
import SCPICommandForm, {
  SCPICommandFormFileds,
} from '../../../../domain/components/CommandForm/SCPICommandForm/SCPICommandForm';
import { INSTRUMENT_TYPES, SCPI_COMMAND_FIELD_NAMES } from '../../../../domain/constants';
import useForm from '../../../../hooks/useForm';
import useInstrumentCommands from '../../../../hooks/useInstrumentCommands';
import useNotifier from '../../../../hooks/useNotifier';
import { useFormatMessage } from '../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';
import { logger } from '../../../../logger';
import createInstrumentCommand from '../../../../services/instruments/createInstrumentCommand';
import CommandsTable from './components/CommandsTable';

function InstrumentCommands({ instrumentId, instrumentType }) {
  const formatMessage = useFormatMessage();
  const { data: commands, isLoading, refetch } = useInstrumentCommands(instrumentId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submittingNewCommand, { on: submittingOn, off: submittingOff }] = useBoolean(false);
  const { notifyError, notifySuccess } = useNotifier();

  const { isValid, reset, displayErrors, ...newCommandFormProps } = useForm({
    fields: SCPICommandFormFileds,
  });

  if (isLoading) {
    return null;
  }

  const handleCreateCommand = async () => {
    const { values: formValues } = newCommandFormProps;
    if (!isValid) {
      displayErrors(formValues);
      return;
    }

    try {
      submittingOn();
      await createInstrumentCommand(instrumentId, {
        ...formValues,
        type: instrumentType,
        instrument_id: instrumentId,
        metadata: null, // TODO: send clib here
      });
      await refetch();
      submittingOff();
      reset();
      onClose();
      notifySuccess(
        formatMessage(MESSAGES_KEYS.COMMAND_SCPI_CREATION_SUCCESS_FEEDBACK_TITLE),
        formatMessage(
          MESSAGES_KEYS.COMMAND_SCPI_CREATION_SUCCESS_FEEDBACK_DESCRIPTION,
          formValues[SCPI_COMMAND_FIELD_NAMES.NAME],
        ),
      );
    } catch (err) {
      submittingOff();
      notifyError(
        formatMessage(MESSAGES_KEYS.COMMAND_SCPI_CREATION_ERROR_FEEDBACK_TITLE),
        formatMessage(MESSAGES_KEYS.COMMAND_SCPI_CREATION_ERROR_FEEDBACK_DESCRIPTION),
      );
      logger.error('[CREATE_COMMAND]', err);
    }
  };

  return (
    <Box as="section" mt={16}>
      <Box w="100%" display="flex" justifyContent="space-between">
        <Heading size="lg">{formatMessage(MESSAGES_KEYS.INSTRUMENT_DETAIL_COMMANDS_TITLE)}</Heading>
        <NewButton onClick={onOpen}>
          {formatMessage(MESSAGES_KEYS.INSTRUMENT_DETAIL_NEW_COMMAND_BUTTON_LABEL)}
        </NewButton>
      </Box>
      <CommandsTable commands={commands} />
      <BasicModal
        title={formatMessage(MESSAGES_KEYS.COMMAND_FORM_TITLE)}
        onClose={onClose}
        isOpen={isOpen}
        primaryAction={{
          label: formatMessage(MESSAGES_KEYS.COMMAND_FORM_CONFIRM_LABEL),
          onAction: handleCreateCommand,
          loading: submittingNewCommand,
        }}
        secondaryAction={{
          label: formatMessage(MESSAGES_KEYS.COMMAND_FORM_CANCEL_LABEL),
          onAction: onClose,
        }}
      >
        {instrumentType === INSTRUMENT_TYPES.SCPI ? (
          <SCPICommandForm {...newCommandFormProps} />
        ) : (
          <h1>TODO: implement CLIB form</h1>
        )}
      </BasicModal>
    </Box>
  );
}

InstrumentCommands.propTypes = {
  instrumentId: PropTypes.string.isRequired,
  instrumentType: PropTypes.string.isRequired,
};

export default InstrumentCommands;
