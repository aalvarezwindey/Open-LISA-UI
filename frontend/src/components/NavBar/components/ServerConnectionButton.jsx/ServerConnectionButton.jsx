import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/react';
import { ReactComponent as ConnectionIcon } from '../../../../assets/connection.svg';
import { useFormatMessage } from '../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';
import { ROUTES } from '../../../../routing/routes';
import { useIsOpenLISAServerOnline } from '../../../../state/selectors/useIsOpenLISAServerOnline';

const getButtonStatusLabel = (isServerOnline) => {
  switch (isServerOnline) {
    case true:
      return 'ONLINE';
    case false:
      return 'OFFLINE';
    default:
      return 'UNKNOWN';
  }
};

const getButtonColor = (isServerOnline) => {
  switch (isServerOnline) {
    case true:
      return 'green.400';
    case false:
      return 'red.500';
    default:
      return '';
  }
};
export default function ServerConnectionButton() {
  const navigate = useNavigate();
  const formatMessage = useFormatMessage();
  const isServerOnline = useIsOpenLISAServerOnline();

  return (
    <Button
      onClick={() => navigate(ROUTES.SETTINGS)}
      backgroundColor={getButtonColor(isServerOnline)}
      border="1px solid black"
      boxShadow="lg"
    >
      <Box mr={2}>
        <ConnectionIcon width={25} height={25} />
      </Box>
      {formatMessage(
        MESSAGES_KEYS.NAVBAR_SERVER_BUTTON_LABEL,
        getButtonStatusLabel(isServerOnline),
      )}
    </Button>
  );
}
