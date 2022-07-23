import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import Card from '../../components/Card/Card';
import PageBody from '../../components/Layout/PageBody/PageBody';
import { useFormatMessage } from '../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../i18n/messages/keys';
import CommunicationProtocolSettings from './components/CommunicationProtocolSettings/CommunicationProtocolSettings';
import FilesystemSettings from './components/FilesystemSettings/FilesystemSettings';

const SettingsSubsectionHeading = ({ children }) => (
  <Heading mb={4} size="lg">
    {children}
  </Heading>
);

const SettingsSubsectionDescription = ({ children }) => <Text mb={4}>{children}</Text>;

const SettingsSubsectionCard = ({ children }) => (
  <Card w="100%" mb={8}>
    {children}
  </Card>
);

export default function SettingsPage() {
  const formatMessage = useFormatMessage();

  return (
    <PageBody>
      <SettingsSubsectionCard>
        <SettingsSubsectionHeading size="lg">
          {formatMessage(MESSAGES_KEYS.SETTINGS_CONNECTION_PROTCOL_TITLE)}
        </SettingsSubsectionHeading>
        <SettingsSubsectionDescription>
          {formatMessage(MESSAGES_KEYS.SETTINGS_CONNECTION_PROTCOL_DESCRIPTION)}
        </SettingsSubsectionDescription>
        <CommunicationProtocolSettings />
      </SettingsSubsectionCard>
      <SettingsSubsectionCard>
        <SettingsSubsectionHeading size="lg">
          {formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_TITLE)}
        </SettingsSubsectionHeading>
        <SettingsSubsectionDescription>
          {formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_DESCRIPTION)}
        </SettingsSubsectionDescription>
        <FilesystemSettings />
      </SettingsSubsectionCard>
    </PageBody>
  );
}
