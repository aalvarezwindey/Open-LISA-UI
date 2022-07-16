import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Image } from '@chakra-ui/react';
import Card from '../../../components/Card/Card';
import { useFormatMessage } from '../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../i18n/messages/keys';

const MAX_WIDTH = 200;

function InstrumentCard({ image, brand, model, onViewMore }) {
  const formatMessage = useFormatMessage();
  const heading = `${brand} - ${model}`;
  return (
    <Card>
      <Image
        src={image}
        alt={heading}
        objectFit="contain"
        h={[200]}
        w={[MAX_WIDTH]}
        mb={[4]}
        border="1px solid black"
        borderRadius="full"
        shadow="lg"
      />
      <Heading
        as="h3"
        size="md"
        mb={8}
        maxW={MAX_WIDTH}
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
        color="text.primary"
      >
        {heading}
      </Heading>
      <Box w="100%" textAlign="center">
        <Button onClick={onViewMore}>
          {formatMessage(MESSAGES_KEYS.INSTRUMENTS_PAGE_CARD_VIEW_MORE_BUTTON_LABEL)}
        </Button>
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
