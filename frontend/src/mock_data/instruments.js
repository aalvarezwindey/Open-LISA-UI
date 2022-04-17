import { DEFAULT_IMAGES } from '../domain/constants';

const instruments = [
  {
    id: 1,
    brand: 'Tektronix',
    model: 'TDS1002B',
    image: DEFAULT_IMAGES.OSCILLOSCOPE.path,
  },
  {
    id: 2,
    brand: 'PixelFly',
    model: 'QE',
    image: DEFAULT_IMAGES.CAMERA.path,
  },
  {
    id: 3,
    brand: 'Siglent',
    model: 'SDG6052X',
    image: DEFAULT_IMAGES.FUNCTIONS_GENERATOR.path,
  },
  {
    id: 4,
    brand: 'UNI-T',
    model: 'UT131-D',
    image: DEFAULT_IMAGES.MULTIMETER.path,
  },
  {
    id: 5,
    brand: 'LODESTAR',
    model: 'LP3001D',
    image: DEFAULT_IMAGES.POWER_SUPPLY.path,
  },
  {
    id: 6,
    brand: 'MC',
    model: '2442',
    image: DEFAULT_IMAGES.DAQ.path,
  },
];

export default instruments;
