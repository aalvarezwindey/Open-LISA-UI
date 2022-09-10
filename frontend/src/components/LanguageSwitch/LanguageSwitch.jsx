import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { SUPPORTED_LANGUAGES } from '../../domain/constants';
import { updateAppLanguage } from '../../state/actions/updateAppLanguage';
import { useAppDispatch } from '../../state/selectors/useAppDispatch';
import { useAppLanguage } from '../../state/selectors/useAppLanguage';

const LanguageText = ({ children, onClick, selected }) => (
  <Box onClick={onClick} p="10px" zIndex={1} cursor="pointer" textAlign="center">
    <Text
      fontWeight="bold"
      fontSize="large"
      letterSpacing="wider"
      w="36px"
      h="100%"
      d="flex"
      flexDir="column"
      alignItems="center"
      onClick={onClick}
      color={selected ? 'black' : 'white'}
    >
      {children}
    </Text>
  </Box>
);

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
      <LanguageText selected={language === 'es'} onClick={toggleLanguage}>
        ES
      </LanguageText>
      <LanguageText selected={language === 'en'} onClick={toggleLanguage}>
        EN
      </LanguageText>
    </Box>
  );
}
