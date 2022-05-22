import React from 'react';
import PropTypes from 'prop-types';
import { Code, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import InfoTooltip from '../../../../../components/InfoTooltip/InfoTooltip';

function CommandsTable({ commands }) {
  return (
    <TableContainer mt={4}>
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            <Th fontSize={16}>Nombre</Th>
            <Th fontSize={16}>Comando</Th>
            <Th fontSize={16}>Tipo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {commands.map((command) => {
            return (
              <Tr key={command.name}>
                <Td>
                  <Code>{command.name}</Code>
                  {command.description ? (
                    <InfoTooltip ml={2}>{command.description}</InfoTooltip>
                  ) : null}
                </Td>
                <Td>
                  <Code>{command.command}</Code>
                </Td>
                <Td>{command.type}</Td>
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
