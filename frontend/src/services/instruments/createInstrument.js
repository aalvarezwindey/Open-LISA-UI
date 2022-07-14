import axios from '../axios';
import { URI } from './constants';

const createInstrument = async (instrument) => {
  return axios.post(URI.INSTRUMENTS, instrument);
};

export default createInstrument;
