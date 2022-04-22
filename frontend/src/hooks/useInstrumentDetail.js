import getInstrumentById from '../services/instruments/getInstrumentById';
import { useService } from './useService';

const useInstrumentDetail = (id, service = getInstrumentById) => useService(service, id);

export default useInstrumentDetail;
