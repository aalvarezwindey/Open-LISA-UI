import React from 'react';
import PropTypes from 'prop-types';
import { DeleteIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

function DeleteButton({ onClick, children, ...rest }) {
  return (
    <Button {...rest} onClick={onClick} colorScheme="red">
      <DeleteIcon mr={4} />
      {children}
    </Button>
  );
}

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
