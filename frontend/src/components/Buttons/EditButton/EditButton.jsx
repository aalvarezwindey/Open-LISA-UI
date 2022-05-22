import React from 'react';
import PropTypes from 'prop-types';
import { EditIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

function EditButton({ onClick, children, ...rest }) {
  return (
    <Button {...rest} onClick={onClick} colorScheme="gray">
      <EditIcon mr={4} />
      {children}
    </Button>
  );
}

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
