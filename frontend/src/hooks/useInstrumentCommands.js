import getInstrumentCommands from '../services/instruments/getInstrumentCommands';
import { useService } from './useService';

const useInstrumentCommands = (id, service = getInstrumentCommands) => useService(service, id);

export default useInstrumentCommands;
