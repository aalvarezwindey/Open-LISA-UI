import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import FilesystemExplorer from '../../../../../../components/FilesystemExplorer/FilesystemExplorer';
import useDirectoryStructure from '../../../../../../hooks/useDirectoryStructure';
import { useFormatMessage } from '../../../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../../../i18n/messages/keys';
import { FILESYSTEM_SUPPORTED_DIRECTORIES } from '../../../../../constants';

function CommandLibFileNameInput({ name, value, onChange, error }) {
  const formatMessage = useFormatMessage();
  const {
    data: clibsDir,
    isLoading: clibsDirLoading,
    error: clibsDirError,
  } = useDirectoryStructure(FILESYSTEM_SUPPORTED_DIRECTORIES.CLIBS);

  if (clibsDirLoading) return null;

  const directories = [
    { name: FILESYSTEM_SUPPORTED_DIRECTORIES.CLIBS, type: 'directory', children: clibsDir },
  ];
  return (
    <FormControl isRequired isInvalid={Boolean(error)}>
      <FormLabel htmlFor={name}>
        {formatMessage(MESSAGES_KEYS.COMMAND_FORM_LIB_FILE_NAME_FIELD_LABEL)}
      </FormLabel>
      {clibsDirError ? (
        <Input type="text" value={value} id={name} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <FilesystemExplorer
          selected={value}
          directoryTree={directories}
          initiallyOpen={true}
          onFileSelected={(value) => {
            onChange(value);
          }}
        />
      )}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}

CommandLibFileNameInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default CommandLibFileNameInput;
