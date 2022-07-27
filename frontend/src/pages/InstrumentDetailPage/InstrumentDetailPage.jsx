import React, { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoolean, useDisclosure } from '@chakra-ui/react';
import BasicModal from '../../components/BasicModal/BasicModal';
import DestructiveDialog from '../../components/DestructiveDialog/DestructiveDialog';
import PageBody from '../../components/Layout/PageBody/PageBody';
import InstrumentForm, {
  InstrumentFormFileds,
} from '../../domain/components/InstrumentForm/InstrumentForm';
import { INSTRUMENT_FIELD_NAMES } from '../../domain/constants';
import useForm from '../../hooks/useForm';
import { useGlobalLoadingFeedback } from '../../hooks/useGlobalLoadingFeedback';
import useInstrumentDetail from '../../hooks/useInstrumentDetail';
import { useFormatMessage } from '../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../i18n/messages/keys';
import { logger } from '../../logger';
import { ROUTES } from '../../routing/routes';
import deleteInstrument from '../../services/instruments/deleteInstrument';
import editInstrument from '../../services/instruments/editInstrument';
import { objectKeysCamelCaseToUnderscore } from '../../utils/object/camelCaseToUnderscore';
import InstrumentCommands from './components/InstrumentCommands/InstrumentCommands';
import InstrumentDetail from './components/InstrumentDetail';

export default function InstrumentDetailPage() {
  const formatMessage = useFormatMessage();
  const navigate = useNavigate();
  const { instrumentId } = useParams();
  const {
    isOpen: deleteDialogIsOpen,
    onOpen: openDeleteDialog,
    onClose: closeDeleteDialog,
  } = useDisclosure();
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
  const showLoadingFeedback = useGlobalLoadingFeedback(isFetchingInstrumentDetail);
  const { isValid, reset, displayErrors, updateField, ...formProps } = useForm({
    fields: InstrumentFormFileds,
  });
  const [submittingEditInstrument, { on: submittingOn, off: submittingOff }] = useBoolean(false);
  const [deletingInstrument, { on: deletingOn, off: deletingOff }] = useBoolean(false);

  const setFormWithCurrentInstrumentValues = useCallback(() => {
    if (instrument) {
      updateField(INSTRUMENT_FIELD_NAMES.BRAND)(instrument.brand);
      updateField(INSTRUMENT_FIELD_NAMES.MODEL)(instrument.model);
      updateField(INSTRUMENT_FIELD_NAMES.PHYSICAL_ADDRESS)(instrument.physical_address);
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
      const formValuesSnaked = objectKeysCamelCaseToUnderscore(formValues);
      delete formValuesSnaked['detected_physical_address'];
      await editInstrument(instrumentId, formValuesSnaked);
      await refetchInstrumentDetail();
      submittingOff();
      closeEditModal();
    } catch (err) {
      submittingOff();
      logger.error('[EDIT_INSTRUMENT]', err);
    }
  };

  const handleDeleteInstrument = async () => {
    try {
      deletingOn();
      await deleteInstrument(instrumentId);
      deletingOff();
      closeDeleteDialog();
      navigate(ROUTES.INSTRUMENTS);
    } catch (err) {
      deletingOff();
      logger.error('[DELETE_INSTRUMENT]', err);
    }
  };

  const handleCloseEditModal = () => {
    setFormWithCurrentInstrumentValues();
    closeEditModal();
  };

  if (showLoadingFeedback || !instrument) {
    return null;
  }

  return (
    <PageBody>
      <InstrumentDetail
        {...instrument}
        onEditInstrument={openEditModal}
        onDeleteInstrument={openDeleteDialog}
      />
      <InstrumentCommands instrumentId={instrumentId} />
      <BasicModal
        title={formatMessage(MESSAGES_KEYS.INSTRUMENT_FORM_EDIT_TITLE)}
        onClose={handleCloseEditModal}
        isOpen={editModalIsOpen}
        primaryAction={{
          label: formatMessage(MESSAGES_KEYS.INSTRUMENT_FORM_EDIT_CONFIRM_LABEL),
          onAction: handleEditInstrument,
          loading: submittingEditInstrument,
        }}
        secondaryAction={{
          label: formatMessage(MESSAGES_KEYS.INSTRUMENT_FORM_EDIT_CANCEL_LABEL),
          onAction: handleCloseEditModal,
        }}
      >
        <InstrumentForm {...formProps} updateField={updateField} />
      </BasicModal>
      <DestructiveDialog
        isOpen={deleteDialogIsOpen}
        title={formatMessage(MESSAGES_KEYS.INSTRUMENT_DETAIL_DELETE_INSTRUMENT_MODAL_TITLE)}
        description={formatMessage(
          MESSAGES_KEYS.INSTRUMENT_DETAIL_DELETE_INSTRUMENT_MODAL_DESCRIPTION,
          `${instrument?.brand} - ${instrument?.model}`,
        )}
        onCancel={closeDeleteDialog}
        onDelete={handleDeleteInstrument}
        loading={deletingInstrument}
      />
    </PageBody>
  );
}
