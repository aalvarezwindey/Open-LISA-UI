import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import InstrumentsList from '../../components/InstrumentsList/InstrumentsList';
import PageBody from '../../components/Layout/PageBody/PageBody';
import useInstruments from '../../hooks/useInstruments';

export default function InstrumentsPage() {
  const { instruments } = useInstruments();
  return (
    <PageBody>
      <InstrumentsList instruments={instruments} />
      <Button position="fixed" bottom={6} right={6}>
        <AddIcon mr={4} />
        Nuevo instrumento
      </Button>
    </PageBody>
  );
}
