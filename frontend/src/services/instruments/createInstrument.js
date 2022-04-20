import { DEFAULT_IMAGES, INSTRUMENT_FIELD_NAMES } from '../../domain/constants';
import { addMockInstrument } from '../../mock_data/instruments';

const promiseTimeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

const createInstrument = async (instrument) => {
  // TODO: make HTTP request
  await promiseTimeout(1000);
  addMockInstrument({
    ...instrument,
    image: DEFAULT_IMAGES[instrument[INSTRUMENT_FIELD_NAMES.IMAGE]].path,
  });
};

export default createInstrument;
