import React from 'react';
import { Box, Code, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import InfoTooltip from '../../../../components/InfoTooltip/InfoTooltip';

export default function SCPICommandTypeInfoTooltip({ ...rest }) {
  return (
    <InfoTooltip {...rest} time={5000} tooltipProps={{ w: '478px', maxW: '100vw' }}>
      <Box mb={2}>
        Determina la combinación de instrucciones a enviar al instrumento mediante{' '}
        <Code>PyVISA</Code>
      </Box>
      <UnorderedList>
        <ListItem>
          <Text as="span" fontWeight="bold">
            Set:
          </Text>{' '}
          utiliza <Code>write</Code> y retorna los bytes enviados al instrumento
        </ListItem>
        <ListItem>
          <Text as="span" fontWeight="bold">
            Query:
          </Text>{' '}
          utiliza <Code>query</Code> y retorna la respuesta obtenida
        </ListItem>
        <ListItem>
          <Text as="span" fontWeight="bold">
            Query buffer:
          </Text>{' '}
          utiliza <Code>write</Code> y retorna la respuesta de <Code>read_raw</Code>
        </ListItem>
      </UnorderedList>
    </InfoTooltip>
  );
}
