import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Button, useBoolean, useDisclosure } from '@chakra-ui/react';
import BasicModal from '../../components/BasicModal/BasicModal';
import PageBody from '../../components/Layout/PageBody/PageBody';
import InstrumentsList from '../../domain/components/InstrumentsList/InstrumentsList';
import NewInstrumentForm, {
  NewInstrumentFormFileds,
} from '../../domain/components/NewInstrumentForm/NewInstrumentForm';
import useForm from '../../hooks/useForm';
import useInstruments from '../../hooks/useInstruments';
import { logger } from '../../logger';
import createInstrument from '../../services/instruments/createInstrument';

export default function InstrumentsPage() {
  const { instruments } = useInstruments();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submittingNewInstrument, { on: submittingOn, off: submittingOff }] = useBoolean(false);
  const { isValid, reset, displayErrors, ...formProps } = useForm({
    fields: NewInstrumentFormFileds,
  });

  const handleCreateInstrument = async () => {
    const { values: formValues } = formProps;
    if (!isValid) {
      displayErrors(formValues);
      return;
    }

    try {
      submittingOn();
      await createInstrument(formValues);
      submittingOff();
      reset();
      onClose();
    } catch (err) {
      logger.error('[CREATE_INSTRUMENT]', err);
    }
  };

  return (
    <PageBody>
      <InstrumentsList instruments={instruments} />
      <Button position="fixed" bottom={6} right={6} onClick={onOpen}>
        <AddIcon mr={4} />
        Nuevo instrumento
      </Button>
      <BasicModal
        title="Nuevo instrumento"
        onClose={onClose}
        isOpen={isOpen}
        primaryAction={{
          label: 'Crear instrumento',
          onAction: handleCreateInstrument,
          loading: submittingNewInstrument,
        }}
        secondaryAction={{ label: 'Cancelar', onAction: onClose }}
      >
        <NewInstrumentForm {...formProps} />
      </BasicModal>
    </PageBody>
  );
}
