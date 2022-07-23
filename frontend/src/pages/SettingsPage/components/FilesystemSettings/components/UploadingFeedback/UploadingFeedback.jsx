import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Spinner,
} from '@chakra-ui/react';

export default function UploadingFeedback({ uploading, uploadingText }) {
  return (
    <AlertDialog isOpen={uploading} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {uploadingText}
          </AlertDialogHeader>

          <AlertDialogBody textAlign="center">
            <Spinner size="xl" />
          </AlertDialogBody>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
