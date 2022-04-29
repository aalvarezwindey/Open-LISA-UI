import React from 'react';
import PropTypes from 'prop-types';
import { Button, Code, Flex, Heading, Image, Text } from '@chakra-ui/react';

function InstrumentDetail({ brand, model, image, physicalAddress, description, onEditInstrument }) {
  return (
    <Flex h="50vh" direction="row">
      <Image
        src={image}
        alt={`${brand} - ${model}`}
        objectFit="contain"
        h="100%"
        shadow="lg"
        mr={8}
      />
      <Flex direction="column">
        <Flex flexGrow={1} direction="column">
          <Heading size="xl" mb={8}>
            {brand} {model}
          </Heading>
          {physicalAddress ? (
            <Text mb={6} fontWeight="bold">
              Dirección física: <Code fontWeight="normal">{physicalAddress}</Code>
            </Text>
          ) : null}
          {description ? <Text>{description}</Text> : null}
        </Flex>
        <Flex>
          <Button colorScheme="blue" onClick={onEditInstrument}>
            Editar instrumento
          </Button>
          <Button ml={4} colorScheme="red">
            Eliminar instrumento
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

InstrumentDetail.propTypes = {
  brand: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  physicalAddress: PropTypes.string,
  description: PropTypes.string,
  onEditInstrument: PropTypes.func.isRequired,
};

export default InstrumentDetail;
