import getInstrumentCommands from '../services/instruments/getInstrumentCommands';
import { useService } from './useService';

const useInstrumentCommands = (id, service = getInstrumentCommands, ...rest) =>
  useService(() => service(id), ...rest);

export default useInstrumentCommands;
