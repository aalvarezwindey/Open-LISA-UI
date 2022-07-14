import axios from '../axios';
import { URI } from './constants';

const checkServerConnection = async () => {
  return axios.post(URI.CHECK_SERVER_CONNECTION);
};

export default checkServerConnection;
