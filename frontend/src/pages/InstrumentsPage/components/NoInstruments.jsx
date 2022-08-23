import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@chakra-ui/react';
import NewButton from '../../../components/Buttons/NewButton/NewButton';
import { useFormatMessage } from '../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../i18n/messages/keys';

function NoInstruments({ onNewInstrument }) {
  const formatMessage = useFormatMessage();
  return (
    <Box
      width="100%"
      minH="90vh"
      display="flex"
      flexDirection="column"
      gap={10}
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="2xl">
        {formatMessage(MESSAGES_KEYS.INSTRUMENTS_PAGE_NO_INSTRUMENTS_MESSAGE)}
      </Text>
      <NewButton onClick={onNewInstrument}>
        {formatMessage(MESSAGES_KEYS.INSTRUMENTS_PAGE_CARD_NEW_INSTRUMENT_BUTTON_LABEL)}
      </NewButton>
    </Box>
  );
}

NoInstruments.propTypes = {
  onNewInstrument: PropTypes.func.isRequired,
};

export default NoInstruments;
