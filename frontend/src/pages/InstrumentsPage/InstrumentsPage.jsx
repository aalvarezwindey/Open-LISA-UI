import React from 'react';
import { Progress, useBoolean, useDisclosure } from '@chakra-ui/react';
import BasicModal from '../../components/BasicModal/BasicModal';
import NewButton from '../../components/Buttons/NewButton/NewButton';
import PageBody from '../../components/Layout/PageBody/PageBody';
import InstrumentForm, {
  InstrumentFormFileds,
} from '../../domain/components/InstrumentForm/InstrumentForm';
import InstrumentsList from '../../domain/components/InstrumentsList/InstrumentsList';
import useForm from '../../hooks/useForm';
import useInstruments from '../../hooks/useInstruments';
import { logger } from '../../logger';
import createInstrument from '../../services/instruments/createInstrument';

export default function InstrumentsPage() {
  const { data: instruments, refetch, isLoading } = useInstruments();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submittingNewInstrument, { on: submittingOn, off: submittingOff }] = useBoolean(false);
  const { isValid, reset, displayErrors, ...formProps } = useForm({
    fields: InstrumentFormFileds,
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
      await refetch();
      submittingOff();
      reset();
      onClose();
    } catch (err) {
      submittingOff();
      logger.error('[CREATE_INSTRUMENT]', err);
    }
  };

  if (isLoading) {
    return <Progress size="xs" isIndeterminate />;
  }

  return (
    <PageBody>
      <InstrumentsList instruments={instruments || []} />
      <NewButton position="fixed" bottom={6} right={6} onClick={onOpen}>
        Nuevo instrumento
      </NewButton>
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
        <InstrumentForm {...formProps} />
      </BasicModal>
    </PageBody>
  );
}
