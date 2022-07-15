import React from 'react';
import PropTypes from 'prop-types';
import { Code, Flex, Heading, Image, Text } from '@chakra-ui/react';
import DeleteButton from '../../../components/Buttons/DeleteButton/DeleteButton';
import EditButton from '../../../components/Buttons/EditButton/EditButton';

function InstrumentDetail({
  brand,
  model,
  image,
  physical_address,
  description,
  onEditInstrument,
  onDeleteInstrument,
}) {
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
          {physical_address ? (
            <Text mb={6} fontWeight="bold">
              Dirección física: <Code fontWeight="normal">{physical_address}</Code>
            </Text>
          ) : null}
          {description ? <Text>{description}</Text> : null}
        </Flex>
        <Flex>
          <EditButton onClick={onEditInstrument}>Editar instrumento</EditButton>
          <DeleteButton ml={4} onClick={onDeleteInstrument}>
            Eliminar instrumento
          </DeleteButton>
        </Flex>
      </Flex>
    </Flex>
  );
}

InstrumentDetail.propTypes = {
  brand: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  physical_address: PropTypes.string,
  description: PropTypes.string,
  onEditInstrument: PropTypes.func.isRequired,
  onDeleteInstrument: PropTypes.func.isRequired,
};

export default InstrumentDetail;
