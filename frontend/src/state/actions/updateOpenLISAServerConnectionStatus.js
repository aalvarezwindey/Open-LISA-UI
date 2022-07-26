import { ACTION_TYPE } from '../actionsType';

export const updateOpenLISAServerConnectionStatus = (dispatch, isOnline) => {
  dispatch({ type: ACTION_TYPE.UPDATE_OPEN_LISA_SERVER_CONNECTION_STATUS, payload: { isOnline } });
};
