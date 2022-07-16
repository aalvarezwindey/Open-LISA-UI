import { ACTION_TYPE } from '../actionsType';
import { STATE_KEYS } from '../constants';

export const updateAppLanguage = (dispatch, language) => {
  sessionStorage.setItem(STATE_KEYS.LANGUAGE, language);
  dispatch({ type: ACTION_TYPE.UPDATE_LANGUAGE, payload: { [STATE_KEYS.LANGUAGE]: language } });
};
