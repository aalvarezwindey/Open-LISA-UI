import React, { useRef } from 'react';
import { Input } from '@chakra-ui/react';
import { useFormatMessage } from '../../../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../../../i18n/messages/keys';
import FilesystemActionIcon from '../FilesystemActionIcon/FilesystemActionIcon';

const KB = 1024;
const MB = KB * 1024;
const GB = MB * 1024;

function formatFileSize(number) {
  if (number < KB) {
    return number + ' bytes';
  } else if (number >= KB && number < MB) {
    return (number / KB).toFixed(1) + ' KB';
  } else if (number >= MB && number < GB) {
    return (number / MB).toFixed(1) + ' MB';
  } else if (number >= GB) {
    return (number / GB).toFixed(1) + ' GB';
  }
}

export default function UploadFileIcon({ onSelectedFile }) {
  const formatMessage = useFormatMessage();
  const fileInputRef = useRef();
  return (
    <>
      <FilesystemActionIcon
        src="/icons/new_file.png"
        alt="upload file"
        tooltip={formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_TOOLTIP_UPLOAD_FILE)}
        onClick={() => fileInputRef?.current?.click()}
      />
      <Input
        d="none"
        ref={fileInputRef}
        type="file"
        onChange={(e) => {
          const file = e?.target?.files[0];
          onSelectedFile(file, file.name, formatFileSize(file.size));
        }}
      />
    </>
  );
}
