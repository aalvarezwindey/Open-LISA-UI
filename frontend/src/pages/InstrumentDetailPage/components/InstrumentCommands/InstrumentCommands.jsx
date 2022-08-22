import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, useBoolean, useDisclosure } from '@chakra-ui/react';
import NewButton from '../../../../components/Buttons/NewButton/NewButton';
import DestructiveDialog from '../../../../components/DestructiveDialog/DestructiveDialog';
import CommandFormModal from '../../../../domain/components/CommandForm/CommandFormModal';
import useInstrumentCommands from '../../../../hooks/useInstrumentCommands';
import useNotifier from '../../../../hooks/useNotifier';
import { useFormatMessage } from '../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';
import { logger } from '../../../../logger';
import createInstrumentCommand from '../../../../services/instruments/createInstrumentCommand';
import deleteInstrumentCommand from '../../../../services/instruments/deleteInstrumentCommand';
import CommandsTable from './components/CommandsTable';

function InstrumentCommands({ instrumentId, instrumentType }) {
  const formatMessage = useFormatMessage();
  const { data: commands, isLoading, refetch } = useInstrumentCommands(instrumentId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeletingCommandOpen,
    onOpen: openDeletingCommandModal,
    onClose: closeDeletingCommandModal,
  } = useDisclosure();
  const [commandIdToDelete, setCommandIdToDelete] = useState(null);
  const [deletingCommand, { on: delettingOn, off: delettingOff }] = useBoolean(false);
  const { notifyInfo, notifyError } = useNotifier();

  if (isLoading) {
    return null;
  }

  const handleNewCommandFormSubmit = async (newCommandPayload) => {
    await createInstrumentCommand(instrumentId, {
      ...newCommandPayload,
      instrument_id: instrumentId,
    });
    await refetch();
  };

  const handleConfirmDeleteCommand = async () => {
    try {
      delettingOn();
      await deleteInstrumentCommand(instrumentId, commandIdToDelete);
      notifyInfo(
        formatMessage(MESSAGES_KEYS.COMMAND_DELETE_SUCCESS_FEEDBACK_TITLE),
        formatMessage(MESSAGES_KEYS.COMMAND_DELETE_SUCCESS_FEEDBACK_DESCRIPTION),
      );
      await refetch();
    } catch (err) {
      logger.error('[DELETE COMMAND ERROR', err);
      notifyError(
        formatMessage(MESSAGES_KEYS.COMMAND_DELETE_ERROR_FEEDBACK_TITLE),
        formatMessage(MESSAGES_KEYS.COMMAND_DELETE_ERROR_FEEDBACK_DESCRIPTION),
      );
    } finally {
      delettingOff();
      closeDeletingCommandModal();
    }
  };

  const handleCommandDelete = async (commandId) => {
    setCommandIdToDelete(commandId);
    openDeletingCommandModal();
  };

  return (
    <Box as="section" mt={16}>
      <Box w="100%" display="flex" justifyContent="space-between">
        <Heading size="lg">{formatMessage(MESSAGES_KEYS.INSTRUMENT_DETAIL_COMMANDS_TITLE)}</Heading>
        <NewButton onClick={onOpen}>
          {formatMessage(MESSAGES_KEYS.INSTRUMENT_DETAIL_NEW_COMMAND_BUTTON_LABEL)}
        </NewButton>
      </Box>
      <CommandsTable commands={commands} onCommandDelete={handleCommandDelete} />
      <CommandFormModal
        instrumentType={instrumentType}
        isOpen={isOpen}
        onClose={onClose}
        onFormSubmit={handleNewCommandFormSubmit}
      />
      <DestructiveDialog
        isOpen={isDeletingCommandOpen}
        title={formatMessage(MESSAGES_KEYS.COMMAND_DELETE_MODAL_TITLE)}
        description={formatMessage(MESSAGES_KEYS.COMMAND_DELETE_MODAL_DESCRIPTION)}
        onCancel={closeDeletingCommandModal}
        onDelete={handleConfirmDeleteCommand}
        loading={deletingCommand}
      />
    </Box>
  );
}

InstrumentCommands.propTypes = {
  instrumentId: PropTypes.string.isRequired,
  instrumentType: PropTypes.string.isRequired,
};

export default InstrumentCommands;
