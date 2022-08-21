import axios from '../axios';
import { URI } from './constants';

const createInstrumentCommand = async (instrumentId, commandPayload) => {
  return axios.post(
    URI.INSTRUMENT_NEW_COMMAND.replace(':instrumentId', instrumentId),
    commandPayload,
  );
};

export default createInstrumentCommand;
