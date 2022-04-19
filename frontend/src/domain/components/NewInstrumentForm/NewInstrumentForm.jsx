import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Code,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import useDetectedPhysicalAddresses from '../../../hooks/useDetectedPhysicalAddresses';
import { DEFAULT_IMAGES } from '../../constants';
import ImageSelector from './components/ImageSelector';
import { brandValidator } from './validators/brandValidator';
import { modelValidator } from './validators/modelValidator';

const INPUT_NAMES = {
  BRAND: 'brand',
  MODEL: 'model',
  PHYSICAL_ADDRESS: 'physical-address',
  DETECTED_PHYSICAL_ADDRESS: 'detected-physical-address',
  DESCRIPTION: 'description',
  IMAGE: 'instrument-image',
};

const OTHER_PHYSICAL_ADDRESS_VALUE = 'OTHER';
const OTHER_PHYSICAL_ADDRESS = {
  label: 'Otra',
  value: OTHER_PHYSICAL_ADDRESS_VALUE,
};

export const NewInstrumentFormFileds = [
  {
    name: INPUT_NAMES.BRAND,
    getError: brandValidator,
  },
  {
    name: INPUT_NAMES.MODEL,
    getError: modelValidator,
  },
  {
    name: INPUT_NAMES.PHYSICAL_ADDRESS,
  },
  {
    name: INPUT_NAMES.DETECTED_PHYSICAL_ADDRESS,
  },
  {
    name: INPUT_NAMES.DESCRIPTION,
  },
  {
    name: INPUT_NAMES.IMAGE,
    defaultValue: 'NONE',
  },
];

export default function NewInstrumentForm({ updateField, values, errors }) {
  const { detectedPhysicalAddresses } = useDetectedPhysicalAddresses();
  const physicalAddressInput = useRef(null);
  return (
    <form>
      <VStack spacing={6} align="start">
        <FormControl isRequired isInvalid={Boolean(errors[INPUT_NAMES.BRAND])}>
          <FormLabel htmlFor={INPUT_NAMES.BRAND}>Marca</FormLabel>
          <Input
            type="text"
            value={values[INPUT_NAMES.BRAND]}
            name={INPUT_NAMES.BRAND}
            onChange={(e) => updateField(INPUT_NAMES.BRAND)(e.target.value)}
          />
          {errors[INPUT_NAMES.BRAND] ? (
            <FormErrorMessage>{errors[INPUT_NAMES.BRAND]}</FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl isRequired isInvalid={Boolean(errors[INPUT_NAMES.MODEL])}>
          <FormLabel htmlFor={INPUT_NAMES.MODEL}>Modelo</FormLabel>
          <Input
            type="text"
            value={values[INPUT_NAMES.MODEL]}
            name={INPUT_NAMES.MODEL}
            onChange={(e) => updateField(INPUT_NAMES.MODEL)(e.target.value)}
          />
          {errors[INPUT_NAMES.MODEL] ? (
            <FormErrorMessage>{errors[INPUT_NAMES.MODEL]}</FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl
          as="fieldset"
          isInvalid={Boolean(errors[INPUT_NAMES.DETECTED_PHYSICAL_ADDRESS])}
        >
          <FormLabel as="legend" htmlFor={INPUT_NAMES.DETECTED_PHYSICAL_ADDRESS}>
            Instrumentos detectados
          </FormLabel>
          <RadioGroup
            value={values[INPUT_NAMES.DETECTED_PHYSICAL_ADDRESS]}
            name={INPUT_NAMES.DETECTED_PHYSICAL_ADDRESS}
            onChange={(value) => {
              updateField(INPUT_NAMES.DETECTED_PHYSICAL_ADDRESS)(value);
              if (value !== OTHER_PHYSICAL_ADDRESS_VALUE) {
                updateField(INPUT_NAMES.PHYSICAL_ADDRESS)(value);
              } else {
                updateField(INPUT_NAMES.PHYSICAL_ADDRESS)('');
                physicalAddressInput.current.focus();
              }
            }}
          >
            <VStack spacing={2} align="start">
              {[...detectedPhysicalAddresses, OTHER_PHYSICAL_ADDRESS].map(
                (physicalAddress, index) => (
                  <Radio key={physicalAddress.value} value={physicalAddress.value}>
                    {index === detectedPhysicalAddresses.length ? (
                      physicalAddress.label
                    ) : (
                      <Code>{physicalAddress.label}</Code>
                    )}
                  </Radio>
                ),
              )}
            </VStack>
          </RadioGroup>
        </FormControl>

        <FormControl isInvalid={Boolean(errors[INPUT_NAMES.PHYSICAL_ADDRESS])}>
          <FormLabel htmlFor={INPUT_NAMES.PHYSICAL_ADDRESS}>Dirección física</FormLabel>
          <Input
            ref={physicalAddressInput}
            type="text"
            readOnly={
              values[INPUT_NAMES.DETECTED_PHYSICAL_ADDRESS] !== OTHER_PHYSICAL_ADDRESS_VALUE
            }
            placeholder="Seleccione una de las direcciones detectadas"
            value={values[INPUT_NAMES.PHYSICAL_ADDRESS]}
            name={INPUT_NAMES.PHYSICAL_ADDRESS}
          />
        </FormControl>

        <FormControl isInvalid={Boolean(errors[INPUT_NAMES.DESCRIPTION])}>
          <FormLabel htmlFor={INPUT_NAMES.DESCRIPTION}>Descripción</FormLabel>
          <Textarea
            placeholder="Ingrese opcionalmente un detalle sobre el instrumento"
            value={values[INPUT_NAMES.DESCRIPTION]}
            name={INPUT_NAMES.DESCRIPTION}
            onChange={(e) => updateField(INPUT_NAMES.DESCRIPTION)(e.target.value)}
          />
        </FormControl>

        <FormControl isInvalid={Boolean(errors[INPUT_NAMES.IMAGE])}>
          <FormLabel htmlFor={INPUT_NAMES.IMAGE}>Elija una imagen</FormLabel>
          <ImageSelector
            value={values[INPUT_NAMES.IMAGE]}
            name={INPUT_NAMES.IMAGE}
            onChange={(value) => updateField(INPUT_NAMES.IMAGE)(value)}
            images={Object.keys(DEFAULT_IMAGES).map((key) => ({ ...DEFAULT_IMAGES[key], key }))}
          />
        </FormControl>
      </VStack>
    </form>
  );
}

NewInstrumentForm.propTypes = {
  updateField: PropTypes.func.isRequired,
  values: PropTypes.shape(
    NewInstrumentFormFileds.reduce(
      (carry, field) => ({
        ...carry,
        [field.name]: PropTypes.string.isRequired,
      }),
      {},
    ),
  ),
  errors: PropTypes.shape(
    NewInstrumentFormFileds.reduce(
      (carry, field) => ({
        ...carry,
        [field.name]: PropTypes.string,
      }),
      {},
    ),
  ),
};
