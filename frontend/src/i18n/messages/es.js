import { MESSAGES_KEYS as MK } from './keys';

export const es = {
  [MK.NAVBAR_SERVER_BUTTON_LABEL]: 'Servidor: {}',

  [MK.INSTRUMENTS_PAGE_CARD_VIEW_MORE_BUTTON_LABEL]: 'Ver más',
  [MK.INSTRUMENTS_PAGE_CARD_NEW_INSTRUMENT_BUTTON_LABEL]: 'Nuevo instrumento',

  [MK.INSTRUMENT_DETAIL_DELETE_INSTRUMENT_BUTTON_LABEL]: 'Eliminar instrumento',
  [MK.INSTRUMENT_DETAIL_EDIT_INSTRUMENT_BUTTON_LABEL]: 'Editar instrumento',
  [MK.INSTRUMENT_DETAIL_NEW_COMMAND_BUTTON_LABEL]: 'Nuevo comando',
  [MK.INSTRUMENT_DETAIL_COMMANDS_TITLE]: 'Comandos',
  [MK.INSTRUMENT_DETAIL_DELETE_INSTRUMENT_MODAL_TITLE]: 'Eliminar instrumento',
  [MK.INSTRUMENT_DETAIL_DELETE_INSTRUMENT_MODAL_DESCRIPTION]:
    '¿Estás seguro que querés eliminar el instrumento {}?',
  [MK.INSTRUMENT_DETAIL_DESTRUCTIVE_MODAL_CONFIRM_LABEL]: 'Eliminar',
  [MK.INSTRUMENT_DETAIL_DESTRUCTIVE_MODAL_CANCEL_LABEL]: 'Cancelar',

  [MK.INSTRUMENT_FORM_EMPTY_BRAND_ERROR]: 'Tenés que ingresar una marca',
  [MK.INSTRUMENT_FORM_EMPTY_MODEL_ERROR]: 'Tenés que ingresar un modelo',
  [MK.INSTRUMENT_FORM_NEW_TITLE]: 'Nuevo instrumento',
  [MK.INSTRUMENT_FORM_NEW_CONFIRM_LABEL]: 'Crear instrumento',
  [MK.INSTRUMENT_FORM_NEW_CANCEL_LABEL]: 'Cancelar',
  [MK.INSTRUMENT_FORM_FIELD_BRAND_LABEL]: 'Marca',
  [MK.INSTRUMENT_FORM_FIELD_MODEL_LABEL]: 'Modelo',
  [MK.INSTRUMENT_FORM_FIELD_TYPE_LABEL]: 'Tipo',
  [MK.INSTRUMENT_FORM_FIELD_DETECTED_PHSYICAL_ADDRESS_LABEL]: 'Direcciones físicas detectadas',
  [MK.INSTRUMENT_FORM_FIELD_PHYSICAL_ADDRESS_LABEL]: 'Dirección física',
  [MK.INSTRUMENT_FORM_FIELD_PHYSICAL_ADDRESS_OTHER_LABEL]: 'Otra',
  [MK.INSTRUMENT_FORM_FIELD_DESCRIPTION_LABEL]: 'Descripción',
  [MK.INSTRUMENT_FORM_FIELD_IMAGE_LABEL]: 'Elegí una imagen',
  [MK.INSTRUMENT_FORM_FIELD_PHYSICAL_ADDRESS_PLACEHOLDER]:
    'Seleccioná una de las direcciones detectadas',
  [MK.INSTRUMENT_FORM_FIELD_DESCRIPTION_PLACEHOLDER]:
    'Opcionalmente ingresá un detalle sobre el instrumento',
  [MK.INSTRUMENT_FORM_FIELD_PHYSICAL_ADDRESS_HELP_FOR_CLIB]:
    'La dirección física solo es necesaria para instrumentos que implementan el protocolo SCPI',
  [MK.INSTRUMENT_FORM_EDIT_TITLE]: 'Editar instrumento',
  [MK.INSTRUMENT_FORM_EDIT_CONFIRM_LABEL]: 'Confirmar',
  [MK.INSTRUMENT_FORM_EDIT_CANCEL_LABEL]: 'Cancelar',

  [MK.SETTINGS_TCP_TAB]: 'Conexión TCP',
  [MK.SETTINGS_SERIAL_TAB]: 'Conexión Serial',
  [MK.SETTINGS_TCP_FORM_HOST_LABEL]: 'Dirección IP',
  [MK.SETTINGS_TCP_FORM_PORT_LABEL]: 'Puerto',
  [MK.SETTINGS_SERIAL_FORM_BAUDRATE_LABEL]: 'Baudrate',
  [MK.SETTINGS_SERIAL_FORM_PORT_LABEL]: 'Puerto serial',
  [MK.SETTINGS_CHECK_CONNECTION_BUTTON_LABEL]: 'Probar conexión',
  [MK.SETTINGS_SUCCESSFUL_CHECK_CONNECTION_TITLE]: 'Conexión establecida',
  [MK.SETTINGS_SUCCESSFUL_CHECK_CONNECTION_DESCRIPTION]:
    'Se pudo detectar el servidor exitosamente con la configuración especificada',
  [MK.SETTINGS_FAILED_CHECK_CONNECTION_TITLE]: 'No se pudo actualizar el protocolo de comunicación',
  [MK.ERROR_MESSAGE_CHECK_LOGS]: 'Revisá los logs para más detalles',
  [MK.SETTINGS_CONNECTION_PROTCOL_TITLE]: 'Protocolo de comunicación',
  [MK.SETTINGS_CONNECTION_PROTCOL_DESCRIPTION]:
    'Podés modificar el protocolo de comunicación con el servidor así como también los parámetros de cada modo. Usá el botón de "Probar conexión" para verificar que la configuración es correcta',
  [MK.SETTINGS_FILESYSTEM_TITLE]: 'Archivos en el servidor',
  [MK.SETTINGS_FILESYSTEM_DESCRIPTION]:
    'Podés gestionar los archivos de importancia que se ubican en el servidor. En la carpeta clibs se ubican las librerías C a las que se pueden asociar los comandos de instrumentos que lo precisan. En la carpeta database están los archivos que determinan los instrumentos y comandos registrados. Por último la carpeta sandbox puede ser utilizada para guardar scripts de procesamiento o resultados de experiencias específicas.',
  [MK.SETTINGS_FILESYSTEM_TOOLTIP_CREATE_DIRECTORY]: 'Nueva carpeta',
  [MK.SETTINGS_FILESYSTEM_TOOLTIP_UPLOAD_FILE]: 'Cargar archivo',
  [MK.SETTINGS_FILESYSTEM_TOOLTIP_DELETE_DIRECTORY]: 'Borrar carpeta',
  [MK.SETTINGS_FILESYSTEM_TOOLTIP_DELETE_FILE]: 'Borrar archivo',
  [MK.SETTINGS_FILESYSTEM_DELETE_FILE_MODAL_TITLE]: 'Eliminar archivo',
  [MK.SETTINGS_FILESYSTEM_DELETE_FILE_MODAL_DESCRIPTION]:
    '¿Estás seguro que querés eliminar el archivo {}?',
  [MK.SETTINGS_FILESYSTEM_DELETE_DIRECTORY_MODAL_TITLE]: 'Eliminar carpeta',
  [MK.SETTINGS_FILESYSTEM_DELETE_DIRECTORY_MODAL_DESCRIPTION]:
    '¿Estás seguro que querés eliminar la carpeta {}? Tené en cuenta que eliminás TODO su contenido.',
  [MK.SETTINGS_FILESYSTEM_UPLOAD_FILE_FEEDBACK]: 'Cargando archivo {} de {}...',
  [MK.SETTINGS_FILESYSTEM_UPLOAD_FILE_SUCCESS]: 'El archivo se cargó exitosamente',
  [MK.SETTINGS_FILESYSTEM_UPLOAD_FILE_ERROR]: 'No se pudo cargar el archivo',
  [MK.SETTINGS_FILESYSTEM_NEW_DIRECTORY_TITLE]: 'Nueva carpeta',
  [MK.SETTINGS_FILESYSTEM_NEW_DIRECTORY_LABEL]: 'Nombre',
  [MK.SETTINGS_FILESYSTEM_NEW_DIRECTORY_ERROR]:
    'La nueva carpeta no puede contener ninguno de los siguientes caracteres: {}',
  [MK.SETTINGS_FILESYSTEM_DIRECTORY_CREATION_SUCCESS]: 'Carpeta creada',
  [MK.SETTINGS_FILESYSTEM_DIRECTORY_CREATION_ERROR]: 'No se pudo crear la carpeta',
  [MK.SETTINGS_FILESYSTEM_DIRECTORY_DELETE_ERROR]: 'No se pudo eliminar la carpeta',
  [MK.SETTINGS_FILESYSTEM_FILE_DELETE_ERROR]: 'No se pudo eliminar el archivo',
  [MK.SETTINGS_FILESYSTEM_DIRECTORY_DELETE_SUCCESS]: 'Carpeta eliminada',
  [MK.SETTINGS_FILESYSTEM_FILE_DELETE_SUCCESS]: 'Archivo eliminado',

  [MK.COMMAND_FORM_TITLE]: 'Nuevo comando',
  [MK.COMMAND_FORM_CONFIRM_LABEL]: 'Crear comando',
  [MK.COMMAND_FORM_CANCEL_LABEL]: 'Cancelar',
  [MK.COMMAND_FORM_NAME_FIELD_LABEL]: 'Nombre',
  [MK.COMMAND_FORM_NAME_FIELD_HELP_TEXT]:
    'El nombre del comando va a ser la sintaxis utilizada desde la SDK, no debe contener espacios en blanco',
  [MK.COMMAND_FORM_NAME_FIELD_ERROR]:
    'El nombre del comando es requerido y no debe contener espacios',
  [MK.COMMAND_FORM_INVOCATION_FIELD_LABEL]: 'Comando',
  [MK.COMMAND_FORM_INVOCATION_FIELD_HELP_TEXT_SCPI]:
    'Es el comando que indica el fabricante del instrumento. Usá {} para indicar parámetros en el comando.',
  [MK.COMMAND_FORM_INVOCATION_FIELD_ERROR]: 'El comando a invocar es requerido',
  [MK.COMMAND_FORM_DESCRIPTION_FIELD_LABEL]: 'Descripción',
  [MK.COMMAND_FORM_DESCRIPTION_FIELD_PLACEHOLDER]: '¿Qué hace este comando?',
  [MK.COMMAND_FORM_PARAMETERS_FIELD_LABEL]: 'Parámetros',
  [MK.COMMAND_FORM_PARAMETERS_FIELD_TYPE_LABEL]: 'Tipo de valor',
  [MK.COMMAND_FORM_PARAMETERS_FIELD_DESCRIPTION_LABEL]: 'Descripción',
  [MK.COMMAND_FORM_PARAMETERS_FIELD_DESCRIPTION_PLACEHOLDER]: '¿Para qué sirve este parámetro?',
  [MK.COMMAND_FORM_RETURN_FIELD_LABEL]: 'Valor de retorno',
  [MK.COMMAND_FORM_RETURN_FIELD_TYPE_LABEL]: 'Tipo de valor',
  [MK.COMMAND_FORM_RETURN_FIELD_DESCRIPTION_LABEL]: 'Descripción',
  [MK.COMMAND_FORM_RETURN_FIELD_DESCRIPTION_PLACEHOLDER]: '¿Qué indica el valor de retorno?',
  [MK.COMMAND_FORM_INVOCATION_EXAMPLE]: 'Ejemplo de invocación:',
  [MK.COMMAND_FORM_SCPI_INVOCATION_EXAMPLE]: 'Instrucción que recibiría el instrumento:',
};
