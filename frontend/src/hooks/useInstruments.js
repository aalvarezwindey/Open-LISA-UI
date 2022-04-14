import { useEffect, useState } from 'react';
import getInstruments from '../services/instruments/getInstruments';

const useInstruments = (service = getInstruments) => {
  const [instruments, setInstruments] = useState([]);
  useEffect(() => {
    service().then(setInstruments);
  }, [service]);

  return { instruments };
};

export default useInstruments;
