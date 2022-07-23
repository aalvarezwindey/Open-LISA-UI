import format from '../../utils/string/format';
import axios from '../axios';
import { URI } from './constants';

const deleteFile = async (filePath) => {
  return axios.delete(format(URI.DELETE_FILE, encodeURIComponent(filePath)));
};

export default deleteFile;
