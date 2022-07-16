import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import { SUPPORTED_LANGUAGES } from '../../domain/constants';
import { updateAppLanguage } from '../../state/actions/updateAppLanguage';
import { useAppDispatch } from '../../state/selectors/useAppDispatch';
import { useAppLanguage } from '../../state/selectors/useAppLanguage';

const Flag = ({ src, alt, onClick }) => {
  return (
    <>
      <Box onClick={onClick} p="10px" zIndex={1} cursor="pointer">
        <Image src={src} alt={alt} w="36px" h="22px" border="1px solid black" />
      </Box>
    </>
  );
};
const ArgentinaFlag = (props) => <Flag src="images/ar.png" alt="ARG" {...props} />;
const UsaFlag = (props) => <Flag src="images/us.png" alt="ENG" {...props} />;

export default function LanguageSwitch() {
  const dispatch = useAppDispatch();
  const language = useAppLanguage();
  const toggleLanguage = () => {
    if (language === SUPPORTED_LANGUAGES.SPANISH) {
      updateAppLanguage(dispatch, SUPPORTED_LANGUAGES.ENGLISH);
    } else {
      updateAppLanguage(dispatch, SUPPORTED_LANGUAGES.SPANISH);
    }
  };

  return (
    <Box
      display="flex"
      borderRadius="30px"
      border="2px solid black"
      alignItems="center"
      p="3px"
      backgroundColor="gray.400"
      position="relative"
    >
      <Box
        position="absolute"
        borderRadius="30px"
        backgroundColor="whiteAlpha.700"
        p="10px"
        w="56px" // padding + width
        h="42px" // padding + height
        left={language === 'es' ? '3px' : '59px'}
        transition="left 0.1s linear"
      ></Box>
      <ArgentinaFlag onClick={toggleLanguage} />

      <UsaFlag onClick={toggleLanguage} />
    </Box>
  );
}
