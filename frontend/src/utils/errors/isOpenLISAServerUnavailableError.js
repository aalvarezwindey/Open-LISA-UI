import { ERRORS } from '../../domain/constants';

export const isOpenLISAServerUnavailableError = (responseError) =>
  responseError?.status === ERRORS.UNAVAILABLE_OPEN_LISA_SERVER.STATUS &&
  responseError?.data?.code === ERRORS.UNAVAILABLE_OPEN_LISA_SERVER.CODE;
