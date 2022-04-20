import { useEffect, useState } from 'react';
import getDetectedPhysicalAddresses from '../services/instruments/getDetectedPhysicalAddresses';

const useDetectedPhysicalAddresses = (service = getDetectedPhysicalAddresses) => {
  const [detectedPhysicalAddresses, setDetectedPhysicalAddresses] = useState([]);
  useEffect(() => {
    service().then(setDetectedPhysicalAddresses);
  }, [service]);

  return { detectedPhysicalAddresses };
};

export default useDetectedPhysicalAddresses;
