import axios from '../axios';
import { URI } from './constants';

const getDetectedPhysicalAddresses = async () => {
  const { data } = await axios.get(URI.DETECTED_PHYSICAL_ADDRESSES);

  return data;
};

export default getDetectedPhysicalAddresses;
