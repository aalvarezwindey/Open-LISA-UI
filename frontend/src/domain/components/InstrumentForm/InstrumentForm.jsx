import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { InfoIcon } from '@chakra-ui/icons';
import {
  Code,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import useDetectedPhysicalAddresses from '../../../hooks/useDetectedPhysicalAddresses';
import useInstrumentImages from '../../../hooks/useInstrumentImages';
import { INSTRUMENT_FIELD_NAMES, INSTRUMENT_TYPES, NONE_IMAGE_FILE_NAME } from '../../constants';
import ImageSelector from './components/ImageSelector';
import { brandValidator } from './validators/brandValidator';
import { modelValidator } from './validators/modelValidator';

const OTHER_PHYSICAL_ADDRESS_VALUE = 'OTHER';
const OTHER_PHYSICAL_ADDRESS = {
  label: 'Otra',
  value: OTHER_PHYSICAL_ADDRESS_VALUE,
};

export const InstrumentFormFileds = [
  {
    name: INSTRUMENT_FIELD_NAMES.BRAND,
    getError: brandValidator,
  },
  {
    name: INSTRUMENT_FIELD_NAMES.MODEL,
    getError: modelValidator,
  },
  {
    name: INSTRUMENT_FIELD_NAMES.TYPE,
    defaultValue: INSTRUMENT_TYPES.SCPI,
  },
  {
    name: INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS,
  },
  {
    name: INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS,
  },
  {
    name: INSTRUMENT_FIELD_NAMES.DESCRIPTION,
  },
  {
    name: INSTRUMENT_FIELD_NAMES.IMAGE,
    defaultValue: NONE_IMAGE_FILE_NAME,
  },
];

export default function InstrumentForm({ updateField, values, errors }) {
  const { data: detectedPhysicalAddresses, isLoading: loadingDetectedPhysicalAddresses } =
    useDetectedPhysicalAddresses();
  const { data: instrumentImages, isLoading: loadingInstrumentImages } = useInstrumentImages();
  const physicalAddressInput = useRef(null);
  const disablePhysicalAddressField = values[INSTRUMENT_FIELD_NAMES.TYPE] !== INSTRUMENT_TYPES.SCPI;
  const currentPhysicalAddress = values[INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS];

  if (loadingDetectedPhysicalAddresses || loadingInstrumentImages || !detectedPhysicalAddresses)
    return null;

  return (
    <form>
      <VStack spacing={6} align="start">
        <FormControl isRequired isInvalid={Boolean(errors[INSTRUMENT_FIELD_NAMES.BRAND])}>
          <FormLabel htmlFor={INSTRUMENT_FIELD_NAMES.BRAND}>Marca</FormLabel>
          <Input
            type="text"
            value={values[INSTRUMENT_FIELD_NAMES.BRAND]}
            id={INSTRUMENT_FIELD_NAMES.BRAND}
            onChange={(e) => updateField(INSTRUMENT_FIELD_NAMES.BRAND)(e.target.value)}
          />
          {errors[INSTRUMENT_FIELD_NAMES.BRAND] ? (
            <FormErrorMessage>{errors[INSTRUMENT_FIELD_NAMES.BRAND]}</FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl isRequired isInvalid={Boolean(errors[INSTRUMENT_FIELD_NAMES.MODEL])}>
          <FormLabel htmlFor={INSTRUMENT_FIELD_NAMES.MODEL}>Modelo</FormLabel>
          <Input
            type="text"
            value={values[INSTRUMENT_FIELD_NAMES.MODEL]}
            id={INSTRUMENT_FIELD_NAMES.MODEL}
            onChange={(e) => updateField(INSTRUMENT_FIELD_NAMES.MODEL)(e.target.value)}
          />
          {errors[INSTRUMENT_FIELD_NAMES.MODEL] ? (
            <FormErrorMessage>{errors[INSTRUMENT_FIELD_NAMES.MODEL]}</FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl isRequired isInvalid={Boolean(errors[INSTRUMENT_FIELD_NAMES.TYPE])}>
          <FormLabel htmlFor={INSTRUMENT_FIELD_NAMES.TYPE}>Tipo</FormLabel>
          <Select onChange={(e) => updateField(INSTRUMENT_FIELD_NAMES.TYPE)(e.target.value)}>
            <option value={INSTRUMENT_TYPES.SCPI}>SCPI</option>
            <option value={INSTRUMENT_TYPES.CLIB}>Librerías C/C++</option>
          </Select>
        </FormControl>

        <FormControl
          as="fieldset"
          isInvalid={Boolean(errors[INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS])}
          disabled={disablePhysicalAddressField}
        >
          <FormLabel
            as="legend"
            htmlFor={INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS}
            _disabled={disablePhysicalAddressField}
          >
            Instrumentos detectados
          </FormLabel>
          <RadioGroup
            _disabled={disablePhysicalAddressField}
            value={values[INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS]}
            id={INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS}
            onChange={(value) => {
              updateField(INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS)(value);
              if (value !== OTHER_PHYSICAL_ADDRESS_VALUE) {
                updateField(INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS)(value);
              } else {
                updateField(INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS)('');
                physicalAddressInput.current.focus();
              }
            }}
          >
            <VStack spacing={2} align="start">
              {[...detectedPhysicalAddresses, OTHER_PHYSICAL_ADDRESS].map(
                (physicalAddress, index) => (
                  <Radio
                    key={physicalAddress.value}
                    value={physicalAddress.value}
                    _selected={physicalAddress.value === currentPhysicalAddress}
                  >
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
          <FormHelperText>
            {disablePhysicalAddressField ? (
              <>
                <InfoIcon /> La dirección física solo es necesaria para instrumentos que implementan
                el protocolo SCPI
              </>
            ) : (
              ''
            )}
          </FormHelperText>
        </FormControl>

        <FormControl
          isInvalid={Boolean(errors[INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS])}
          disabled={disablePhysicalAddressField}
        >
          <FormLabel
            _disabled={disablePhysicalAddressField}
            htmlFor={INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS}
          >
            Dirección física
          </FormLabel>
          <Input
            disabled={disablePhysicalAddressField}
            ref={physicalAddressInput}
            type="text"
            readOnly={
              values[INSTRUMENT_FIELD_NAMES.DETECTED_PHYSICAL_ADDRESS] !==
              OTHER_PHYSICAL_ADDRESS_VALUE
            }
            placeholder="Seleccione una de las direcciones detectadas"
            value={values[INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS]}
            id={INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS}
            onChange={(e) => updateField(INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS)(e.target.value)}
          />
        </FormControl>

        <FormControl isInvalid={Boolean(errors[INSTRUMENT_FIELD_NAMES.DESCRIPTION])}>
          <FormLabel htmlFor={INSTRUMENT_FIELD_NAMES.DESCRIPTION}>Descripción</FormLabel>
          <Textarea
            placeholder="Ingrese opcionalmente un detalle sobre el instrumento"
            value={values[INSTRUMENT_FIELD_NAMES.DESCRIPTION]}
            id={INSTRUMENT_FIELD_NAMES.DESCRIPTION}
            onChange={(e) => updateField(INSTRUMENT_FIELD_NAMES.DESCRIPTION)(e.target.value)}
          />
        </FormControl>

        <FormControl isInvalid={Boolean(errors[INSTRUMENT_FIELD_NAMES.IMAGE])}>
          <FormLabel htmlFor={INSTRUMENT_FIELD_NAMES.IMAGE}>Elija una imagen</FormLabel>
          <ImageSelector
            value={values[INSTRUMENT_FIELD_NAMES.IMAGE]}
            id={INSTRUMENT_FIELD_NAMES.IMAGE}
            onChange={(value) => updateField(INSTRUMENT_FIELD_NAMES.IMAGE)(value)}
            images={instrumentImages}
          />
        </FormControl>
      </VStack>
    </form>
  );
}

InstrumentForm.propTypes = {
  updateField: PropTypes.func.isRequired,
  values: PropTypes.shape(
    InstrumentFormFileds.reduce(
      (carry, field) => ({
        ...carry,
        [field.name]: PropTypes.string.isRequired,
      }),
      {},
    ),
  ),
  errors: PropTypes.shape(
    InstrumentFormFileds.reduce(
      (carry, field) => ({
        ...carry,
        [field.name]: PropTypes.string,
      }),
      {},
    ),
  ),
};
