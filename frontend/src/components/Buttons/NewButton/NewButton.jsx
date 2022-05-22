import React from 'react';
import PropTypes from 'prop-types';
import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

function NewButton({ onClick, children, ...rest }) {
  return (
    <Button {...rest} onClick={onClick} colorScheme="blue">
      <AddIcon mr={4} />
      {children}
    </Button>
  );
}

NewButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NewButton;
