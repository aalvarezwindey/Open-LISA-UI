import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';
import { ROUTES } from '../../../routing/routes';
import InstrumentCard from '../InstrumentCard/InstrumentCard';

function InstrumentsList({ instruments }) {
  const navigate = useNavigate();
  const viewMoreInstrument = (id) => () => {
    const path = ROUTES.INTRUMENT_DETAIL.replace(':instrumentId', id);
    navigate(path);
  };
  return (
    <Flex gap={12} wrap="wrap" justify="start">
      {instruments.map((instrument) => (
        <InstrumentCard
          key={instrument.id}
          {...instrument}
          onViewMore={viewMoreInstrument(instrument.id)}
        />
      ))}
    </Flex>
  );
}

InstrumentsList.propTypes = {
  instruments: PropTypes.arrayOf(
    PropTypes.shape({
      brand: PropTypes.string.isRequired,
      model: PropTypes.string.isRequired,
      image: PropTypes.string,
    }),
  ),
};

export default InstrumentsList;
