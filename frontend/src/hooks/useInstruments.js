import getInstruments from '../services/instruments/getInstruments';
import { useService } from './useService';

const useInstruments = (service = getInstruments, ...rest) => useService(service, ...rest);

export default useInstruments;
