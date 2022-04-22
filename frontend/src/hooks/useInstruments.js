import getInstruments from '../services/instruments/getInstruments';
import { useService } from './useService';

const useInstruments = (service = getInstruments) => useService(service);

export default useInstruments;
