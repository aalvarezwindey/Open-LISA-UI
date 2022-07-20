import React from 'react';
import { Heading } from '@chakra-ui/react';
import Card from '../../components/Card/Card';
import FilesystemExplorer from '../../components/FilesystemExplorer/FilesystemExplorer';
import PageBody from '../../components/Layout/PageBody/PageBody';
import { useFormatMessage } from '../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../i18n/messages/keys';
import CommunicationProtocolSettings from './components/CommunicationProtocolSettings/CommunicationProtocolSettings';

const SettingsSubsectionHeading = ({ children }) => (
  <Heading mb={4} size="lg">
    {children}
  </Heading>
);
const SettingsSubsectionCard = ({ children }) => (
  <Card w="100%" mb={8}>
    {children}
  </Card>
);

const MOCK_DIR = [
  {
    name: '1',
    type: 'directory',
    children: [
      {
        name: '1_1',
        type: 'directory',
        children: [
          {
            name: 'another_file.txt',
            type: 'file',
          },
          {
            name: 'file_1_1.py',
            type: 'file',
          },
        ],
      },
      {
        name: 'file_1.txt',
        type: 'file',
      },
    ],
  },
  {
    name: '2',
    type: 'directory',
    children: [
      {
        name: '2_3',
        type: 'directory',
        children: [],
      },
      {
        name: 'file_2.js',
        type: 'file',
      },
    ],
  },
  {
    name: '3',
    type: 'directory',
    children: [],
  },
];

export default function SettingsPage() {
  const formatMessage = useFormatMessage();
  return (
    <PageBody>
      <SettingsSubsectionCard>
        <SettingsSubsectionHeading size="lg">
          {formatMessage(MESSAGES_KEYS.SETTINGS_CONNECTION_PROTCOL_TITLE)}
        </SettingsSubsectionHeading>
        <CommunicationProtocolSettings />
      </SettingsSubsectionCard>
      <SettingsSubsectionCard>
        <SettingsSubsectionHeading size="lg">
          {formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_TITLE)}
        </SettingsSubsectionHeading>
        <FilesystemExplorer
          directoryTree={[
            { name: 'clibs', type: 'directory', children: MOCK_DIR },
            { name: 'experiments', type: 'directory', children: MOCK_DIR },
          ]}
        />
      </SettingsSubsectionCard>
    </PageBody>
  );
}
