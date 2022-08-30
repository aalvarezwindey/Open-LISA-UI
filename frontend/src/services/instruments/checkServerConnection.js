import axios from '../axios';
import { URI } from './constants';

const checkServerConnection = async (protocolConfigurations = {}) => {
  return axios.post(URI.CHECK_SERVER_CONNECTION, protocolConfigurations);
};

export default checkServerConnection;
