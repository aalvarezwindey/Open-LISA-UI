import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Code,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useFormatMessage } from '../../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../../i18n/messages/keys';

const CommandTableRow = ({ id, name, invocation, description, onCommandDelete }) => {
  const [hover, setHover] = useState(false);

  return (
    <Tr
      key={name}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      _hover={{
        backgroundColor: 'gray.200',
      }}
      h="90px"
    >
      <Td>
        <Code>{name}</Code>
      </Td>
      <Td>
        <Code>{invocation}</Code>
      </Td>
      <Td textOverflow="ellipsis" overflow="hidden" maxWidth="300px" title={description}>
        {description}
      </Td>
      {hover ? (
        <Td>
          <IconButton
            _hover={{
              backgroundColor: 'gray.400',
            }}
            onClick={() => onCommandDelete(id)}
            size="lg"
            variant="ghost"
            icon={<DeleteIcon />}
            color="red.500"
          />
        </Td>
      ) : null}
    </Tr>
  );
};

function CommandsTable({ commands, onCommandDelete }) {
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
          {commands.map(({ id, name, command, description }) => {
            return (
              <CommandTableRow
                key={id}
                id={id}
                name={name}
                invocation={command}
                description={description}
                onCommandDelete={onCommandDelete}
              />
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

CommandsTable.propTypes = {
  onCommandDelete: PropTypes.func.isRequired,
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
