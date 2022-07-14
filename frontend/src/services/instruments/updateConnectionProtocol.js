import axios from '../axios';
import { URI } from './constants';

const updateConnectionProtocol = async (newProtocol) => {
  return axios.put(URI.CONNECTION_PROTOCOL, {
    protocol: newProtocol,
  });
};

export default updateConnectionProtocol;
