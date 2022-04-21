import axios from '../axios';
import { URI } from './constants';

const createInstrument = async (instrument) => {
  await axios.post(URI.INSTRUMENTS, instrument);
};

export default createInstrument;
