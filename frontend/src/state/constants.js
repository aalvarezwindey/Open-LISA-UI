import { SUPPORTED_LANGUAGES } from '../domain/constants';

export const STATE_KEYS = {
  LANGUAGE: 'language',
  GLOBAL_LOADING: 'globalLoading',
  OPEN_LISA_SERVER_ONLINE: 'openLISAServerOnline',
};

export const INITIAL_STATE = {
  [STATE_KEYS.LANGUAGE]: sessionStorage.getItem(STATE_KEYS.LANGUAGE) || SUPPORTED_LANGUAGES.ENGLISH,
  [STATE_KEYS.OPEN_LISA_SERVER_ONLINE]: null,
  [STATE_KEYS.GLOBAL_LOADING]: {
    isLoading: false,
  },
};
