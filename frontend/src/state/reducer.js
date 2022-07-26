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
    case ACTION_TYPE.UPDATE_GLOBAL_LOADING: {
      return {
        ...state,
        [STATE_KEYS.GLOBAL_LOADING]: payload[STATE_KEYS.GLOBAL_LOADING],
      };
    }
    case ACTION_TYPE.UPDATE_OPEN_LISA_SERVER_CONNECTION_STATUS: {
      return {
        ...state,
        [STATE_KEYS.OPEN_LISA_SERVER_ONLINE]: payload.isOnline,
      };
    }
    default:
      return state;
  }
};
