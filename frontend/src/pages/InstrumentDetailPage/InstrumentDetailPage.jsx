import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Progress, useBoolean, useDisclosure } from '@chakra-ui/react';
import BasicModal from '../../components/BasicModal/BasicModal';
import PageBody from '../../components/Layout/PageBody/PageBody';
import InstrumentForm, {
  InstrumentFormFileds,
} from '../../domain/components/InstrumentForm/InstrumentForm';
import { INSTRUMENT_FIELD_NAMES } from '../../domain/constants';
import useForm from '../../hooks/useForm';
import useInstrumentDetail from '../../hooks/useInstrumentDetail';
import { logger } from '../../logger';
import editInstrument from '../../services/instruments/editInstrument';
import InstrumentDetail from './components/InstrumentDetail';

export default function InstrumentDetailPage() {
  const { instrumentId } = useParams();
  const {
    isOpen: editModalIsOpen,
    onOpen: openEditModal,
    onClose: closeEditModal,
  } = useDisclosure();
  const {
    data: instrument,
    refetch: refetchInstrumentDetail,
    isLoading: isFetchingInstrumentDetail,
  } = useInstrumentDetail(instrumentId);
  const { isValid, reset, displayErrors, updateField, ...formProps } = useForm({
    fields: InstrumentFormFileds,
  });
  const [submittingEditInstrument, { on: submittingOn, off: submittingOff }] = useBoolean(false);

  const setFormWithCurrentInstrumentValues = useCallback(() => {
    if (instrument) {
      updateField(INSTRUMENT_FIELD_NAMES.BRAND)(instrument.brand);
      updateField(INSTRUMENT_FIELD_NAMES.MODEL)(instrument.model);
      updateField(INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS)(instrument.physicalAddress);
      updateField(INSTRUMENT_FIELD_NAMES.DESCRIPTION)(instrument.description);

      const imageUrlParts = instrument.image.split('/');
      const imageFileName = imageUrlParts[imageUrlParts.length - 1];
      updateField(INSTRUMENT_FIELD_NAMES.IMAGE)(imageFileName);
    }
  }, [updateField, instrument]);

  useEffect(() => {
    setFormWithCurrentInstrumentValues();
  }, [setFormWithCurrentInstrumentValues]);

  const handleEditInstrument = async () => {
    const { values: formValues } = formProps;
    if (!isValid) {
      displayErrors(formValues);
      return;
    }

    try {
      submittingOn();
      await editInstrument(instrumentId, formValues);
      await refetchInstrumentDetail();
      submittingOff();
      closeEditModal();
    } catch (err) {
      submittingOff();
      logger.error('[EDIT_INSTRUMENT]', err);
    }
  };

  const handleCloseEditModal = () => {
    setFormWithCurrentInstrumentValues();
    closeEditModal();
  };

  if (isFetchingInstrumentDetail) {
    return <Progress size="xs" isIndeterminate />;
  }

  return (
    <PageBody>
      <InstrumentDetail {...instrument} onEditInstrument={openEditModal} />
      <BasicModal
        title="Editar instrumento"
        onClose={handleCloseEditModal}
        isOpen={editModalIsOpen}
        primaryAction={{
          label: 'Confirmar',
          onAction: handleEditInstrument,
          loading: submittingEditInstrument,
        }}
        secondaryAction={{ label: 'Cancelar', onAction: handleCloseEditModal }}
      >
        <InstrumentForm {...formProps} updateField={updateField} />
      </BasicModal>
    </PageBody>
  );
}
