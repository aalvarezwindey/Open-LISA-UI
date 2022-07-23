import { ACTION_TYPE } from '../actionsType';
import { STATE_KEYS } from '../constants';

export const hideGlobalLoading = (dispatch) => {
  dispatch({
    type: ACTION_TYPE.UPDATE_GLOBAL_LOADING,
    payload: { [STATE_KEYS.GLOBAL_LOADING]: { isLoading: false } },
  });
};
