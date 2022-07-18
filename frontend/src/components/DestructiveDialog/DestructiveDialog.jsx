import React from 'react';
import PropTypes from 'prop-types';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useFormatMessage } from '../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../i18n/messages/keys';

function DestructiveDialog({ isOpen, onCancel, onDelete, title, description, loading }) {
  const cancelRef = React.useRef();
  const formatMessage = useFormatMessage();
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onCancel}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel} loading={loading}>
              {formatMessage(MESSAGES_KEYS.INSTRUMENT_DETAIL_DESTRUCTIVE_MODAL_CANCEL_LABEL)}
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3} loading={loading}>
              {formatMessage(MESSAGES_KEYS.INSTRUMENT_DETAIL_DESTRUCTIVE_MODAL_CONFIRM_LABEL)}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

DestructiveDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default DestructiveDialog;
