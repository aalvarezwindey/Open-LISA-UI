import React from 'react';
import PropTypes from 'prop-types';
import { Box, HStack, Image, useRadio, useRadioGroup } from '@chakra-ui/react';

const ImageCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" ml={0}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          color: 'white',
          borderColor: 'teal.300',
          boxShadow: 'outline',
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

const MAX_WIDTH = 100;

function ImageSelector({ images, value, onChange, name }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: name,
    defaultValue: value,
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group} wrap="wrap">
      {images.map(({ key, path }) => {
        const radio = getRadioProps({ value: key });
        return (
          <ImageCard key={key} {...radio}>
            <Image src={path} alt={key} objectFit="contain" h={[100]} w={[MAX_WIDTH]} shadow="lg" />
          </ImageCard>
        );
      })}
    </HStack>
  );
}

ImageSelector.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ImageSelector;
