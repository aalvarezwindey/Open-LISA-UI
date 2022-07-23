import axios from '../axios';
import { URI } from './constants';

const createDirectory = async (directoryBasePath, newDirectoryName) => {
  return axios.post(URI.DIRECTORIES, {
    base_path: directoryBasePath,
    new_directory_name: newDirectoryName,
  });
};

export default createDirectory;
