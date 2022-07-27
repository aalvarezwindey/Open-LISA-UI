import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';
import hasWhiteSpaces from '../../../../utils/string/hasWhiteSpaces';

export const commandNameValidator = (name, formatMessage) => {
  if (!name || hasWhiteSpaces(name))
    return formatMessage(MESSAGES_KEYS.COMMAND_FORM_NAME_FIELD_ERROR);
};
