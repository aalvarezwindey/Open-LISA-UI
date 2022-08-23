import axios from '../axios';
import { URI } from './constants';

const deleteInstrumentCommand = async (instrumentId, commandId) => {
  const url = URI.DELETE_INSTRUMENT_COMMAND.replace(':instrumentId', instrumentId).replace(
    ':commandId',
    commandId,
  );
  return axios.delete(url);
};

export default deleteInstrumentCommand;
