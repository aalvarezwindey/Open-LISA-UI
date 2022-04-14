import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

export default function NavBar() {
  return (
    <Box as="nav" h={20} bgColor="navbar" display="flex" alignItems="center" shadow="xl">
      <Heading ml={4} color="text.primary">
        Open LISA
      </Heading>
    </Box>
  );
}
