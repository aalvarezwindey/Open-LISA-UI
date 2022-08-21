import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, useDisclosure } from '@chakra-ui/react';
import NewButton from '../../../../components/Buttons/NewButton/NewButton';
import CommandFormModal from '../../../../domain/components/CommandForm/CommandFormModal';
import useInstrumentCommands from '../../../../hooks/useInstrumentCommands';
import { useFormatMessage } from '../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';
import createInstrumentCommand from '../../../../services/instruments/createInstrumentCommand';
import CommandsTable from './components/CommandsTable';

function InstrumentCommands({ instrumentId, instrumentType }) {
  const formatMessage = useFormatMessage();
  const { data: commands, isLoading, refetch } = useInstrumentCommands(instrumentId);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  return (
    <Box as="section" mt={16}>
      <Box w="100%" display="flex" justifyContent="space-between">
        <Heading size="lg">{formatMessage(MESSAGES_KEYS.INSTRUMENT_DETAIL_COMMANDS_TITLE)}</Heading>
        <NewButton onClick={onOpen}>
          {formatMessage(MESSAGES_KEYS.INSTRUMENT_DETAIL_NEW_COMMAND_BUTTON_LABEL)}
        </NewButton>
      </Box>
      <CommandsTable commands={commands} />
      <CommandFormModal
        instrumentType={instrumentType}
        isOpen={isOpen}
        onClose={onClose}
        onFormSubmit={handleNewCommandFormSubmit}
      />
    </Box>
  );
}

InstrumentCommands.propTypes = {
  instrumentId: PropTypes.string.isRequired,
  instrumentType: PropTypes.string.isRequired,
};

export default InstrumentCommands;
