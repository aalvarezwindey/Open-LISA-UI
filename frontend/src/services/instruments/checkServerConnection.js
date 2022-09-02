import axios from '../axios';
import { URI } from './constants';

const checkServerConnection = async (protocolConfigurations = {}, resetConnection = false) => {
  return axios.post(
    `${URI.CHECK_SERVER_CONNECTION}?update=${resetConnection}`,
    protocolConfigurations,
  );
};

export default checkServerConnection;
