import getInstrumentById from '../services/instruments/getInstrumentById';
import { useService } from './useService';

const useInstrumentDetail = (id, service = getInstrumentById, ...rest) =>
  useService(() => service(id), ...rest);

export default useInstrumentDetail;
