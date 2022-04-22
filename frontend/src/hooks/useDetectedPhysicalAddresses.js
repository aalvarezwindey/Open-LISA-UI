import getDetectedPhysicalAddresses from '../services/instruments/getDetectedPhysicalAddresses';
import { useService } from './useService';

const useDetectedPhysicalAddresses = (service = getDetectedPhysicalAddresses) =>
  useService(service);

export default useDetectedPhysicalAddresses;
