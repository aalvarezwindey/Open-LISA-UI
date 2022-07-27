import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';

export const commandInvocationValidator = (invocation, formatMessage) => {
  if (!invocation) return formatMessage(MESSAGES_KEYS.COMMAND_FORM_INVOCATION_FIELD_ERROR);
};
