import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InfoIcon } from '@chakra-ui/icons';
import { Code, Table, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr } from '@chakra-ui/react';

let tooltipTimer;
const TOOLTIP_TIME = 3000;

function CommandsTable({ commands }) {
  const [openTooltip, setOpenTooltip] = useState('');

  const onTooltipClick = (commandName) => {
    clearTimeout(tooltipTimer);
    setOpenTooltip(commandName);
    tooltipTimer = setTimeout(() => setOpenTooltip(''), TOOLTIP_TIME);
  };

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
                    <Tooltip
                      hasArrow
                      label={command.description}
                      isOpen={openTooltip === command.name}
                    >
                      <InfoIcon ml={2} onClick={() => onTooltipClick(command.name)} />
                    </Tooltip>
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
