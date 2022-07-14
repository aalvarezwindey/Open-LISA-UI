import { useCallback, useEffect, useState } from 'react';

export const useService = (serviceCall, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const refetch = useCallback(async () => serviceCall().then(setData), [serviceCall]);
  useEffect(() => {
    serviceCall()
      .then((data) => {
        setData(data);
        if (options.onFetch) options.onFetch(data);
      })
      .catch((err) => {
        setError(err);
        if (options.onError) options.onError(err);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, error, refetch };
};
