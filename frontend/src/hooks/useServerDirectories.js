import { useCallback } from 'react';
import { FILESYSTEM_SUPPORTED_DIRECTORIES } from '../domain/constants';
import useDirectoryStructure from './useDirectoryStructure';

const useServerDirectories = () => {
  const {
    data: clibsDir,
    isLoading: clibsDirLoading,
    error: clibsDirError,
    refetch: refetchClibs,
  } = useDirectoryStructure(FILESYSTEM_SUPPORTED_DIRECTORIES.CLIBS);
  const {
    data: databaseDir,
    isLoading: databaseDirLoading,
    error: databaseDirError,
    refetch: refetchDatabase,
  } = useDirectoryStructure(FILESYSTEM_SUPPORTED_DIRECTORIES.DATABASE);
  const {
    data: experimentsDir,
    isLoading: experimentsDirLoading,
    error: experimentsDirError,
    refetch: refetchExperiments,
  } = useDirectoryStructure(FILESYSTEM_SUPPORTED_DIRECTORIES.EXPERIMENTS);

  const loadingDirectories = clibsDirLoading || databaseDirLoading || experimentsDirLoading;
  const directoriesError = clibsDirError || databaseDirError || experimentsDirError;
  const directories = [
    { name: 'clibs', type: 'directory', children: clibsDir },
    { name: 'database', type: 'directory', children: databaseDir },
    { name: 'sandbox', type: 'directory', children: experimentsDir },
  ];

  const refetch = useCallback(() => {
    refetchClibs();
    refetchDatabase();
    refetchExperiments();
  }, [refetchClibs, refetchDatabase, refetchExperiments]);

  return {
    loading: loadingDirectories,
    error: directoriesError,
    directories: loadingDirectories ? [] : directories,
    refetch,
  };
};

export default useServerDirectories;
