import { useEffect } from 'react';
import { hideGlobalLoading } from '../state/actions/hideGlobalLoading';
import { showGlobalLoading } from '../state/actions/showGlobalLoading';
import { useAppDispatch } from '../state/selectors/useAppDispatch';
import { useIsGlobalLoading } from '../state/selectors/useIsGlobalLoading';

export const useGlobalLoadingFeedback = (showLoader) => {
  const isLoading = useIsGlobalLoading();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (showLoader) {
      showGlobalLoading(dispatch);
    } else {
      hideGlobalLoading(dispatch);
    }

    return () => hideGlobalLoading(dispatch);
  }, [dispatch, showLoader]);

  return isLoading;
};
