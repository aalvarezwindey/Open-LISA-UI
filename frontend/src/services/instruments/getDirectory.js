import format from '../../utils/string/format';
import axios from '../axios';
import { URI } from './constants';

const getDirectory = async (directory) => {
  const { data } = await axios.get(format(URI.GET_DIRECTORY, directory));
  return data;
};

export default getDirectory;
