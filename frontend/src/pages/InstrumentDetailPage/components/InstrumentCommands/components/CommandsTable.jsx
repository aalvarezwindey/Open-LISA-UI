import React from 'react';
import PropTypes from 'prop-types';
import { Code, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useFormatMessage } from '../../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../../i18n/messages/keys';

function CommandsTable({ commands }) {
  const formatMessage = useFormatMessage();
  return (
    <TableContainer mt={4} maxW="100vw">
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            <Th fontSize={16}>{formatMessage(MESSAGES_KEYS.COMMAND_FORM_NAME_FIELD_LABEL)}</Th>
            <Th fontSize={16}>
              {formatMessage(MESSAGES_KEYS.COMMAND_FORM_INVOCATION_FIELD_LABEL)}
            </Th>
            <Th fontSize={16}>
              {formatMessage(MESSAGES_KEYS.COMMAND_FORM_DESCRIPTION_FIELD_LABEL)}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {commands.map((command) => {
            return (
              <Tr key={command.name}>
                <Td>
                  <Code>{command.name}</Code>
                </Td>
                <Td>
                  <Code>{command.command}</Code>
                </Td>
                <Td
                  textOverflow="ellipsis"
                  overflow="hidden"
                  maxWidth="300px"
                  title={command.description}
                >
                  {command.description}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

CommandsTable.propTypes = {
  commands: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      command: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string,
      params: PropTypes.arrayOf(
        PropTypes.shape({
          position: PropTypes.number.isRequired,
          type: PropTypes.string.isRequired,
          example: PropTypes.string,
          description: PropTypes.string,
        }),
      ),
    }),
  ),
};

export default CommandsTable;
