import getConnectionProtocol from '../services/instruments/getConnectionProtocol';
import { useService } from './useService';

const useConnectionProtocol = (...rest) => useService(() => getConnectionProtocol(), ...rest);

export default useConnectionProtocol;
