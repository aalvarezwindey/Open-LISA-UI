import axios from '../axios';
import { URI } from './constants';

const getInstruments = async () => {
  const { data: instruments } = await axios.get(URI.INSTRUMENTS);

  return instruments;
};

export default getInstruments;
