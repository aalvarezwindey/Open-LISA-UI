import axios from '../axios';
import { URI } from './constants';

const uploadFile = async (filePayload) => {
  return axios.post(URI.FILES, filePayload);
};

export default uploadFile;
