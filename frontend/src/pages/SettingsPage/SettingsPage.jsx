import React, { useState } from 'react';
import { Box, Button, Input, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import GenericError from '../../components/Errors/GenericError/GenericError';
import useConnectionProtocol from '../../hooks/useConnectionProtocol';
import useForm from '../../hooks/useForm';
import useNotifier from '../../hooks/useNotifier';
import checkServerConnection from '../../services/instruments/checkServerConnection';
import updateConnectionProtocol from '../../services/instruments/updateConnectionProtocol';
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
export default function SettingsPage() {
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
      notifyError('No se pudo actualizar el protocolo de comunicación', err.message);
    }
  };

  const checkConnection = async () => {
    try {
      setCheckingConnection(true);
      await checkServerConnection();
      notifySuccess(
        'Conexión establecida',
        'Se ha podido detectar el servidor con la configuración especificada',
      );
    } catch (err) {
      notifyError('No se pudo conectar con el servidor', err.message);
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
            Conexión TCP
          </Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.200' }} w="50%">
            Conexión Serial
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
              Probar conexión
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
              Probar conexión
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
