import getInstrumentsImages from '../services/instruments/getInstrumentsImages';
import { useService } from './useService';

const useInstrumentImages = (service = getInstrumentsImages, ...rest) =>
  useService(service, ...rest);

export default useInstrumentImages;
