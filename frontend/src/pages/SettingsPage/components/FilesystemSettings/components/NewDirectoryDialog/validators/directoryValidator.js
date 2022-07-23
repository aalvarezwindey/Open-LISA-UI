import { MESSAGES_KEYS } from '../../../../../../../i18n/messages/keys';

export const directoryValidator = (directory, formatMessage) => {
  const invalidCharacters = ['.', '..', '/', '<', '>', ':', '"', '/', '\\', '|', '?', '*', "'"];
  const containsInvalidCharacters = invalidCharacters.some((invalidCharacter) =>
    directory.includes(invalidCharacter),
  );
  if (containsInvalidCharacters)
    return formatMessage(
      MESSAGES_KEYS.SETTINGS_FILESYSTEM_NEW_DIRECTORY_ERROR,
      invalidCharacters.join(', '),
    );
};
