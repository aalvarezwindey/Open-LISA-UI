import { useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

const NOTIFICATION_DURATION = 9000;

export default function useNotifier() {
  const toast = useToast();
  const notify = useCallback(
    (title, description, status) =>
      toast({
        title,
        description,
        status,
        isClosable: true,
        duration: NOTIFICATION_DURATION,
      }),
    [toast],
  );
  const notifySuccess = useCallback(
    (title, description) => notify(title, description, 'success'),
    [notify],
  );
  const notifyError = useCallback(
    (title, description) => notify(title, description, 'error'),
    [notify],
  );
  const notifyWarning = useCallback(
    (title, description) => notify(title, description, 'warning'),
    [notify],
  );
  const notifyInfo = useCallback(
    (title, description) => notify(title, description, 'info'),
    [notify],
  );

  return {
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
  };
}
