import React from 'react';
import PropTypes from 'prop-types';
import { Code, Flex, Heading, Image, Text } from '@chakra-ui/react';
import DeleteButton from '../../../components/Buttons/DeleteButton/DeleteButton';
import EditButton from '../../../components/Buttons/EditButton/EditButton';
import { useFormatMessage } from '../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../i18n/messages/keys';

function InstrumentDetail({
  brand,
  model,
  image,
  physical_address,
  description,
  onEditInstrument,
  onDeleteInstrument,
}) {
  const formatMessage = useFormatMessage();
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
              {formatMessage(MESSAGES_KEYS.INSTRUMENT_FORM_FIELD_PHYSICAL_ADDRESS_LABEL)}:{' '}
              <Code fontWeight="normal">{physical_address}</Code>
            </Text>
          ) : null}
          {description ? <Text>{description}</Text> : null}
        </Flex>
        <Flex>
          <EditButton onClick={onEditInstrument}>
            {formatMessage(MESSAGES_KEYS.INSTRUMENT_DETAIL_EDIT_INSTRUMENT_BUTTON_LABEL)}
          </EditButton>
          <DeleteButton ml={4} onClick={onDeleteInstrument}>
            {formatMessage(MESSAGES_KEYS.INSTRUMENT_DETAIL_DELETE_INSTRUMENT_BUTTON_LABEL)}
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
