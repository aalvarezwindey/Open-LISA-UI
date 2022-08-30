import { useEffect } from 'react';
import { logger } from '../logger';
import checkServerConnection from '../services/instruments/checkServerConnection';
import { updateOpenLISAServerConnectionStatus } from '../state/actions/updateOpenLISAServerConnectionStatus';
import { useAppDispatch } from '../state/selectors/useAppDispatch';

export const useServerConnectionStatusUpdate = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checkConnection = async () => {
      try {
        await checkServerConnection();
        updateOpenLISAServerConnectionStatus(dispatch, true);
      } catch (err) {
        logger.error('[useServerConnectionStatusUpdate]', err);
        updateOpenLISAServerConnectionStatus(dispatch, false);
      }
    };
    checkConnection();
  }, [dispatch]);
};
