import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';

export const brandValidator = (brand, formatMessage) => {
  if (!brand) return formatMessage(MESSAGES_KEYS.INSTRUMENT_FORM_EMPTY_BRAND_ERROR);
};
