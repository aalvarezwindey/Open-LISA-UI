import { useCallback, useEffect, useState } from 'react';

export const useService = (service, ...serviceParams) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const refetch = useCallback(
    async () => service(serviceParams).then(setData),
    [service, serviceParams],
  );
  useEffect(() => {
    service(serviceParams)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, error, refetch };
};
