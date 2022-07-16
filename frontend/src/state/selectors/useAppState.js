import { useContext } from 'react';
import { AppContext } from '../provider';

export const useAppState = () => {
  const [state] = useContext(AppContext);
  return state;
};
