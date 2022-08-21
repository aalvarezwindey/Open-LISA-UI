import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';
import hasWhiteSpaces from '../../../../utils/string/hasWhiteSpaces';

export const commandLibFileNameValidator = (libFileName, formatMessage) => {
  if (!libFileName || hasWhiteSpaces(libFileName))
    return formatMessage(MESSAGES_KEYS.COMMAND_FORM_LIB_FILE_NAME_FIELD_ERROR);
};
