import React, { useState } from 'react';
import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import GenericError from '../../../../components/Errors/GenericError/GenericError';
import useConnectionProtocol from '../../../../hooks/useConnectionProtocol';
import useForm from '../../../../hooks/useForm';
import useNotifier from '../../../../hooks/useNotifier';
import { useFormatMessage } from '../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';
import { logger } from '../../../../logger';
import checkServerConnection from '../../../../services/instruments/checkServerConnection';
import updateConnectionProtocol from '../../../../services/instruments/updateConnectionProtocol';
import { updateOpenLISAServerConnectionStatus } from '../../../../state/actions/updateOpenLISAServerConnectionStatus';
import { useAppDispatch } from '../../../../state/selectors/useAppDispatch';
import SerialConfigurationForm, {
  SERIAL_CONFIGURATION_FIELD_NAMES,
  SerialConfigurationFormFileds,
} from './components/SerialConfigurationForm';
import TCPConfigurationForm, {
  TCPConfigurationFormFileds,
  TCP_CONFIGURATION_FIELD_NAMES,
} from './components/TCPConfigurationForm';

const CONNECTION_PROTOCOLS = {
  TCP: {
    index: 0,
  },
  SERIAL: {
    index: 1,
  },
};
export default function CommunicationProtocolSettings() {
  const formatMessage = useFormatMessage();
  const dispatch = useAppDispatch();
  const [checkingConnection, setCheckingConnection] = useState(false);
  const [tabIndex, setTabIndex] = useState();
  const { notifyError, notifySuccess } = useNotifier();
  const TCPConfigurationFormProps = useForm({
    fields: TCPConfigurationFormFileds,
  });

  const SerialcConfigurationFormProps = useForm({
    fields: SerialConfigurationFormFileds,
  });

  const { data, isLoading, error } = useConnectionProtocol({
    onFetch: (connectionProtocol) => {
      TCPConfigurationFormProps.updateField(TCP_CONFIGURATION_FIELD_NAMES.HOST)(
        connectionProtocol.configurations.TCP.host,
      );
      TCPConfigurationFormProps.updateField(TCP_CONFIGURATION_FIELD_NAMES.PORT)(
        connectionProtocol.configurations.TCP.port,
      );
      SerialcConfigurationFormProps.updateField(SERIAL_CONFIGURATION_FIELD_NAMES.BAUDRATE)(
        connectionProtocol.configurations.SERIAL.baudrate,
      );
      SerialcConfigurationFormProps.updateField(SERIAL_CONFIGURATION_FIELD_NAMES.PORT)(
        connectionProtocol.configurations.SERIAL.port,
      );
    },
  });

  const handleTabChange = async (index) => {
    try {
      const newProtocol = Object.keys(CONNECTION_PROTOCOLS).find(
        (protocol) => CONNECTION_PROTOCOLS[protocol].index === index,
      );
      await updateConnectionProtocol(newProtocol);
      setTabIndex(index);
    } catch (err) {
      logger.error('[PROTOCOL_UPDATE_ERROR', err);
      notifyError(
        formatMessage(MESSAGES_KEYS.SETTINGS_FAILED_CHECK_CONNECTION_TITLE),
        formatMessage(MESSAGES_KEYS.ERROR_MESSAGE_CHECK_LOGS),
      );
    }
  };

  const checkConnection = async () => {
    try {
      setCheckingConnection(true);
      await checkServerConnection({
        TCP: { ...TCPConfigurationFormProps.values },
        SERIAL: { ...SerialcConfigurationFormProps.values },
      });
      notifySuccess(
        formatMessage(MESSAGES_KEYS.SETTINGS_SUCCESSFUL_CHECK_CONNECTION_TITLE),
        formatMessage(MESSAGES_KEYS.SETTINGS_SUCCESSFUL_CHECK_CONNECTION_DESCRIPTION),
      );
      updateOpenLISAServerConnectionStatus(dispatch, true);
    } catch (err) {
      logger.error('[PROTOCOL_UPDATE_ERROR]', err);
      notifyError(
        formatMessage(MESSAGES_KEYS.SETTINGS_FAILED_CHECK_CONNECTION_TITLE),
        formatMessage(MESSAGES_KEYS.ERROR_MESSAGE_CHECK_LOGS),
      );

      updateOpenLISAServerConnectionStatus(dispatch, false);
    } finally {
      setCheckingConnection(false);
    }
  };
  if (isLoading || !data) return null;

  if (error) return <GenericError />;

  return (
    <Box m="auto">
      <Tabs
        variant="enclosed"
        size="lg"
        isLazy
        defaultIndex={CONNECTION_PROTOCOLS[data.protocol].index}
        index={tabIndex}
        onChange={handleTabChange}
      >
        <TabList>
          <Tab _selected={{ color: 'white', bg: 'blue.200' }} w="50%">
            {formatMessage(MESSAGES_KEYS.SETTINGS_TCP_TAB)}
          </Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.200' }} w="50%">
            {formatMessage(MESSAGES_KEYS.SETTINGS_SERIAL_TAB)}
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TCPConfigurationForm {...TCPConfigurationFormProps} />
            <Button
              mt={6}
              w="100%"
              colorScheme="blue"
              onClick={checkConnection}
              isLoading={checkingConnection}
            >
              {formatMessage(MESSAGES_KEYS.SETTINGS_CHECK_CONNECTION_BUTTON_LABEL)}
            </Button>
          </TabPanel>
          <TabPanel>
            <SerialConfigurationForm {...SerialcConfigurationFormProps} />
            <Button
              mt={6}
              w="100%"
              colorScheme="blue"
              onClick={checkConnection}
              isLoading={checkingConnection}
            >
              {formatMessage(MESSAGES_KEYS.SETTINGS_CHECK_CONNECTION_BUTTON_LABEL)}
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
