import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Progress } from '@chakra-ui/react';
import { ROUTES } from '../../routing/routes';
import { useIsGlobalLoading } from '../../state/selectors/useIsGlobalLoading';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import ServerConnectionButton from './components/ServerConnectionButton.jsx/ServerConnectionButton';

export default function NavBar() {
  const navigate = useNavigate();
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
        <ServerConnectionButton />
        <LanguageSwitch />
      </Box>
      <Progress size="xs" isIndeterminate={appIsLoading} />
    </>
  );
}
