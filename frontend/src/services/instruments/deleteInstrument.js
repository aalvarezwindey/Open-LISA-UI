import axios from '../axios';
import { URI } from './constants';

const deleteInstrument = async (instrumentId) => {
  await axios.delete(URI.INSTRUMENT_BY_ID.replace(':instrumentId', instrumentId));
};

export default deleteInstrument;
