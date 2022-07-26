import { STATE_KEYS } from '../constants';
import { useAppState } from './useAppState';

export const useIsOpenLISAServerOnline = () => {
  const state = useAppState();

  return state[STATE_KEYS.OPEN_LISA_SERVER_ONLINE];
};
