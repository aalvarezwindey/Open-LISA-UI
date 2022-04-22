import getInstrumentsImages from '../services/instruments/getInstrumentsImages';
import { useService } from './useService';

const useInstrumentImages = (service = getInstrumentsImages) => useService(service);

export default useInstrumentImages;
