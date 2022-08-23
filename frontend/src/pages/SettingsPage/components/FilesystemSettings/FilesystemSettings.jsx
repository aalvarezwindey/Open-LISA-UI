import React, { useState } from 'react';
import { Box, Skeleton, Text } from '@chakra-ui/react';
import DestructiveDialog from '../../../../components/DestructiveDialog/DestructiveDialog';
import FilesystemExplorer from '../../../../components/FilesystemExplorer/FilesystemExplorer';
import { FILESYSTEM_ACTIONS } from '../../../../domain/constants';
import { useGlobalLoadingFeedback } from '../../../../hooks/useGlobalLoadingFeedback';
import useNotifier from '../../../../hooks/useNotifier';
import useServerDirectories from '../../../../hooks/useServerDirectories';
import { useFormatMessage } from '../../../../i18n/hooks/useFormatMessage';
import { MESSAGES_KEYS } from '../../../../i18n/messages/keys';
import { logger } from '../../../../logger';
import createDirectory from '../../../../services/instruments/createDirectory';
import deleteDirectory from '../../../../services/instruments/deleteDirectory';
import deleteFile from '../../../../services/instruments/deleteFile';
import uploadFile from '../../../../services/instruments/uploadFile';
import FilesystemActionIcon from './components/FilesystemActionIcon/FilesystemActionIcon';
import NewDirectoryDialog from './components/NewDirectoryDialog/NewDirectoryDialog';
import UploadFileIcon from './components/UploadFileIcon/UploadFileIcon';
import UploadingFeedback from './components/UploadingFeedback/UploadingFeedback';

const FilesystemExplorerLoading = () => <Skeleton height="144px" />;
const FilesystemLoadError = ({ children }) => (
  <Text color="red.500" mb={4} fontWeight="bold">
    {children}
  </Text>
);

export default function FilesystemSettings() {
  const formatMessage = useFormatMessage();
  const [uploadingText, setUploadingText] = useState('');
  const { notifySuccess, notifyError, notifyInfo } = useNotifier();
  const [destructiveDialog, setDestructiveDialog] = useState(null);
  const [fileToUploadDirectoryPath, setFileUploadDirectoryPath] = useState('');
  const [newDirectoryParentPath, setNewDirectoryParentPath] = useState('');
  const [newDirectoryDialogOpen, setNewDirectoryDialogOpen] = useState(false);
  const [creatingDirectory, setCreatingDirectory] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const {
    loading: loadingDirectories,
    error: directoriesError,
    directories,
    refetch,
  } = useServerDirectories();

  useGlobalLoadingFeedback(creatingDirectory || deleting || loadingDirectories);

  const handleCreateDirectory = (directoryFullPath) => {
    setNewDirectoryParentPath(directoryFullPath);
    setNewDirectoryDialogOpen(true);
  };

  const handleNewDirectoryCancel = () => {
    setNewDirectoryParentPath('');
    setNewDirectoryDialogOpen(false);
  };

  const handleConfirmDeleteFile = async (fileFullPath) => {
    try {
      setDestructiveDialog(null);
      setDeleting(true);
      await deleteFile(fileFullPath);
      notifyInfo(formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_FILE_DELETE_SUCCESS));
    } catch (err) {
      logger.error('[handleConfirmDeleteFile] error deleting directory in server', err);
      notifyError(
        formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_FILE_DELETE_ERROR),
        formatMessage(MESSAGES_KEYS.ERROR_MESSAGE_CHECK_LOGS),
      );
    } finally {
      setDeleting(false);
      refetch();
    }
  };

  const handleConfirmDeleteDirectory = async (directoryFullPath) => {
    try {
      setDestructiveDialog(null);
      setDeleting(true);
      await deleteDirectory(directoryFullPath);
      notifyInfo(formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_DIRECTORY_DELETE_SUCCESS));
    } catch (err) {
      logger.error('[handleConfirmDeleteDirectory] error deleting directory in server', err);
      notifyError(
        formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_DIRECTORY_DELETE_ERROR),
        formatMessage(MESSAGES_KEYS.ERROR_MESSAGE_CHECK_LOGS),
      );
    } finally {
      setDeleting(false);
      refetch();
    }
  };

  const handleNewDirectorySubmit = async ({ directory }) => {
    try {
      setNewDirectoryDialogOpen(false);
      setCreatingDirectory(true);
      await createDirectory(newDirectoryParentPath, directory);
      notifySuccess(formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_DIRECTORY_CREATION_SUCCESS));
    } catch (err) {
      logger.error('[handleNewDirectorySubmit] error creating directory in server', err);
      notifyError(
        formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_DIRECTORY_CREATION_ERROR),
        formatMessage(MESSAGES_KEYS.ERROR_MESSAGE_CHECK_LOGS),
      );
    } finally {
      setCreatingDirectory(false);
      refetch();
    }
  };

  const handleClickForUploadingFileInDirectory = (directoryFullPath) => {
    setFileUploadDirectoryPath(directoryFullPath);
  };

  const handleFileToUploadSelected = async (file, fileName, fileSize) => {
    try {
      setUploadingText(
        formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_UPLOAD_FILE_FEEDBACK, fileName, fileSize),
      );
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', fileName);
      formData.append('size', file.size);
      formData.append('path', fileToUploadDirectoryPath);
      await uploadFile(formData);
      notifySuccess(formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_UPLOAD_FILE_SUCCESS));
    } catch (err) {
      logger.error('[handleFileToUploadSelected] error uploading file to server', err);
      notifyError(
        formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_UPLOAD_FILE_ERROR),
        formatMessage(MESSAGES_KEYS.ERROR_MESSAGE_CHECK_LOGS),
      );
    } finally {
      setUploadingText(null);
      refetch();
    }
  };

  const handleDeleteDirectory = (directoryFullPath) => {
    setDestructiveDialog({
      title: formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_DELETE_DIRECTORY_MODAL_TITLE),
      description: formatMessage(
        MESSAGES_KEYS.SETTINGS_FILESYSTEM_DELETE_DIRECTORY_MODAL_DESCRIPTION,
        directoryFullPath,
      ),
      onCancel: () => setDestructiveDialog(null),
      onDelete: () => handleConfirmDeleteDirectory(directoryFullPath),
    });
  };

  const handleDeleteFile = (fileFullPath) => {
    setDestructiveDialog({
      title: formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_DELETE_FILE_MODAL_TITLE),
      description: formatMessage(
        MESSAGES_KEYS.SETTINGS_FILESYSTEM_DELETE_FILE_MODAL_DESCRIPTION,
        fileFullPath,
      ),
      onCancel: () => setDestructiveDialog(null),
      onDelete: () => handleConfirmDeleteFile(fileFullPath),
    });
  };

  const fileActions = [
    {
      id: FILESYSTEM_ACTIONS.DELETE,
      component: (
        <FilesystemActionIcon
          src="/icons/delete.png"
          alt="delete file"
          tooltip={formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_TOOLTIP_DELETE_FILE)}
        />
      ),
      onClick: handleDeleteFile,
    },
  ];

  const directoryActions = [
    {
      id: FILESYSTEM_ACTIONS.UPLOAD_FILE,
      component: <UploadFileIcon onSelectedFile={handleFileToUploadSelected} />,
      onClick: handleClickForUploadingFileInDirectory,
    },
    {
      id: FILESYSTEM_ACTIONS.CREATE_DIRECTORY,
      component: (
        <FilesystemActionIcon
          src="/icons/new_directory.png"
          alt="new directory"
          tooltip={formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_TOOLTIP_CREATE_DIRECTORY)}
        />
      ),
      onClick: handleCreateDirectory,
    },
    {
      id: FILESYSTEM_ACTIONS.DELETE,
      component: (
        <FilesystemActionIcon
          src="/icons/delete.png"
          alt="delete directory"
          tooltip={formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_TOOLTIP_DELETE_DIRECTORY)}
        />
      ),
      onClick: handleDeleteDirectory,
    },
  ];

  if (!loadingDirectories && directoriesError) {
    return (
      <FilesystemLoadError>
        {formatMessage(MESSAGES_KEYS.SETTINGS_FILESYSTEM_LOAD_ERROR)}
      </FilesystemLoadError>
    );
  }

  return (
    <>
      {loadingDirectories ? (
        <FilesystemExplorerLoading />
      ) : (
        <Box>
          <FilesystemExplorer
            directoryTree={directories}
            fileActions={fileActions}
            directoryActions={directoryActions}
            rootDirectoriesAreDeletable={false}
          />
        </Box>
      )}
      {Boolean(destructiveDialog) ? (
        <DestructiveDialog
          isOpen={Boolean(destructiveDialog)}
          onCancel={destructiveDialog?.onCancel}
          onDelete={destructiveDialog?.onDelete}
          title={destructiveDialog?.title}
          description={destructiveDialog?.description}
          loading={destructiveDialog?.loading}
        />
      ) : null}
      <UploadingFeedback uploading={Boolean(uploadingText)} uploadingText={uploadingText} />
      <NewDirectoryDialog
        open={newDirectoryDialogOpen}
        onNewDirectory={handleNewDirectorySubmit}
        onClose={handleNewDirectoryCancel}
      />
    </>
  );
}
