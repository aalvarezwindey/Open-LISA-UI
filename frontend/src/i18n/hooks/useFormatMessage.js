import { useAppLanguage } from '../../state/selectors/useAppLanguage';
import format from '../../utils/string/format';
import { en } from '../messages/en';
import { es } from '../messages/es';

export const useFormatMessage = () => {
  const lng = useAppLanguage();
  const messages = { es, en };

  return (msgKey, ...params) => {
    const match = messages[lng][msgKey];
    return match ? format(match, ...params) : msgKey;
  };
};
