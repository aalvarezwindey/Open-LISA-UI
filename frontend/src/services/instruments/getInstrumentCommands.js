import axios from '../axios';
import { URI } from './constants';

const getInstrumentCommands = async (id) => {
  const { data: commands } = await axios.get(URI.INSTRUMENT_COMMANDS.replace(':instrumentId', id));

  return commands;
};

export default getInstrumentCommands;
