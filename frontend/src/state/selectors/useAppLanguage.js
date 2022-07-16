import { STATE_KEYS } from '../constants';
import { useAppState } from './useAppState';

export const useAppLanguage = () => {
  const state = useAppState();

  return state[STATE_KEYS.LANGUAGE];
};
