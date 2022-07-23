import getDirectory from '../services/instruments/getDirectory';
import { useService } from './useService';

const useDirectoryStructure = (directory, service = getDirectory, ...rest) =>
  useService(() => service(directory), ...rest);

export default useDirectoryStructure;
