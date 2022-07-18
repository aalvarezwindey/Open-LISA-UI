import { useCallback } from 'react';
import { useAppLanguage } from '../../state/selectors/useAppLanguage';
import format from '../../utils/string/format';
import { en } from '../messages/en';
import { es } from '../messages/es';

const messages = { es, en };

export const useFormatMessage = () => {
  const lng = useAppLanguage();

  return useCallback(
    (msgKey, ...params) => {
      const match = messages[lng][msgKey];
      return match ? format(match, ...params) : msgKey;
    },
    [lng],
  );
};
