import React from 'react';
import { useBoolean, useDisclosure } from '@chakra-ui/react';
import BasicModal from '../../components/BasicModal/BasicModal';
import NewButton from '../../components/Buttons/NewButton/NewButton';
import PageBody from '../../components/Layout/PageBody/PageBody';
import InstrumentForm, {
  InstrumentFormFileds,
} from '../../domain/components/InstrumentForm/InstrumentForm';
import InstrumentsList from '../../domain/components/InstrumentsList/InstrumentsList';
import useForm from '../../hooks/useForm';
import { useGlobalLoadingFeedback } from '../../hooks/useGlobalLoadingFeedback';
import useInstruments from '../../hooks/useInstruments';
import useNotifier from '../../hooks/useNotifier';
import { useFormatMessage } from '../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../i18n/messages/keys';
import { logger } from '../../logger';
import createInstrument from '../../services/instruments/createInstrument';
import { objectKeysCamelCaseToUnderscore } from '../../utils/object/camelCaseToUnderscore';
import NoInstruments from './components/NoInstruments';

export default function InstrumentsPage() {
  const { data: instruments, refetch, isLoading } = useInstruments();
  const showLoadingFeedback = useGlobalLoadingFeedback(isLoading);
  const formatMessage = useFormatMessage();
  const { notifyError } = useNotifier();
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
      const formValuesSnaked = objectKeysCamelCaseToUnderscore(formValues);
      delete formValuesSnaked['detected_physical_address'];
      await createInstrument(formValuesSnaked);
      await refetch();
      submittingOff();
      reset();
      onClose();
    } catch (err) {
      submittingOff();
      notifyError(
        MESSAGES_KEYS.INSTRUMENT_FORM_CREATION_ERROR_TITLE,
        MESSAGES_KEYS.INSTRUMENT_FORM_CREATION_ERROR_DESCRIPTION,
      );
      logger.error('[CREATE_INSTRUMENT]', err);
    }
  };

  if (showLoadingFeedback || isLoading) {
    return null;
  }

  const emptyInstruments = !instruments || instruments?.length === 0;

  return (
    <PageBody>
      {emptyInstruments ? (
        <NoInstruments onNewInstrument={onOpen} />
      ) : (
        <>
          <InstrumentsList instruments={instruments} />
          <NewButton position="fixed" bottom={6} right={6} onClick={onOpen}>
            {formatMessage(MESSAGES_KEYS.INSTRUMENTS_PAGE_CARD_NEW_INSTRUMENT_BUTTON_LABEL)}
          </NewButton>
        </>
      )}
      <BasicModal
        title={formatMessage(MESSAGES_KEYS.INSTRUMENT_FORM_NEW_TITLE)}
        onClose={onClose}
        isOpen={isOpen}
        primaryAction={{
          label: formatMessage(MESSAGES_KEYS.INSTRUMENT_FORM_NEW_CONFIRM_LABEL),
          onAction: handleCreateInstrument,
          loading: submittingNewInstrument,
        }}
        secondaryAction={{
          label: formatMessage(MESSAGES_KEYS.INSTRUMENT_FORM_NEW_CANCEL_LABEL),
          onAction: onClose,
        }}
      >
        <InstrumentForm {...formProps} />
      </BasicModal>
    </PageBody>
  );
}
