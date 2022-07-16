import { SUPPORTED_LANGUAGES } from '../domain/constants';

export const STATE_KEYS = {
  LANGUAGE: 'language',
};

export const INITIAL_STATE = {
  [STATE_KEYS.LANGUAGE]: sessionStorage.getItem(STATE_KEYS.LANGUAGE) || SUPPORTED_LANGUAGES.ENGLISH,
};
