import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Progress } from '@chakra-ui/react';
import { ReactComponent as ConnectionIcon } from '../../assets/connection.svg';
import { useFormatMessage } from '../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../i18n/messages/keys';
import { ROUTES } from '../../routing/routes';
import { useIsGlobalLoading } from '../../state/selectors/useIsGlobalLoading';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';

export default function NavBar() {
  const navigate = useNavigate();
  const formatMessage = useFormatMessage();
  const appIsLoading = useIsGlobalLoading();

  return (
    <>
      <Box
        as="nav"
        h={20}
        bgColor="navbar"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        shadow="xl"
        pos="sticky"
        zIndex={100}
        top={0}
        p={4}
        w="100%"
      >
        <Heading color="text.primary" cursor="pointer" onClick={() => navigate(ROUTES.INSTRUMENTS)}>
          Open LISA
        </Heading>
        <Button onClick={() => navigate(ROUTES.SETTINGS)} backgroundColor="green.400">
          <Box mr={2}>
            <ConnectionIcon width={25} height={25} />
          </Box>
          {formatMessage(MESSAGES_KEYS.NAVBAR_SERVER_BUTTON_LABEL, 'ONLINE')}
        </Button>
        <LanguageSwitch />
      </Box>
      <Progress size="xs" isIndeterminate={appIsLoading} />
    </>
  );
}
