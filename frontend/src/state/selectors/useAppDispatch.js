import { useContext } from 'react';
import { AppContext } from '../provider';

export const useAppDispatch = () => {
  const [, dispatch] = useContext(AppContext);
  return dispatch;
};
