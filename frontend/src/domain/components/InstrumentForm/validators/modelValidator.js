import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';

export const modelValidator = (model, formatMessage) => {
  if (!model) return formatMessage(MESSAGES_KEYS.INSTRUMENT_FORM_EMPTY_MODEL_ERROR);
};
