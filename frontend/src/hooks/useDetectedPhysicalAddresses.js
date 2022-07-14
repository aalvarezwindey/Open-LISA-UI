import getDetectedPhysicalAddresses from '../services/instruments/getDetectedPhysicalAddresses';
import { useService } from './useService';

const useDetectedPhysicalAddresses = (service = getDetectedPhysicalAddresses, ...rest) =>
  useService(service, ...rest);

export default useDetectedPhysicalAddresses;
