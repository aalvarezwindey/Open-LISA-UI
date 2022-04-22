import axios from '../axios';
import { URI } from './constants';

const getInstrumentById = async (id) => {
  const { data: instrument } = await axios.get(URI.INSTRUMENT_BY_ID.replace(':instrumentId', id));

  return instrument;
};

export default getInstrumentById;
