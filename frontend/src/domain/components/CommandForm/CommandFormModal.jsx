import React from 'react';
import PropTypes from 'prop-types';
import { useBoolean } from '@chakra-ui/react';
import BasicModal from '../../../components/BasicModal/BasicModal';
import useForm from '../../../hooks/useForm';
import useNotifier from '../../../hooks/useNotifier';
import { useFormatMessage } from '../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../i18n/messages/keys';
import { logger } from '../../../logger';
import {
  CLIB_COMMAND_FIELD_NAMES,
  COMMON_COMMAND_FIELD_NAMES,
  FILESYSTEM_SUPPORTED_DIRECTORIES,
  INSTRUMENT_TYPES,
} from '../../constants';
import CLibCommandForm, { CLibCommandFormFileds } from './CLibCommandForm/CLibCommandForm';
import SCPICommandForm, { SCPICommandFormFileds } from './SCPICommandForm/SCPICommandForm';

const chooseComponentFormAndFields = (instrumentType) => {
  switch (instrumentType) {
    case INSTRUMENT_TYPES.SCPI:
      return [SCPICommandForm, SCPICommandFormFileds];
    case INSTRUMENT_TYPES.CLIB:
      return [CLibCommandForm, CLibCommandFormFileds];
    default:
      throw new Error(
        'chose form fields should called with a valid instrument type, received ' + instrumentType,
      );
  }
};

function CommandFormModal({ isOpen, onClose, onFormSubmit, instrumentType }) {
  const [FormComponent, formFields] = chooseComponentFormAndFields(instrumentType);
  const { notifyError, notifySuccess } = useNotifier();
  const { isValid, reset, displayErrors, ...newCommandFormProps } = useForm({
    fields: formFields,
  });
  const formatMessage = useFormatMessage();
  const [submittingNewCommand, { on: submittingOn, off: submittingOff }] = useBoolean(false);

  const handleCreateCommand = async () => {
    const { values: formValues } = newCommandFormProps;
    if (!isValid) {
      displayErrors(formValues);
      return;
    }

    const newFormPayload = {
      ...formValues,

      type: instrumentType,
      metadata: null,
    };

    if (instrumentType === INSTRUMENT_TYPES.CLIB) {
      delete newFormPayload[CLIB_COMMAND_FIELD_NAMES.LIB_FILE_NAME];
      newFormPayload.metadata = {
        [CLIB_COMMAND_FIELD_NAMES.LIB_FILE_NAME]: formValues[
          CLIB_COMMAND_FIELD_NAMES.LIB_FILE_NAME
        ].replace(`${FILESYSTEM_SUPPORTED_DIRECTORIES.CLIBS}/`, ''),
      };
    }

    try {
      submittingOn();
      await onFormSubmit(newFormPayload);
      notifySuccess(
        formatMessage(MESSAGES_KEYS.COMMAND_SCPI_CREATION_SUCCESS_FEEDBACK_TITLE),
        formatMessage(
          MESSAGES_KEYS.COMMAND_SCPI_CREATION_SUCCESS_FEEDBACK_DESCRIPTION,
          formValues[COMMON_COMMAND_FIELD_NAMES.NAME],
        ),
      );
      reset();
      onClose();
    } catch (err) {
      notifyError(
        formatMessage(MESSAGES_KEYS.COMMAND_SCPI_CREATION_ERROR_FEEDBACK_TITLE),
        formatMessage(MESSAGES_KEYS.COMMAND_SCPI_CREATION_ERROR_FEEDBACK_DESCRIPTION),
      );
      logger.error('[CREATE_COMMAND]', err);
    } finally {
      submittingOff();
    }
  };

  return (
    <BasicModal
      title={formatMessage(MESSAGES_KEYS.COMMAND_FORM_TITLE)}
      onClose={onClose}
      isOpen={isOpen}
      primaryAction={{
        label: formatMessage(MESSAGES_KEYS.COMMAND_FORM_CONFIRM_LABEL),
        onAction: handleCreateCommand,
        loading: submittingNewCommand,
      }}
      secondaryAction={{
        label: formatMessage(MESSAGES_KEYS.COMMAND_FORM_CANCEL_LABEL),
        onAction: onClose,
      }}
    >
      <FormComponent {...newCommandFormProps} />
    </BasicModal>
  );
}

CommandFormModal.propTypes = {
  instrumentType: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default CommandFormModal;
