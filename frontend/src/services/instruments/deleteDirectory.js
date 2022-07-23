import format from '../../utils/string/format';
import axios from '../axios';
import { URI } from './constants';

const deleteDirectory = async (directoryPath) => {
  return axios.delete(format(URI.DELETE_DIRECTORY, encodeURIComponent(directoryPath)));
};

export default deleteDirectory;
