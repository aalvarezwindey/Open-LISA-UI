import { useCallback, useEffect, useState } from 'react';
import getInstruments from '../services/instruments/getInstruments';

const useInstruments = (service = getInstruments) => {
  const [instruments, setInstruments] = useState([]);
  const refetch = useCallback(async () => service().then(setInstruments), [service]);
  useEffect(() => {
    service().then(setInstruments);
  }, [service]);

  return { instruments, refetch };
};

export default useInstruments;
