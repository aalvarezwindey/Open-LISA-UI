import React from 'react';
import PropTypes from 'prop-types';
import useInstrumentCommands from '../../../../hooks/useInstrumentCommands';

function InstrumentCommands({ instrumentId }) {
  const { data: commands, isLoading } = useInstrumentCommands(instrumentId);

  if (isLoading) {
    return null;
  }

  console.log(
    '🚀 ~ file: InstrumentCommands.jsx ~ line 17 ~ InstrumentCommands ~ commands',
    commands,
  );

  return <div>InstrumentCommands</div>;
}

InstrumentCommands.propTypes = {
  instrumentId: PropTypes.string.isRequired,
};

export default InstrumentCommands;
