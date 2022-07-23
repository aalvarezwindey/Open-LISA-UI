import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { NEW_DIRECTORY_FIELD_NAMES } from '../../../../../../domain/constants';
import useForm from '../../../../../../hooks/useForm';
import { useFormatMessage } from '../../../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../../../i18n/messages/keys';
import { directoryValidator } from './validators/directoryValidator';

export const NewDirectoryFormFields = [
  {
    name: NEW_DIRECTORY_FIELD_NAMES.DIRECTORY,
    getError: directoryValidator,
  },
];

export default function NewDirectoryDialog({ open, onNewDirectory, onClose }) {
  const formatMessage = useFormatMessage();
  const { updateField, isValid, displayErrors, errors, values, reset } = useForm({
    fields: NewDirectoryFormFields,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onNewDirectory(values);
    } else {
      displayErrors(values);
      return;
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    <AlertDialog isOpen={open} isCentered onOverlayClick={handleClose} onEsc={handleClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_NEW_DIRECTORY_TITLE)}
          </AlertDialogHeader>

          <AlertDialogBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors[NEW_DIRECTORY_FIELD_NAMES.DIRECTORY])}
                >
                  <FormLabel htmlFor={NEW_DIRECTORY_FIELD_NAMES.DIRECTORY}>
                    {formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_NEW_DIRECTORY_LABEL)}
                  </FormLabel>
                  <Input
                    type="text"
                    value={values[NEW_DIRECTORY_FIELD_NAMES.DIRECTORY]}
                    id={NEW_DIRECTORY_FIELD_NAMES.DIRECTORY}
                    onChange={(e) =>
                      updateField(NEW_DIRECTORY_FIELD_NAMES.DIRECTORY)(e.target.value)
                    }
                  />
                  {errors[NEW_DIRECTORY_FIELD_NAMES.DIRECTORY] ? (
                    <FormErrorMessage>
                      {errors[NEW_DIRECTORY_FIELD_NAMES.DIRECTORY]}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              </FormControl>
            </form>
          </AlertDialogBody>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
