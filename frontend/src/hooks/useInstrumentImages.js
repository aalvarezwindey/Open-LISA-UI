import { useEffect, useState } from 'react';
import getInstrumentsImages from '../services/instruments/getInstrumentsImages';

const useInstrumentImages = (service = getInstrumentsImages) => {
  const [instrumentImages, setInstrumentImages] = useState([]);
  useEffect(() => {
    service().then(setInstrumentImages);
  }, [service]);

  return { instrumentImages };
};

export default useInstrumentImages;
