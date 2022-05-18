import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading } from '@chakra-ui/react';
import useInstrumentCommands from '../../../../hooks/useInstrumentCommands';
import CommandsTable from './components/CommandsTable';

function InstrumentCommands({ instrumentId }) {
  const { data: commands, isLoading } = useInstrumentCommands(instrumentId);

  if (isLoading) {
    return null;
  }

  return (
    <Box as="section" mt={8}>
      <Heading size="lg">Comandos</Heading>
      <CommandsTable commands={commands} />
    </Box>
  );
}

InstrumentCommands.propTypes = {
  instrumentId: PropTypes.string.isRequired,
};

export default InstrumentCommands;
