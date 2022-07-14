import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { ReactComponent as GenericErrorImage } from '../../../assets/images/unexpected_error.svg';

export default function GenericError() {
  return (
    <Box w="100%" h="100vh" display="flex" flexDir="column" alignItems="center" mt={20}>
      <GenericErrorImage />
      <Heading size="lg" mb={4}>
        Ocurrió un error inesperado
      </Heading>
      <Button colorScheme="blue" onClick={() => window.location.reload()}>
        Intentar nuevamente
      </Button>
    </Box>
  );
}
