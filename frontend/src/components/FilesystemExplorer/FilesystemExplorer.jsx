import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapse, Image, Text } from '@chakra-ui/react';

const DEEP_MARGIN_FACTOR = 8;
const FILESYSTEM_ROW_TYPES = {
  DIR: 'directory',
  FILE: 'file',
};

const FilesytemIcon = ({ src, alt }) => <Image src={src} alt={alt} w={10} h={10} p={1} />;

const FilesystemRowContainer = ({ children, deep, ...rest }) => (
  <Box
    ml={deep * DEEP_MARGIN_FACTOR}
    pb={1}
    pt={1}
    d="flex"
    alignItems="center"
    _hover={{
      backgroundColor: 'gray.200',
    }}
    {...rest}
  >
    {children}
  </Box>
);

const FilesystemRowText = ({ children }) => <Text ml={2}>{children}</Text>;

const DirectoryRow = ({ name, deep, directoryChildren, parentPath }) => {
  const [open, setOpen] = useState(false);

  const directoryChildrenParentPath = `${parentPath}${name}/`;

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
      <FilesystemRowContainer deep={deep} cursor="pointer" onClick={toggleDirectoryOpen}>
        {Icon}
        <FilesystemRowText>{name}</FilesystemRowText>
      </FilesystemRowContainer>
      <Collapse in={open} animateOpacity>
        <FilesystemExplorer
          directoryTree={directoryChildren}
          deep={deep + 1}
          parentPath={directoryChildrenParentPath}
        />
      </Collapse>
    </>
  );
};

const FileRow = ({ name, deep, parentPath }) => {
  return (
    <FilesystemRowContainer deep={deep} onClick={() => alert(parentPath + name)}>
      <FilesytemIcon src="/images/filesystem/file.png" alt={`${name} file`} />
      <FilesystemRowText>{name}</FilesystemRowText>
    </FilesystemRowContainer>
  );
};

const FilesystemRow = ({ name, type, deep, directoryChildren, parentPath }) => {
  return type === FILESYSTEM_ROW_TYPES.DIR ? (
    <DirectoryRow
      name={name}
      deep={deep}
      directoryChildren={directoryChildren}
      parentPath={parentPath}
    />
  ) : (
    <FileRow name={name} deep={deep} parentPath={parentPath} />
  );
};
export default function FilesystemExplorer({ directoryTree, deep = 0, parentPath = '/' }) {
  return directoryTree.map(({ name, type, children }) => (
    <>
      <FilesystemRow
        key={`${name}_deep_${deep}`}
        name={name}
        type={type}
        deep={deep}
        directoryChildren={children}
        parentPath={parentPath}
      />
    </>
  ));
}

FilesystemExplorer.propTypes = {
  deep: PropTypes.number,
  parentPath: PropTypes.string,
  directoryTree: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['directory', 'file']),
      children: PropTypes.array,
    }),
  ),
};
