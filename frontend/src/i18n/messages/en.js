import { MESSAGES_KEYS as MK } from './keys';

export const en = {
  [MK.NAVBAR_SERVER_BUTTON_LABEL]: 'Server: {}',

  [MK.INSTRUMENTS_PAGE_CARD_VIEW_MORE_BUTTON_LABEL]: 'View more',
  [MK.INSTRUMENTS_PAGE_CARD_NEW_INSTRUMENT_BUTTON_LABEL]: 'New instrument',
  [MK.INSTRUMENTS_PAGE_NO_INSTRUMENTS_MESSAGE]:
    'Welcome to Open LISA, register your first instrument',
  [MK.INSTRUMENTS_PAGE_NO_INSTRUMENTS_AND_SERVER_OFFLINE]:
    'It seems that you are not connected with the server. Check the communication protocol configuration',
  [MK.INSTRUMENTS_PAGE_NO_INSTRUMENTS_AND_SERVER_OFFLINE_BUTTON_LABEL]: 'Configure connection',

  [MK.INSTRUMENT_DETAIL_DELETE_INSTRUMENT_BUTTON_LABEL]: 'Delete instrument',
  [MK.INSTRUMENT_DETAIL_EDIT_INSTRUMENT_BUTTON_LABEL]: 'Edit instrument',
  [MK.INSTRUMENT_DETAIL_NEW_COMMAND_BUTTON_LABEL]: 'New command',
  [MK.INSTRUMENT_DETAIL_COMMANDS_TITLE]: 'Commands',
  [MK.INSTRUMENT_DETAIL_NO_COMMANDS_TITLE]: 'This instrument has no commands already',
  [MK.INSTRUMENT_DETAIL_DELETE_INSTRUMENT_MODAL_TITLE]: 'Delete instrument',
  [MK.INSTRUMENT_DETAIL_DELETE_INSTRUMENT_MODAL_DESCRIPTION]:
    'Do you confirm that you want to delete {} instrument?',
  [MK.INSTRUMENT_DETAIL_DESTRUCTIVE_MODAL_CONFIRM_LABEL]: 'Delete',
  [MK.INSTRUMENT_DETAIL_DESTRUCTIVE_MODAL_CANCEL_LABEL]: 'Cancel',

  [MK.INSTRUMENT_FORM_EMPTY_BRAND_ERROR]: 'Brand is required',
  [MK.INSTRUMENT_FORM_EMPTY_MODEL_ERROR]: 'Model is required',
  [MK.INSTRUMENT_FORM_NEW_TITLE]: 'New instrument',
  [MK.INSTRUMENT_FORM_NEW_CONFIRM_LABEL]: 'Create instrument',
  [MK.INSTRUMENT_FORM_NEW_CANCEL_LABEL]: 'Cancel',
  [MK.INSTRUMENT_FORM_FIELD_BRAND_LABEL]: 'Brand',
  [MK.INSTRUMENT_FORM_FIELD_MODEL_LABEL]: 'Model',
  [MK.INSTRUMENT_FORM_FIELD_TYPE_LABEL]: 'Type',
  [MK.INSTRUMENT_FORM_FIELD_DETECTED_PHSYICAL_ADDRESS_LABEL]: 'Detected physical addresses',
  [MK.INSTRUMENT_FORM_FIELD_PHYSICAL_ADDRESS_LABEL]: 'Physical address',
  [MK.INSTRUMENT_FORM_FIELD_PHYSICAL_ADDRESS_OTHER_LABEL]: 'Other',
  [MK.INSTRUMENT_FORM_FIELD_DESCRIPTION_LABEL]: 'Description',
  [MK.INSTRUMENT_FORM_FIELD_IMAGE_LABEL]: 'Select image',
  [MK.INSTRUMENT_FORM_FIELD_PHYSICAL_ADDRESS_PLACEHOLDER]:
    'Select one of the detected physical addresses',
  [MK.INSTRUMENT_FORM_FIELD_DESCRIPTION_PLACEHOLDER]:
    'Optionally provide a meaninful description about the instrument',
  [MK.INSTRUMENT_FORM_FIELD_PHYSICAL_ADDRESS_HELP_FOR_CLIB]:
    'The physical addres only is necessary for instruments that implements SCPI protocol',
  [MK.INSTRUMENT_FORM_EDIT_TITLE]: 'Edit instrument',
  [MK.INSTRUMENT_FORM_EDIT_CONFIRM_LABEL]: 'Confirm',
  [MK.INSTRUMENT_FORM_EDIT_CANCEL_LABEL]: 'Cancel',

  [MK.SETTINGS_TCP_TAB]: 'TCP connection',
  [MK.SETTINGS_SERIAL_TAB]: 'Serial connection',
  [MK.SETTINGS_TCP_FORM_HOST_LABEL]: 'IP address',
  [MK.SETTINGS_TCP_FORM_PORT_LABEL]: 'Port',
  [MK.SETTINGS_SERIAL_FORM_BAUDRATE_LABEL]: 'Baudrate',
  [MK.SETTINGS_SERIAL_FORM_PORT_LABEL]: 'Serial port',
  [MK.SETTINGS_CHECK_CONNECTION_BUTTON_LABEL]: 'Check connection',
  [MK.SETTINGS_SUCCESSFUL_CHECK_CONNECTION_TITLE]: 'Connection established',
  [MK.SETTINGS_SUCCESSFUL_CHECK_CONNECTION_DESCRIPTION]:
    'Server could be detected with the configuration specified',
  [MK.SETTINGS_FAILED_CHECK_CONNECTION_TITLE]: 'Communication protocol could not be updated',
  [MK.ERROR_MESSAGE_CHECK_LOGS]: 'Check logs for more details',
  [MK.SETTINGS_CONNECTION_PROTCOL_TITLE]: 'Communication protocol',
  [MK.SETTINGS_CONNECTION_PROTCOL_DESCRIPTION]:
    'You can modify the communication protocol with the server as well as the parameters of each mode. Use the "Check connection" button to verify that the configuration is correct',
  [MK.SETTINGS_FILESYSTEM_TITLE]: 'Server files',
  [MK.SETTINGS_FILESYSTEM_LOAD_ERROR]:
    'Server folders could not be loaded, check the connection or logs for more details',
  [MK.SETTINGS_FILESYSTEM_DESCRIPTION]:
    'You can manage important files that are located on the server. The clibs folder contains the C libraries to which the instrument commands that require it can be associated. In the database folder are the files that determine the registered instruments and commands. Finally, the sandbox folder, can be used to save processing scripts or results of specific experiences',
  [MK.SETTINGS_FILESYSTEM_TOOLTIP_CREATE_DIRECTORY]: 'New folder',
  [MK.SETTINGS_FILESYSTEM_TOOLTIP_UPLOAD_FILE]: 'Upload file',
  [MK.SETTINGS_FILESYSTEM_TOOLTIP_DELETE_DIRECTORY]: 'Delete folder',
  [MK.SETTINGS_FILESYSTEM_TOOLTIP_DELETE_FILE]: 'Delete file',
  [MK.SETTINGS_FILESYSTEM_DELETE_FILE_MODAL_TITLE]: 'Delete file',
  [MK.SETTINGS_FILESYSTEM_DELETE_FILE_MODAL_DESCRIPTION]: 'Do you confirm to delete the file {}?',
  [MK.SETTINGS_FILESYSTEM_DELETE_DIRECTORY_MODAL_TITLE]: 'Delete folder',
  [MK.SETTINGS_FILESYSTEM_DELETE_DIRECTORY_MODAL_DESCRIPTION]:
    'Do you confirm to delete the folder {}? Take in consideration that ALL its content will be deleted.',
  [MK.SETTINGS_FILESYSTEM_UPLOAD_FILE_FEEDBACK]: 'Uploading file {} of {}...',
  [MK.SETTINGS_FILESYSTEM_UPLOAD_FILE_SUCCESS]: 'File uploaded successfully',
  [MK.SETTINGS_FILESYSTEM_UPLOAD_FILE_ERROR]: 'File could not be upload',
  [MK.SETTINGS_FILESYSTEM_NEW_DIRECTORY_TITLE]: 'New folder',
  [MK.SETTINGS_FILESYSTEM_NEW_DIRECTORY_LABEL]: 'Name',
  [MK.SETTINGS_FILESYSTEM_NEW_DIRECTORY_ERROR]:
    'New folder can not contain any of the following characters: {}',
  [MK.SETTINGS_FILESYSTEM_DIRECTORY_CREATION_SUCCESS]: 'Folder created',
  [MK.SETTINGS_FILESYSTEM_DIRECTORY_CREATION_ERROR]: 'The folder could not be created',
  [MK.SETTINGS_FILESYSTEM_DIRECTORY_DELETE_ERROR]: 'The folder could not be deleted',
  [MK.SETTINGS_FILESYSTEM_FILE_DELETE_ERROR]: 'The file could not be deleted',
  [MK.SETTINGS_FILESYSTEM_DIRECTORY_DELETE_SUCCESS]: 'Folder deleted',
  [MK.SETTINGS_FILESYSTEM_FILE_DELETE_SUCCESS]: 'File deleted',

  [MK.COMMAND_FORM_TITLE]: 'New command',
  [MK.COMMAND_FORM_CONFIRM_LABEL]: 'Create command',
  [MK.COMMAND_FORM_CANCEL_LABEL]: 'Cancel',
  [MK.COMMAND_FORM_NAME_FIELD_LABEL]: 'Name',
  [MK.COMMAND_FORM_NAME_FIELD_HELP_TEXT]:
    'The command name will be the syntax used through the SDK, can not have white spaces',
  [MK.COMMAND_FORM_NAME_FIELD_ERROR]: 'Command name is required and can not have white spaces.',
  [MK.COMMAND_FORM_INVOCATION_FIELD_LABEL]: 'Command',
  [MK.COMMAND_FORM_INVOCATION_FIELD_LABEL_CLIB]: 'Library function',
  [MK.COMMAND_FORM_LIB_FILE_NAME_FIELD_ERROR]:
    'The library associated with the command is mandatory.',
  [MK.COMMAND_FORM_INVOCATION_FIELD_HELP_TEXT_SCPI]:
    'It is the SCPI command indicated by the fabricant. Use {} to indicate parameters in the command.',
  [MK.COMMAND_FORM_INVOCATION_FIELD_HELP_TEXT_CLIB]:
    'It is the C/C++ library fuction that will be invoked with this command.',
  [MK.COMMAND_FORM_LIB_FILE_NAME_FIELD_LABEL]: 'Library',
  [MK.COMMAND_FORM_INVOCATION_FIELD_ERROR]: 'Command to be invoked is required.',
  [MK.COMMAND_FORM_DESCRIPTION_FIELD_LABEL]: 'Description',
  [MK.COMMAND_FORM_DESCRIPTION_FIELD_PLACEHOLDER]: 'What does this command do?',
  [MK.COMMAND_FORM_PARAMETERS_FIELD_LABEL]: 'Parameters',
  [MK.COMMAND_FORM_PARAMETERS_FIELD_TYPE_LABEL]: 'Value type',
  [MK.COMMAND_FORM_PARAMETERS_FIELD_DESCRIPTION_LABEL]: 'Description',
  [MK.COMMAND_FORM_PARAMETERS_FIELD_DESCRIPTION_PLACEHOLDER]:
    'Indicate the purpose of the parameter',
  [MK.COMMAND_FORM_RETURN_FIELD_LABEL]: 'Return value',
  [MK.COMMAND_FORM_RETURN_FIELD_TYPE_LABEL]: 'Value type',
  [MK.COMMAND_FORM_RETURN_FIELD_DESCRIPTION_LABEL]: 'Description',
  [MK.COMMAND_FORM_RETURN_FIELD_DESCRIPTION_PLACEHOLDER]:
    'Indicate what the return value represents',
  [MK.COMMAND_FORM_INVOCATION_EXAMPLE]: 'Invocation example:',
  [MK.COMMAND_FORM_SCPI_INVOCATION_EXAMPLE]: 'Instruction that the instrument would receive:',
  [MK.COMMAND_FORM_CLIB_INVOCATION_EXAMPLE]: 'C/C++ library function call:',
  [MK.COMMAND_SCPI_CREATION_SUCCESS_FEEDBACK_TITLE]: 'Command created',
  [MK.COMMAND_SCPI_CREATION_SUCCESS_FEEDBACK_DESCRIPTION]:
    'Command {} was added to the instrument.',
  [MK.COMMAND_SCPI_CREATION_ERROR_FEEDBACK_TITLE]: 'Command creation error',
  [MK.COMMAND_SCPI_CREATION_ERROR_FEEDBACK_DESCRIPTION]: 'Check the logs for more details.',
  [MK.COMMAND_DELETE_MODAL_TITLE]: 'Delete command',
  [MK.COMMAND_DELETE_MODAL_DESCRIPTION]: 'Are you sure about deletting this command?',
  [MK.COMMAND_DELETE_SUCCESS_FEEDBACK_TITLE]: 'Command deleted',
  [MK.COMMAND_DELETE_SUCCESS_FEEDBACK_DESCRIPTION]: 'The command was deleted successfully',
  [MK.COMMAND_DELETE_ERROR_FEEDBACK_TITLE]: 'Error deleting the command',
  [MK.COMMAND_DELETE_ERROR_FEEDBACK_DESCRIPTION]:
    'Command could not be deleted, check logs for more details.',
};
