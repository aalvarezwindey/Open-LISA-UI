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

function ImageSelector({ images, value, onChange, id }) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: id,
    defaultValue: value,
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group} wrap="wrap">
      {images.map(({ fileName, url }) => {
        const radio = getRadioProps({ value: fileName });
        return (
          <ImageCard key={fileName} {...radio}>
            <Image
              src={url}
              alt={fileName}
              objectFit="contain"
              h={[100]}
              w={[MAX_WIDTH]}
              shadow="lg"
            />
          </ImageCard>
        );
      })}
    </HStack>
  );
}

ImageSelector.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      fileName: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ImageSelector;
