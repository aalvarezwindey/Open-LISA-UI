import { STATE_KEYS } from '../constants';
import { useAppState } from './useAppState';

export const useIsGlobalLoading = () => {
  const state = useAppState();

  return state[STATE_KEYS.GLOBAL_LOADING].isLoading;
};
