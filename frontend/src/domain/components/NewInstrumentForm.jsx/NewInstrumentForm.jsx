import React from 'react';
import {
  Code,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { DEFAULT_IMAGES } from '../../constants';
import ImageSelector from './components/ImageSelector';

const detectedPhysicalAddresses = [
  'USB0::0x0699::0x0363::C107676::INSTR',
  'USB1::0x0699::0x1234::C107676::INSTR',
];

export default function NewInstrumentForm() {
  return (
    <form>
      <VStack spacing={6} align="start">
        <FormControl isRequired>
          <FormLabel htmlFor="brand">Marca</FormLabel>
          <Input type="text" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="model">Modelo</FormLabel>
          <Input type="text" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="physicalAddress">Dirección física</FormLabel>
          <Input type="text" readOnly placeholder="Seleccione una de las direcciones detectadas" />
        </FormControl>

        <FormControl as="fieldset">
          <FormLabel as="legend" htmlFor="detectedPhysicalAddresses">
            Instrumentos detectados
          </FormLabel>
          <RadioGroup>
            <VStack spacing={2} align="start">
              {detectedPhysicalAddresses.map((physicalAddress) => (
                <Radio key={physicalAddress} value={physicalAddress}>
                  <Code>{physicalAddress}</Code>
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="description">Descripción</FormLabel>
          <Textarea placeholder="Ingrese opcionalmente un detalle sobre el instrumento" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="image">Elija una imagen</FormLabel>
          <ImageSelector
            images={Object.keys(DEFAULT_IMAGES).map((key) => ({ ...DEFAULT_IMAGES[key], key }))}
          />
        </FormControl>
      </VStack>
    </form>
  );
}
