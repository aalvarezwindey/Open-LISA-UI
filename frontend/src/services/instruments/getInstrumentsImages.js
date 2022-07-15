import axios from '../axios';
import { URI } from './constants';

const getInstrumentsImages = async () => {
  const { data } = await axios.get(URI.INSTRUMENTS_IMAGES);

  return data.map((image) => ({ ...image, fileName: image.file_name }));
};

export default getInstrumentsImages;
