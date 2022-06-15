import history from './browserHistory';
import { queryStringToObject, addToQueryString, omitFromQueryString } from './url';

const open = (param: any) =>
  history.push({
    pathname: history.location.pathname,
    search: addToQueryString(history.location.search, { [`modal-${param}`]: true }),
  });

const close = (param: any) =>
  history.push({
    pathname: history.location.pathname,
    search: omitFromQueryString(history.location.search, [`modal-${param}`]),
  });

const isOpen = (param: any) => !!queryStringToObject(history.location.search)[`modal-${param}`];

export const createQueryParamModalHelpers = (param: any) => ({
  open: () => open(param),
  close: () => close(param),
  isOpen: () => isOpen(param),
});
