import React from 'react';
import { Box } from '@chakra-ui/react';

export default function Card({ children, ...rest }) {
  return (
    <Box boxShadow="dark-lg" p="6" rounded="md" bg="card" w="fit-content" {...rest}>
      {children}
    </Box>
  );
}
