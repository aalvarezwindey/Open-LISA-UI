import axios from '../axios';
import { URI } from './constants';

const editInstrument = async (instrumentId, instrumentPayload) => {
  return axios.put(URI.INSTRUMENT_BY_ID.replace(':instrumentId', instrumentId), instrumentPayload);
};

export default editInstrument;
