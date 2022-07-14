import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading } from '@chakra-ui/react';
import { ReactComponent as ConnectionIcon } from '../../assets/connection.svg';
import { ROUTES } from '../../routing/routes';

export default function NavBar() {
  const navigate = useNavigate();
  return (
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
      <Heading color="text.primary">Open LISA</Heading>
      <Button variant="ghost" onClick={() => navigate(ROUTES.SETTINGS)}>
        <Box mr={2}>
          <ConnectionIcon width={25} height={25} />
        </Box>
        Conexión con el servidor
      </Button>
    </Box>
  );
}
