import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapse, Image, ScaleFade, Text } from '@chakra-ui/react';
import { FILESYSTEM_ACTIONS } from '../../domain/constants';

const DEEP_MARGIN_FACTOR = 8;
const FILESYSTEM_ROW_TYPES = {
  DIR: 'directory',
  FILE: 'file',
};

const FilesytemIcon = ({ src, alt }) => <Image src={src} alt={alt} w={10} h={10} p={1} />;

const FilesystemRowContainer = ({ children, deep, selected, ...rest }) => (
  <Box
    ml={deep * DEEP_MARGIN_FACTOR}
    pb={1}
    pt={1}
    d="flex"
    alignItems="center"
    justifyContent="space-between"
    _hover={{
      backgroundColor: selected ? 'gray.400' : 'gray.200',
    }}
    backgroundColor={selected ? 'gray.400' : 'unset'}
    {...rest}
  >
    {children}
  </Box>
);

const FilesystemRowDescription = ({ children }) => (
  <Box d="flex" alignItems="center">
    {children}
  </Box>
);

const FilesystemRowActions = ({ children, rowHovered }) => (
  <ScaleFade initialScale={0.9} in={rowHovered}>
    <Box d="flex" alignItems="center">
      {children}
    </Box>
  </ScaleFade>
);

const FilesystemRowAction = ({ children, ...rest }) => (
  <Box
    cursor="pointer"
    _hover={{
      backgroundColor: 'gray.300',
    }}
    onClick={(event) => {
      event.stopPropagation();
      if (rest.onClick) {
        rest.onClick();
      }
    }}
    ml={2}
    p={2}
    borderRadius="50%"
  >
    {children}
  </Box>
);

const FilesystemRowText = ({ children }) => <Text ml={2}>{children}</Text>;

const DirectoryRow = ({
  name,
  deep,
  directoryChildren,
  parentPath,
  directoryActions,
  rootDirectoriesAreDeletable,
  fileActions,
  onFileSelected,
  selected,
  initiallyOpen = false,
}) => {
  const [open, setOpen] = useState(initiallyOpen);
  const [hover, setHover] = useState(false);

  const directoryChildrenParentPath = `${parentPath}${name}/`;
  let currDirectoryActions = directoryActions;
  if (!rootDirectoriesAreDeletable) {
    currDirectoryActions = directoryActions.filter(
      (action) => action.id !== FILESYSTEM_ACTIONS.DELETE,
    );
  }

  const toggleDirectoryOpen = () => {
    setOpen((lastValue) => !lastValue);
  };

  const openedDirectoryIcon = (
    <FilesytemIcon src="/images/filesystem/opened_directory.png" alt={`${name} opened directory`} />
  );
  const closedDirectoryIcon = (
    <FilesytemIcon src="/images/filesystem/closed_directory.png" alt={`${name} closed directory`} />
  );
  const Icon = open ? openedDirectoryIcon : closedDirectoryIcon;

  return (
    <>
      <FilesystemRowContainer
        deep={deep}
        cursor="pointer"
        onClick={toggleDirectoryOpen}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <FilesystemRowDescription>
          {Icon}
          <FilesystemRowText>{name}</FilesystemRowText>
        </FilesystemRowDescription>
        <FilesystemRowActions rowHovered={hover}>
          {currDirectoryActions?.map((directoryAction, index) => (
            <FilesystemRowAction
              key={`${directoryChildrenParentPath}_${index}`}
              onClick={() => directoryAction.onClick(directoryChildrenParentPath)}
            >
              {directoryAction.component}
            </FilesystemRowAction>
          ))}
        </FilesystemRowActions>
      </FilesystemRowContainer>
      <Collapse in={open} animateOpacity>
        <FilesystemExplorer
          directoryTree={directoryChildren}
          deep={deep + 1}
          parentPath={directoryChildrenParentPath}
          fileActions={fileActions}
          directoryActions={directoryActions}
          onFileSelected={onFileSelected}
          selected={selected}
        />
      </Collapse>
    </>
  );
};

const FileRow = ({ name, deep, parentPath, fileActions, onFileSelected, selected }) => {
  const [hover, setHover] = useState(false);
  const fileFullPath = parentPath + name;
  return (
    <FilesystemRowContainer
      deep={deep}
      onClick={() => onFileSelected(fileFullPath)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      selected={selected === fileFullPath}
    >
      <FilesystemRowDescription>
        <FilesytemIcon src="/images/filesystem/file.png" alt={`${name} file`} />
        <FilesystemRowText>{name}</FilesystemRowText>
      </FilesystemRowDescription>
      <FilesystemRowActions rowHovered={hover}>
        {fileActions?.map((fileAction, index) => (
          <FilesystemRowAction
            key={`${fileFullPath}_${index}`}
            onClick={() => fileAction.onClick(fileFullPath)}
          >
            {fileAction.component}
          </FilesystemRowAction>
        ))}
      </FilesystemRowActions>
    </FilesystemRowContainer>
  );
};

const FilesystemRow = ({
  name,
  type,
  deep,
  directoryChildren,
  parentPath,
  directoryActions,
  rootDirectoriesAreDeletable,
  fileActions,
  initiallyOpen,
  selected,
  onFileSelected,
}) => {
  return type === FILESYSTEM_ROW_TYPES.DIR ? (
    <DirectoryRow
      name={name}
      deep={deep}
      directoryChildren={directoryChildren}
      parentPath={parentPath}
      directoryActions={directoryActions}
      rootDirectoriesAreDeletable={rootDirectoriesAreDeletable}
      fileActions={fileActions}
      initiallyOpen={initiallyOpen}
      selected={selected}
      onFileSelected={onFileSelected}
    />
  ) : (
    <FileRow
      name={name}
      deep={deep}
      parentPath={parentPath}
      fileActions={fileActions}
      selected={selected}
      onFileSelected={onFileSelected}
    />
  );
};
export default function FilesystemExplorer({
  directoryTree,
  directoryActions,
  fileActions,
  rootDirectoriesAreDeletable = true,
  deep = 0,
  parentPath = '',
  initiallyOpen = false,
  selected = '',
  onFileSelected,
}) {
  if (!directoryTree?.length) return null;

  const onFileSelectedHandler = onFileSelected ? onFileSelected : () => {};

  return directoryTree.map(({ name, type, children }) => (
    <FilesystemRow
      key={`${name}_deep_${deep}`}
      name={name}
      type={type}
      deep={deep}
      directoryChildren={children}
      parentPath={parentPath}
      directoryActions={directoryActions}
      rootDirectoriesAreDeletable={rootDirectoriesAreDeletable}
      fileActions={fileActions}
      initiallyOpen={initiallyOpen}
      selected={selected}
      onFileSelected={onFileSelectedHandler}
    />
  ));
}

FilesystemExplorer.propTypes = {
  deep: PropTypes.number,
  parentPath: PropTypes.string,
  directoryActions: PropTypes.array,
  fileActions: PropTypes.array,
  directoryTree: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['directory', 'file']),
      children: PropTypes.array,
    }),
  ),
  initiallyOpen: PropTypes.bool,
  selected: PropTypes.string,
  onFileSelected: PropTypes.func,
};
