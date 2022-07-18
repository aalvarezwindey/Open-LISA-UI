import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, useBoolean, useDisclosure } from '@chakra-ui/react';
import BasicModal from '../../../../components/BasicModal/BasicModal';
import NewButton from '../../../../components/Buttons/NewButton/NewButton';
import CommandForm, {
  CommandFormFileds,
} from '../../../../domain/components/CommandForm/CommandForm';
import useForm from '../../../../hooks/useForm';
import useInstrumentCommands from '../../../../hooks/useInstrumentCommands';
import { useFormatMessage } from '../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';
import { logger } from '../../../../logger';
import CommandsTable from './components/CommandsTable';

function InstrumentCommands({ instrumentId }) {
  const formatMessage = useFormatMessage();
  const { data: commands, isLoading, refetch } = useInstrumentCommands(instrumentId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submittingNewCommand, { on: submittingOn, off: submittingOff }] = useBoolean(false);

  const { isValid, reset, displayErrors, ...newCommandFormProps } = useForm({
    fields: CommandFormFileds,
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
      await new Promise((r) => setTimeout(r, 3000));
      await refetch();
      submittingOff();
      reset();
      onClose();
    } catch (err) {
      submittingOff();
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
        title="Nuevo comando"
        onClose={onClose}
        isOpen={isOpen}
        primaryAction={{
          label: 'Crear comando',
          onAction: handleCreateCommand,
          loading: submittingNewCommand,
        }}
        secondaryAction={{ label: 'Cancelar', onAction: onClose }}
      >
        <CommandForm {...newCommandFormProps} />
      </BasicModal>
    </Box>
  );
}

InstrumentCommands.propTypes = {
  instrumentId: PropTypes.string.isRequired,
};

export default InstrumentCommands;
