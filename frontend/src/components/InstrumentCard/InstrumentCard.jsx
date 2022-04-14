import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Image } from '@chakra-ui/react';
import Card from '../Card/Card';

const MAX_WIDTH = 200;

function InstrumentCard({ image, brand, model, onViewMore }) {
  const heading = `${brand} - ${model}`;
  return (
    <Card>
      <Image src={image} alt={heading} objectFit="contain" h={[200]} w={[MAX_WIDTH]} mb={[4]} />
      <Heading
        as="h3"
        size="md"
        mb={8}
        maxW={MAX_WIDTH}
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {heading}
      </Heading>
      <Box w="100%" textAlign="center">
        <Button onClick={onViewMore}>Ver más</Button>
      </Box>
    </Card>
  );
}

InstrumentCard.propTypes = {
  brand: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default InstrumentCard;
