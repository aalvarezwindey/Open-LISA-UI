import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

function BasicModal({ title, isOpen, onClose, primaryAction, secondaryAction, children }) {
  const PrimaryAction = () => (
    <Button ml={4} onClick={primaryAction.onAction} colorScheme="blue">
      {primaryAction.label}
    </Button>
  );
  const SecondaryAction = () =>
    secondaryAction ? (
      <Button onClick={secondaryAction.onAction}>{secondaryAction.label}</Button>
    ) : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        {title ? <ModalHeader>{title}</ModalHeader> : null}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <SecondaryAction />
          <PrimaryAction />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

BasicModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  primaryAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onAction: PropTypes.func.isRequired,
  }).isRequired,
  secondaryAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onAction: PropTypes.func.isRequired,
  }),
};

export default BasicModal;
