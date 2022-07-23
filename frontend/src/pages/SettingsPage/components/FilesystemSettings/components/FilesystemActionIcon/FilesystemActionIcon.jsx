import React from 'react';
import { Image, Tooltip } from '@chakra-ui/react';

export default function FilesystemActionIcon({ src, alt, tooltip, ...rest }) {
  return (
    <Tooltip label={tooltip}>
      <Image src={src} alt={alt} w={6} h={6} {...rest} />
    </Tooltip>
  );
}
