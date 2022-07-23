import { useCallback, useEffect, useState } from 'react';

export const useService = (serviceCall, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    setIsLoading(true);
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
  }, [serviceCall, options]);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, error, refetch: fetchData };
};
