import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Text } from '@chakra-ui/react';
import NewButton from '../../../components/Buttons/NewButton/NewButton';
import { useFormatMessage } from '../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../i18n/messages/keys';
import { ROUTES } from '../../../routing/routes';
import { useIsOpenLISAServerOnline } from '../../../state/selectors/useIsOpenLISAServerOnline';

function NoInstruments({ onNewInstrument }) {
  const formatMessage = useFormatMessage();
  const serverOnline = useIsOpenLISAServerOnline();
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
      <Text fontSize="2xl" textAlign="center">
        {serverOnline
          ? formatMessage(MESSAGES_KEYS.INSTRUMENTS_PAGE_NO_INSTRUMENTS_MESSAGE)
          : formatMessage(MESSAGES_KEYS.INSTRUMENTS_PAGE_NO_INSTRUMENTS_AND_SERVER_OFFLINE)}
      </Text>
      {serverOnline ? (
        <NewButton onClick={onNewInstrument}>
          {formatMessage(MESSAGES_KEYS.INSTRUMENTS_PAGE_CARD_NEW_INSTRUMENT_BUTTON_LABEL)}
        </NewButton>
      ) : (
        <Link to={ROUTES.SETTINGS}>
          <Text
            fontSize="2xl"
            color="blue.500"
            textDecor="underline"
            cursor="pointer"
            transition="all 0.1s ease-in-out;"
            _hover={{
              transform: 'scale(1.1)',
              textDecor: 'none',
            }}
          >
            {formatMessage(
              MESSAGES_KEYS.INSTRUMENTS_PAGE_NO_INSTRUMENTS_AND_SERVER_OFFLINE_BUTTON_LABEL,
            )}
          </Text>
        </Link>
      )}
    </Box>
  );
}

NoInstruments.propTypes = {
  onNewInstrument: PropTypes.func.isRequired,
};

export default NoInstruments;
