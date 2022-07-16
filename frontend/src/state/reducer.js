import { ACTION_TYPE } from './actionsType';
import { INITIAL_STATE, STATE_KEYS } from './constants';

export const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPE.UPDATE_LANGUAGE: {
      return {
        ...state,
        [STATE_KEYS.LANGUAGE]: payload[STATE_KEYS.LANGUAGE],
      };
    }
    default:
      return state;
  }
};
