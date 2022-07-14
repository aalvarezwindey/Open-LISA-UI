import axios from '../axios';
import { URI } from './constants';

const getConnectionProtocol = async () => {
  const { data } = await axios.get(URI.CONNECTION_PROTOCOL);

  return data;
};

export default getConnectionProtocol;
